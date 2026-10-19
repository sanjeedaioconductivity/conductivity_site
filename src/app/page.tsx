import Link from "next/link";
import { ArrowRight, ArrowDown, Building2, UserRound, Landmark, Check } from "lucide-react";
import { Placeholder, SectionHead, StepChain } from "@/components/ui";
import PipelineCycle from "@/components/PipelineCycle";
import NewsletterSignup from "@/components/NewsletterSignup";
import { category, ctas, differentiators, evidenceTypes, pathways, readinessSteps, solutions, tagline } from "@/data/blueprint";
import { insights } from "@/data/site";

// Homepage, following the ten sections of the website blueprint (§6).
export default function Home() {
  // One article each for employers, careers and the future of work. TODO(content): replace the sample articles with real ones.
  const featured = ["workforce-planning", "cv-mistakes", "skills-that-last"]
    .map((slug) => insights.find((i) => i.slug === slug)!).filter(Boolean);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-spark/10 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow">{category}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Talent Ready for Opportunity. <span className="text-spark">Organizations Ready for Talent.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              We connect the world of work with the world of talent. From understanding organizational needs to developing individual capabilities, Conductivity builds pipelines that help people become opportunity-ready and organizations become talent-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ctas.employer.href} className="btn-primary">Build Your Talent Pipeline <ArrowRight size={16} /></Link>
              <Link href={ctas.talent.href} className="btn-outline">Explore Your Career Path</Link>
            </div>
            <p className="mt-8 text-sm text-ink-mute">
              Talent Intelligence · Career Readiness · Recruitment · Workforce Development · Global Opportunities
            </p>
          </div>

          {/* The connection from §2.3: employer demand ↔ Conductivity ↔ individual potential. TODO(design): pair with authentic photography once available. */}
          <div className="mx-auto w-full max-w-md">
            <div className="card flex items-center gap-4">
              <Building2 className="shrink-0 text-volt" aria-hidden />
              <div><p className="text-xs font-bold uppercase tracking-wider text-volt">Employer demand</p><p className="text-sm text-ink-soft">Capability requirements</p></div>
            </div>
            <ArrowDown aria-hidden className="mx-auto my-2 text-spark" />
            <div className="rounded-2xl bg-spark p-6 text-white shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">Conductivity</p>
              <p className="mt-1 font-semibold">Talent intelligence, readiness &amp; alignment</p>
            </div>
            <ArrowDown aria-hidden className="mx-auto my-2 rotate-180 text-spark" />
            <div className="card flex items-center gap-4">
              <UserRound className="shrink-0 text-spark-dark" aria-hidden />
              <div><p className="text-xs font-bold uppercase tracking-wider text-spark-dark">Individual potential</p><p className="text-sm text-ink-soft">Competencies &amp; aspirations</p></div>
            </div>
            <p className="mt-5 text-center text-xs text-ink-mute">Opportunity matching → Deployment → Development → Talent continuity</p>
          </div>
        </div>
      </section>

      {/* 2 — Two sides, one purpose */}
      <section className="section bg-paper">
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
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="The talent pipeline" title="We Do More Than Fill Vacancies."
            text="Hiring is an event. Talent development is a process. A sustainable talent pipeline connects both." />
          <PipelineCycle />
        </div>
      </section>

      {/* 4 — Solutions */}
      <section className="section bg-paper">
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
      <section className="section">
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
      <section className="section bg-ink text-white">
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
      <section className="section">
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
      <section className="section bg-paper">
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

      {/* 9 — Knowledge & insights */}
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <SectionHead eyebrow="Knowledge & insights" title="Understanding Talent. Anticipating Work." />
            <Link href="/insights" className="btn-outline mb-10 hidden sm:inline-flex">All insights</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((i) => (
              <Link key={i.slug} href="/insights" className="card transition hover:-translate-y-0.5">
                <span className="text-xs font-semibold text-spark-dark">{i.category}</span>
                <h3 className="mt-2 font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm text-ink-mute">{i.excerpt}</p>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-amber-800">Placeholder: sample articles — replace with original published insights.</p>
          <div className="mt-10 rounded-2xl bg-paper p-6 sm:p-8">
            <h3 className="text-lg font-bold">Get insights for your side of the talent equation</h3>
            <p className="mb-4 mt-1 text-sm text-ink-mute">Choose what you are, and we&apos;ll send what is relevant to you.</p>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* 10 — Final conversion */}
      <section className="relative overflow-hidden bg-spark py-16 text-white sm:py-20">
        <div className="container-x relative">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">A Stronger Talent Future Starts with Better Connections.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { who: "For employers", text: "Tell us what talent your business needs.", ...ctas.employer, Icon: Building2 },
              { who: "For individuals", text: "Discover how to build your readiness for opportunity.", ...ctas.talent, Icon: UserRound },
              { who: "For partners", text: "Explore how we can develop talent together.", ...ctas.partner, Icon: Landmark },
            ].map((c) => (
              <Link key={c.who} href={c.href} className="group rounded-2xl bg-white p-6 text-ink shadow-card transition hover:-translate-y-0.5">
                <c.Icon className="text-spark" aria-hidden />
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-spark-dark">{c.who}</p>
                <p className="mt-1 font-semibold">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark group-hover:gap-2">{c.label} <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-white/85">{tagline}</p>
        </div>
      </section>
    </>
  );
}
