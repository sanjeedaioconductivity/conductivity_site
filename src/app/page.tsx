import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BarChart3, Building2, Check, Compass, Landmark, Sparkles, UserRound } from "lucide-react";
import { Placeholder, SectionHead, SigmaMark, StepChain } from "@/components/ui";
import Reveal from "@/components/Reveal";
import PipelineCycle from "@/components/PipelineCycle";
import HeroEcosystem from "@/components/HeroEcosystem";
import NewsletterSignup from "@/components/NewsletterSignup";
import { category, ctas, differentiators, evidenceTypes, pathways, readinessSteps, solutions, tagline } from "@/data/blueprint";
import { insightAnchor } from "@/data/site";
import { getArticles } from "@/lib/cms";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Homepage, following the ten sections of the website blueprint (§6).
export const revalidate = 300; // re-check the CMS for new articles every 5 minutes

export default async function Home() {
  // The newest article in each of three areas: employer intelligence, career readiness, future of work (§6 section 9).
  const insights = await getArticles();
  const featured = [
    { category: "Talent Intelligence", theme: "Employer intelligence", Icon: BarChart3, tone: "bg-volt-light text-volt" },
    { category: "Career Intelligence", theme: "Career readiness", Icon: Compass, tone: "bg-spark-light text-spark-dark" },
    { category: "Future of Work", theme: "Future of work", Icon: Sparkles, tone: "bg-paper text-ink" },
  ].flatMap((f) => {
    const item = insights.filter((i) => i.category === f.category).sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    return item ? [{ ...f, item }] : [];
  });

  return (
    <>
      {/* 1 — Hero */}
      <section id="hero" className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-spark/10 blur-3xl" />
        <div className="container-x relative grid items-start gap-10 pb-12 pt-6 lg:grid-cols-[1.15fr_1fr] lg:pb-16 lg:pt-10">
          <div>
            <p className="eyebrow">{category}</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Talent Ready for Opportunity. <span className="text-spark">Organizations Ready for Talent.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              We connect the world of work with the world of talent. From understanding organizational needs to developing individual capabilities, Conductivity builds pipelines that help people become opportunity-ready and organizations become talent-ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={ctas.employer.href} className="btn-primary">Build Your Talent Pipeline <ArrowRight size={16} /></Link>
              <Link href={ctas.talent.href} className="btn-outline">Explore Your Career Path</Link>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-mute">
              {["Talent Intelligence", "Career Readiness", "Recruitment", "Workforce Development", "Global Opportunities"].map((t, i) => (
                <span key={t} className="flex items-center gap-2.5">{i > 0 && <span aria-hidden className="font-bold text-spark">|</span>}{t}</span>
              ))}
            </p>
          </div>

          {/* Visual direction (§6): people and organizations connected through Conductivity, with a simple pipeline beneath. */}
          <div className="pt-2 lg:pt-0"><HeroEcosystem /></div>
        </div>
      </section>

      {/* 2 — Two sides, one purpose */}
      <section id="two-sides" className="section scroll-mt-16 bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Two sides, one purpose" title="Talent Has Two Sides. We Work on Both." center />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { who: "For organizations", head: "The talent you need. The capability your business demands.", text: "We help employers understand workforce requirements, develop pipelines, improve HR systems and access capable professionals.", cta: "Explore Employer Solutions", href: "/employers", Icon: Building2, tone: "text-volt" },
              { who: "For individuals", head: "The career you imagine. The readiness it requires.", text: "We help people discover possibilities, understand employer expectations, develop relevant capabilities and pursue meaningful opportunities.", cta: "Explore Talent Solutions", href: "/talent", Icon: UserRound, tone: "text-spark-dark" },
            ].map((p) => (
              <div key={p.who} className="card flex flex-col !p-8">
                <p.Icon className={p.tone} aria-hidden />
                <p className={`mt-4 text-xs font-bold uppercase tracking-wider ${p.tone}`}>{p.who}</p>
                <h3 className="mt-2 text-xl font-bold">{p.head}</h3>
                <p className="mt-3 flex-1 text-ink-soft">{p.text}</p>
                <Link href={p.href} className="mt-6 inline-flex items-center gap-1 font-semibold text-spark-dark hover:gap-2">{p.cta} <ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — The talent pipeline */}
      <section id="pipeline" className="section scroll-mt-16">
        <div className="container-x">
          <SectionHead eyebrow="The talent pipeline" title="We Do More Than Fill Vacancies."
            text="Hiring is an event. Talent development is a process. A sustainable talent pipeline connects both." />
          <PipelineCycle />
        </div>
      </section>

      {/* 4 — Solutions */}
      <section id="solutions" className="section scroll-mt-16 bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Our solutions" title="Solutions Across the Talent Lifecycle" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link key={s.title} href={s.href} className="card group flex flex-col transition hover:-translate-y-0.5">
                <s.icon className="text-spark" aria-hidden />
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{s.text}</p>
                <p className="mt-4 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-volt-light px-2.5 py-0.5 font-semibold text-volt">{s.audience}</span>
                  <ArrowRight size={16} className="text-spark-dark transition group-hover:translate-x-1" aria-hidden />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Talent readiness */}
      <section id="readiness" className="section scroll-mt-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">Talent readiness</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Potential Is Important. Readiness Makes the Difference.</h2>
            <p className="mt-4 text-lg text-ink-soft">
              We help individuals move from aspiration toward demonstrated workplace capability — understanding where they fit, building what employers value and showing evidence of it.
            </p>
            <Link href="/talent" className="btn-primary mt-6">Start Your Career Readiness Journey <ArrowRight size={16} /></Link>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-paper p-6"><StepChain steps={readinessSteps} /></div>
            <Placeholder title="Active programs, talent cohorts and emerging pathways">
              Add current readiness programs here once they are scheduled and open for registration.
            </Placeholder>
          </div>
        </div>
      </section>

      {/* 6 — Why Conductivity */}
      <section id="why-conductivity" className="section scroll-mt-16 bg-ink text-white">
        <div className="container-x">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Why Conductivity?</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Because Talent Cannot Be Understood from One Side Alone.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Check className="text-spark" aria-hidden />
                <h3 className="mt-3 font-bold">{d.title}</h3>
                <p className="mt-2 text-sm text-white/75">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Talent pathways */}
      <section id="pathways" className="section scroll-mt-16">
        <div className="container-x">
          <SectionHead eyebrow="Talent pathways" title="Building Talent Pipelines for the Work That Matters." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pathways.map((p) => (
              <li key={p.title} className="card flex flex-col justify-between gap-4 !p-5">
                <h3 className="font-semibold">{p.title}</h3>
                {!p.active && <span className="w-fit rounded-full border border-dashed border-amber-400 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">Placeholder · status to be confirmed</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Impact & evidence. No statistics until they are verified. */}
      <section id="impact" className="section scroll-mt-16 bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Impact & evidence" title="From Talent Potential to Organizational Value." />
          <Placeholder title="Verified stories and evidence go here">
            <p>Each slot below needs a documented, approved example before launch. Do not add impact statistics until the underlying data is verified.</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {evidenceTypes.map((e) => <li key={e} className="rounded-lg bg-white/70 px-3 py-2">{e}</li>)}
            </ul>
          </Placeholder>
        </div>
      </section>

      {/* 9 — Knowledge & insights: three articles (employer intelligence, career readiness, future of work) + segmented newsletter. */}
      <section id="insights" className="section scroll-mt-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Knowledge & insights" title="Understanding Talent. Anticipating Work." />
            <Link href="/insights" className="mb-10 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">All insights <ArrowRight size={14} /></Link>
          </div>

          <Reveal className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
            {featured.map((f, n) => {
              const date = new Date(f.item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
              const href = f.item.body?.length ? `/insights/${f.item.slug}` : `/insights#${insightAnchor(f.item.category)}`;
              return n === 0 ? (
                // Lead article: employer intelligence.
                <Link key={f.item.slug} href={href} style={{ "--i": 0 } as CSSProperties}
                  className="reveal group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl bg-spark p-7 text-white lg:row-span-2 sm:p-9">
                  <SigmaMark className="-right-10 -top-12 h-72 w-auto -rotate-12 opacity-[0.08] transition duration-500 group-hover:rotate-0" />
                  <f.Icon size={30} className="relative mb-auto text-white/80" aria-hidden />
                  <p className="relative mt-10 text-xs font-bold uppercase tracking-wider text-white/70">{f.theme} · {date}</p>
                  <h3 className="relative mt-2 text-2xl font-bold leading-snug sm:text-3xl">{f.item.title}</h3>
                  <p className="relative mt-3 max-w-md text-white/80">{f.item.excerpt}</p>
                  <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2">Read more <ArrowRight size={14} /></span>
                </Link>
              ) : (
                <Link key={f.item.slug} href={href} style={{ "--i": n } as CSSProperties}
                  className="reveal group flex gap-5 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5 transition hover:ring-ink/15">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${f.tone}`}><f.Icon size={22} aria-hidden /></span>
                  <span className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-mute">{f.theme} · {date}</span>
                    <span className="mt-1.5 text-lg font-bold leading-snug">{f.item.title}</span>
                    <span className="mt-1.5 text-sm text-ink-mute">{f.item.excerpt}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark group-hover:gap-2">Read more <ArrowRight size={14} /></span>
                  </span>
                </Link>
              );
            })}
          </Reveal>
          <p className="mt-3 text-xs text-amber-800">Placeholder: sample articles — replace with original published insights.</p>

          {/* Segmented newsletter registration. */}
          <div className="relative mt-10 grid gap-8 overflow-hidden rounded-3xl bg-volt p-7 text-white sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <SigmaMark className="-bottom-20 -left-10 h-72 w-auto rotate-12 opacity-[0.08]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Newsletter</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Insights for your side of the talent equation</h3>
              <p className="mt-3 text-white/80">Tell us who you are and we&apos;ll only send what is relevant to you.</p>
            </div>
            <div className="relative"><NewsletterSignup /></div>
          </div>
        </div>
      </section>

      {/* 10 — Final conversion: one clear path per audience, each into its own form. */}
      <section id="get-started" className="relative scroll-mt-16 overflow-hidden bg-spark py-16 text-white sm:py-24">
        <SigmaMark className="-right-16 -top-24 h-[140%] w-auto -rotate-12 opacity-[0.08]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Get started</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">A Stronger Talent Future Starts with Better Connections.</h2>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tagline">
              {tagline.split(". ").map((w) => (
                <li key={w} className="rounded-full px-4 py-1.5 text-sm font-bold ring-1 ring-white/50">{w.replace(/\.$/, "")}</li>
              ))}
            </ul>
          </div>

          <Reveal>
            <ol className="space-y-4">
              {[
                { who: "For employers", text: "Tell us what talent your business needs.", ...ctas.employer, Icon: Building2, tile: "bg-volt", tone: "text-volt" },
                { who: "For individuals", text: "Discover how to build your readiness for opportunity.", ...ctas.talent, Icon: UserRound, tile: "bg-spark", tone: "text-spark-dark" },
                { who: "For partners", text: "Explore how we can develop talent together.", ...ctas.partner, Icon: Landmark, tile: "bg-ink", tone: "text-ink" },
              ].map((c, i) => (
                <li key={c.who} className="reveal" style={{ "--i": i } as CSSProperties}>
                  <Link href={c.href} className="group flex items-center gap-5 rounded-2xl bg-white p-5 text-ink shadow-card transition hover:translate-x-1 sm:p-6">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white ${c.tile}`}><c.Icon size={24} aria-hidden /></span>
                    <span className="flex-1">
                      <span className={`block text-xs font-bold uppercase tracking-wider ${c.tone}`}>{c.who}</span>
                      <span className="mt-1 block font-semibold leading-snug sm:text-lg">{c.text}</span>
                      <span className="mt-1 block text-sm text-ink-mute">{c.label}</span>
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition group-hover:scale-110 ${c.tile}`}>
                      <ArrowRight size={18} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
