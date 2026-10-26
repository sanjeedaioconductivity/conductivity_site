import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import type { Opportunity } from "@/data/blueprint";
import { getOpportunities } from "@/lib/cms";
import { pageMeta, SITE_URL } from "@/data/seo";

// Hidden from search while empty: a page with no openings is "thin" (blueprint §14).
export const revalidate = 300; // re-check the CMS every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta("/opportunities", "Opportunities", "Professional career opportunities in Pakistan: verified vacancies, projects, internships and placement support from Conductivity's employer partners.", { noindex: (await getOpportunities()).length === 0 });
}

// Job-posting structured data, only for genuine, current, individual vacancies with a way to apply (§14).
function jobPostingJsonLd(o: Opportunity) {
  return {
    "@context": "https://schema.org", "@type": "JobPosting",
    title: o.title, description: o.description, datePosted: o.posted, validThrough: `${o.closes}T23:59:59`,
    employmentType: o.employmentType,
    hiringOrganization: { "@type": "Organization", name: o.organization },
    ...(o.remote ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Pakistan" } }
      : { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: o.location, addressCountry: "PK" } } }),
    directApply: false, url: `${SITE_URL}/opportunities`,
  };
}

const commitments = [
  "Every opportunity listed is genuine, current and verified with the employer.",
  "Each one has a clear way to apply, and is removed when it closes.",
  "Registering with us is never a promise of a job — it is a start on your readiness.",
  "Your profile is shared with an employer only with your permission.",
];

// Opportunities (blueprint §5.2 C, §8.1, §14). The live listing arrives in Phase 2 (§12).
export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();
  const vacancies = opportunities.filter((o) => o.type === "Vacancy" && o.apply && o.description);
  return (
    <>
      {vacancies.map((o) => (
        <script key={o.title + o.organization} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(o)) }} />
      ))}
      <PageHero eyebrow="For talent" title="Opportunities">
        Vacancies, projects, internships and placement support — for people who are ready, and a path to readiness for those who aren&apos;t yet.
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="Current opportunities" title="Open now" />
            {opportunities.length ? (
              <ul className="space-y-4">
                {opportunities.map((o) => (
                  <li key={o.title + o.organization} className="card flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-volt-light px-2.5 py-0.5 text-xs font-semibold text-volt">{o.type}</span>
                      <h3 className="mt-2 font-bold">{o.title}</h3>
                      <p className="text-sm text-ink-mute">{o.organization} · {o.location} · Closes {o.closes}</p>
                    </div>
                    <a href={o.apply} className="btn-primary">Apply</a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-4">
                <div className="card flex gap-4">
                  <Briefcase className="shrink-0 text-spark" aria-hidden />
                  <div>
                    <p className="font-semibold">No opportunities are listed right now.</p>
                    <p className="mt-1 text-sm text-ink-soft">Register your interest below and we&apos;ll contact you when something relevant opens — or suggest how to get ready for it.</p>
                  </div>
                </div>
                <Placeholder title="Curated opportunity listings — Phase 2">
                  Add verified roles to <code>opportunities</code> in <code>src/data/blueprint.ts</code> (later from the CRM). Add job-posting structured data only for genuine individual openings, and remove expired ones.
                </Placeholder>
              </div>
            )}
          </div>
          <div className="rounded-2xl bg-paper p-6">
            <h2 className="text-lg font-bold">Our commitments</h2>
            <ul className="mt-4 space-y-3">
              {commitments.map((c) => <li key={c} className="flex gap-3 text-sm text-ink-soft"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />{c}</li>)}
            </ul>
            <Link href="/talent/readiness" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">Not ready yet? Build your readiness <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section id="start" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Register your interest</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Tell us what you&apos;re looking for</h2>
            <p className="mt-4 text-ink-soft">We&apos;ll match you with relevant opportunities as they open, and point you to the right preparation in the meantime.</p>
          </div>
          <InquiryForm kind="talent" interest="Opportunities" />
        </div>
      </section>

      <section className="section">
        <div className="container-x rounded-2xl bg-ink p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold">Hiring?</h2>
          <p className="mt-2 text-white/80">Tell us about your requirement and we&apos;ll build the pipeline to fill it.</p>
          <Link href="/employers/recruitment" className="btn mt-5 bg-white text-ink hover:bg-white/90">Talent Identification &amp; Recruitment <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
