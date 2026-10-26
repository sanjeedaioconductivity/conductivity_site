import { routing, type Lead } from "@/lib/crm";
import { SITE_URL } from "@/data/seo";

// Submission emails (blueprint §13.4): a confirmation to the visitor and an alert to the owning team.
// Sent through Resend (https://resend.com) when RESEND_API_KEY is set; otherwise nothing is sent.
// Team inboxes: NOTIFY_EMPLOYER, NOTIFY_TALENT, NOTIFY_PARTNER, NOTIFY_MARKETING, NOTIFY_PRIVACY, NOTIFY_LEARNING, falling back to NOTIFY_DEFAULT.

const confirmations: Record<Lead["audience"], { subject: string; body: string }> = {
  employer: { subject: "We've received your talent requirement", body: "Thank you for contacting Conductivity. A member of our business development team will contact you to arrange a discovery conversation." },
  talent: { subject: "Welcome to Conductivity", body: "Thank you for registering your interest. We'll review what you shared and suggest a sensible next step. Registering does not guarantee employment; it starts a conversation about your readiness." },
  partner: { subject: "We've received your partnership idea", body: "Thank you. Our team will review the objective you described and propose an initial meeting." },
  newsletter: { subject: "You're subscribed to Conductivity insights", body: "Thank you for subscribing. You can change what you receive, or unsubscribe, at any time." },
  contact: { subject: "We've received your message", body: "Thank you for contacting Conductivity. We'll be in touch soon." },
  preferences: { subject: "We've received your request", body: "Thank you. We'll action your communication or data request and confirm when it is done." },
};

async function send(to: string, subject: string, text: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.NOTIFY_FROM ?? "Conductivity <onboarding@resend.dev>", to, subject, text }),
  });
  return res.ok;
}

/** Email the visitor a confirmation and the owning team an alert. Returns which were sent. */
export async function notify(lead: Lead): Promise<{ confirmation: boolean; team: boolean }> {
  const c = confirmations[lead.audience];
  const footer = `\n\nYour reference: ${lead.reference}\nManage your communication preferences: ${SITE_URL}/preferences`;
  const teamInbox = process.env[`NOTIFY_${routing[lead.audience].key}`] ?? process.env.NOTIFY_DEFAULT ?? "";
  const details = Object.entries(lead.records)
    .map(([record, f]) => `${record}\n${Object.entries(f).map(([k, v]) => `  ${k}: ${v}`).join("\n")}`).join("\n\n");
  const alert = `New ${lead.audience} submission for ${lead.department}\nReference: ${lead.reference}\nOwner: ${lead.owner}\nPage: ${lead.source}\n` +
    (Object.keys(lead.campaign).length ? `Campaign: ${Object.entries(lead.campaign).map(([k, v]) => `${k}=${v}`).join(", ")}\n` : "") +
    (lead.sensitivity === "restricted" ? "RESTRICTED: candidate information. Do not forward outside Talent Operations and Learning & Career Development.\n" : "") +
    `\n${details}`;
  const [confirmation, team] = await Promise.all([
    send(lead.email, c.subject, `${c.body}${footer}`).catch(() => false),
    send(teamInbox, `[${lead.department}] ${lead.reference}: new ${lead.audience} submission`, alert).catch(() => false),
  ]);
  // Second team (§19), e.g. Learning & Career Development for assessment, program or mentoring requests.
  const learningInbox = process.env.NOTIFY_LEARNING ?? "";
  if (lead.alsoNotify && learningInbox && learningInbox !== teamInbox) {
    await send(learningInbox, `[${lead.alsoNotify}] ${lead.reference}: talent request for assessment, program or mentoring`, alert).catch(() => false);
  }
  return { confirmation, team };
}
