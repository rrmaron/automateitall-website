// Proving a form was sent by a person (Roger, 2026-10-29: "make the form/website bot proof"), the same three
// layers the hiring site uses (myhiringprocess human_check.py):
//   1. Cloudflare Turnstile, when TURNSTILE_SECRET_KEY (and NEXT_PUBLIC_TURNSTILE_SITE_KEY) are set in Vercel:
//      the "Verify you are human" box, checked with Cloudflare on submit.
//   2. A trap field people never see ("website"); a bot that fills every field fills it.
//   3. A signed timestamp rendered into the form: one sent back within 3 seconds of the page loading (no person
//      types that fast), or forged, is refused.
// Layers 2 and 3 need no setup and are always on. A best-effort per-IP rate limit (per serverless instance)
// backs them up on the form, the chat and the lead email.
import crypto from "crypto";

const MIN_SECONDS = 3;
const MAX_SECONDS = 2 * 24 * 3600;
export const TRAP_FIELD = "website";
export const STAMP_FIELD = "form_stamp";
export const NOT_HUMAN = "We couldn't confirm you're a person. Please try again.";

function secret(): string {
  return process.env.FORM_STAMP_SECRET || process.env.RESEND_API_KEY || "dev-form-stamp";
}

function sign(ts: number): string {
  return crypto.createHmac("sha256", secret()).update(`form-stamp:${ts}`).digest("hex").slice(0, 32);
}

export function stamp(now = Date.now()): string {
  const ts = Math.floor(now / 1000);
  return `${ts}.${sign(ts)}`;
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

async function turnstileOk(token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY ?? "", response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const result = (await r.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    // Cloudflare unreachable: the trap field and the timestamp still stand; do not lock everyone out.
    return true;
  }
}

/** Why this form can't be taken as sent by a person, or null. */
export async function humanProblem(fields: Record<string, string>, ip: string | null, now = Date.now()): Promise<string | null> {
  if ((fields[TRAP_FIELD] ?? "").trim()) return NOT_HUMAN;
  const raw = (fields[STAMP_FIELD] ?? "").trim();
  const dot = raw.indexOf(".");
  const tsText = dot === -1 ? "" : raw.slice(0, dot);
  const sig = dot === -1 ? "" : raw.slice(dot + 1);
  if (!/^\d+$/.test(tsText) || !safeEqual(sig, sign(Number(tsText)))) return NOT_HUMAN;
  const age = now / 1000 - Number(tsText);
  if (age < MIN_SECONDS) return NOT_HUMAN;
  if (age > MAX_SECONDS) return "This page was open a long time. Please check your details and send it again.";
  if (process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    const token = (fields["cf-turnstile-response"] ?? "").trim();
    if (!token) return 'Please tick the "Verify you are human" box.';
    if (!(await turnstileOk(token, ip))) return NOT_HUMAN;
  }
  return null;
}

export function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim() || null;
  return req.headers.get("x-real-ip");
}

// Best effort: one map per serverless instance, enough to blunt a loop against the chat or the form.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return recent.length > limit;
}
