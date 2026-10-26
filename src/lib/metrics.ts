// Measurement plan (blueprint §17): every KPI, how it is counted and where the number comes from.
// "Analytics" = Google Analytics 4 events sent by the website (src/lib/analytics.ts, src/components/Analytics.tsx).
// "CRM" = stages and fields on records created by /api/inquiry (src/lib/crm.ts). "Email" = the newsletter service.

export type Kpi = { kpi: string; measures: string; howCounted: string; source: "Analytics" | "CRM" | "Email" | "Analytics + CRM" };

// §17.1 Employer acquisition.
export const employerKpis: Kpi[] = [
  { kpi: "Qualified employer inquiries", measures: "Quality of B2B lead generation", howCounted: "Employer leads moved from Inquiry to Qualified Lead", source: "CRM" },
  { kpi: "Consultation bookings", measures: "Visitor-to-conversation conversion", howCounted: "Employer leads reaching Discovery ÷ employer page visitors", source: "Analytics + CRM" },
  { kpi: "Proposal opportunities", measures: "Commercial pipeline created", howCounted: "Employer records reaching Proposal", source: "CRM" },
  { kpi: "Proposal-to-client conversion", measures: "Sales effectiveness", howCounted: "Records reaching Client ÷ records reaching Proposal", source: "CRM" },
  { kpi: "Cost per qualified lead", measures: "Marketing efficiency", howCounted: "Campaign spend ÷ qualified leads with that utm_source", source: "Analytics + CRM" },
  { kpi: "Repeat employer requirements", measures: "Relationship continuity", howCounted: "Organizations with more than one Active Requirement (matched on organization key)", source: "CRM" },
];

// §17.2 Talent development.
export const talentKpis: Kpi[] = [
  { kpi: "Relevant talent registrations", measures: "Growth of the talent community", howCounted: "generate_lead events with audience = talent; Talent Profiles at Registered Interest", source: "Analytics + CRM" },
  { kpi: "Completed professional profiles", measures: "Quality of talent data", howCounted: "Talent Profiles reaching Initial Profile", source: "CRM" },
  { kpi: "Readiness assessments completed", measures: "Meaningful engagement", howCounted: "Readiness Activities of type assessment", source: "CRM" },
  { kpi: "Training and mentoring participation", measures: "Capability-building activity", howCounted: "Readiness Activities of type training or mentoring; Program enrolments", source: "CRM" },
  { kpi: "Verified readiness milestones", measures: "Evidence of capability growth", howCounted: "Readiness Activities marked verified", source: "CRM" },
  { kpi: "Interviews and deployments", measures: "Opportunity connections", howCounted: "Talent Profiles reaching Opportunity Consideration and Deployment", source: "CRM" },
  { kpi: "Post-placement outcomes", measures: "Longer-term talent continuity", howCounted: "Profiles in Continued Engagement; follow-up at 3, 6 and 12 months", source: "CRM" },
];

// §17.3 Website and marketing.
export const websiteKpis: Kpi[] = [
  { kpi: "Relevant organic search traffic", measures: "Discoverability", howCounted: "Organic sessions to employer and talent pages (Search Console + GA4)", source: "Analytics" },
  { kpi: "Engagement with employer and talent pages", measures: "Content relevance", howCounted: "page_view by content_group (Employers, Talent, Partners, Insights)", source: "Analytics" },
  { kpi: "Conversion rate by audience", measures: "Journey effectiveness", howCounted: "generate_lead ÷ sessions, split by audience", source: "Analytics" },
  { kpi: "Form completion rates", measures: "Form usability", howCounted: "generate_lead ÷ form_start, per audience", source: "Analytics" },
  { kpi: "Newsletter engagement", measures: "Audience relationship", howCounted: "Opens and clicks per segment", source: "Email" },
  { kpi: "Content-assisted inquiries", measures: "Value of Insights content", howCounted: "Leads with contentAssisted = yes (read Insights before enquiring)", source: "Analytics + CRM" },
  { kpi: "Channel-to-qualified-lead performance", measures: "Marketing channel quality", howCounted: "Qualified leads by utm_source / referrer", source: "Analytics + CRM" },
  { kpi: "Returning relevant visitors", measures: "Ongoing interest", howCounted: "Returning users on employer and talent pages", source: "Analytics" },
  { kpi: "Program inquiry conversions", measures: "Program demand", howCounted: "Talent leads whose support = Readiness & development, or from /talent/readiness", source: "Analytics + CRM" },
];
