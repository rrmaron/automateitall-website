import { Resend } from "resend";
import { clientIp, humanProblem, rateLimited } from "@/lib/human";

export const dynamic = "force-dynamic";

// The intake form (/demo): the same questions the demo line asks, posted to the platform as a lead on
// AutomateItAll's own company with the time they picked, so the demo is booked and the prospect gets the
// text and email with their next steps from there. A copy goes to hello@ as the chat leads do.
const FIELDS = [
  "name", "business", "industry", "team_size", "manual_processes", "biggest_pain",
  "phone", "email", "zip", "city", "partner", "slot", "trial",
] as const;

type Posted = { ok: boolean; status?: string; lead_id?: number; booked?: { key: string; day: string; time: string } | null };

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(`book:${ip}`, 6, 15 * 60 * 1000)) {
    return Response.json({ error: "Too many attempts from this connection. Please call us instead." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) fields[k] = clean(v, 2000);

  const problem = await humanProblem(fields, ip);
  if (problem) return Response.json({ error: problem }, { status: 400 });

  const name = clean(fields.name, 200);
  const phone = clean(fields.phone, 50).replace(/[^\d+() .-]/g, "");
  const email = clean(fields.email, 200).toLowerCase();
  if (!name) return Response.json({ error: "Please tell us your name." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 10 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "We need a 10-digit phone number or an email address to reach you." }, { status: 400 });
  }
  if (!fields.consent) {
    return Response.json({ error: "Please tick the box agreeing that we may call, text or email you about your demo." }, { status: 400 });
  }

  const lead: Record<string, string> = { source: "website" };
  for (const f of FIELDS) if (fields[f]) lead[f] = clean(fields[f], f === "manual_processes" || f === "biggest_pain" ? 1000 : 200);
  lead.name = name;
  if (phone) lead.phone = phone;
  if (email) lead.email = email;
  if (fields.trial) lead.comments = "Asked for the 14-day free trial (bath remodeling).";

  let posted: Posted = { ok: false };
  let detail = "";
  const url = process.env.EVRAPPS_LEAD_URL;
  const key = process.env.EVRAPPS_LEAD_KEY;
  if (url && key) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Api-Key": key },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(15000),
      });
      if (r.ok) posted = (await r.json()) as Posted;
      else detail = `platform answered ${r.status}: ${(await r.text()).slice(0, 200)}`;
    } catch (err) {
      detail = err instanceof Error ? err.message : String(err);
    }
  } else {
    detail = "EVRAPPS_LEAD_URL / EVRAPPS_LEAD_KEY not set";
  }

  // The copy to the office, whatever the platform said.
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const lines = FIELDS.filter((f) => lead[f]).map((f) => `${f.replace(/_/g, " ")}: ${lead[f]}`);
    const booked = posted.booked ? `Demo booked for ${posted.booked.day} at ${posted.booked.time}.` : "No time booked.";
    const platform = posted.ok ? `Posted to the platform (lead ${posted.lead_id}, ${posted.status}). ${booked}` : `Not posted to the platform: ${detail}.`;
    await resend.emails
      .send({
        from: "AutomateItAll Bot <bot@automateitall.ai>",
        to: "hello@automateitall.ai",
        subject: `Demo request from the website: ${name}${lead.business ? ` (${lead.business})` : ""}`,
        text: `${platform}\n\n${lines.join("\n")}`,
      })
      .catch(() => undefined);
  }

  if (!posted.ok) {
    // The office has the email; the visitor is not told the platform was unreachable in detail.
    return Response.json({ ok: true, booked: null, posted: false });
  }
  return Response.json({ ok: true, booked: posted.booked ?? null, posted: true });
}
