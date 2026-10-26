// CRM data model and lead routing (blueprint §13). The website sends every form submission through
// buildLead() so each lead arrives in the CRM already categorized, routed and de-duplicable.

// §13.1 Employer pipeline stages, in order.
export const employerStages = [
  "Visitor", "Inquiry", "Qualified Lead", "Discovery", "Proposal", "Client", "Active Requirement", "Delivery", "Repeat Business",
] as const;

// §13.2 Talent pipeline stages, in order.
export const talentStages = [
  "Visitor", 
  "Registered Interest", 
  "Initial Profile", 
  "Assessment/Readiness", 
  "Development", 
  "Opportunity Consideration", 
  "Deployment", 
  "Continued Engagement",
] as const;

// §13.2 Talent status: registrants are never assumed to be verified or deployable.
export const talentStatuses = [
  "Exploring careers", 
  "Developing readiness", 
  "Available for opportunities", 
  "Actively training", 
  "Placed or deployed", 
  "Alumni community",
] as const;

// §13.3 Records the CRM should hold, and what each is for.
export const crmRecords = [
  { record: "Employer / Organization", purpose: "Manage organizational relationships and demand" },
  { record: "Employer Contact", purpose: "Manage decision-makers and inquiries" },
  { record: "Talent Profile", purpose: "Manage consented candidate information (restricted access)" },
  { record: "Talent Requirement", purpose: "Define actual employer needs" },
  { record: "Opportunity", purpose: "Publish and manage available roles" },
  { record: "Readiness Activity", purpose: "Track development, assessment or mentoring" },
  { record: "Program", purpose: "Manage training and cohorts" },
  { record: "Partnership", purpose: "Manage institutional and channel relationships" },
  { record: "Case Study", purpose: "Demonstrate verified results" },
  { record: "Content Resource", purpose: "Publish categorized knowledge" },
  { record: "Interaction", purpose: "Maintain authorized relationship history" },
] as const;

export type Audience = "employer" | "talent" | "partner" | "newsletter" | "contact" | "preferences";

// §13.4 Route each audience to the department that owns it, the CRM record it creates and its first stage.
// Owners and team inboxes are set per environment (e.g. CRM_OWNER_EMPLOYER, NOTIFY_EMPLOYER) so they change without code edits.
export const routing: Record<Audience, { department: string; record: string; stage: string; key: string }> = {
  employer: { department: "Business Development", record: "Employer Contact", stage: "Inquiry", key: "EMPLOYER" },
  talent: { department: "Talent Operations", record: "Talent Profile", stage: "Registered Interest", key: "TALENT" },
  partner: { department: "Partnerships", record: "Partnership", stage: "Inquiry", key: "PARTNER" },
  newsletter: { department: "Marketing", record: "Interaction", stage: "Subscriber", key: "MARKETING" },
  contact: { department: "Marketing", record: "Interaction", stage: "Inquiry", key: "MARKETING" },
  preferences: { department: "Data Protection", record: "Interaction", stage: "Privacy request", key: "PRIVACY" },
};

// §13.3 Which form fields belong to which CRM record, per audience. The CRM receives them already split.
const recordFields: Record<Audience, Record<string, string[]>> = {
  employer: {
    "Employer / Organization": ["organization", "industry", "country"],
    "Employer Contact": ["name", "designation", "email", "phone"],
    "Talent Requirement": ["interest", "requirement", "scale", "timeline", "context"],
  },
  talent: {
    // Restricted: consented candidate information, never shared with employers without permission and lawful basis.
    "Talent Profile": ["name", "email", "phone", "stage", "education", "support", "interests", "aspirations", "updates"],
  },
  partner: {
    "Partnership": ["organization", "type", "objective", "target", "outcomes", "contribution"],
    "Employer Contact": ["name", "email"],
  },
  newsletter: { "Interaction": ["email", "segment"] },
  contact: { "Interaction": ["name", "email", "phone", "org", "service", "message"] },
  preferences: { "Interaction": ["email", "request", "segments", "details"] },
};

export type Lead = {
  reference: string; audience: Audience; department: string; record: string; stage: string; owner: string;
  source: string; campaign: Record<string, string>; email: string;
  dedupeKey: string; organizationKey: string;
  sensitivity: "restricted" | "standard"; marketingConsent: boolean; receivedAt: string;
  alsoNotify?: string; // a second team that should see the lead (§19 ownership)
  records: Record<string, Record<string, string>>;
};

// §19: Learning & Career Development owns assessments, programs and mentoring, so talent leads asking for those also go to them.
const learningSupport = ["Assessments & profiling", "Readiness & development", "Mentorship"];

// Free email providers: their domains say nothing about the organization, so they are not used to match companies.
const freeMail = /^(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton|protonmail|ymail)\./;

/** Normalize a form submission into a routed, categorized lead split into CRM records (§13.3–13.4). */
export function buildLead(audience: Audience, source: string, fields: Record<string, string>, campaign: Record<string, string> = {}): Lead {
  const r = routing[audience];
  const email = (fields.email ?? "").trim().toLowerCase();
  const domain = email.split("@")[1] ?? "";
  const records: Record<string, Record<string, string>> = {};
  for (const [record, keys] of Object.entries(recordFields[audience])) {
    records[record] = Object.fromEntries(keys.filter((k) => fields[k]).map((k) => [k, fields[k]]));
  }
  return {
    reference: `CND-${Date.now().toString(36).toUpperCase()}`,
    audience, department: r.department, record: r.record, stage: r.stage,
    owner: process.env[`CRM_OWNER_${r.key}`] ?? "Unassigned",
    source: source.slice(0, 200),
    campaign,
    email,
    dedupeKey: email, // the CRM merges people that share this key
    organizationKey: audience === "employer" || audience === "partner" ? (freeMail.test(domain) ? "" : domain) : "", // and companies that share this
    sensitivity: audience === "talent" ? "restricted" : "standard",
    marketingConsent: fields.updates === "on" || audience === "newsletter",
    receivedAt: new Date().toISOString(),
    alsoNotify: audience === "talent" && learningSupport.includes(fields.support ?? "") ? "Learning & Career Development" : undefined,
    records,
  };
}

/** Forward a lead to the CRM webhook when one is configured (CRM_WEBHOOK_URL). Returns whether it was delivered. */
export async function sendToCrm(lead: Lead): Promise<boolean> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
  return res.ok;
}
