import type { Metadata } from "next";
import { journey, SANJEEDA_URL, sanjeedaTools } from "@/data/site";

export const metadata: Metadata = { title: "Sanjeeda" };

const toolIcons: Record<string, string> = {
  Khudi: "M9 3h6v4H9zM7 5H5v16h14V5h-2M9 14l2 2 4-4",
  "3D CV": "M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7",
  Mentoring: "M15 8a3 3 0 11-6 0 3 3 0 016 0zM5 21a7 7 0 0114 0",
  Counselling: "M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.3A8 8 0 1121 12z",
  OfferGuide: "M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z",
  Placement: "M3 8h18v12H3zM8 8V5h8v3M3 13h18",
};

export default function Sanjeeda() {
  return (
    <>
      <section className="relative overflow-hidden bg-white text-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex select-none items-center justify-end pr-4 lg:pr-[8%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sanjeeda-icon.png" alt="" className="w-64 opacity-[0.69] sm:w-80 lg:w-[22rem]" />
        </div>
        
        <div className="container-x relative grid items-center gap-12 py-16 sm:pb-2 sm:pt-10 lg:grid-cols-2">
          <div>
          <h1 className="mt-3">
            <span className="sr-only">Conductivity Career-Readiness Initiative: Sanjeeda!</span>
            <span aria-hidden className="flex items-center gap-3 sm:gap-6">
              <span className="flex flex-col items-center gap-0.5 sm:gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sanjeeda-logo.png" alt="" 
                   className="mr-1 h-8 w-36 shrink-0 object-contain 
                   sm:h-12 
                   sm:w-56 
                   lg:h-12 
                   lg:w-56 
                   xl:h-12 
                   xl:w-64" />
                <span 
                  className="mr-5 whitespace-nowrap font-sans text-[9px] -mt-2
                  font-semibold leading-tight text-[#FF0000] sm:text-xs lg:text-sm xl:text-base">
                  Career-Readiness Initiative
                </span>
              </span>
            </span>
          </h1>
          <p className="ml-3 mt-3  max-w-2xl text-sm text-ink-soft">
           helps individuals understand themselves, prepare professionally, navigate career opportunities and keep developing throughout their careers.
          </p>
          <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" 
          className="btn-sanj mt-4 ml-3 bg-[#fd0000]">Explore Sanjeeda </a>
          </div>
  
        </div>
      </section>

      <section className="section sm:pt-6">
     
      </section>

      <section className="section bg-paper !py-0">
        <div className="container-x relative">
          <ol className="grid gap-0 lg:grid-cols-6">
            {journey.map((j, i) => (
              <li key={j.stage} className="relative flex h-24 items-center gap-3 overflow-hidden lg:block lg:h-48 lg:gap-0">
                <span aria-hidden className="block w-20 shrink-0 text-center 
                text-[8rem] font-black leading-[0.72] text-[#FF0000]/[0.06] 
                lg:absolute lg:left-0 lg:top-3 lg:w-auto lg:text-left lg:text-[14rem]"
                  style={{ fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif', WebkitTextStroke: '2px rgba(255,0,0,0.55)' }}>{i + 1}</span>
                <div className="relative lg:absolute lg:left-6 lg:right-2 lg:top-16">
                  <h3 className="text-lg font-black text-red-600 [text-shadow:0_0_6px_rgb(var(--paper)),0_0_2px_rgb(var(--paper))]">
                    {j.stage}
                  </h3>
                  <p className="mt-2
                   text-sm font-semibold leading-snug text-ink [text-shadow:0_0_6px_rgb(var(--paper)),0_0_2px_rgb(var(--paper))]">{j.purpose.split(" ").map((w) => (<span key={w} className="block">{w}</span>))}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tools" className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF0000]">Everything in one place</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">What&apos;s inside</h2>
            <ul className="mt-8 divide-y divide-ink/10">
              {sanjeedaTools.map((t, i) => {
                const red = i % 2 === 0;
                return (
                  <li key={t.name} className="flex items-start gap-4 py-3.5">
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${red ? "bg-[#FF0000]" : "bg-[#2860bb]"}`}>
                      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={toolIcons[t.name]} /></svg>
                    </span>
                    <div>
                      <h3 className={`font-bold ${red ? "text-[#FF0000]" : "text-[#2860bb]"}`}>{t.name}</h3>
                      <p className="text-sm text-ink-mute">{t.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div aria-hidden className="mx-auto flex flex-col gap-2">
            {[[0, 1, 2], [5, 4, 3]].map((row, r) => (
              <div key={r} className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {row.map((i, k) => {
                    const t = sanjeedaTools[i];
                    const red = i % 2 === 0;
                    return (
                      <div key={t.name} className="flex items-center gap-1 sm:gap-2">
                        <div className={`flex aspect-square w-[22vw] max-w-[6.5rem] flex-col items-center justify-center rounded-full text-center ring-2 transition hover:scale-105 ${red ? "bg-[#FF0000]/[0.07] ring-[#FF0000]/40" : "bg-[#2860bb]/[0.08] ring-[#2860bb]/40"}`}>
                          <svg viewBox="0 0 24 24" className={`h-5 w-5 ${red ? "text-[#FF0000]" : "text-[#2860bb]"}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={toolIcons[t.name]} /></svg>
                          <span className={`mt-0.5 text-[10px] font-bold sm:text-xs ${red ? "text-[#FF0000]" : "text-[#2860bb]"}`}>{t.name}</span>
                        </div>
                        {k < row.length - 1 && (
                          <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 text-ink/40 ${r === 1 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                {r === 0 && (
                  <div className="flex justify-end pr-[10vw] sm:pr-10">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v15M6 13l6 6 6-6" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
