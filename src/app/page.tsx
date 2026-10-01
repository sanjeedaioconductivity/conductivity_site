import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { CtaBand, EventCard, Photo, SectionHead } from "@/components/ui";
import { events, facilities, howWeWork, insights, journey, SANJEEDA_URL, serviceGroups } from "@/data/site";

export default function Home() {
  const upcoming = events.filter((e) => e.upcoming).slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-spark/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-volt/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-spark">Career · HR · Talent · Organizations</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">Connecting people, organizations and opportunity.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Conductivity is a connected career and HR ecosystem — helping people grow, organizations perform, and the right talent meet the right opportunity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn-primary">Explore Services</Link>
              <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj">Explore Sanjeeda</a>
              <Link href="/contact" className="btn-ghost">Contact Us</Link>
            </div>
          </div>
          <Photo label="Team & workspace hero image" className="aspect-[4/3] w-full" />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">More than recruitment. A connected system.</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft">
            People bring capability and potential. Organizations create environments and requirements. Opportunities provide direction. Conductivity connects all three so they can produce better outcomes — through careers, HR, talent, training, organizational development and mobility.
          </p>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Six service areas, one ecosystem" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} className="card group transition hover:-translate-y-0.5">
                <s.icon className="text-spark-dark" size={28} />
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink-mute">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark group-hover:gap-2">Learn more <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Two sides, one ecosystem" title="People ↔ Organizations" center />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card">
              <h3 className="text-xl font-semibold">For people</h3>
              <p className="mt-2 text-ink-soft">Career counselling, assessment, CV and interview preparation, placement and international pathways.</p>
              <Link href="/services#career" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark">Career services <ArrowRight size={14} /></Link>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold">For organizations</h3>
              <p className="mt-2 text-ink-soft">HR consulting, organizational development, tailored training and talent solutions that fit your requirements.</p>
              <Link href="/services#hr" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark">HR &amp; talent services <ArrowRight size={14} /></Link>
            </div>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-mute">
            {["Careers ↔ HR", "Talent ↔ Opportunities", "Development ↔ Performance"].map((t) => (<span key={t} className="inline-flex items-center gap-1.5"><ArrowLeftRight size={14} />{t}</span>))}
          </p>
        </div>
      </section>

      <section className="section bg-sanj-deep text-white">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanj-light">Sanjeeda · by Conductivity</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Become ready for the opportunities that matter.</h2>
              <p className="mt-4 text-lg text-white/75">Sanjeeda is Conductivity&apos;s career-readiness platform — a guided journey from self-understanding to career growth.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj">Explore Sanjeeda ↗</a>
                <Link href="/sanjeeda" className="btn-ghost">How it works</Link>
              </div>
            </div>
            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {journey.map((j, i) => (
                <li key={j.stage} className="rounded-xl bg-white/10 p-4">
                  <span className="text-xs text-sanj-light">0{i + 1}</span>
                  <p className="font-semibold">{j.stage}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="How we work" title="Understand → Assess → Develop → Connect → Deliver" />
          <ol className="grid gap-4 md:grid-cols-5">
            {howWeWork.map((h, i) => (
              <li key={h.step} className="card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-spark-light text-sm font-bold text-spark-dark">{i + 1}</span>
                <h3 className="mt-3 font-semibold">{h.step}</h3>
                <p className="mt-1 text-sm text-ink-mute">{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <SectionHead eyebrow="Latest events" title="What's happening" />
            <Link href="/events" className="btn-outline mb-10 hidden sm:inline-flex">All events</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">{upcoming.map((e) => <EventCard key={e.slug} e={e} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <Photo label="Training room" className="aspect-square" />
            <Photo label="Counselling space" className="aspect-square translate-y-6" />
          </div>
          <div>
            <p className="eyebrow">Facilities</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Spaces built for learning and conversation</h2>
            <p className="mt-3 text-lg text-ink-mute">{facilities.slice(0, 4).map((f) => f.title).join(" · ")}</p>
            <Link href="/facilities" className="btn-dark mt-6">See our spaces</Link>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="Insights" title="Latest knowledge" />
          <div className="grid gap-5 md:grid-cols-3">
            {insights.slice(0, 3).map((i) => (
              <Link key={i.slug} href="/insights" className="card transition hover:-translate-y-0.5">
                <span className="text-xs font-semibold text-spark-dark">{i.category}</span>
                <h3 className="mt-2 font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm text-ink-mute">{i.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's connect the right people and opportunities." text="Tell us what you need — a career plan, an HR project, a training program or a talent search." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Explore Services", href: "/services" }} />
    </>
  );
}
