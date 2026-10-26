import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, Check, Handshake, Sprout, TrendingUp, X } from "lucide-react";
import { PageHero, Placeholder, SectionHead, SigmaMark } from "@/components/ui";
import PipelineCycle from "@/components/PipelineCycle";
import Reveal from "@/components/Reveal";
import { RelationshipLine, TwoSidesBridge } from "@/components/TalentSides";
import { brand, category, comparison, manifesto, outcomes, pipelineStages, principles, singleStageProviders, tagline, triad } from "@/data/blueprint";

export const metadata: Metadata = pageMeta("/our-model", "Our Model", "The Conductivity Talent Pipeline: a five-stage cycle (Understand, Discover, Prepare, Connect, Sustain) that connects employer talent needs with individual career readiness.");

const triadIcons = [Sprout, Handshake, TrendingUp];

// The model and philosophy (blueprint §3, §10, §21).
export default function OurModelPage() {
  return (
    <>
      <PageHero eyebrow="Our model" title="The Conductivity Talent Pipeline">
        A continuous five-stage cycle that connects what organizations need with what individuals can become.
      </PageHero>

      <section id="idea" className="section scroll-mt-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The idea behind Conductivity</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">People give organizations the capability to act.</h2>
          </div>
          <div className="space-y-4 text-lg text-ink-soft">
            <p>Every organization turns people, knowledge, processes and resources into results. People give it the capability to act; ideas, learning, motivation, direction and real opportunity decide how well that capability performs.</p>
            <p className="border-l-4 border-spark pl-4 font-semibold text-ink"><span className="text-spark">Role:</span> improve the connection between human potential, organizational capability and value creation.</p>
            <p className="border-l-4 border-spark pl-4 font-semibold text-ink"><span className="text-spark">In business terms:</span> the right people in the right roles, ready to perform, and still growing long after they are hired.</p>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="One pipeline, not one stage" title="Most providers handle a single stage of the talent lifecycle"
            text="We integrate these capabilities into one coherent talent pipeline, understanding what organizations need and what individuals are capable of becoming." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {singleStageProviders.map((p) => (
              <div key={p.who} className="card !p-5"><h3 className="font-semibold">{p.who}</h3><p className="mt-1 text-sm text-ink-mute">{p.does}.</p></div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl bg-spark p-5 font-semibold text-white">Conductivity connects every one of these stages into one pipeline, working with employers and individuals at the same time.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Brand positioning" title="Who we are, in one page" />
          <Reveal className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            {/* Identity: brand, category, philosophy and tagline. */}
            <div className="reveal relative overflow-hidden rounded-3xl bg-brand p-8 text-white sm:p-10">
              <SigmaMark className="-bottom-16 -right-10 h-72 w-auto -rotate-12 opacity-[0.08]" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Brand</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">Conductivity</p>
              <dl className="relative mt-8 space-y-5 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Market category</dt>
                  <dd className="mt-1 text-xl font-semibold">{category.replace(/^The /, "")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Brand philosophy</dt>
                  <dd className="mt-1 text-xl font-semibold">{brand.philosophy}</dd>
                </div>
              </dl>
              <ul className="relative mt-8 flex flex-wrap gap-2" aria-label="Tagline">
                {triad.map((t) => (
                  <li key={t.title}>
                    <a href={`#${t.title.toLowerCase()}`} className="inline-flex items-center gap-1 rounded-full bg-spark px-4 py-1.5 text-sm font-bold transition hover:bg-white hover:text-spark">
                      {t.title} <ArrowDown size={14} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* What we do and what we promise. */}
            <div className="flex flex-col gap-5">
              <div className="reveal flex-1 rounded-3xl bg-paper p-8 sm:p-10" style={{ "--i": 1 } as CSSProperties}>
                <p className="eyebrow">Positioning</p>
                <p className="mt-4 border-l-4 border-spark pl-5 text-xl font-medium leading-relaxed sm:text-2xl">{brand.positioning}</p>
              </div>
              <div className="reveal relative overflow-hidden rounded-3xl bg-spark p-8 text-white sm:p-10" style={{ "--i": 2 } as CSSProperties}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Brand promise</p>
                <p className="mt-4 text-xl font-bold leading-snug sm:text-2xl">&ldquo;{brand.promise}&rdquo;</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="two-sides" className="section scroll-mt-16 bg-paper">
        <div className="container-x space-y-8">
          <SectionHead eyebrow="The strategic foundation" title="One Company, Two Sides of Talent"
            text="Organizations and individuals ask different questions about the same thing: talent. We answer both, and connect them." />
          <TwoSidesBridge />
          <RelationshipLine />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Five stages" title="Understand → Discover → Prepare → Connect → Sustain" text="Select a stage to see what it means on each side." />
          <PipelineCycle showLink={false} />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead title="Both sides at every stage" />
          <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-ink text-white">
                <tr><th className="p-4">Stage</th><th className="p-4">Purpose</th><th className="p-4">For organizations</th><th className="p-4">For individuals</th></tr>
              </thead>
              <tbody>
                {pipelineStages.map((s, i) => (
                  <tr key={s.name} className="border-t border-ink/10 align-top odd:bg-white even:bg-paper">
                    <th scope="row" className="p-4 font-bold text-spark-dark">{i + 1}. {s.name}</th>
                    <td className="p-4 font-medium">{s.purpose}</td>
                    <td className="p-4 text-ink-soft">{s.client}</td>
                    <td className="p-4 text-ink-soft">{s.candidate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tagline as a progression: each stage builds on the one before. */}
      <section id="tagline" className="section relative scroll-mt-16 overflow-hidden bg-brand text-white">
        <SigmaMark className="-left-16 -top-20 h-[130%] w-auto rotate-12 opacity-[0.08]" />
        <div className="container-x relative">
          <Reveal>
          <div className="reveal max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Our tagline</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Readiness<span className="text-spark">.</span> Opportunities<span className="text-spark">.</span> Success<span className="text-spark">.</span>
            </h2>
          </div>

          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {triad.map((t, i) => {
              const Icon = triadIcons[i];
              return (
                <li key={t.title} id={t.title.toLowerCase()} style={{ "--i": i + 1 } as CSSProperties}
                  className="reveal group relative scroll-mt-56 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15 transition hover:bg-white/[0.11] target:bg-white/[0.12] target:ring-4 target:ring-spark">
                  {/* Connector to the next stage on wide screens. */}
                  {i < triad.length - 1 && (
                    <span aria-hidden className="reveal-pop absolute -right-6 top-7 z-10 hidden h-7 w-7 items-center justify-center rounded-full bg-spark md:flex">
                      <ArrowRight size={14} />
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="icon-lift flex h-10 w-10 items-center justify-center rounded-xl bg-spark"><Icon size={18} aria-hidden /></span>
                    <span className="text-4xl font-bold text-white/20">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{t.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{t.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {t.detail.split(/, | and /).map((d) => (
                      <li key={d} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white/85">{d}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="How we judge results" title="Effectiveness, efficiency, sustainability"
            text="These three dimensions are the basis for our impact reporting and case studies." />
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="card"><h3 className="font-bold">{o.title}</h3><p className="mt-2 text-sm text-ink-soft">{o.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="A true talent company" title="What we believe about talent" />
            <ul className="space-y-3">
              {principles.map((p) => <li key={p} className="flex gap-3 text-ink-soft"><Check size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />{p}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What distinguishes us" title="A different starting point" />
            <p className="mb-2 hidden grid-cols-2 gap-2 px-4 text-xs font-semibold uppercase tracking-wider sm:grid">
              <span className="text-ink-mute">Conventional approach</span>
              <span className="text-spark-dark">Conductivity&apos;s approach</span>
            </p>
            <ul className="space-y-3">
              {comparison.map((c) => (
                <li key={c.ours} className="grid gap-2 rounded-xl bg-white p-4 text-sm shadow-card sm:grid-cols-2">
                  <span className="flex gap-2 text-ink-mute"><X size={16} className="mt-0.5 shrink-0" aria-hidden />{c.conventional}</span>
                  <span className="flex gap-2 font-medium"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden />{c.ours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="talent-intelligence" className="section scroll-mt-16">
        <div className="container-x">
          <Placeholder title="Our approach to talent intelligence">Planned as a supporting section or its own page once the methodology is documented.</Placeholder>
        </div>
      </section>

      <section id="manifesto" className="section scroll-mt-16 bg-ink text-white">
        <div className="container-x max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Our manifesto</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Talent Is More Than a Resource. It Is Human Potential in Motion.</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/85">
            {manifesto.map((m) => <p key={m}>{m}</p>)}
          </div>
          <p className="mt-10 font-bold">Conductivity — The Talent Pipeline Company.</p>
          <p className="text-white/70">{tagline}</p>
        </div>
      </section>
    </>
  );
}
