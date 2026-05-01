import { Resend } from "resend";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { messages }: { messages: Message[] } = await req.json();

  const transcript = messages
    .map((m) => `${m.role === "user" ? "Prospect" : "AI"}: ${m.content}`)
    .join("\n\n");

  const { error } = await resend.emails.send({
    from: "AutomateItAll Bot <bot@automateitall.ai>",
    to: "hello@automateitall.ai",
    subject: "New Lead from Website Chat",
    text: `A prospect submitted their conversation from the website chatbot.\n\n---\n\n${transcript}`,
    html: `
      <h2>New Lead from Website Chat</h2>
      <p>A prospect submitted their conversation from the website chatbot.</p>
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

  if (error) return Response.json({ error }, { status: 500 });
  return Response.json({ ok: true });
}
