"use client";

import { useMemo, useState } from "react";
import { Background } from "@/components/Background";
import { StatusBar } from "@/components/StatusBar";
import { Header } from "@/components/Header";
import { Cards } from "@/components/Cards";
import { Empty } from "@/components/Empty";
import { useWeather } from "@/lib/use-weather";
import { useRecs } from "@/lib/use-recs";

export default function Page() {
  const { weather, error: wErr } = useWeather();
  const { cards: serverCards, error: rErr, loading: rLoading } = useRecs(weather);

  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const cards = useMemo(() => {
    if (!serverCards) return [];
    return serverCards.filter((c) => !dismissed.has(c.id));
  }, [serverCards, dismissed]);

  const dismiss = (id: string) => {
    setDismissed((s) => {
      const next = new Set(s);
      next.add(id);
      return next;
    });
  };

  const onAction = (id: string, intent: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("action", { id, intent });
    }
  };

  const showEmpty = !rLoading && !!serverCards && cards.length === 0;

  return (
    <main className="relative flex min-h-screen flex-col">
      <Background />
      <StatusBar />

      {/* sticky so suggestions scroll up underneath the frosted glass */}
      <div className="sticky top-0 z-20">
        {weather ? (
          <Header weather={weather} />
        ) : (
          <div className="h-[322px] animate-pulse rounded-b-panel bg-white/10" />
        )}
      </div>

      <section className="flex flex-col">
        <h2 className="px-4 pb-2 pt-4 text-base font-medium">Suggested Actions</h2>

        {(wErr || rErr) && (
          <div className="mx-4 mt-2 rounded-3xl bg-black/20 p-4 text-sm text-white/80">
            Couldn&apos;t load suggestions. {wErr ?? rErr}
          </div>
        )}

        {rLoading && (
          <ul className="flex flex-col gap-4 px-4 pb-6 pt-2">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="h-[148px] animate-pulse rounded-3xl bg-white/10"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </ul>
        )}

        {showEmpty ? (
          <Empty />
        ) : !rLoading ? (
          <Cards cards={cards} onDismiss={dismiss} onAction={onAction} />
        ) : null}
      </section>
    </main>
  );
}
