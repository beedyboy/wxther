export type Condition =
  | "clear"
  | "part-cloud"
  | "cloud"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export type Hour = {
  time: string;
  label: string;
  temp: number;
  condition: Condition;
};

export type Weather = {
  place: string;
  lat: number;
  lon: number;
  temp: number;
  condition: Condition;
  description: string;
  rainPct: number;
  windKmh: number;
  hours: Hour[];
};

export type Category = "shoes" | "commute" | "music" | "deal" | "info";

export type Action = { label: string; intent: string };

type Base = {
  id: string;
  category: Category;
  title: string;
  body: string;
};

export type Card =
  | (Base & { layout: "single"; primary: Action })
  | (Base & { layout: "double"; primary: Action; secondary: Action })
  | (Base & { layout: "ack"; primary: Action });
