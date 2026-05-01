export async function GET() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_API_KEY}`
  );
  const data = await res.json();
  const names = (data.models ?? [])
    .filter((m: { supportedGenerationMethods?: string[] }) =>
      m.supportedGenerationMethods?.includes("generateContent")
    )
    .map((m: { name: string }) => m.name);
  return Response.json(names);
}
