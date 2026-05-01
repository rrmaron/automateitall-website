import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

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
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
    thinking: { type: "adaptive" },
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
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
