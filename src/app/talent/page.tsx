import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Info, PenLine, ShieldCheck } from "lucide-react";
import { PageHero, Placeholder, SigmaMark } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { SideQuestions } from "@/components/TalentSides";
import { AudienceFit } from "@/components/Audiences";
import { candidateJourney, passportElements, talentHref, talentOfferings } from "@/data/blueprint";
import { SANJEEDA_URL } from "@/data/site";

export const metadata: Metadata = pageMeta("/talent", "For Talent", "Career counselling, career assessments, career readiness programs, graduate employability training, professional mentoring, interview preparation and CV development in Pakistan.");

// Talent landing page (blueprint §8).
export default function TalentPage() {
  return (
    <>
      <PageHero eyebrow="For talent" title="Your Career Is More Than Your Next Job.">
        Meaningful career development begins with understanding yourself, recognizing the capabilities valued by employers, and preparing to contribute with competence, confidence and professional integrity. Conductivity helps you navigate that journey.
        <div className="mt-5"><Link href="#start" className="btn bg-white text-spark-dark hover:bg-white/90">Start Your Career Readiness Journey <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section">
        <div className="container-x"><AudienceFit id="talent" /></div>
      </section>

      <section className="section bg-paper">
        <div className="container-x"><SideQuestions side="candidate" /></div>
      </section>

      {/* §8.1 Offerings as one structured list: offering, the need it meets, and what you get. */}
      <section className="section !py-8 sm:!py-10">
        <div className="container-x flex flex-col items-center gap-6">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">What we offer</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">Support for every stage of your career</h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">Eight ways we help you move from career direction to long-term growth. Start with one; add more as you progress.</p>
            <Link href="#start" className="btn-primary mt-5 !py-2 !text-xs">Start Your Career Readiness Journey <ArrowRight size={14} /></Link>
          </div>

          {/* Two lists side by side: offerings 1–4 and 5–8. */}
          <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-2">
            {[talentOfferings.slice(0, 4), talentOfferings.slice(4)].map((group, g) => (
              <ol key={g} className="divide-y divide-ink/10 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
                {group.map((o, j) => (
                  <li key={o.id}>
                    <Link id={o.id} href={talentHref(o.id)} className="group flex scroll-mt-24 items-start gap-3 px-4 py-3 transition hover:bg-paper">
                      <span className="mt-1.5 w-5 shrink-0 text-xs font-bold text-ink-mute">0{g * 4 + j + 1}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-spark-light text-spark-dark transition group-hover:bg-spark group-hover:text-white">
                        <o.icon size={15} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{o.title}</span>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-volt">{o.need}</span>
                        <span className="mt-1 block text-xs text-ink-soft">{o.deliverable}</span>
                      </span>
                      <ArrowRight size={15} className="mt-1.5 shrink-0 text-spark-dark transition group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ol>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Candidate Engagement Journey</h2>
          {/* §8.2 journey as a track: each red step glows in turn, and a line drops from it to what happens at that step. */}
          <div className="rounded-2xl bg-white px-4 py-6 shadow-card ring-1 ring-ink/5 sm:px-6">
            <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
              <span aria-hidden className="absolute top-2.5 hidden h-0.5 bg-gradient-to-r from-volt via-spark to-volt opacity-40 md:block" style={{ left: "10%", right: "10%" }} />
              {candidateJourney.map((s, i) => (
                <li key={s.title} className="relative flex flex-col items-center text-center">
                  <span className="eco-step relative z-10 h-5 w-5 rounded-full border-[3px] border-white bg-spark shadow" style={{ animationDelay: `${i * 0.5}s` }} />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ink-mute">Step {i + 1}</p>
                  <h3 className="text-sm font-bold">{s.title}</h3>
                  {/* Connector from the step down to its description. */}
                  <span aria-hidden className="mt-2 flex flex-col items-center">
                    <span className="h-6 w-0.5" style={{ backgroundColor: "rgb(var(--spark) / 0.5)" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-spark" />
                  </span>
                  {/* Plain text under the connector, in quotes; quote marks and commas in red. */}
                  <p className="mt-2 w-full px-1 text-xs leading-relaxed text-ink-soft">
                    <span className="font-bold text-spark">&ldquo;</span>
                    {s.text.split(",").map((part, k, all) => (
                      <span key={k}>{part}{k < all.length - 1 && <span className="font-bold text-spark">,</span>}</span>
                    ))}
                    <span className="font-bold text-spark">&rdquo;</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-sm text-ink-mute">Not everyone is job-ready on day one, and that is fine. Registering with us does not guarantee employment — it starts building your readiness.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-sanj-light p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-sanj-dark">Sanjeeda</p>
            <h2 className="mt-2 text-2xl font-bold">Our career readiness platform</h2>
            <p className="mt-2 text-ink-soft">Assessments, the 3D CV, mentoring, counselling and offer evaluation — the tools behind your readiness journey.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/sanjeeda" className="btn-sanj">About Sanjeeda</Link>
              <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">Visit sanjeeda.io ↗</a>
            </div>
          </div>
          <div id="opportunities-list" className="space-y-4">
            <h2 className="text-2xl font-bold">Opportunities</h2>
            <Placeholder title="Curated, verified opportunities">
              Only current, verified roles, projects and internships will be listed here (Phase 2). Expired roles must be removed.{" "}
              <Link href="/opportunities" className="font-semibold underline">Go to Opportunities</Link>
            </Placeholder>
          </div>
        </div>
      </section>

      {/* §8.3 Future differentiator: Talent Readiness Passport. A concept, clearly marked as not yet available. */}
      <section id="passport" className="section relative scroll-mt-16 overflow-hidden bg-brand text-white">
        <SigmaMark className="-left-16 -top-20 h-[130%] w-auto rotate-12 opacity-[0.08]" />
        <div className="container-x relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Future development</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The Talent Readiness Passport</h2>
            <p className="mt-4 text-white/85">
              More than a CV: a professional capability profile you build over time, showing who you are becoming, not only where you have been.
            </p>
            <p className="mt-6 inline-flex items-start gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/90 ring-1 ring-white/20">
              <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
              Coming in the future. This is a development initiative, not yet an available product or a validated assessment standard.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-ink shadow-card sm:p-7">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <p className="flex items-center gap-2 font-bold"><BadgeCheck size={20} className="text-spark" aria-hidden /> Talent Readiness Passport</p>
              <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-mute">Preview</span>
            </div>
            {([
              { source: "self", title: "You tell us", note: "Self-reported", chip: "bg-paper text-ink-soft", Icon: PenLine },
              { source: "verified", title: "We assess or verify", note: "Independent evidence", chip: "bg-spark-light text-spark-dark", Icon: ShieldCheck },
            ] as const).map((g) => (
              <div key={g.source} className="mt-5">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <g.Icon size={16} className={g.source === "verified" ? "text-spark" : "text-ink-mute"} aria-hidden />
                  {g.title} <span className="font-normal text-ink-mute">· {g.note}</span>
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {passportElements.filter((e) => e.source === g.source).map((e) => (
                    <li key={e.label} className={`rounded-full px-3 py-1 text-xs font-medium ${g.chip}`}>{e.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Start Your Career Readiness Journey</h2>
            <p className="mt-4 text-ink-soft">Tell us where you are and what you&apos;re aiming for. It takes about two minutes, and we&apos;ll suggest the right next step for you.</p>
          </div>
          <InquiryForm kind="talent" />
        </div>
      </section>
    </>
  );
}
