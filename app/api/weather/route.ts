import { NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

// Wimbledon SW19
const DEFAULT = { lat: 51.4214, lon: -0.2064, place: "Wimbledon, London" };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lon = parseFloat(searchParams.get("lon") ?? "");
  const place = searchParams.get("place") ?? DEFAULT.place;

  const target =
    Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon, place } : DEFAULT;

  try {
    const w = await getWeather(target.lat, target.lon, target.place);
    return NextResponse.json(w);
  } catch (e) {
    console.error("weather fetch failed", e);
    return NextResponse.json({ error: "weather unavailable" }, { status: 502 });
  }
}
