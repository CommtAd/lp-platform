import type { Utm } from "@shared/index";

const KEY = "lp_utm";
const UTM_KEYS: (keyof Utm)[] = [
  "source",
  "medium",
  "campaign",
  "content",
  "term",
];

/** Persist any utm_* params from the current URL into sessionStorage (once). */
export function captureUtmFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const incoming: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) incoming[key] = value;
  }
  if (Object.keys(incoming).length === 0) return;
  try {
    const existing = readUtm();
    sessionStorage.setItem(KEY, JSON.stringify({ ...existing, ...incoming }));
  } catch {
    /* sessionStorage unavailable — ignore */
  }
}

export function readUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utm) : {};
  } catch {
    return {};
  }
}
