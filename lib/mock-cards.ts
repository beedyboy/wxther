import type { Card, Weather } from "@/types";


export function mockCards(w: Weather): Card[] {
  const out: Card[] = [];
  const wet = w.condition === "rain" || w.condition === "drizzle" || w.condition === "storm";
  const cold = w.temp <= 10;
  const windy = w.windKmh >= 20;

  if (wet || windy) {
    out.push({
      id: "commute-tube",
      category: "commute",
      layout: "double",
      title: wet ? "Wet roads on your cycle route" : "Strong winds on your cycle route",
      body: wet
        ? `Drizzle expected through this afternoon. The Tube stays dry and a day ticket is good value.`
        : `Gusts of ${w.windKmh} km/h. Cycling will be slower today - the Tube is more predictable.`,
      primary: { label: "Switch to Tube", intent: "switch-tube" },
      secondary: { label: "View routes", intent: "view-route" },
    });
  } else {
    out.push({
      id: "commute-walk",
      category: "commute",
      layout: "single",
      title: "Good walking weather",
      body: `${w.description.toLowerCase()}, ${w.temp}°C - the 15-min walk to the station beats the Tube fare today.`,
      primary: { label: "See route", intent: "view-route" },
    });
  }

  out.push(
    wet
      ? {
          id: "shoes-wet",
          category: "shoes",
          layout: "double",
          title: "Pack waterproof trainers",
          body: "Drizzle returns through the day. Goretex runners under £80 work for the commute and the gym.",
          primary: { label: "View options", intent: "view-shoes" },
          secondary: { label: "Save for later", intent: "save-shoes" },
        }
      : cold
        ? {
            id: "shoes-cold",
            category: "shoes",
            layout: "ack",
            title: `${w.temp}°C feels cold for trainers`,
            body: "Lined sneakers or ankle boots will keep you comfortable on the walk to the station.",
            primary: { label: "Got it", intent: "ack" },
          }
        : {
            id: "shoes-mild",
            category: "shoes",
            layout: "ack",
            title: "Mild day - any trainers work",
            body: `${w.temp}°C and ${w.description.toLowerCase()}. Breathable runners are a safe pick.`,
            primary: { label: "Got it", intent: "ack" },
          },
  );

  out.push(
    wet
      ? {
          id: "music-rainy",
          category: "music",
          layout: "single",
          title: "Rainy commute playlist",
          body: "32 minutes of mellow indie - matches the drizzle and your usual Tube ride.",
          primary: { label: "Play in Spotify", intent: "play-playlist" },
        }
      : {
          id: "music-cycle",
          category: "music",
          layout: "single",
          title: "Bike-friendly podcast",
          body: "A 28-min episode of 99% Invisible - ends right around when you reach the office.",
          primary: { label: "Open in Spotify", intent: "play-podcast" },
        },
  );

  // a "deal" card if conditions are right (clear or part-cloud during the day)
  if (!wet && (w.condition === "clear" || w.condition === "part-cloud")) {
    out.push({
      id: "deal-coffee",
      category: "deal",
      layout: "double",
      title: "Sunny window: £2 coffee",
      body: "Delight Cafe is doing a morning special. Walkable from the station and quiet before 9.",
      primary: { label: "View location", intent: "view-place" },
      secondary: { label: "Save deal", intent: "save-deal" },
    });
  }

  return out;
}
