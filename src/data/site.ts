import {
  Compass, Users, Building2, GraduationCap, Handshake, Globe2,
  type LucideIcon,
} from "lucide-react";

export const SANJEEDA_URL = "https://sanjeeda.io";

// TODO(client): replace every value marked "to be confirmed" with the real details.
export const contactInfo = {
  address: "Office address — to be confirmed",
  phone: "Phone — to be confirmed",
  email: "info@conductivity.com.pk",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sanjeeda", href: "/sanjeeda" },
  { label: "Events", href: "/events" },
  { label: "Facilities", href: "/facilities" },
  { label: "Inside Conductivity", href: "/inside-conductivity" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type ServiceGroup = {
  id: string; title: string; blurb: string; icon: LucideIcon; items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "career", title: "Career Services", icon: Compass,
    blurb: "One-to-one support for people at every stage of their career.",
    items: ["Career counselling", "Career management", "Career assessment", "Career planning", "CV / resume development", "Interview preparation", "Professional grooming", "Career transition", "Placement support"],
  },
  {
    id: "hr", title: "HR Consulting", icon: Users,
    blurb: "Practical HR systems that organizations can actually run.",
    items: ["HR audit", "HR policies and processes", "Recruitment / talent acquisition", "Performance management", "Competency development", "Employee development", "HR process improvement"],
  },
  {
    id: "od", title: "Organizational Development", icon: Building2,
    blurb: "Structure, governance and capability for lasting performance.",
    items: ["Organizational assessment", "Organizational development", "Governance", "Workforce planning", "Competency frameworks", "Performance improvement", "Training needs analysis"],
  },
  {
    id: "training", title: "Training & Development", icon: GraduationCap,
    blurb: "Programs that build skills people use on Monday morning.",
    items: ["Professional skills", "Leadership", "Communication", "Career readiness", "Employability", "Management", "Customized corporate training"],
  },
  {
    id: "talent", title: "Talent Solutions", icon: Handshake,
    blurb: "Connecting the right people with the right organizations.",
    items: ["Employer requirement analysis", "Talent identification", "Assessment", "Candidate matching", "Selection support", "Placement"],
  },
  {
    id: "mobility", title: "Mobility Services", icon: Globe2,
    blurb: "Pathways beyond borders for ambitious professionals.",
    items: ["International career opportunities", "Talent mobility", "Career pathways"],
  },
];

export const howWeWork = [
  { step: "Understand", text: "We listen first — to the person, the team and the context." },
  { step: "Assess", text: "Structured assessment turns opinions into evidence." },
  { step: "Develop", text: "Targeted training, coaching and design to close the gaps." },
  { step: "Connect", text: "Bringing people, organizations and opportunities together." },
  { step: "Deliver", text: "Measured outcomes, not just activity." },
];

export const journey = [
  { stage: "Discover", purpose: "Understand the individual", example: "Khudi assessment, personality and career direction" },
  { stage: "Prepare", purpose: "Build professional readiness", example: "3D CV, professional profile and skills" },
  { stage: "Guide", purpose: "Provide human guidance", example: "Mentoring and career counselling" },
  { stage: "Evaluate", purpose: "Understand opportunities", example: "OfferGuide / offer evaluation" },
  { stage: "Connect", purpose: "Move toward opportunities", example: "Jobs, placement and career pathways" },
  { stage: "Grow", purpose: "Continue development", example: "Learning, mentoring and career progression" },
];

export const sanjeedaTools = [
  { name: "Khudi", text: "Assessment for personality and career direction." },
  { name: "3D CV", text: "A professional profile that shows more than a page of text." },
  { name: "Mentoring", text: "Guidance from experienced professionals." },
  { name: "Counselling", text: "Human, confidential career conversations." },
  { name: "OfferGuide", text: "Compare job offers with clarity." },
  { name: "Placement", text: "Pathways into real opportunities." },
];

export const values = [
  { title: "People first", text: "Every outcome starts with a person's potential." },
  { title: "Evidence over opinion", text: "We assess before we advise." },
  { title: "Integrity", text: "Honest guidance, confidential handling." },
  { title: "Connection", text: "Value is created where people and organizations meet." },
  { title: "Continuous growth", text: "Careers and organizations are never finished." },
  { title: "Practicality", text: "Solutions that work in the real world." },
];

export type EventItem = {
  slug: string; name: string; date: string; location: string;
  category: string; description: string; upcoming: boolean;
};

// Sample entries — replace with real events (or wire to a CMS).
export const events: EventItem[] = [
  { slug: "career-readiness-workshop", name: "Career Readiness Workshop", date: "2026-10-18", location: "Conductivity Training Room", category: "Workshop", description: "A hands-on session on CVs, interviews and personal branding for graduating students.", upcoming: true },
  { slug: "hr-leaders-roundtable", name: "HR Leaders Roundtable", date: "2026-11-05", location: "To be confirmed", category: "Corporate session", description: "HR heads discuss performance management and workforce planning in a changing market.", upcoming: true },
  { slug: "future-of-work-webinar", name: "Future of Work Webinar", date: "2026-11-20", location: "Online", category: "Webinar", description: "How AI and digital skills are reshaping employability.", upcoming: true },
  { slug: "university-career-day", name: "University Career Day", date: "2026-06-12", location: "Partner university", category: "University session", description: "Career counselling booths and assessment demos with students.", upcoming: false },
  { slug: "leadership-training-program", name: "Leadership Training Program", date: "2026-04-22", location: "Client site", category: "Training program", description: "A customized leadership program for a mid-sized corporate client.", upcoming: false },
  { slug: "community-career-clinic", name: "Community Career Clinic", date: "2026-02-08", location: "Community center", category: "Community activity", description: "Free one-to-one CV and career guidance for job seekers.", upcoming: false },
];

export const eventCategories = ["Career events", "Workshops", "Seminars", "Corporate sessions", "University sessions", "Training programs", "Webinars", "Conferences", "Community activities"];

export const facilities = [
  { title: "Training Room", text: "Flexible seating for workshops, cohorts and corporate training." },
  { title: "Conference / Meeting Room", text: "Presentation-ready space for client and partner meetings." },
  { title: "Counselling Space", text: "A private, calm room for confidential career conversations." },
  { title: "Assessment & Interview Environment", text: "Set up for structured assessments and mock or live interviews." },
  { title: "Work Area", text: "Collaborative working space for the team and visiting consultants." },
  { title: "Spaces for Hire", text: "Available for corporate sessions, training or events, where applicable." },
];

export const insightCategories = ["Career", "HR", "Organizations", "Future of Work"] as const;

export type Insight = { slug: string; title: string; category: (typeof insightCategories)[number]; excerpt: string; date: string };

// Sample entries — replace with real articles.
export const insights: Insight[] = [
  { slug: "cv-mistakes", title: "Seven CV mistakes that quietly cost you interviews", category: "Career", excerpt: "Small formatting and framing errors that recruiters notice in seconds.", date: "2026-09-10" },
  { slug: "comparing-offers", title: "How to compare two job offers beyond the salary", category: "Career", excerpt: "Growth, culture, benefits and risk — a simple framework.", date: "2026-08-28" },
  { slug: "hr-audit-basics", title: "What an HR audit should actually tell you", category: "HR", excerpt: "From policy gaps to process bottlenecks: what to look for and act on.", date: "2026-08-14" },
  { slug: "structured-hiring", title: "Structured hiring: fewer mis-hires, faster decisions", category: "HR", excerpt: "Requirement analysis and assessment before the first interview.", date: "2026-07-30" },
  { slug: "workforce-planning", title: "Workforce planning for growing organizations", category: "Organizations", excerpt: "Align headcount, skills and strategy over the next 12–24 months.", date: "2026-07-12" },
  { slug: "skills-that-last", title: "The skills that will outlast the next tool", category: "Future of Work", excerpt: "AI is changing tasks quickly; here is what stays valuable.", date: "2026-06-25" },
];

export const openRoles: { title: string; type: string; location: string }[] = [
  // Leave empty when there are no openings; the page shows a general-interest message.
];
