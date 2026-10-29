import { clientIp, rateLimited } from "@/lib/human";

export const dynamic = "force-dynamic";

// The next open demo times on the platform (AutomateItAll's own company): the lead endpoint's sibling,
// GET {EVRAPPS_LEAD_URL minus its last segment}/open-times, with the same key. Empty when not set up.
export function openTimesUrl(): string | null {
  const url = process.env.EVRAPPS_LEAD_URL;
  if (!url) return null;
  return url.replace(/\/[^/]+\/?$/, "/open-times");
}

export async function GET(req: Request) {
  if (rateLimited(`times:${clientIp(req)}`, 60, 10 * 60 * 1000)) {
    return Response.json({ times: [], detail: "too many requests" }, { status: 429 });
  }
  const url = openTimesUrl();
  const key = process.env.EVRAPPS_LEAD_KEY;
  if (!url || !key) return Response.json({ times: [], detail: "booking is not connected yet" });
  try {
    const r = await fetch(`${url}?limit=24`, { headers: { "X-Api-Key": key }, cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!r.ok) return Response.json({ times: [], detail: `platform answered ${r.status}` });
    const data = (await r.json()) as { times?: { key: string; day: string; time: string }[] };
    return Response.json({ times: (data.times ?? []).map((t) => ({ key: t.key, day: t.day, time: t.time })) });
  } catch (err) {
    return Response.json({ times: [], detail: err instanceof Error ? err.message : String(err) });
  }
}
