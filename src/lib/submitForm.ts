import type { Audience } from "@/lib/crm";
import { CAMPAIGN_KEY } from "@/components/CampaignTracker";
import { contentGroup, track } from "@/lib/analytics";

export type SubmitResult = { ok: true; reference: string } | { ok: false; error: string };

function readCampaign(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(CAMPAIGN_KEY) ?? "{}"); } catch { return {}; }
}

/** Send a website form to /api/inquiry, tagged with its audience, the page it came from and the visit's campaign source (blueprint §13.4). */
export async function submitForm(audience: Audience, form: HTMLFormElement, extra: Record<string, string> = {}): Promise<SubmitResult> {
  const fields: Record<string, string> = { ...extra };
  new FormData(form).forEach((v, k) => {
    if (typeof v !== "string") return;
    fields[k] = fields[k] ? `${fields[k]}, ${v}` : v; // checkbox groups arrive as one comma-separated value
  });
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audience, source: window.location.pathname, fields, campaign: readCampaign() }),
    });
    const data = await res.json();
    if (data.ok) {
      // Conversion by audience, page and channel (blueprint §17.3).
      const c = readCampaign();
      track("generate_lead", { audience, content_group: contentGroup(window.location.pathname), source: c.utm_source ?? c.referrer ?? "direct", content_assisted: c.contentAssisted === "yes" });
    }
    return data.ok ? { ok: true, reference: data.reference } : { ok: false, error: data.error ?? "Something went wrong" };
  } catch {
    return { ok: false, error: "We couldn't send this. Please check your connection and try again." };
  }
}
