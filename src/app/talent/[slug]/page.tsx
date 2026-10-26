import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CircleHelp } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { pipelineStages, talentOfferings, talentPages } from "@/data/blueprint";
import { sanjeedaTools } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return talentPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = talentPages.find((p) => p.slug === slug);
  return page ? { title: `${page.title} — For Talent`, description: page.description, alternates: { canonical: `/talent/${page.slug}` } } : {};
}

// Talent sub-pages from the blueprint sitemap (§5.2 C), e.g. /talent/assessments.
export default async function TalentOfferingPage({ params }: Props) {
  const { slug } = await params;
  const page = talentPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const offerings = talentOfferings.filter((o) => page.offerings.includes(o.id));
  const tools = sanjeedaTools.filter((t) => page.tools.includes(t.name));
  const others = [...talentPages.filter((p) => p.slug !== page.slug).map((p) => ({ href: `/talent/${p.slug}`, title: p.title })), { href: "/opportunities", title: "Opportunities" }];

  return (
    <>
      <PageHero eyebrow={`For talent · ${page.title}`} title={page.headline}>
        {page.intro}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href="#start" className="btn bg-white text-spark-dark hover:bg-white/90">{page.cta} <ArrowRight size={16} /></Link>
          <Link href="/talent" className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"><ArrowLeft size={14} /> Talent overview</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Questions you may be asking" title="Start with you, not a vacancy" />
            <ul className="space-y-3">
              {page.questions.map((q) => (
                <li key={q} className="flex gap-3 rounded-xl bg-paper p-4 font-medium"><CircleHelp size={20} className="mt-0.5 shrink-0 text-spark" aria-hidden />{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What we offer" title="How we help" />
            <div className="grid gap-4 sm:grid-cols-2">
              {offerings.map((o) => (
                <article key={o.id} id={o.id} className="card scroll-mt-24 !p-5">
                  <o.icon className="text-spark" aria-hidden />
                  <h3 className="mt-3 font-bold">{o.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-volt">{o.need}</p>
                  <p className="mt-2 text-sm text-ink-soft">{o.deliverable}</p>
                </article>
              ))}
            </div>
            <ul className="card mt-4 space-y-2">
              {page.includes.map((s) => <li key={s} className="flex gap-2 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden />{s}</li>)}
            </ul>
            <Placeholder title="Format, duration and fees" className="mt-4">
              Say which parts are free and which are paid (sessions, programs, assessments) once management confirms them — the blueprint requires this to be transparent.
            </Placeholder>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Your talent pipeline" title="Where this fits in your journey"
            text="Highlighted stages are where this support does most of its work." />
          <ol className="grid gap-4 md:grid-cols-5">
            {pipelineStages.map((s, i) => {
              const on = page.stages.includes(i);
              return (
                <li key={s.name} className={`rounded-2xl p-5 ${on ? "bg-white shadow-card ring-2 ring-spark" : "bg-white/60 ring-1 ring-ink/10"}`}>
                  <p className={`text-xs font-bold ${on ? "text-spark" : "text-ink-mute"}`}>{i + 1}. {s.name}</p>
                  <p className={`mt-2 text-sm ${on ? "text-ink-soft" : "text-ink-mute"}`}>{s.candidate}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-sanj-light p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-sanj-dark">On Sanjeeda</p>
            <ul className="mt-3 space-y-3">
              {tools.map((t) => <li key={t.name}><p className="font-bold">{t.name}</p><p className="text-sm text-ink-soft">{t.text}</p></li>)}
            </ul>
            <Link href="/sanjeeda" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sanj-dark hover:gap-2">About Sanjeeda <ArrowRight size={14} /></Link>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Success stories</h2>
            <Placeholder title="Participant career progression story">Add a real story here once the participant has given permission.</Placeholder>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Career guides</h2>
            <Placeholder title="Planned articles">
              <ul className="mt-1 list-disc space-y-1 pl-5">{page.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </Placeholder>
          </div>
        </div>
      </section>

      <section id="start" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{page.cta}</h2>
            <p className="mt-4 text-ink-soft">Tell us where you are and what you&apos;re aiming for. It takes about two minutes.</p>
            <p className="mt-4 text-sm text-ink-mute">Registering does not guarantee employment — it starts a conversation about your readiness.</p>
          </div>
          <InquiryForm kind="talent" interest={page.interest} />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="mb-6 text-2xl font-bold">More for talent</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.href} href={o.href} className="card group flex items-center justify-between gap-3 !p-5 transition hover:-translate-y-0.5">
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
