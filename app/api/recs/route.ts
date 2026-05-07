import { NextResponse } from "next/server";
import type { Weather } from "@/types";
import { mockCards } from "@/lib/mock-cards";
// import { generate } from "@/lib/claude";

const useMock = process.env.USE_MOCK_CARDS === "true" || !process.env.ANTHROPIC_API_KEY;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const weather = (body as { weather?: Weather }).weather;
  if (!weather) {
    return NextResponse.json({ error: "missing weather" }, { status: 400 });
  }

  try {
    // const cards = useMock ? mockCards(weather) : await generate(weather);
    const cards = mockCards(weather);
    
    return NextResponse.json({ cards });
  } catch (e) {
    console.error("recs failed", e);
    // fallback to mock if claude blows up - the user should still see something
    return NextResponse.json({ cards: mockCards(weather), fallback: true });
  }
}
