import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const models = await genAI.listModels();
  const names: string[] = [];
  for await (const model of models) {
    if (model.supportedGenerationMethods?.includes("generateContent")) {
      names.push(model.name);
    }
  }
  return Response.json(names);
}
