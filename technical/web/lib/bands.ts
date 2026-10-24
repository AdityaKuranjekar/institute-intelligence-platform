// Plain-language mastery bands. Raw ability (theta) is never shown to students or parents.
export type Band = "not_enough_data" | "needs_support" | "steady" | "strong";

export const BAND_COLOR: Record<Band, string> = {
  not_enough_data: "#eef1f6",
  needs_support: "#c9daf2",
  steady: "#7fa3d8",
  strong: "#1e4a8a",
};
export const BAND_LABEL: Record<Band, [string, string]> = {
  not_enough_data: ["Not enough data", "पर्याप्त डेटा नहीं"],
  needs_support: ["Building", "सीख रहे हैं"],
  steady: ["Steady", "स्थिर"],
  strong: ["Strong", "मज़बूत"],
};
export const BAND_TONE: Record<Band, "neutral" | "calm" | "brand" | "teal"> = {
  not_enough_data: "neutral",
  needs_support: "calm",
  steady: "brand",
  strong: "teal",
};

/** Same cut-offs the model uses (observed from mastery.json). */
export const bandOf = (theta: number): Band => (theta < -0.3 ? "needs_support" : theta <= 0.5 ? "steady" : "strong");

/** Direction of a 0..1 share-correct series, in words. */
export function trendWord(v: number[]): "up" | "flat" | "down" {
  if (v.length < 2) return "flat";
  const half = Math.floor(v.length / 2);
  const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
  const d = avg(v.slice(-half)) - avg(v.slice(0, half));
  return d > 0.05 ? "up" : d < -0.05 ? "down" : "flat";
}
