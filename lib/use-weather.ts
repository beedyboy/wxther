"use client";

import { useEffect, useState } from "react";
import type { Weather } from "@/types";

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/weather")
      .then((r) => {
        if (!r.ok) throw new Error("weather " + r.status);
        return r.json();
      })
      .then((w: Weather) => {
        if (!cancelled) setWeather(w);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { weather, error, loading: !weather && !error };
}
