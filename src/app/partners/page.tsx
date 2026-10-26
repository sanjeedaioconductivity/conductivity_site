import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { AudienceFit } from "@/components/Audiences";
import { partnerHref, partnerTypes } from "@/data/blueprint";

export const metadata: Metadata = pageMeta("/partners", "Partners", "Talent partnerships with universities, training institutions, industry associations, international organizations and mentors to build sustainable talent pipelines in Pakistan.");

// Institutional and partnership experience (blueprint §9).
export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Developing Talent Together">
        We work with institutions, industry bodies, international organizations and experts to build talent supply that lasts beyond any single assignment.
        <div className="mt-5"><Link href="#partner-form" className="btn bg-white text-spark-dark hover:bg-white/90">Build a Talent Partnership <ArrowRight size={16} /></Link></div>
      </PageHero>

      <section className="section bg-paper">
        <div className="container-x"><AudienceFit id="partners" /></div>
      </section>

      {/* §9 partner types: four compact cards, each with its own brand colour and its focus areas as tags. */}
      <section className="section !py-10 sm:!py-12">
        <div className="container-x">
          <p className="eyebrow">Who we partner with</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Four kinds of partnership</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((p, i) => {
              const theme = [
                { head: "bg-volt", chip: "bg-volt-light text-volt", link: "text-volt" },
                { head: "bg-spark", chip: "bg-spark-light text-spark-dark", link: "text-spark-dark" },
                { head: "bg-ink", chip: "bg-paper text-ink", link: "text-ink" },
                { head: "bg-gradient-to-r from-spark to-volt", chip: "bg-spark-light text-spark-dark", link: "text-spark-dark" },
              ][i % 4];
              return (
                <Link key={p.id} id={p.id} href={partnerHref(p.id)}
                  className="group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className={`flex items-center gap-3 px-4 py-3.5 text-white ${theme.head}`}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15"><p.icon size={18} aria-hidden /></span>
                    <h3 className="text-sm font-bold leading-snug">{p.title}</h3>
                  </div>
                  <ul className="flex flex-1 flex-wrap content-start gap-1.5 p-4">
                    {p.text.replace(/\.$/, "").split(/, | and /).map((t) => (
                      <li key={t} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${theme.chip}`}>{t[0].toUpperCase() + t.slice(1)}</li>
                    ))}
                  </ul>
                  <span className={`inline-flex items-center gap-1 px-4 pb-4 text-xs font-semibold group-hover:gap-2 ${theme.link}`}>Learn more <ArrowRight size={13} /></span>
                </Link>
              );
            })}
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
