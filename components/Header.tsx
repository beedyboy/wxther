import { Pin, Drop, Cloud, PartCloud, Sun, Icon } from "./icons";
import type { Condition, Weather } from "@/types";

function HourIcon({ c }: { c: Condition }) {
  if (c === "clear") return <Sun className="text-white" />;
  if (c === "part-cloud" || c === "fog") return <PartCloud className="text-white" />;
  if (c === "rain" || c === "drizzle" || c === "storm" || c === "snow")
    return <Drop className="text-white" />;
  return <Cloud className="text-white" />;
}

export function Header({ weather }: { weather: Weather }) {
  return (
    <div
      className="relative rounded-b-panel border border-white/40 px-4 pb-4 pt-[70px] shadow-panel backdrop-blur-panel"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,.07), rgba(0,0,0,.07)), rgba(255,255,255,.1)",
      }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-white/80">
              <Pin className="text-white/90" />
              <span className="text-base font-medium">{weather.place}</span>
            </div>

            <div className="flex items-end gap-6">
              <span className="text-[80px] font-light leading-none tracking-tight">
                {weather.temp}°
              </span>
              <div className="flex flex-col gap-2 pb-2">
                <span className="text-base font-medium">{weather.description}</span>
                <div className="flex items-center gap-2 text-white/75">
                  <Drop className="text-white/75" />
                  <span className="text-sm font-medium">
                    {weather.rainPct}% chance of rain
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button className="text-white/60" aria-label="Settings">
           <Icon name="settings" size={24} />
          </button>
        </div>

        <div
          className="no-scrollbar -mr-4 flex gap-4 overflow-x-auto pr-12"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, black 0, black calc(100% - 48px), transparent 100%)",
            maskImage:
              "linear-gradient(to right, black 0, black calc(100% - 48px), transparent 100%)",
          }}
        >
          {weather.hours.map((h, i) => (
            <div
              key={h.time}
              className={[
                "flex h-24 w-14 shrink-0 flex-col items-center justify-between rounded-pill px-3 py-2",
                i === 0 ? "bg-tealTint" : "border border-white/30 bg-white/10",
              ].join(" ")}
            >
              <span className="whitespace-nowrap text-xs font-medium">{h.label}</span>
              <HourIcon c={h.condition} />
              <span className="text-xs font-medium">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
