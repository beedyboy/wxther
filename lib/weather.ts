import type { Condition, Hour, Weather } from "@/types";

type OM = {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
};

// open-meteo's WMO codes are too granular for the UI - collapse to 8 buckets
function bucket(code: number): Condition {
  if (code === 0) return "clear";
  if (code <= 2) return "part-cloud";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}

function describe(c: Condition): string {
  return {
    clear: "Clear",
    "part-cloud": "Partly Cloudy",
    cloud: "Cloudy",
    fog: "Foggy",
    drizzle: "Drizzle",
    rain: "Rain",
    snow: "Snow",
    storm: "Storms",
  }[c];
}

function hourLabel(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}\u00A0${period}`;
}

export async function getWeather(lat: number, lon: number, place: string): Promise<Weather> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("hourly", "temperature_2m,weather_code,precipitation_probability");
  url.searchParams.set("timezone", "Europe/London");
  url.searchParams.set("forecast_days", "2");

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`open-meteo: ${res.status}`);
  const om = (await res.json()) as OM;

  // find the index of the current hour in the hourly arrays
  const now = Date.now();
  let i = 0;
  for (let j = 0; j < om.hourly.time.length; j++) {
    if (new Date(om.hourly.time[j]!).getTime() <= now) i = j;
    else break;
  }

  const hours: Hour[] = [];
  for (let offset = 0; offset < 12; offset++) {
    const k = i + offset;
    const t = om.hourly.time[k];
    const temp = om.hourly.temperature_2m[k];
    const code = om.hourly.weather_code[k];
    if (t === undefined || temp === undefined || code === undefined) break;
    hours.push({
      time: t,
      label: offset === 0 ? "Now" : hourLabel(t),
      temp: Math.round(temp),
      condition: bucket(code),
    });
  }

  const condition = bucket(om.current.weather_code);
  return {
    place,
    lat,
    lon,
    temp: Math.round(om.current.temperature_2m),
    condition,
    description: describe(condition),
    rainPct: Math.round(om.hourly.precipitation_probability[i] ?? 0),
    windKmh: Math.round(om.current.wind_speed_10m),
    hours,
  };
}
