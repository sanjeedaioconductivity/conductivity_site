import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, Placeholder, SectionHead, StepChain } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { diagnosticAreas, employerHref, employerSolutions, pipelineStages } from "@/data/blueprint";

export const metadata: Metadata = {
  title: "For Employers",
  description: "Talent intelligence, recruitment, HR & OD advisory, capability development and global talent access — built into a reliable talent pipeline.",
};

// Employer landing page (blueprint §7).
export default function EmployersPage() {
  return (
    <>
      <PageHero eyebrow="For employers" title={"Your Business Needs More Than Candidates.\nIt Needs a Reliable Talent Pipeline."}>
        Whether you are expanding operations, developing internal capabilities, entering new markets or addressing critical talent gaps, Conductivity helps you define, access, develop and sustain the people your business needs.
        <div className="mt-5"><Link href="#consultation" className="btn bg-white text-spark-dark hover:bg-white/90">Request a Talent Pipeline Consultation <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Employer solutions" title="Start with the question your business is asking" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employerSolutions.map((s) => (
              <Link key={s.id} id={s.id} href={employerHref(s.id)} className="card group flex scroll-mt-24 flex-col transition hover:-translate-y-0.5">
                <s.icon className="text-spark" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 font-medium text-volt">“{s.concern}”</p>
                <p className="mt-3 flex-1 text-sm text-ink-soft">{s.services}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark group-hover:gap-2">Learn more <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostic" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Signature entry offering</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The Talent Pipeline Diagnostic</h2>
            <p className="mt-4 text-lg text-ink-soft">
              A clearly scoped, consultant-led review of your talent situation — so the conversation starts with your business, not a vacancy. It ends with priority actions you can act on, with or without us.
            </p>
            <Link href="#consultation" className="btn-primary mt-6">Request a Diagnostic <ArrowRight size={16} /></Link>
          </div>
          <div className="card">
            <h3 className="font-bold">What the diagnostic examines</h3>
            <ul className="mt-4 space-y-3">
              {diagnosticAreas.map((a) => (
                <li key={a} className="flex gap-3 text-ink-soft"><Check size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />{a}</li>
              ))}
            </ul>
            <Placeholder title="Diagnostic scope, duration and pricing" className="mt-6">To be confirmed by management before launch.</Placeholder>
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

      <section id="consultation" className="section scroll-mt-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Request a Talent Pipeline Consultation</h2>
            <p className="mt-4 text-ink-soft">Tell us what talent your business needs. We&apos;ll respond with a discovery conversation, not a sales sequence.</p>
            <div className="mt-6 rounded-2xl bg-paper p-5">
              <p className="text-sm font-semibold">What happens next</p>
              <div className="mt-3"><StepChain steps={["Inquiry", "Discovery call", "Proposal", "Delivery"]} /></div>
            </div>
          </div>
          <InquiryForm kind="employer" />
        </div>
      </section>
    </>
  );
}
