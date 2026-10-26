import {
  Search, Compass, Sprout, Handshake, RefreshCw, Target, Users, Building2, Globe2,
  GraduationCap, BarChart3, ClipboardCheck, FileText, MessagesSquare, BookOpen, Briefcase,
  Repeat, Landmark, Factory, Lightbulb, type LucideIcon,
} from "lucide-react";

// Content from the "Website Strategy & Development Blueprint" (v1.0, Oct 2026).
// Section numbers in comments refer to that document.

export const tagline = "Readiness. Opportunities. Success.";
export const category = "The Talent Pipeline Company";

// Brand positioning (§1.2).
export const brand = {
  philosophy: "A True Talent Company",
  positioning: "Conductivity builds and sustains talent pipelines by connecting organizational talent needs with individual career readiness, professional capability, and meaningful opportunities.",
  promise: "We help organizations find and develop the talent they need, while helping people become the talent organizations need.",
};

// Target markets and visitor segmentation (§4). Each audience lists who it is and the actions we want them to take.
export type Audience = {
  id: "employers" | "talent" | "partners"; label: string; priority: "Primary" | "Secondary"; headline: string;
  segments: string[]; conversions: { label: string; href: string }[]; href: string; cta: string;
};
export const audiences: Audience[] = [
  { id: "employers", label: "Employers & organizations", priority: "Primary", headline: "I need talent or stronger people systems",
    segments: [
      "CEOs, founders and business owners", "CHROs, HR directors and HR business partners", "Talent acquisition and learning leaders",
      "Business and functional heads", "International organizations seeking Pakistani talent", "Professional services firms requiring workforce capacity",
      "Organizations seeking HR transformation or workforce advisory",
    ],
    conversions: [
      { label: "Start a business conversation", href: "/employers#consultation" },
      { label: "Share a talent requirement", href: "/employers/recruitment" },
      { label: "Request a consultation", href: "/employers#diagnostic" },
      { label: "Propose an engagement", href: "/employers/talent-pipelines" },
    ],
    href: "/employers", cta: "Explore employer solutions" },
  { id: "talent", label: "Individuals & professionals", priority: "Primary", headline: "I want to build my career",
    segments: [
      "School and college students exploring careers", "University students and fresh graduates", "Early-career professionals",
      "Experienced professionals seeking progression or transition", "Professionals seeking international work opportunities",
      "People requiring career counselling, readiness or mentoring",
    ],
    conversions: [
      { label: "Register your talent", href: "/talent#start" },
      { label: "Discover your career direction", href: "/talent/career-intelligence" },
      { label: "Join a readiness program", href: "/talent/readiness" },
      { label: "Ask about counselling", href: "/talent/career-intelligence" },
      { label: "Apply to an opportunity", href: "/opportunities" },
    ],
    href: "/talent", cta: "Explore talent solutions" },
  { id: "partners", label: "Institutions & partners", priority: "Secondary", headline: "I want to develop talent together",
    segments: [
      "Universities", "Training institutions", "Professional bodies", "International recruitment partners",
      "Industry associations", "Mentors", "Organizations developing sector-specific talent",
    ],
    conversions: [
      { label: "Send a partnership inquiry", href: "/partners#partner-form" },
      { label: "Request an institutional meeting", href: "/partners/institutions" },
      { label: "Start a talent development initiative", href: "/partners/industry" },
      { label: "Propose a joint program", href: "/partners/become-a-partner" },
    ],
    href: "/partners", cta: "Explore partnerships" },
];

// One company, two sides of talent (§2).
export const talentSides = {
  client: {
    label: "Client-side talent management",
    audience: "Organizations that employ, manage, develop or require talent.",
    questions: [
      "What talent do we need to deliver our business strategy?",
      "What competencies should different positions possess?",
      "How can we identify suitable candidates?",
      "How can we create reliable talent supply?",
      "How do we develop and retain existing employees?",
      "How do we strengthen our HR systems and workforce effectiveness?",
      "How can we access Pakistani talent for international assignments?",
    ],
    responses: ["Workforce intelligence", "Organization development", "Talent acquisition", "HR advisory", "Training", "Mobility solutions"],
    href: "/employers",
  },
  candidate: {
    label: "Candidate-side talent management",
    audience: "Individuals preparing for, entering, navigating or progressing through their careers.",
    questions: [
      "Who am I professionally?",
      "What careers suit my capabilities and aspirations?",
      "What does the market expect from me?",
      "What skills or competencies am I missing?",
      "How can I demonstrate my potential and competence?",
      "How can I access meaningful work opportunities?",
      "How do I remain professionally relevant?",
    ],
    responses: ["Career intelligence", "Counselling", "Assessments", "Mentoring", "Professional development", "Readiness programs", "Access to opportunities"],
    href: "/talent",
  },
};
// §2.3: where both sides connect, and the longer relationship around a hire.
export const connectionPoint = {
  employer: "Employer demand & capability requirements",
  core: "Talent intelligence, readiness & alignment",
  individual: "Individual potential, competencies & aspirations",
};
export const connectedJourney = ["Opportunity matching", "Deployment", "Development", "Talent continuity"];

// The idea behind the website (§1.1).
export const talentVerbs = ["Understands", "Develops", "Connects", "Deploys", "Sustains"];
export const singleStageProviders = [
  { who: "Recruitment businesses", does: "identify and place people" },
  { who: "HR consultants", does: "strengthen organizational systems" },
  { who: "Training institutions", does: "build knowledge and skills" },
  { who: "Career counsellors", does: "advise individuals" },
  { who: "Employment platforms", does: "advertise opportunities" },
  { who: "Mobility providers", does: "facilitate access to international work" },
];

// The two permanent calls to action (§5.1).
export const ctas = {
  employer: { label: "Build a Talent Pipeline", href: "/employers#consultation" },
  talent: { label: "Explore Your Career", href: "/talent#start" },
  partner: { label: "Build a Talent Partnership", href: "/partners#partner-form" },
};

export type Stage = { name: string; purpose: string; icon: LucideIcon; summary: string; client: string; candidate: string };

// The five-stage model, shown as a continuous cycle (§3).
export const pipelineStages: Stage[] = [
  { name: "Understand", purpose: "Develop talent intelligence", icon: Search,
    summary: "Know what the work demands and what each person brings.",
    client: "Workforce planning, job analysis, capability and skill requirements",
    candidate: "Career intelligence; strengths, interests, personality and capability analysis" },
  { name: "Discover", purpose: "Identify talent supply and demand", icon: Compass,
    summary: "Map where the talent is and where the opportunities are.",
    client: "Talent sourcing, market mapping, succession pools",
    candidate: "Career exploration, talent registration, competency profiles" },
  { name: "Prepare", purpose: "Build talent readiness", icon: Sprout,
    summary: "Close the gap between potential and workplace capability.",
    client: "Employer requirements, training needs, role-specific expectations",
    candidate: "Mentoring, training, assessment, portfolio and professional preparation" },
  { name: "Connect", purpose: "Create meaningful opportunities", icon: Handshake,
    summary: "Match ready people with real roles, projects and placements.",
    client: "Candidate selection, deployment, onboarding, international talent access",
    candidate: "Employment opportunities, projects, placements and career transitions" },
  { name: "Sustain", purpose: "Deliver long-term value", icon: RefreshCw,
    summary: "Keep people growing and organizations performing after the hire.",
    client: "Engagement, performance, retention, succession and HR maturity",
    candidate: "Career progression, continuing development, re-engagement and alumni relationships" },
];

// Readiness / Opportunities / Success (§1.2).
export const triad = [
  { title: "Readiness", text: "Developing capabilities and organizational preparedness", detail: "Career intelligence, assessments, skills and systems" },
  { title: "Opportunities", text: "Creating meaningful connections between talent and demand", detail: "Recruitment, placement, projects and mobility" },
  { title: "Success", text: "Delivering sustainable value for individuals and organizations", detail: "Performance, growth, retention and talent continuity" },
];

// Effectiveness / Efficiency / Sustainability (§3).
export const outcomes = [
  { title: "Effectiveness", text: "Are organizations receiving the capabilities they need, and are people entering roles suited to their abilities?" },
  { title: "Efficiency", text: "Is the talent process reducing unnecessary hiring time, mismatches, development gaps and avoidable costs?" },
  { title: "Sustainability", text: "Are individuals and organizations growing in ways that strengthen future employability, performance, retention and capability?" },
];

// Homepage section 4 (§6).
export const solutions: { title: string; text: string; audience: string; href: string; icon: LucideIcon }[] = [
  { title: "Talent Intelligence & Workforce Planning", icon: BarChart3, audience: "Employers", href: "/employers/talent-pipelines",
    text: "Define the capabilities your strategy needs before you start hiring." },
  { title: "Talent Identification & Recruitment", icon: Users, audience: "Employers", href: "/employers/recruitment",
    text: "Sourcing, screening and selection built on clear role requirements." },
  { title: "Career Intelligence & Professional Assessments", icon: Compass, audience: "Individuals", href: "/talent/career-intelligence",
    text: "Understand your strengths, interests and the careers that suit them." },
  { title: "Talent Readiness & Capability Development", icon: GraduationCap, audience: "Individuals & employers", href: "/talent/readiness",
    text: "Training, mentoring and preparation that turn potential into capability." },
  { title: "Global Talent Access & Mobility", icon: Globe2, audience: "Employers & professionals", href: "/employers/global-talent",
    text: "Connecting Pakistani talent with international work and clients." },
  { title: "HR, Organization Development & Talent Continuity", icon: Building2, audience: "Employers", href: "/employers/hr-advisory",
    text: "HR systems, structure and retention so people perform and stay." },
];

// Homepage section 5 (§6).
export const readinessSteps = ["Career discovery", "Assessment", "Skill development", "Mentoring", "Evidence of capability", "Opportunity readiness"];

// Homepage section 6 (§6).
export const differentiators = [
  { title: "Dual perspective", text: "We understand employer expectations and individual aspirations." },
  { title: "Capability before placement", text: "We invest in readiness, not merely sourcing." },
  { title: "Organizational understanding", text: "HR and OD capabilities help us understand the conditions in which people perform." },
  { title: "Continuity beyond hiring", text: "We recognize development, engagement and retention as part of sustainable talent value." },
];

// Homepage section 7 (§6). Only show a pathway as operational once management confirms it is active.
export const pathways: { title: string; active: boolean }[] = [
  { title: "Finance, Accounting & Professional Services", active: false },
  { title: "Human Resources & Business Operations", active: false },
  { title: "Technology, Data & Digital Work", active: false },
  { title: "Leadership & Management", active: false },
  { title: "International and Remote Professional Services", active: false },
];

// Homepage section 8 (§6). Slots stay empty until each item has approval and evidence.
export const evidenceTypes = [
  "Real client projects", "Documented talent readiness achievements", "Training and development outcomes",
  "Successful talent deployments", "Employer feedback", "Participant career progression stories",
  "Approved client and institutional partnerships",
];

// Employer landing page (§7.1).
export const employerSolutions: { id: string; title: string; concern: string; services: string; icon: LucideIcon }[] = [
  { id: "talent-intelligence", title: "Talent Intelligence", icon: BarChart3, concern: "What capabilities do we need?", services: "Workforce planning, skills analysis, talent mapping, role requirements" },
  { id: "talent-acquisition", title: "Talent Acquisition", icon: Users, concern: "How do we access the right people?", services: "Sourcing, screening, selection support, recruitment pipelines" },
  { id: "talent-development", title: "Talent Development", icon: GraduationCap, concern: "How do we improve workforce capability?", services: "Training, assessments, mentoring, leadership development" },
  { id: "hr-od-advisory", title: "HR & OD Advisory", icon: Building2, concern: "How do we make people effective?", services: "Organization design, job analysis, HR processes, policies, performance systems, culture" },
  { id: "global-talent", title: "Global Talent Services", icon: Globe2, concern: "How do we access talent internationally?", services: "Cross-border sourcing, remote talent arrangements, EOR and mobility where available" },
  { id: "talent-continuity", title: "Talent Continuity", icon: Repeat, concern: "How do we sustain results?", services: "Engagement, retention approaches, succession planning, workforce development" },
];

// Employer sub-pages from the sitemap (§5.2 B). `solutions` refers to employerSolutions ids; `stages` to pipelineStages indexes.
// Client questions come from §2.1, related topics from §11.1 / §11.3.
export type EmployerPage = {
  slug: string; title: string; headline: string; intro: string; description: string;
  questions: string[]; solutions: string[]; stages: number[]; topics: string[]; cta: string; interest: string; diagnostic?: boolean;
};

export const employerPages: EmployerPage[] = [
  { slug: "talent-pipelines", title: "Talent Pipeline Development",
    headline: "Build the Talent Supply Your Strategy Depends On",
    intro: "Most hiring starts when a seat is empty. A talent pipeline starts earlier — with a clear view of the capabilities your business will need, where that talent will come from, and how it is developed and kept.",
    description: "Talent pipeline development in Pakistan: workforce planning, talent mapping, succession and retention, starting with the Talent Pipeline Diagnostic.",
    questions: ["What talent do we need to deliver our business strategy?", "What competencies should different positions possess?", "How can we create reliable talent supply?"],
    solutions: ["talent-intelligence", "talent-continuity"], stages: [0, 1, 2, 3, 4], diagnostic: true,
    topics: ["Why recruitment alone cannot solve talent shortages", "Workforce planning for growing businesses", "Building talent pipelines for professional services"],
    cta: "Request a Talent Pipeline Diagnostic", interest: "Talent Pipeline Diagnostic" },
  { slug: "recruitment", title: "Talent Identification & Recruitment",
    headline: "Hire Against Clear Requirements, Not Just a Job Title",
    intro: "We start by understanding the capability a role really needs, then source, screen and support selection against it — so hiring decisions rest on evidence, not only on CVs.",
    description: "Recruitment and talent acquisition services: role requirements, sourcing, screening and selection support built into a recruitment pipeline.",
    questions: ["How can we identify suitable candidates?", "What competencies should different positions possess?", "How do we access the right people?"],
    solutions: ["talent-acquisition"], stages: [0, 1, 3],
    topics: ["Why Recruitment Is Not a Talent Strategy", "Why job descriptions are insufficient without competency clarity", "What successful onboarding teaches about recruitment"],
    cta: "Discuss a Hiring Requirement", interest: "Recruitment / talent acquisition" },
  { slug: "hr-advisory", title: "Workforce & HR Advisory",
    headline: "Make Your Organization a Place Where People Can Perform",
    intro: "Capable people underperform in unclear structures. Our HR and organization development work strengthens the systems people work within — design, roles, processes, policies, performance and culture.",
    description: "HR and organization development consulting: organization design, job analysis, HR processes, policies and performance systems.",
    questions: ["How do we strengthen our HR systems and workforce effectiveness?", "How do we make people effective?", "How do we develop and retain existing employees?"],
    solutions: ["hr-od-advisory"], stages: [0, 4],
    topics: ["Defining jobs through organizational value delivery", "Strategic HR for SMEs and growing organizations", "Organization design and emerging technology"],
    cta: "Request an HR Advisory Conversation", interest: "Workforce & HR advisory" },
  { slug: "talent-development", title: "Learning & Capability Development",
    headline: "Grow the Capability You Already Have",
    intro: "Not every capability gap is solved by hiring. We assess where your people are today, then build what the business needs through training, mentoring and leadership development.",
    description: "Corporate talent development and training: assessments, training programs, mentoring and leadership development.",
    questions: ["How do we improve workforce capability?", "How do we develop and retain existing employees?"],
    solutions: ["talent-development"], stages: [2, 4],
    topics: ["How an employer capability gap becomes a talent program", "How mentoring improves workplace preparedness", "Human skills in an AI-enabled workplace"],
    cta: "Discuss a Development Need", interest: "Learning & capability development" },
  { slug: "global-talent", title: "Global Talent Access & Mobility",
    headline: "Access Capable Pakistani Talent for International Work",
    intro: "For organizations that need professionals across borders — on assignment, remotely or through mobility — we identify, prepare and connect Pakistani talent to your requirements.",
    description: "Pakistani talent for international employers: cross-border sourcing, remote professional talent and mobility support where available.",
    questions: ["How can we access Pakistani talent for international assignments?", "How do we access talent internationally?"],
    solutions: ["global-talent"], stages: [1, 2, 3],
    topics: ["Building Pakistani Talent for Global Clients", "The future of remote professional services", "Preparing for international professional assignments"],
    cta: "Discuss Global Talent Requirements", interest: "Global talent access" },
];

// Talent Pipeline Diagnostic (§7.2).
export const diagnosticAreas = [
  "Current and anticipated workforce needs", "Critical capability gaps", "Role clarity and job requirements",
  "Talent availability", "Internal development opportunities", "Recruitment and retention challenges", "Priority actions",
];

// Editorial themes (§11.1). Topics are planned articles, not yet published.
export const editorialThemes: { letter: string; title: string; audience: string; topics: string[] }[] = [
  { letter: "A", title: "Talent Demand Intelligence", audience: "Employers, HR leaders, business leaders", topics: [
    "Why recruitment alone cannot solve talent shortages", "Workforce planning for growing businesses",
    "Defining jobs through organizational value delivery", "Why job descriptions are insufficient without competency clarity",
    "The hidden costs of poor talent alignment", "Building talent pipelines for professional services",
    "Strategic HR for SMEs and growing organizations",
  ] },
  { letter: "B", title: "Career & Talent Readiness", audience: "Students, graduates and professionals", topics: [
    "How to understand your career potential", "The difference between qualifications and employability",
    "What employers actually evaluate in interviews", "Developing professional competence beyond a degree",
    "Building a CV around evidence of capability", "Preparing for international professional assignments",
    "Career progression through mentoring and experience",
  ] },
  { letter: "C", title: "Future of Work & Talent", audience: "Both employer and talent audiences", topics: [
    "AI and its implications for workforce capability", "Human skills in an AI-enabled workplace",
    "The future of remote professional services", "Career development in a changing labor market",
    "Responsible AI in talent assessment", "Organization design and emerging technology",
  ] },
  { letter: "D", title: "The Talent Pipeline in Practice", audience: "Employers, candidates and institutions", topics: [
    "How an employer capability gap becomes a talent program", "A candidate's journey from readiness to opportunity",
    "Lessons from a completed talent development cohort", "How mentoring improves workplace preparedness",
    "What successful onboarding teaches about recruitment", "Measuring effectiveness, efficiency and sustainability in talent delivery",
  ] },
];

// Content formats (§11.2).
export const contentFormats = [
  "Articles and expert commentary", "Industry briefs and reports", "Career guides", "Employer guides and checklists",
  "Case studies", "Downloadable resources", "Videos and interviews", "Event and program pages",
  "Talent success stories", "Employer testimonials", "Newsletter archives",
];

// Conversion-oriented content (§11.3): each piece leads to a defined next step.
export const conversionContent = [
  { title: "Why Recruitment Is Not a Talent Strategy", audience: "Employers", next: "Request a Talent Pipeline Diagnostic", href: "/employers#diagnostic" },
  { title: "Are You Ready for Your First Professional Role?", audience: "Graduates", next: "Explore Career Readiness", href: "/talent/readiness" },
  { title: "Building Pakistani Talent for Global Clients", audience: "International employers", next: "Discuss Global Talent Requirements", href: "/employers/global-talent" },
];

// Talent Readiness Passport (§8.3): a future product. Each element is either self-reported or assessed / verified evidence.
export const passportElements: { label: string; source: "self" | "verified" }[] = [
  { label: "Career direction", source: "self" },
  { label: "Education and qualifications", source: "self" },
  { label: "Experience and project exposure", source: "self" },
  { label: "Technical and professional skills", source: "self" },
  { label: "Career preferences", source: "self" },
  { label: "Assessed competencies", source: "verified" },
  { label: "Training and learning achievements", source: "verified" },
  { label: "Work samples and portfolio evidence", source: "verified" },
  { label: "Mentoring milestones", source: "verified" },
  { label: "Readiness for specific opportunity categories", source: "verified" },
];

// Talent landing page (§8.1).
export const talentOfferings: { id: string; title: string; need: string; deliverable: string; icon: LucideIcon }[] = [
  { id: "career-intelligence", title: "Career Intelligence", icon: Compass, need: "Career direction", deliverable: "Career discovery and counselling" },
  { id: "assessments", title: "Professional Assessments", icon: ClipboardCheck, need: "Self-understanding", deliverable: "Personality, interests, strengths and competency profiles" },
  { id: "career-readiness", title: "Career Readiness", icon: Target, need: "Employability", deliverable: "Individual development roadmap" },
  { id: "profiling", title: "Professional Profiling", icon: FileText, need: "Communicating capability", deliverable: "CV, portfolio, interview and profile support" },
  { id: "mentoring", title: "Mentoring", icon: MessagesSquare, need: "Practical guidance", deliverable: "Mentor-led development and review" },
  { id: "learning-programs", title: "Learning Programs", icon: BookOpen, need: "Capability building", deliverable: "Workshops, bootcamps and industry-linked programs" },
  { id: "opportunities", title: "Opportunities", icon: Briefcase, need: "Access to work", deliverable: "Relevant vacancies, projects, internships and placement support" },
  { id: "career-continuity", title: "Career Continuity", icon: Repeat, need: "Long-term growth", deliverable: "Alumni relationships, development and progression" },
];

// Talent sub-pages from the sitemap (§5.2 C). `offerings` refers to talentOfferings ids; `stages` to pipelineStages indexes.
// Visitor questions come from §2.2, related topics from §11.1 Theme B, tools from the existing Sanjeeda platform.
export type TalentPage = {
  slug: string; title: string; headline: string; intro: string; description: string;
  questions: string[]; offerings: string[]; includes: string[]; stages: number[]; tools: string[]; topics: string[]; cta: string; interest: string;
};

export const talentPages: TalentPage[] = [
  { slug: "career-intelligence", title: "Career Intelligence & Counselling",
    headline: "Understand Yourself Before You Choose a Direction",
    intro: "Good career decisions start with self-understanding. We help you see your strengths, interests and capabilities clearly, explore the careers that suit them, and talk it through with a counsellor.",
    description: "Career counselling in Karachi and career intelligence for students, graduates and professionals: discovery, exploration and counselling.",
    questions: ["Who am I professionally?", "What careers suit my capabilities and aspirations?", "What does the market expect from me?"],
    offerings: ["career-intelligence"], stages: [0, 1],
    includes: ["Career discovery", "One-to-one career counselling", "Strengths, interests, personality and capability analysis", "Career exploration across fields and roles"],
    tools: ["Khudi", "Counselling"],
    topics: ["How to understand your career potential", "Career development in a changing labor market"],
    cta: "Book a Career Conversation", interest: "Career intelligence & counselling" },
  { slug: "assessments", title: "Career Assessments & Professional Profiling",
    headline: "Know Your Capabilities. Show Them Clearly.",
    intro: "Assessments give you evidence about who you are and what you can do. Profiling helps you communicate that evidence to employers — through your CV, portfolio, interviews and professional profile.",
    description: "Career assessment services and professional profiling: personality, interests, strengths and competency profiles, CV and interview preparation.",
    questions: ["Who am I professionally?", "How can I demonstrate my potential and competence?"],
    offerings: ["assessments", "profiling"], stages: [0, 2],
    includes: ["Personality and interest profiles", "Strengths and competency profiles", "CV development built around evidence of capability", "Portfolio and professional profile support", "Interview preparation"],
    tools: ["Khudi", "3D CV"],
    topics: ["Building a CV around evidence of capability", "What employers actually evaluate in interviews"],
    cta: "Request an Assessment", interest: "Assessments & profiling" },
  { slug: "readiness", title: "Talent Readiness & Development",
    headline: "Close the Gap Between Your Degree and the Job",
    intro: "Qualifications open doors; capability keeps them open. We help you find the skills employers value that you are missing, then build them through a personal roadmap, workshops and industry-linked programs.",
    description: "Career readiness programs and graduate employability training: individual development roadmaps, workshops, bootcamps and industry-linked programs.",
    questions: ["What skills or competencies am I missing?", "What does the market expect from me?", "How can I access meaningful work opportunities?"],
    offerings: ["career-readiness", "learning-programs"], stages: [2, 3],
    includes: ["Individual development roadmap", "Employability and professional skills workshops", "Bootcamps and industry-linked programs", "Preparation for international professional assignments"],
    tools: ["3D CV", "OfferGuide"],
    topics: ["The difference between qualifications and employability", "Developing professional competence beyond a degree", "Are You Ready for Your First Professional Role?"],
    cta: "Start Your Readiness Roadmap", interest: "Readiness & development" },
  { slug: "mentorship", title: "Mentorship & Career Progression",
    headline: "Grow With Guidance From People Who Have Done It",
    intro: "Careers rarely move in straight lines. Mentors help you learn faster, make better decisions and keep progressing — and we stay in touch as your career develops.",
    description: "Professional mentoring in Pakistan: mentor-led development and review, career progression, continuing development and alumni relationships.",
    questions: ["How do I remain professionally relevant?", "How can I progress or change direction?"],
    offerings: ["mentoring", "career-continuity"], stages: [2, 4],
    includes: ["Mentor-led development and review", "Career progression and transition support", "Continuing professional development", "Alumni relationships and re-engagement"],
    tools: ["Mentoring", "Counselling"],
    topics: ["Career progression through mentoring and experience", "How mentoring improves workplace preparedness"],
    cta: "Find a Mentor", interest: "Mentorship" },
];

/** The sub-page that covers a talent offering, e.g. "profiling" → "/talent/assessments". Opportunities has its own top-level page. */
export const talentHref = (offeringId: string) => offeringId === "opportunities" ? "/opportunities"
  : `/talent/${talentPages.find((p) => p.offerings.includes(offeringId))?.slug ?? ""}`;

// Curated opportunities (§8.1, §12 Phase 2). Only genuine, current, verified openings; remove them when they expire.
export type Opportunity = {
  title: string; type: "Vacancy" | "Project" | "Internship" | "Placement";
  organization: string;
  location: string;
  posted: string;   // YYYY-MM-DD
  closes: string;   // YYYY-MM-DD; listings disappear after this date
  apply: string;    // link or email to apply
  description: string;
  employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "INTERN" | "TEMPORARY";
  remote?: boolean;
};
export const opportunities: Opportunity[] = [];

// Candidate engagement journey (§8.2).
export const candidateJourney = [
  { title: "Discover", text: "Identify the career stage: exploring, preparing for employment, looking for opportunities, seeking progression or considering a change." },
  { title: "Understand", text: "Collect limited initial information about education, interests, experience and aspirations." },
  { title: "Recommend", text: "Suggest relevant services, readiness programs, assessments or opportunities." },
  { title: "Engage", text: "Enable registration for mentoring, programs, counselling, a talent community or an actual vacancy." },
  { title: "Maintain continuity", text: "With consent, share relevant updates and future development opportunities." },
];

export const careerStages = [
  "Exploring career options", "Preparing for employment", "Looking for opportunities",
  "Seeking progression", "Considering a career change",
];

// Partnership section (§9).
export const partnerTypes: { id: string; title: string; text: string; icon: LucideIcon }[] = [
  { id: "institutions", title: "Universities & educational institutions", icon: Landmark,
    text: "Career readiness, employability initiatives, student assessments, industry exposure, internships, employer engagement and pipelines." },
  { id: "industry", title: "Employers & industry associations", icon: Factory,
    text: "Industry-specific competencies, pooled talent development, workforce research and readiness initiatives." },
  { id: "international", title: "International organizations", icon: Globe2,
    text: "Access to Pakistani talent, recruitment partnerships, remote workforce development and mobility opportunities." },
  { id: "mentors", title: "Trainers, mentors & subject-matter experts", icon: Lightbulb,
    text: "Industry learning, career mentoring, technical assessment and collaborative program delivery." },
];

// Our Model & philosophy (§10).
export const principles = [
  "Talent is more than a qualification or CV.",
  "Talent develops through experience, learning, mentorship and opportunity.",
  "The value of talent depends partly on organizational context.",
  "Employers and individuals share responsibility for professional capability.",
  "Sustainable talent relationships matter more than isolated recruitment transactions.",
];

export const comparison = [
  { conventional: "Start with a vacancy", ours: "Understand the organizational capability requirement" },
  { conventional: "Search for available candidates", ours: "Identify, cultivate and maintain relevant talent supply" },
  { conventional: "Focus mainly on qualifications", ours: "Consider assessed capability, readiness and potential" },
  { conventional: "Treat hiring as the endpoint", ours: "Support development, deployment and continuity" },
  { conventional: "Advise employers or individuals separately", ours: "Work across both sides of the talent equation" },
  { conventional: "Respond to immediate talent shortages", ours: "Build capabilities and pipelines for future requirements" },
];

// §21.
export const manifesto = [
  "Every organization needs people who can transform ideas, knowledge and effort into meaningful results.",
  "Every individual needs direction, capability, opportunity and an environment in which their potential can develop.",
  "Yet the world of talent and the world of work do not always understand each other.",
  "Organizations struggle to identify the capabilities they need. Individuals struggle to understand where they fit, how to develop and how to access the right opportunities.",
  "Conductivity exists to bring these two worlds closer.",
  "We work with organizations to understand their talent needs and strengthen the systems through which people create value.",
  "We work with individuals to discover their potential, develop professional readiness and connect their capabilities with meaningful opportunities.",
  "Our purpose extends beyond recruitment, training or career advice considered separately.",
  "We seek to develop talent maturity, strengthen organizational capability and create sustainable pipelines through which people and organizations can succeed together.",
];

// Utility pages (§5.2 H). Each is a placeholder until legal review (§16).
export const legalPages = [
  { slug: "privacy", title: "Privacy Notice" },
  { slug: "terms", title: "Terms of Use" },
  { slug: "cookies", title: "Cookie Preferences" },
  { slug: "accessibility", title: "Accessibility Information" },
  { slug: "candidate-data", title: "Candidate Data and Consent Information" },
];

/** The sub-page that covers an employer solution, e.g. "talent-acquisition" → "/employers/recruitment". */
export const employerHref = (solutionId: string) =>
  `/employers/${employerPages.find((p) => p.solutions.includes(solutionId))?.slug ?? ""}`;

// Partner sub-pages from the sitemap (§5.2 E). `types` refers to partnerTypes ids. Content from §4.3 and §9.
export type PartnerPage = {
  slug: string; title: string; headline: string; intro: string; description: string;
  types: string[]; who: string[]; outcomes: string[]; related?: { label: string; href: string };
};

export const partnerPages: PartnerPage[] = [
  { slug: "institutions", title: "Institutions & Universities",
    headline: "Prepare Students for the Work That Exists",
    intro: "We work with universities, colleges and training institutions to build career readiness that matches what employers actually need — and to connect students with those employers.",
    description: "Career readiness and employability partnerships for universities and training institutions: assessments, industry exposure, internships and employer pipelines.",
    types: ["institutions"],
    who: ["Universities and colleges", "Training institutions", "Professional bodies"],
    outcomes: ["Students who understand their career direction", "Readiness built against real employer requirements", "Internships and first roles through employer engagement"],
    related: { label: "Career readiness for students", href: "/talent/readiness" } },
  { slug: "industry", title: "Industry & Professional Partners",
    headline: "Build the Talent Your Sector Needs, Together",
    intro: "Employers, industry associations and experienced professionals can achieve together what no single organization can: shared competency standards, pooled development and a steady supply of ready talent.",
    description: "Partnerships with employers, industry associations, trainers, mentors and subject-matter experts to develop sector-specific talent pipelines.",
    types: ["industry", "mentors"],
    who: ["Employers and industry associations", "Trainers and subject-matter experts", "Mentors and experienced professionals"],
    outcomes: ["Clear competencies for the sector's key roles", "Readiness programs designed with industry", "Mentoring and assessment from people who do the work"],
    related: { label: "Talent Pipeline Development for employers", href: "/employers/talent-pipelines" } },
  { slug: "international", title: "International Talent Partnerships",
    headline: "Access Pakistani Talent Through a Partner on the Ground",
    intro: "International organizations and recruitment partners work with us to identify, prepare and connect capable Pakistani professionals — for assignments abroad, remote work and long-term talent supply.",
    description: "International talent partnerships: access to Pakistani talent, recruitment partnerships, remote workforce development and mobility opportunities.",
    types: ["international"],
    who: ["International employers", "International recruitment partners", "Organizations building remote teams"],
    outcomes: ["Access to prepared, assessed Pakistani professionals", "Remote workforce development", "Mobility opportunities where available"],
    related: { label: "Global Talent Access & Mobility", href: "/employers/global-talent" } },
];

/** The sub-page that covers a partner type, e.g. "mentors" → "/partners/industry". */
export const partnerHref = (typeId: string) =>
  `/partners/${partnerPages.find((p) => p.types.includes(typeId))?.slug ?? ""}`;
