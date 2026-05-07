import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { Card, Weather } from "@/types";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

const action = z.object({
  label: z.string().min(1).max(40),
  intent: z.string().min(1).max(40),
});

const cardSchema = z.discriminatedUnion("layout", [
  z.object({
    id: z.string().min(1).max(80),
    category: z.enum(["shoes", "commute", "music", "deal", "info"]),
    layout: z.literal("single"),
    title: z.string().min(1).max(80),
    body: z.string().min(1).max(200),
    primary: action,
  }),
  z.object({
    id: z.string().min(1).max(80),
    category: z.enum(["shoes", "commute", "music", "deal", "info"]),
    layout: z.literal("double"),
    title: z.string().min(1).max(80),
    body: z.string().min(1).max(200),
    primary: action,
    secondary: action,
  }),
  z.object({
    id: z.string().min(1).max(80),
    category: z.enum(["shoes", "commute", "music", "deal", "info"]),
    layout: z.literal("ack"),
    title: z.string().min(1).max(80),
    body: z.string().min(1).max(200),
    primary: action,
  }),
]);

const tool = {
  name: "submit_cards",
  description: "Submit 3-5 weather-grounded recommendation cards.",
  input_schema: {
    type: "object" as const,
    properties: {
      cards: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "kebab-case id unique to this batch" },
            category: {
              type: "string",
              enum: ["shoes", "commute", "music", "deal", "info"],
              description:
                "shoes = footwear given the weather. commute = transport advice. music = playlist or podcast for the mood. deal = local time-bound offer. info = informational.",
            },
            layout: {
              type: "string",
              enum: ["single", "double", "ack"],
              description:
                "single = one CTA. double = two CTAs (often action + save). ack = informational, just 'Got it'.",
            },
            title: { type: "string", description: "2-6 words, sentence case" },
            body: { type: "string", description: "1-2 sentences with specifics from the weather" },
            primary: {
              type: "object",
              properties: {
                label: { type: "string", description: "1-3 words, like an iOS button" },
                intent: { type: "string", description: "kebab-case e.g. switch-tube, view-shoes, play-playlist, save-deal, ack" },
              },
              required: ["label", "intent"],
            },
            secondary: {
              type: "object",
              description: "required when layout is 'double'",
              properties: {
                label: { type: "string" },
                intent: { type: "string" },
              },
              required: ["label", "intent"],
            },
          },
          required: ["id", "category", "layout", "title", "body", "primary"],
        },
      },
    },
    required: ["cards"],
  },
};

const PERSONA = [
  "User profile (hardcoded per the brief):",
  "- Early 30s, lives in Wimbledon, London",
  "- Time-poor on weekday mornings",
  "- Travels by walking, cycling, Tube, bus",
  "- Budget-conscious, always looking for value",
].join("\n");

const RUBRIC = [
  "Card-writing principles:",
  "- Lean into the three signature categories: shoes, commute, music. Use 'deal' and 'info' sparingly.",
  "- Ground every card in the weather data. Reference specific temps, times, wind speeds.",
  "- Specific beats generic. 'Drizzle until 4 PM' beats 'rain expected'.",
  "- Vary categories - don't return three commute cards.",
  "- Match layout to content. single = one clear next step, double = action+save, ack = informational.",
  "- Titles 2-6 words. Body 1-2 sentences. Action labels 1-3 words.",
  "Submit cards via the submit_cards tool.",
].join("\n");

function userMessage(w: Weather): string {
  return [
    "Generate 3-5 cards for this user given the current weather.",
    "",
    `Now: ${w.temp}°C, ${w.description}, ${w.rainPct}% rain, ${w.windKmh} km/h wind`,
    "",
    "Next 12 hours:",
    ...w.hours.map((h) => `${h.label.replace("\u00A0", " ")}: ${h.temp}°C, ${h.condition}`),
  ].join("\n");
}

// in-memory cache. coarse signature so a 0.1°C wobble doesn't re-call.
const cache = new Map<string, { cards: Card[]; expires: number }>();

function sig(w: Weather): string {
  return `${w.place}|${w.temp}|${w.condition}|${Math.floor(w.rainPct / 10)}|${Math.round(w.windKmh / 5)}`;
}

export async function generate(w: Weather): Promise<Card[]> {
  const key = sig(w);
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.cards;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const client = new Anthropic({ apiKey });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: `${PERSONA}\n\n${RUBRIC}`,
    tools: [tool],
    tool_choice: { type: "tool", name: tool.name },
    messages: [{ role: "user", content: userMessage(w) }],
  });

  const block = res.content.find((b) => b.type === "tool_use" && b.name === tool.name);
  if (!block || block.type !== "tool_use") {
    throw new Error("no tool_use block in response");
  }

  const input = block.input as { cards?: unknown[] };
  if (!input.cards || !Array.isArray(input.cards)) {
    throw new Error("malformed cards array");
  }

  // drop bad cards rather than failing the whole batch
  const cards: Card[] = [];
  for (const c of input.cards) {
    const parsed = cardSchema.safeParse(c);
    if (parsed.success) cards.push(parsed.data);
  }

  if (cards.length === 0) throw new Error("zero valid cards");

  cache.set(key, { cards, expires: Date.now() + 10 * 60 * 1000 });
  return cards;
}
