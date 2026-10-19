import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { candidateJourney, talentHref, talentOfferings } from "@/data/blueprint";
import { SANJEEDA_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "For Talent",
  description: "Career intelligence, assessments, readiness, mentoring and opportunities for students, graduates and professionals.",
};

// Talent landing page (blueprint §8).
export default function TalentPage() {
  return (
    <>
      <PageHero eyebrow="For talent" title="Your Career Is More Than Your Next Job.">
        Meaningful career development begins with understanding yourself, recognizing the capabilities valued by employers, and preparing to contribute with competence, confidence and professional integrity. Conductivity helps you navigate that journey.
        <div className="mt-5"><Link href="#start" className="btn bg-white text-spark-dark hover:bg-white/90">Start Your Career Readiness Journey <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section !pb-0">
        <div className="container-x">
          <blockquote className="mx-auto max-w-3xl border-l-4 border-spark pl-5 text-xl font-semibold leading-snug sm:text-2xl">
            We are interested in who you can become, not merely which vacancy you can fill today.
          </blockquote>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we offer" title="Support for every stage of your career" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {talentOfferings.map((o) => (
              <Link key={o.id} id={o.id} href={talentHref(o.id)} className="card group flex scroll-mt-24 flex-col transition hover:-translate-y-0.5">
                <o.icon className="text-spark" aria-hidden />
                <h3 className="mt-4 font-bold">{o.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-volt">{o.need}</p>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{o.deliverable}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark group-hover:gap-2">Learn more <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Your journey with us" title="Start small. Build from there." text="No long, intimidating assessment up front — just a sensible first step." />
          <ol className="grid gap-4 md:grid-cols-5">
            {candidateJourney.map((s, i) => (
              <li key={s.title} className="card !p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-spark text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
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
            <Placeholder title="Talent Readiness Passport — future">
              A long-term idea: a capability profile that grows with you, separating self-reported details from assessed evidence. Not yet available.
            </Placeholder>
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
