import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CircleHelp } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { diagnosticAreas, employerPages, employerSolutions, pipelineStages } from "@/data/blueprint";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return employerPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = employerPages.find((p) => p.slug === slug);
  return page ? { title: `${page.title} — For Employers`, description: page.description } : {};
}

// Employer sub-pages from the blueprint sitemap (§5.2 B), e.g. /employers/recruitment.
export default async function EmployerSolutionPage({ params }: Props) {
  const { slug } = await params;
  const page = employerPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const groups = employerSolutions.filter((s) => page.solutions.includes(s.id));
  const others = employerPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <PageHero eyebrow={`For employers · ${page.title}`} title={page.headline}>
        {page.intro}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href="#consultation" className="btn bg-white text-spark-dark hover:bg-white/90">{page.cta} <ArrowRight size={16} /></Link>
          <Link href="/employers" className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"><ArrowLeft size={14} /> Employer overview</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="The questions we help answer" title="Start with your business, not a vacancy" />
            <ul className="space-y-3">
              {page.questions.map((q) => (
                <li key={q} className="flex gap-3 rounded-xl bg-paper p-4 font-medium"><CircleHelp size={20} className="mt-0.5 shrink-0 text-spark" aria-hidden />{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What we offer" title="Services" />
            <div className="space-y-4">
              {groups.map((g) => (
                <article key={g.id} id={g.id} className="card scroll-mt-24">
                  <div className="flex items-center gap-3"><g.icon className="text-spark" aria-hidden /><h3 className="text-lg font-bold">{g.title}</h3></div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {g.services.split(", ").map((s) => (
                      <li key={s} className="flex gap-2 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden /><span className="first-letter:uppercase">{s}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
              <Placeholder title="Service scope, delivery approach and engagement options">
                Describe how each service is delivered (duration, format, team, typical deliverables) once management confirms them.
                {page.slug === "global-talent" && " Confirm which arrangements — EOR, remote talent, mobility — are currently available before publishing them as offerings."}
              </Placeholder>
            </div>
          </div>
        </div>
      </section>

      {page.diagnostic && (
        <section id="diagnostic" className="section scroll-mt-16 bg-paper">
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Where to start</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The Talent Pipeline Diagnostic</h2>
              <p className="mt-4 text-lg text-ink-soft">A clearly scoped, consultant-led review of your talent situation that ends with priority actions.</p>
            </div>
            <ul className="card space-y-3">
              {diagnosticAreas.map((a) => <li key={a} className="flex gap-3 text-ink-soft"><Check size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />{a}</li>)}
            </ul>
          </div>
        </section>
      )}

      <section className={`section ${page.diagnostic ? "" : "bg-paper"}`}>
        <div className="container-x">
          <SectionHead eyebrow="Within the talent pipeline" title="Where this fits"
            text="Every service is one part of the Conductivity Talent Pipeline. Highlighted stages are where this work does most of its job." />
          <ol className="grid gap-4 md:grid-cols-5">
            {pipelineStages.map((s, i) => {
              const on = page.stages.includes(i);
              return (
                <li key={s.name} className={`rounded-2xl p-5 ${on ? "bg-white shadow-card ring-2 ring-spark" : "bg-white/60 ring-1 ring-ink/10"}`}>
                  <p className={`text-xs font-bold ${on ? "text-spark" : "text-ink-mute"}`}>{i + 1}. {s.name}</p>
                  <p className={`mt-2 text-sm ${on ? "text-ink-soft" : "text-ink-mute"}`}>{s.client}</p>
                </li>
              );
            })}
          </ol>
          <Link href="/our-model" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">About our model <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Client stories</h2>
            <Placeholder title={`Approved ${page.title.toLowerCase()} case study`}>
              Add a real engagement here once the client has approved it. Report results as effectiveness, efficiency and sustainability — no unverified statistics.
            </Placeholder>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Related insights</h2>
            <Placeholder title="Planned articles">
              <ul className="mt-1 list-disc space-y-1 pl-5">{page.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </Placeholder>
          </div>
        </div>
      </section>

      <section id="consultation" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{page.cta}</h2>
            <p className="mt-4 text-ink-soft">Tell us what talent your business needs. We&apos;ll respond with a discovery conversation.</p>
          </div>
          <InquiryForm kind="employer" interest={page.interest} />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="mb-6 text-2xl font-bold">Other employer solutions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/employers/${o.slug}`} className="card group flex items-center justify-between gap-3 !p-5 transition hover:-translate-y-0.5">
                <span className="font-semibold">{o.title}</span>
                <ArrowRight size={16} className="shrink-0 text-spark-dark transition group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
