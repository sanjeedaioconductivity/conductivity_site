import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { SideQuestions } from "@/components/TalentSides";
import { AudienceFit } from "@/components/Audiences";
import { diagnosticAreas, employerHref, employerSolutions, pipelineStages } from "@/data/blueprint";

export const metadata: Metadata = pageMeta("/employers", "For Employers", "Talent pipeline development in Pakistan: recruitment and talent acquisition, HR and organization development consulting, workforce planning, corporate training and access to Pakistani talent.");

// Employer landing page (blueprint §7).
export default function EmployersPage() {
  return (
    <>
      <PageHero eyebrow="For employers" title={"Your Business Needs More Than Candidates.\nIt Needs a Reliable Talent Pipeline."}>
        Whether you are expanding operations, developing internal capabilities, entering new markets or addressing critical talent gaps, Conductivity helps you define, access, develop and sustain the people your business needs.
        <div className="mt-5"><Link href="#consultation" className="btn bg-white text-spark-dark hover:bg-white/90">Request a Talent Pipeline Consultation <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section">
        <div className="container-x"><AudienceFit id="employers" /></div>
      </section>

      <section className="section bg-paper">
        <div className="container-x"><SideQuestions side="client" /></div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Employer solutions" title="Start with the question your business is asking"
            text="Every engagement begins with a business question. Find yours, then see how we answer it." />
          {/* Question first, then the answer: each card pairs a client concern with the solution that addresses it. */}
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employerSolutions.map((s, i) => (
              <Link key={s.id} id={s.id} href={employerHref(s.id)} style={{ "--i": i % 3 } as CSSProperties}
                className="reveal group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5 transition hover:shadow-lg hover:ring-volt/30">
                {/* The question */}
                <div className="relative bg-volt px-4 pb-6 pt-4 text-white transition group-hover:bg-brand">
                  <span aria-hidden className="absolute right-4 top-3 text-2xl font-bold text-white/15">0{i + 1}</span>
                  <p className="pr-8 text-base font-bold leading-snug">
                    <span aria-hidden className="relative top-1 mr-0.5 font-serif text-2xl leading-none text-spark">&ldquo;</span>{s.concern}
                  </p>
                </div>

                {/* The answer */}
                <div className="relative flex flex-1 flex-col px-4 pb-4 pt-6">
                  <span aria-hidden className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-spark text-white shadow-card ring-4 ring-white transition group-hover:translate-y-0.5">
                    <ArrowDown size={15} />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-spark-dark">Our solution</p>
                  <h3 className="mt-1 flex items-center gap-2 text-base font-bold">
                    <s.icon size={17} className="shrink-0 text-volt" aria-hidden /> {s.title}
                  </h3>
                  <ul className="mt-2.5 flex flex-1 flex-wrap content-start gap-1">
                    {s.services.split(", ").map((x) => (
                      <li key={x} className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-medium text-ink-soft">{x[0].toUpperCase() + x.slice(1)}</li>
                    ))}
                  </ul>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-spark-dark group-hover:gap-2">Explore {s.title} <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="diagnostic" className="section scroll-mt-16 bg-paper !py-10 sm:!py-12">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow">Signature entry offering</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">The Talent Pipeline Diagnostic</h2>
            <p className="mt-3 text-ink-soft">
              A clearly scoped, consultant-led review of your talent situation — so the conversation starts with your business, not a vacancy. It ends with priority actions you can act on, with or without us.
            </p>
            <Link href="#consultation" className="btn-primary mt-5">Request a Diagnostic <ArrowRight size={16} /></Link>
          </div>
          <div className="card !p-5">
            <h3 className="text-sm font-bold">What the diagnostic examines</h3>
            <ul className="mt-3 space-y-2">
              {diagnosticAreas.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden />{a}</li>
              ))}
            </ul>
            <Placeholder title="Diagnostic scope, duration and pricing" className="mt-4 !p-3 text-sm">To be confirmed by management before launch.</Placeholder>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="How we work with employers" title="One pipeline, from requirement to retention"
            text="Each engagement follows the Conductivity Talent Pipeline — hiring is one step inside a longer relationship." />
          <ol className="grid gap-4 md:grid-cols-5">
            {pipelineStages.map((s, i) => (
              <li key={s.name} className="card !p-5">
                <p className="text-xs font-bold text-spark">{i + 1}. {s.name}</p>
                <p className="mt-2 text-sm text-ink-soft">{s.client}</p>
              </li>
            ))}
          </ol>
          <Link href="/our-model" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">About our model <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Evidence" title="Client stories" />
          <Placeholder title="Approved employer case studies and testimonials">
            Add real client projects and employer feedback here once each has client approval and supporting evidence. No logos or statistics without approval.
          </Placeholder>
        </div>
      </section>

      <section id="consultation" className="section scroll-mt-20 !pt-8 sm:!pt-10">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Request a Talent Pipeline Consultation</h2>
            <p className="mt-3 text-sm text-ink-soft">Tell us what talent your business needs. We&apos;ll respond with a discovery conversation, not a sales sequence.</p>
          </div>
          <InquiryForm kind="employer" />
        </div>
      </section>
    </>
  );
}
