import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Users, Network, Calculator, CircleHelp } from "lucide-react";
import { EventCard, Photo, SectionHead } from "@/components/ui";
import HowWeWork from "@/components/HowWeWork";
import SanjeedaJourney from "@/components/SanjeedaJourney";
import { events, facilities, insights } from "@/data/site";

export default function Home() {
  const upcoming = events.filter((e) => e.upcoming).slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-white text-ink">
        <div className="container-x relative grid items-center gap-10 py-8 lg:grid-cols-2 lg:py-10">
          <div>
            <p className="text-lg font-bold tracking-tight text-ink sm:text-xl">
              <span className="text-3xl font-black text-[#2860bb] sm:text-3xl" style={{ fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif' }}>
              C<span className="text-[#FF0000]">σ</span>nductivity</span> </p>
              <p className=" font-medium text-sm px-4">Consultancy (Pvt.) Ltd.</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-red-600 tracking-tight sm:text-5xl">Building Successful Businesses <span className="text-red-600">since 2005</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed">
              Conductivity Consultancy (Pvt.) Ltd. excel at understanding client requirement and delivering tailored solutions. We are known for our HR assessments (HR Audit), Organization Management solutions (governance), and Human Capital Services.
            </p>
            <div className="mt-6 flex max-w-xl flex-col gap-4">
              {[
                { Icon: Users, title: "Human Resource Services", text: "You focus on your core business and we focus on your HR." },
                { Icon: Network, title: "Organizational Structure", text: "We enable retention of knowledge, skills and abilities at organization level." },
                { Icon: Calculator, title: "Accounts & Advisory", text: "For business leaders who want to obtain a fair insight in the system." },
              ].map((s) => (
                <div key={s.title} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-white"><s.Icon size={18} aria-hidden /></span>
                  <div><h3 className="text-base font-semibold text-[#2860bb]">{s.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-soft">{s.text}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn-primary">Explore Services</Link>
            </div>
          </div>
          <Photo label="Team & workspace hero image" className="aspect-[4/3] w-full" />
        </div>
      </section>

      <section className="section relative overflow-hidden !py-8 bg-[#f5f5f5]">
        <CircleHelp aria-hidden strokeWidth={1.5} className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-[#2860bb]/10" />
        <div className="container-x relative grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mt-14 text-3xl font-bold tracking-tight text-[#FF0000] underline decoration-[#212122] decoration-2 underline-offset-8 sm:text-4xl">WE ARE CONSULTANTS</h2>
          </div>
          <div>
            <p className="pt-6 text-base leading-relaxed text-ink-soft">
            <span aria-hidden className="inline-block w-0 overflow-visible align-baseline font-serif text-6xl font-black leading-[0] text-[#FF0000]">“</span>
            Conductivity Consultancy (Pvt.) Ltd. has been offering professional outsourced consultation, career counselling and HR services to growing enterprises, companies, and technology firms for years not only in Pakistan but have served to international clients as well. We’re here to make sure your organization stays successful, productive, and safe. <span aria-hidden className="inline-block align-[-0.45em] font-serif text-6xl font-black leading-[0] text-[#FF0000]">”</span>
            </p>
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

      <SanjeedaJourney />

      <HowWeWork />

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

    </>
  );
}
