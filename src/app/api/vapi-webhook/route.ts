import { Resend } from "resend";
import { postLead } from "@/lib/evrapps";

export async function POST(req: Request) {
  const body = await req.json();

  // Vapi sends various event types — we only care about end-of-call reports
  const { message } = body;
  if (!message || message.type !== "end-of-call-report") {
    return Response.json({ ok: true });
  }

  const { transcript, summary, call } = message;
  const callerNumber = call?.customer?.number ?? "Unknown";
  const duration = call?.endedAt && call?.startedAt
    ? Math.round((new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000)
    : null;

  // Every caller becomes a lead on the platform (by their number), with the call's summary.
  const structured = (message.analysis?.structuredData ?? {}) as Record<string, string>;
  const callerName = structured.caller_name || structured.name || call?.customer?.name || "Phone caller (name not given)";
  const posted = /\d{10}/.test(callerNumber.replace(/\D/g, ""))
    ? await postLead({ name: callerName, phone: callerNumber, comments: summary ? `Called the AutomateItAll line. ${summary}` : "Called the AutomateItAll line.", lead_capture_key: call?.id })
    : { posted: false, detail: "no caller number" };
  const postedLine = posted.posted ? "Posted to the platform as a lead." : `Not posted to the platform: ${posted.detail ?? posted.status}.`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "AutomateItAll Voice <bot@automateitall.ai>",
    to: "hello@automateitall.ai",
    subject: `New Phone Lead — ${callerNumber}`,
    html: `
      <h2>New Phone Lead</h2>
      <p><strong>Caller:</strong> ${callerNumber}</p>
      <p style="color:#666;font-size:13px">${postedLine}</p>
      ${duration ? `<p><strong>Duration:</strong> ${duration}s</p>` : ""}

      ${summary ? `
        <h3>Summary</h3>
        <p>${summary}</p>
        <hr />
      ` : ""}

      <h3>Full Transcript</h3>
      <pre style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;font-size:13px">${transcript ?? "No transcript available"}</pre>
    `,
  });

  return Response.json({ ok: true });
}
