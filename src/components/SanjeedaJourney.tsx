"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Compass, FileText, Link2, MessagesSquare, Scale, TrendingUp, type LucideIcon } from "lucide-react";
import { journey, SANJEEDA_URL } from "@/data/site";

/** One icon per stage, in the same order as `journey` in data/site.ts. */
const stageIcons: LucideIcon[] = [Compass, FileText, MessagesSquare, Scale, Link2, TrendingUp];

/** Sanjeeda promo: six steps rise like a staircase toward "Grow". Hover (or focus) a step to see what it does. */
export default function SanjeedaJourney() {
  const [active, setActive] = useState<number | null>(null);
  const shown = active ?? journey.length - 1;
  const last = journey.length - 1;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(115deg,#0b163f_0%,#1746b5_100%)] py-8 text-white sm:py-10">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#4183d4]/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#4183d4]/30 blur-3xl" />

      <div className="container-x relative grid items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8eb4ff]">Sanjeeda · by Conductivity</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Become ready for the <span className="text-[#ff707a]">opportunities</span> that matter.
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/75">A guided journey from self-understanding to career growth.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn bg-[#e83444] text-white hover:bg-[#c92b3a] focus-visible:outline-[#e83444]">Explore Sanjeeda <ArrowUpRight size={16} /></a>
            <Link href="/sanjeeda" className="btn-ghost">How it works</Link>
          </div>
        </div>

        <div>
          {/* Staircase: bars get taller left to right. On phones the steps become a tidy 3-column grid instead. */}
          <ol className="grid grid-cols-3 gap-2.5 sm:h-48 sm:grid-cols-6 sm:items-end sm:gap-2">
            {journey.map((j, i) => {
              const Icon = stageIcons[i] ?? TrendingUp;
              const on = i === shown;
              return (
                <li key={j.stage} className="sm:contents">
                  <button type="button" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)} onBlur={() => setActive(null)} onClick={() => setActive(i)}
                    aria-label={`${j.stage}: ${j.purpose}`}
                    style={{ ["--h" as string]: `${38 + i * 12}%` }}
                    className={`flex w-full flex-col justify-between rounded-xl p-2.5 text-left outline-none ring-1 transition duration-200 sm:h-[var(--h)] sm:rounded-b-md sm:rounded-t-3xl ${
                      on ? "bg-[#e83444] text-white ring-white/50 sm:-translate-y-1" : "bg-white/10 text-white/90 ring-white/15 hover:bg-white/20"}`}>
                    <span className={`text-xs font-bold tabular-nums ${on ? "text-white" : "text-[#8eb4ff]"}`}>0{i + 1}</span>
                    <span className="mt-3 flex flex-col gap-1.5 sm:mt-0">
                      <Icon size={18} strokeWidth={1.7} />
                      <span className="text-xs font-semibold">{j.stage}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The caption follows whichever step is hovered; when idle it rests on the final step. */}
          <div aria-live="polite" className="mt-3 rounded-xl bg-[#0b163f]/40 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#ff707a]">0{shown + 1} · {journey[shown].stage}{shown === last && active === null ? " · where it leads" : ""}</p>
            <p className="mt-0.5 text-sm font-semibold">{journey[shown].purpose}</p>
            <p className="text-xs text-white/70">{journey[shown].example}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
