"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const CAMPAIGN_KEY = "cnd-campaign";

function read(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(CAMPAIGN_KEY) ?? "{}"); } catch { return {}; }
}
function write(data: Record<string, string>) {
  try { sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(data)); } catch { /* storage blocked: reporting loses the source for this visit */ }
}

/**
 * Remembers how a visitor first arrived (UTM tags, referrer, landing page) for lead-source reporting (blueprint §13.4),
 * and whether they read Insights content before enquiring, for "content-assisted inquiries" (§17.3).
 */
export default function CampaignTracker() {
  const path = usePathname();

  useEffect(() => {
    const data = read();
    if (!data.landing) {
      const params = new URLSearchParams(window.location.search);
      data.landing = window.location.pathname;
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        const v = params.get(k);
        if (v) data[k] = v;
      }
      if (document.referrer && !document.referrer.startsWith(window.location.origin)) data.referrer = new URL(document.referrer).hostname;
    }
    if (path.startsWith("/insights")) data.contentAssisted = "yes";
    write(data);
  }, [path]);

  return null;
}
