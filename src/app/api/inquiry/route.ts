import { NextResponse } from "next/server";
import { buildLead, sendToCrm, type Audience } from "@/lib/crm";
import { notify } from "@/lib/notify";

const audiences: Audience[] = ["employer", "talent", "partner", "newsletter", "contact", "preferences"];
const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "referrer", "landing", "contentAssisted"];

// Single entry point for every website form (blueprint §13.4): validates, categorizes, routes,
// forwards to the CRM and sends the confirmation and team alert emails.
export async function POST(req: Request) {
  let body: { audience?: string; source?: string; fields?: Record<string, unknown>; campaign?: Record<string, unknown> };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }

  const audience = body.audience as Audience;
  if (!audiences.includes(audience)) return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });

  // Keep only short text values; drop anything else.
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields ?? {})) {
    if (typeof v === "string" && k.length <= 40) fields[k] = v.slice(0, 4000);
  }
  const campaign: Record<string, string> = {};
  for (const k of campaignKeys) {
    const v = body.campaign?.[k];
    if (typeof v === "string" && v) campaign[k] = v.slice(0, 200);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "")) return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  if (!["newsletter", "preferences"].includes(audience) && fields.consent !== "on") return NextResponse.json({ ok: false, error: "Consent is required" }, { status: 400 });

  const lead = buildLead(audience, body.source ?? "", fields, campaign);
  const [delivered, emailed] = await Promise.all([
    sendToCrm(lead).catch(() => false),
    notify(lead),
  ]);
  // Log only routing details, never the person's details.
  console.info(`[inquiry] ${lead.reference} ${lead.audience} → ${lead.department} (${lead.owner}); crm=${delivered} confirmation=${emailed.confirmation} team=${emailed.team}`);

  return NextResponse.json({ ok: true, reference: lead.reference, delivered });
}
