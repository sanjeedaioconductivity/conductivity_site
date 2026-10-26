import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import { contentFormats, conversionContent, editorialThemes } from "@/data/blueprint";
import { insightAnchor, insightCategories } from "@/data/site";
import { getArticles } from "@/lib/cms";

export const metadata: Metadata = pageMeta("/insights", "Insights", "Talent intelligence, career readiness and future of work insights, guides and resources from Conductivity.");

// Insights hub: conversion content (§11.3), editorial themes and formats (§11.1–11.2), then the sitemap areas (§5.2 F).
export const revalidate = 300; // re-check the CMS every 5 minutes

export default async function Insights() {
  const insights = await getArticles();
  return (
    <>
      <PageHero eyebrow="Insights" title="Research, guidance and perspectives on talent and work." />
      <nav aria-label="Insight areas" className="border-b border-ink/10 bg-white">
        <ul className="container-x flex gap-2 overflow-x-auto py-3">
          {insightCategories.map((c) => (
            <li key={c} className="shrink-0">
              <a href={`#${insightAnchor(c)}`} className="block rounded-full bg-paper px-3.5 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-spark hover:text-white">{c}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* §11.3 Conversion-oriented content: each piece leads to a defined next step. */}
      <section id="start-here" className="section scroll-mt-16 !py-10 sm:!py-12">
        <div className="container-x">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Read, then take the next step</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {conversionContent.map((c, i) => (
              <article key={c.title} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
                <div className={`h-1.5 ${["bg-volt", "bg-spark", "bg-ink"][i % 3]}`} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">For {c.audience.toLowerCase()} · Coming soon</p>
                  <h3 className="mt-2 font-bold leading-snug">{c.title}</h3>
                  <Link href={c.href} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-spark-dark hover:gap-2">
                    {c.next} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §11.1 Four editorial themes and §11.2 content formats. Topics are planned, not yet published. */}
      <section id="themes" className="section scroll-mt-16 bg-paper !py-10 sm:!py-12">
        <div className="container-x">
          <p className="eyebrow">Editorial themes</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Four themes we write about</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {editorialThemes.map((t, i) => (
              <div key={t.letter} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
                <div className={`flex items-center gap-3 px-4 py-3.5 text-white ${["bg-volt", "bg-spark", "bg-ink", "bg-gradient-to-r from-spark to-volt"][i % 4]}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg font-bold">{t.letter}</span>
                  <h3 className="text-sm font-bold leading-snug">{t.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">For {t.audience.toLowerCase()}</p>
                  <ul className="mt-3 space-y-1.5">
                    {t.topics.map((topic) => (
                      <li key={topic} className="flex gap-2 text-xs text-ink-soft"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark" />{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink/5">
            <p className="text-sm font-bold">Formats</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {contentFormats.map((f) => <li key={f} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink-soft">{f}</li>)}
            </ul>
            <p className="mt-4 text-xs text-ink-mute">We publish original insights and practical evidence from our own work, not generic articles.</p>
          </div>
        </div>
      </section>

      {insightCategories.map((c, idx) => {
        const items = insights.filter((i) => i.category === c);
        return (
          <section key={c} id={insightAnchor(c)} className={`section scroll-mt-32 ${idx % 2 ? "bg-paper" : ""}`}>
            <div className="container-x">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">{c}</h2>
              {items.length ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((i) => (
                    <article key={i.slug} className="card">
                      <time className="text-xs text-ink-mute" dateTime={i.date}>{new Date(i.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
                      <h3 className="mt-2 font-semibold">{i.body?.length ? <Link href={`/insights/${i.slug}`} className="hover:text-spark-dark hover:underline">{i.title}</Link> : i.title}</h3>
                      <p className="mt-2 text-sm text-ink-mute">{i.excerpt}</p>
                      {i.body?.length ? <Link href={`/insights/${i.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">Read article <ArrowRight size={14} /></Link> : null}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-ink/20 p-6 text-sm text-ink-mute">Articles in this area are coming soon.</p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
