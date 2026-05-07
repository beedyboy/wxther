"use client";

import { useEffect, useState } from "react";
import type { Card, Weather } from "@/types";

export function useRecs(weather: Weather | null) {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!weather) return;

    const controller = new AbortController();

    async function fetchRecs() {
      try {
        setLoading(true);
        setError(null);

        // reset stale cards BEFORE fetch result
        setCards(null);

        const response = await fetch("/api/recs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weather }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recommendations (${response.status})`);
        }

        const data: { cards: Card[] } = await response.json();

        setCards(data.cards);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecs();

    return () => {
      controller.abort();
    };
  }, [weather]);

  return {
    cards,
    error,
    loading,
  };
}