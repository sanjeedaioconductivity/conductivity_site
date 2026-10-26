// Website measurement (blueprint §17.3). Events go to Google Analytics 4 when it is enabled
// (NEXT_PUBLIC_GA_ID set and the visitor accepted analytics cookies); otherwise they are dropped.

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

export const CONSENT_KEY = "cnd-analytics-consent"; // "granted" | "denied"

/** Which audience a page belongs to, for "engagement with employer and talent pages" and conversion by audience. */
export function contentGroup(path: string): string {
  if (path.startsWith("/employers")) return "Employers";
  if (path.startsWith("/talent") || path.startsWith("/opportunities")) return "Talent";
  if (path.startsWith("/partners")) return "Partners";
  if (path.startsWith("/insights")) return "Insights";
  if (path === "/") return "Home";
  return "Company";
}

/** Send one analytics event. Safe to call anywhere; does nothing until analytics is enabled. */
export function track(event: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
