import { Resend } from "resend";
import { leadFromChat, parseLeadBlock, postLead } from "@/lib/evrapps";
import { clientIp, rateLimited } from "@/lib/human";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  if (rateLimited(`send-lead:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
    return Response.json({ error: "Too many submissions from this connection." }, { status: 429 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { messages }: { messages: Message[] } = await req.json();
  if (!Array.isArray(messages) || messages.length > 60) return Response.json({ error: "Bad request" }, { status: 400 });

  const transcript = messages
    .map((m) => `${m.role === "user" ? "Prospect" : "AI"}: ${m.content}`)
    .join("\n\n");

  // Into the platform first, so the setter can call them back; the email follows either way.
  const block = [...messages].reverse().find((m) => m.role === "assistant" && parseLeadBlock(m.content));
  const lead = block ? leadFromChat(parseLeadBlock(block.content)!) : null;
  const posted = lead ? await postLead(lead) : { posted: false, detail: "no [LEAD] block in the conversation" };
  const postedLine = posted.posted ? "Posted to the platform as a lead." : `Not posted to the platform: ${posted.detail ?? posted.status}.`;

  const { error } = await resend.emails.send({
    from: "AutomateItAll Bot <bot@automateitall.ai>",
    to: "hello@automateitall.ai",
    subject: "New Lead from Website Chat",
    text: `A prospect submitted their conversation from the website chatbot. ${postedLine}\n\n---\n\n${transcript}`,
    html: `
      <h2>New Lead from Website Chat</h2>
      <p>A prospect submitted their conversation from the website chatbot. ${postedLine}</p>
      <hr />
      ${messages
        .map(
          (m) => `
        <div style="margin:12px 0;padding:12px;border-radius:8px;background:${
          m.role === "user" ? "#e8f4fd" : "#f0fdf4"
        }">
          <strong>${m.role === "user" ? "Prospect" : "AI Assistant"}</strong>
          <p style="margin:4px 0 0">${m.content.replace(/\n/g, "<br/>")}</p>
        </div>`
        )
        .join("")}
    `,
  });

  if (error) return Response.json({ error, posted: posted.posted }, { status: 500 });
  return Response.json({ ok: true, posted: posted.posted });
}
