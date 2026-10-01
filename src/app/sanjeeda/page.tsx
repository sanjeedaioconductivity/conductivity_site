import type { Metadata } from "next";
import { journey, SANJEEDA_URL, sanjeedaTools } from "@/data/site";

export const metadata: Metadata = { title: "Sanjeeda" };

export default function Sanjeeda() {
  return (
    <>
      <section className="bg-sanj-deep text-white">
        <div className="container-x py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanj-light">Backed by Conductivity</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Sanjeeda — Conductivity&apos;s Career-Readiness Initiative</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Sanjeeda helps individuals understand themselves, prepare professionally, navigate career opportunities and keep developing throughout their careers.
          </p>
          <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj mt-8">Explore Sanjeeda ↗</a>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanj">Why Sanjeeda exists</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">A focused digital experience inside a broader ecosystem.</h2>
          </div>
          <div className="space-y-4 text-lg text-ink-soft">
            <p>Conductivity is the ecosystem — career, HR, talent, training and organizations. Sanjeeda is the career-readiness layer within it.</p>
            <div className="rounded-2xl bg-sanj-light p-5 text-center text-base font-semibold text-sanj-deep">
              CONDUCTIVITY · Career &amp; HR ecosystem<br /><span aria-hidden>↓</span><br />SANJEEDA · Career-readiness ecosystem
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanj">The Sanjeeda journey</p>
          <h2 className="mb-10 mt-2 text-3xl font-bold tracking-tight">Discover → Prepare → Guide → Evaluate → Connect → Grow</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((j, i) => (
              <li key={j.stage} className="card border-t-4 border-sanj">
                <span className="text-sm font-bold text-sanj">0{i + 1}</span>
                <h3 className="mt-1 text-xl font-semibold uppercase tracking-wide">{j.stage}</h3>
                <p className="mt-1 font-medium">{j.purpose}</p>
                <p className="mt-2 text-sm text-ink-mute">{j.example}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tools" className="section">
        <div className="container-x">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">What&apos;s inside</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sanjeedaTools.map((t) => (<div key={t.name} className="card"><h3 className="font-semibold text-sanj">{t.name}</h3><p className="mt-1.5 text-sm text-ink-mute">{t.text}</p></div>))}
          </div>
          <div className="mt-10 text-center"><a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj">Go to the Sanjeeda platform ↗</a></div>
        </div>
      </section>
    </>
  );
}
