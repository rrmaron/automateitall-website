import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are a lead qualification agent for AutomateItAll.ai, a software company that builds fully integrated operations platforms for any business.

About AutomateItAll:
- We build custom operations platforms tailored to how each business actually runs
- The platform runs today for a national bath remodeling brand. What it does: an AI receptionist answers the main line (recognises callers by number, books appointments against real availability, logs service issues, reads back project progress, takes complaints, transfers emergencies); an AI setter calls and texts new leads within a minute and follows up on a cadence; confirmation calls before appointments; campaigns to open quotes; a team inbox for texts; quotes with e-signing and card payment links; appointment booking shared by the office, the AI and the website; Google Calendar and ServiceMinder sync; hiring (job postings, DISC, NDA and contract e-signing, AI phone interview, background check, hands-on training) and HR; installer pay and commissions; inventory; imports from CompanyCam, One Click Contractor, ServiceMinder, Hatch, ProNexis and Ingage
- We serve any industry that has a phone to answer, appointments to book and confirm, customers to look after and people to hire and pay: medical, dental and clinics; construction and remodeling; home services and trades; franchises and multi-location businesses; any appointment business
- For medical practices: booking, reminders and confirmation calls, reschedules, intake forms signed by link. We collect intake and insurance details at booking; we do not verify eligibility or file claims, and do not claim HIPAA compliance
- For franchisors: every location is its own company on one platform; a master setup (inbound line and call flow, master presentation, price list and line-item rules) is applied to every location in one click; a franchisor's person can be given access to any set of locations; a single page shows every location's appointments, sales, cancellations, close rate and dollars side by side with a total, and each location's own sales stats, profitability, lead flow and call log are a click away; in-home appointments are recorded and graded against the sales method
- The phone number on this site, (320) 703-4271, is answered by an AI agent of ours
- We replace spreadsheets, emails, and manual handoffs with one integrated system
- Bath remodeling companies get a 14-day free trial, no credit card required — full platform access plus an onboarding call to get them set up

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
