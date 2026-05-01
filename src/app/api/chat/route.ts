import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are a lead qualification agent for AutomateItAll.ai, a software company that builds fully integrated operations platforms for any business.

About AutomateItAll:
- We build custom operations platforms tailored to how each business actually runs
- We've built a full platform for a national bath remodeling company: webhook-driven lead ingestion, automated job creation, live inventory, installer scheduling, commission calculation, and a customer-facing quote portal
- We serve any industry: home services, healthcare, construction, field operations, retail/franchise
- We replace spreadsheets, emails, and manual handoffs with one integrated system

Your job is to collect the following through natural conversation — do NOT ask all at once, weave them in naturally:
1. Their name
2. Business name and industry
3. How big their team is
4. What they currently do manually (the painful parts)
5. Their biggest bottleneck or frustration
6. Their contact email or phone number

Once you have all of this, write a warm closing message telling them their info has been sent to the team and someone will reach out shortly. End that message with this exact block (replace with real values):

[LEAD]
Name: ...
Business: ...
Industry: ...
Team size: ...
Manual processes: ...
Biggest pain: ...
Contact: ...
[/LEAD]

Keep every response concise — 2-3 sentences max. Sound like a sharp consultant, not a chatbot. Never ask more than one question at a time.`;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_API_KEY) {
    return new Response("GOOGLE_API_KEY is not set", { status: 500 });
  }

  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  // Gemini requires history to start with a user turn — drop leading assistant messages
  const allButLast = messages.slice(0, -1);
  const firstUserIdx = allButLast.findIndex((m: { role: string }) => m.role === "user");
  const historyMessages = firstUserIdx === -1 ? [] : allButLast.slice(firstUserIdx);

  const history = historyMessages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1].content;

  const chat = model.startChat({ history });

  let result;
  try {
    result = await chat.sendMessageStream(lastMessage);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(msg, { status: 500 });
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
