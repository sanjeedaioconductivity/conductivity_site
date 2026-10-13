import type { Metadata } from "next";
import { journey, SANJEEDA_URL, sanjeedaTools } from "@/data/site";

export const metadata: Metadata = { title: "Sanjeeda" };

function Wordmark() {
  return (
    <span className="text-[1em] font-black tracking-normal text-[#2860bb]" style={{ fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif', fontWeight: 900 }}>
      Sanjeed<span className="text-[#FF0000]">a!</span>
    </span>
  );
}

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
        <span aria-hidden className="pointer-events-none absolute 
        inset-0 flex items-center justify-start pl-[70%] select-none text-[16rem] 
        font-black leading-none text-[#FF0000]/[0.69] sm:text-[20rem]" 
        style={{ fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif' }}>a!
        </span>
        
        <div className="container-x relative grid items-center gap-12 py-16 sm:pb-2 sm:pt-10 lg:grid-cols-2">
          <div>
          <h1 className="mt-3 flex flex-col gap-3 font-bold leading-tight tracking-tight sm:flex-row sm:items-center sm:gap-3">
            <span className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl">
              <Wordmark />
            </span>
            <span aria-hidden className="hidden h-24 w-0.5 lg:h-14 rounded bg-ink/40 sm:block" />
            <span className="flex flex-col gap-1 leading-none">
              <span className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-black tracking-normal text-[#2860bb]"
              style={{ fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif', fontWeight: 900 }}>
              C<span className="text-[#FF0000]">σ</span>nductivity&apos;s
              </span>
              <span className="self-start rounded-sm bg-[#FF0000] px-2 py-1 font-sans text-sm font-semibold text-white sm:text-lg lg:text-xl">Career-Readiness Initiative</span>
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
           helps individuals understand themselves, prepare professionally, navigate career opportunities and keep developing throughout their careers.
          </p>
          <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj mt-4 bg-[#2860bb]">Explore Sanjeeda  ↗</a>
          </div>
  
        </div>
      </section>

      <section className="section sm:pt-6">
     
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanj">The Sanjeeda journey</p>
          <h2 className="mb-12 mt-2 text-3xl font-bold tracking-tight">Six steps from discovery to growth.</h2>
          <ol className="grid gap-0 lg:grid-cols-6">
            {journey.map((j, i) => (
              <li key={j.stage} className="relative flex gap-4 pb-8 last:pb-0 lg:block lg:pb-0 lg:pr-4 lg:text-left">
                {i < journey.length - 1 && (
                  <span aria-hidden className="absolute left-5 top-10 h-full w-0.5 -translate-x-1/2 bg-[#FF0000]/25 lg:left-5 lg:top-5 lg:h-0.5 lg:w-full lg:translate-x-0 lg:-translate-y-1/2" />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-sm font-bold text-white ring-4 ring-paper">{i + 1}</span>
                <div className="lg:mt-4">
                  <h3 className="text-lg font-bold text-[#2860bb]">{j.stage}</h3>
                  <p className="mt-0.5 text-sm font-medium text-[#2860bb] lg:min-h-10">{j.purpose}</p>
                  <p className="mt-1.5 text-sm font-medium text-[#FF0000]">{j.example}</p>
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
