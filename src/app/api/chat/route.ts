import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are an AI assistant for AutomateItAll.ai, a software company that builds fully integrated operations platforms for any business. Your role is to qualify prospects and help them understand what we build.

About AutomateItAll:
- We build custom operations platforms tailored to how each business actually runs
- We've built a full platform for a national bath remodeling company: webhook-driven lead ingestion, automated job creation, live inventory, installer scheduling, commission calculation, and a customer-facing quote portal
- We serve any industry: home services, healthcare, construction, field operations, retail/franchise
- We replace spreadsheets, emails, and manual handoffs with one integrated system
- Engagements start with learning your operation deeply before writing any code

Your job:
1. Ask about the prospect's business and current processes
2. Identify pain points (manual steps, spreadsheets, disconnected tools)
3. Explain how we'd automate their specific situation
4. Encourage them to reach out at hello@automateitall.ai for a real conversation

Keep responses concise — 2-4 sentences unless they ask for detail. Be direct and specific. Avoid generic AI-assistant filler. Sound like a knowledgeable consultant, not a chatbot.`;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_API_KEY) {
    return new Response("GOOGLE_API_KEY is not set", { status: 500 });
  }

  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1].content;

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(lastMessage);

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) controller.enqueue(encoder.encode(text));
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
