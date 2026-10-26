import {
  editorialThemes, employerHref, employerPages, employerSolutions, legalPages, partnerPages, partnerTypes, partnerHref,
  pipelineStages, talentHref, talentOfferings, talentPages,
} from "@/data/blueprint";
import { serviceGroups } from "@/data/site";

// Everything the site search can find, built from the same data the pages use, so new content is searchable automatically.
export type SearchItem = { title: string; text: string; href: string; group: string };

const pages: SearchItem[] = [
  { title: "Home", href: "/", group: "Pages", text: "The Talent Pipeline Company. Talent ready for opportunity, organizations ready for talent." },
  { title: "For Employers", href: "/employers", group: "Pages", text: "Talent pipeline consultation, Talent Pipeline Diagnostic, recruitment, HR advisory, workforce planning, global talent." },
  { title: "Talent Pipeline Diagnostic", href: "/employers#diagnostic", group: "Employer services", text: "Consultant-led review of workforce needs, capability gaps, role clarity, talent availability, retention and priority actions." },
  { title: "Request a Talent Pipeline Consultation", href: "/employers#consultation", group: "Employer services", text: "Inquiry form for employers: talent requirement, positions, timeline." },
  { title: "For Talent", href: "/talent", group: "Pages", text: "Career intelligence, assessments, readiness, mentoring, learning programs, opportunities, career continuity. Candidate engagement journey." },
  { title: "Start Your Career Readiness Journey", href: "/talent#start", group: "Talent services", text: "Register your interest: career stage, education, interests and aspirations." },
  { title: "Talent Readiness Passport", href: "/talent#passport", group: "Talent services", text: "Future capability profile: self-reported details and assessed or verified evidence." },
  { title: "Opportunities", href: "/opportunities", group: "Talent services", text: "Vacancies, projects, internships, placement support, jobs." },
  { title: "Our Model", href: "/our-model", group: "Pages", text: "The Conductivity Talent Pipeline: Understand, Discover, Prepare, Connect, Sustain. Brand positioning, philosophy, manifesto." },
  { title: "Readiness, Opportunities & Success", href: "/our-model#tagline", group: "Pages", text: "Our tagline: Readiness. Opportunities. Success." },
  { title: "Partners", href: "/partners", group: "Pages", text: "Universities, institutions, industry associations, international organizations, mentors. Build a talent partnership." },
  { title: "Become a Partner", href: "/partners/become-a-partner", group: "Partners", text: "Propose a partnership: objective, target group, outcomes, contribution." },
  { title: "Insights", href: "/insights", group: "Pages", text: "Articles, guides and resources on talent intelligence, careers and the future of work. Editorial themes." },
  { title: "About", href: "/about", group: "Pages", text: "Our story, philosophy, mission, vision, leadership and team, values, impact and client stories." },
  { title: "Contact", href: "/contact", group: "Pages", text: "Contact us, email, phone, office address, send a message." },
  { title: "Trust & Responsible Practices", href: "/trust", group: "Pages", text: "Confidentiality, consent, transparency, free and paid services, fairness, integrity, no guaranteed placement, responsible AI, data protection, privacy." },
  { title: "Services", href: "/services", group: "Pages", text: "All services: career services, HR consulting, organizational development, training, talent solutions, mobility." },
  { title: "Events", href: "/events", group: "Pages", text: "Career events, workshops, seminars, webinars, university sessions, training programs." },
  { title: "Careers at Conductivity", href: "/careers", group: "Pages", text: "Work with us, jobs at Conductivity." },
  { title: "Facilities & Spaces", href: "/facilities", group: "Pages", text: "Training room, meeting room, counselling space, assessment environment, spaces for hire." },
  { title: "Sanjeeda", href: "/sanjeeda", group: "Pages", text: "Career readiness platform: Khudi assessment, 3D CV, mentoring, counselling, OfferGuide." },
  { title: "Preferences & Data Requests", href: "/preferences", group: "Pages", text: "Unsubscribe, change communication preferences, copy, correct or delete my data, privacy." },
];

export const searchIndex: SearchItem[] = [
  ...pages,
  ...employerPages.map((p) => ({ title: p.title, href: `/employers/${p.slug}`, group: "Employer services", text: `${p.headline} ${p.description} ${p.questions.join(" ")}` })),
  ...employerSolutions.map((s) => ({ title: s.title, href: employerHref(s.id), group: "Employer services", text: `${s.concern} ${s.services}` })),
  ...talentPages.map((p) => ({ title: p.title, href: `/talent/${p.slug}`, group: "Talent services", text: `${p.headline} ${p.description} ${p.questions.join(" ")}` })),
  ...talentOfferings.map((o) => ({ title: o.title, href: talentHref(o.id), group: "Talent services", text: `${o.need} ${o.deliverable}` })),
  ...partnerPages.map((p) => ({ title: p.title, href: `/partners/${p.slug}`, group: "Partners", text: `${p.headline} ${p.description} ${p.who.join(" ")}` })),
  ...partnerTypes.map((p) => ({ title: p.title, href: partnerHref(p.id), group: "Partners", text: p.text })),
  ...pipelineStages.map((s) => ({ title: `${s.name}: ${s.purpose}`, href: "/our-model", group: "Our Model", text: `${s.summary} ${s.client} ${s.candidate}` })),
  ...serviceGroups.map((g) => ({ title: g.title, href: "/services", group: "Services", text: `${g.blurb} ${g.items.join(", ")}` })),
  ...editorialThemes.map((t) => ({ title: `Theme ${t.letter}: ${t.title}`, href: "/insights#themes", group: "Insights", text: `${t.audience} ${t.topics.join(" ")}` })),
  ...legalPages.map((p) => ({ title: p.title, href: `/legal/${p.slug}`, group: "Legal", text: "Policy, privacy, terms, cookies, accessibility, candidate data, consent." })),
];

/** Find items containing every word typed; title matches rank first. `extra` adds items loaded at runtime (CMS articles). */
export function search(query: string, limit = 12, extra: SearchItem[] = []): SearchItem[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return [];
  const seen = new Set<string>();
  return [...searchIndex, ...extra]
    .map((item) => {
      const title = item.title.toLowerCase();
      const all = `${title} ${item.text.toLowerCase()}`;
      if (!words.every((w) => all.includes(w))) return null;
      const score = words.reduce((s, w) => s + (title.startsWith(w) ? 5 : title.includes(w) ? 3 : 1), 0);
      return { item, score };
    })
    .filter((r): r is { item: SearchItem; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .filter(({ item }) => (seen.has(item.href + item.title) ? false : (seen.add(item.href + item.title), true)))
    .slice(0, limit)
    .map((r) => r.item);
}
