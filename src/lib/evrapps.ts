// Leads from this site go into AutomateItAll's own company on the platform (the same lead
// posting a lead vendor uses: POST {EVRAPPS_LEAD_URL} with X-Api-Key: {EVRAPPS_LEAD_KEY}),
// so the setter calls them back within a minute and the demo is booked from there.
// Both values are set in Vercel once the company exists; until then nothing is posted and
// the email to hello@ stays as it was.

export interface LeadFields {
  name: string;
  phone?: string;
  email?: string;
  project_type?: string;
  comments?: string;
  lead_capture_key?: string;
}

export interface PostResult {
  posted: boolean;
  status?: number;
  detail?: string;
}

export async function postLead(fields: LeadFields): Promise<PostResult> {
  const url = process.env.EVRAPPS_LEAD_URL;
  const key = process.env.EVRAPPS_LEAD_KEY;
  if (!url || !key) return { posted: false, detail: "EVRAPPS_LEAD_URL / EVRAPPS_LEAD_KEY not set" };
  if (!fields.name || !(fields.phone || fields.email)) {
    return { posted: false, detail: "a name and a phone or email are required" };
  }
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": key },
      body: JSON.stringify(fields),
    });
    if (r.ok) return { posted: true, status: r.status };
    return { posted: false, status: r.status, detail: (await r.text()).slice(0, 300) };
  } catch (err) {
    return { posted: false, detail: err instanceof Error ? err.message : String(err) };
  }
}

// The chat agent ends a qualified conversation with "[LEAD] Name: ... [/LEAD]" (src/app/api/chat/route.ts).
export function parseLeadBlock(text: string): Record<string, string> | null {
  const m = text.match(/\[LEAD\]([\s\S]*?)\[\/LEAD\]/);
  if (!m) return null;
  const out: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim().toLowerCase();
    const v = line.slice(idx + 1).trim();
    if (k && v && v !== "...") out[k] = v;
  }
  return Object.keys(out).length ? out : null;
}

// "Contact" may be an email, a phone, or both in one line.
export function splitContact(contact: string): { phone?: string; email?: string } {
  const email = contact.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)?.[0];
  const digits = contact.replace(email ?? "", "").replace(/\D/g, "");
  const phone = digits.length >= 10 ? digits.slice(-10) : undefined;
  return { phone, email };
}

export function leadFromChat(block: Record<string, string>): LeadFields | null {
  const name = block["name"];
  if (!name) return null;
  const { phone, email } = splitContact(block["contact"] ?? "");
  const comments = [
    block["business"] && `Business: ${block["business"]}`,
    block["team size"] && `Team size: ${block["team size"]}`,
    block["manual processes"] && `Manual processes: ${block["manual processes"]}`,
    block["biggest pain"] && `Biggest pain: ${block["biggest pain"]}`,
    "From the website chat.",
  ]
    .filter(Boolean)
    .join(" | ");
  return { name, phone, email, project_type: block["industry"], comments, lead_capture_key: `chat-${Date.now()}` };
}
