import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { partnerTypes } from "@/data/blueprint";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with Conductivity to build sustainable, sector-specific talent pipelines.",
};

// Institutional and partnership experience (blueprint §9).
export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Developing Talent Together">
        We work with institutions, industry bodies, international organizations and experts to build talent supply that lasts beyond any single assignment.
        <div className="mt-5"><Link href="#partner-form" className="btn bg-white text-spark-dark hover:bg-white/90">Build a Talent Partnership <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Who we partner with" title="Four kinds of partnership" />
          <div className="grid gap-5 md:grid-cols-2">
            {partnerTypes.map((p) => (
              <article key={p.id} id={p.id} className="card scroll-mt-24 !p-8">
                <p.icon className="text-spark" aria-hidden />
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Current partners" title="Who we work with" />
          <Placeholder title="Approved partner names and logos">Add institutional and international partners here only after each has given approval.</Placeholder>
        </div>
      </section>

      <section id="partner-form" className="section scroll-mt-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Build a Talent Partnership</h2>
            <p className="mt-4 text-ink-soft">Describe the objective, who it is for, the outcomes you expect and what you could contribute. We&apos;ll come back with a proposal for a first meeting.</p>
          </div>
          <InquiryForm kind="partner" />
        </div>
      </section>
    </>
  );
}
