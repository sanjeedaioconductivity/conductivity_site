import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import PipelineCycle from "@/components/PipelineCycle";
import { comparison, manifesto, outcomes, pipelineStages, principles, tagline, triad } from "@/data/blueprint";

export const metadata: Metadata = {
  title: "Our Model",
  description: "The Conductivity Talent Pipeline: Understand, Discover, Prepare, Connect, Sustain.",
};

// The model and philosophy (blueprint §3, §10, §21).
export default function OurModelPage() {
  return (
    <>
      <PageHero eyebrow="Our model" title="The Conductivity Talent Pipeline">
        A continuous five-stage cycle that connects what organizations need with what individuals can become.
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The idea behind Conductivity</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">People give organizations the capability to act.</h2>
          </div>
          <div className="space-y-4 text-lg text-ink-soft">
            <p>Every business turns people, knowledge and processes into results. How well that works depends on whether the right people are in the right roles — and whether they keep growing.</p>
            <p>Most providers handle one piece: recruiters place people, HR consultants fix systems, trainers build skills, counsellors advise individuals. We connect those pieces into one pipeline, working with employers and individuals at the same time.</p>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
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

      <section className="section bg-spark text-white">
        <div className="container-x">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/85">{tagline}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {triad.map((t) => (
              <div key={t.title} className="rounded-2xl bg-white p-6 text-ink">
                <h3 className="text-2xl font-bold text-spark">{t.title}</h3>
                <p className="mt-2 font-medium">{t.text}</p>
                <p className="mt-2 text-sm text-ink-mute">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="How we judge results" title="Effectiveness, efficiency, sustainability" />
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="card"><h3 className="font-bold">{o.title}</h3><p className="mt-2 text-sm text-ink-soft">{o.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="A true talent company" title="What we believe about talent" />
            <ul className="space-y-3">
              {principles.map((p) => <li key={p} className="flex gap-3 text-ink-soft"><Check size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />{p}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What distinguishes us" title="A different starting point" />
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

      <section className="section">
        <div className="container-x">
          <Placeholder title="Our approach to talent intelligence">Planned as a supporting section or its own page once the methodology is documented.</Placeholder>
        </div>
      </section>

      <section className="section bg-ink text-white">
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
