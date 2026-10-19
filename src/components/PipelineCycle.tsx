"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { pipelineStages } from "@/data/blueprint";

// Five stages placed around a circle (starting at the top, clockwise), joined by arrowed arcs so it reads as a cycle, not a funnel.
const R = 38;
const angle = (i: number) => (-90 + i * 72) * (Math.PI / 180);
const pt = (deg: number) => ({ x: 50 + R * Math.cos(deg), y: 50 + R * Math.sin(deg) });
const GAP = 0.24; // radians kept clear around each node

export default function PipelineCycle({ showLink = true }: { showLink?: boolean }) {
  const [active, setActive] = useState(0);
  const s = pipelineStages[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
        <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
          <defs>
            <marker id="cycle-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" className="fill-spark" />
            </marker>
          </defs>
          {pipelineStages.map((_, i) => {
            const a = pt(angle(i) + GAP), b = pt(angle(i + 1) - GAP);
            return <path key={i} d={`M${a.x} ${a.y} A${R} ${R} 0 0 1 ${b.x} ${b.y}`} fill="none" strokeWidth="0.8"
              className="stroke-spark/60" markerEnd="url(#cycle-arrow)" />;
          })}
        </svg>

        <div className="absolute inset-0 grid place-items-center text-center">
          <div className="max-w-[9rem]">
            <RefreshCw size={22} aria-hidden className="mx-auto text-spark" />
            <p className="mt-1 text-sm font-bold leading-tight">The Conductivity Talent Pipeline</p>
            <p className="mt-0.5 text-[11px] text-ink-mute">A continuous cycle</p>
          </div>
        </div>

        {pipelineStages.map((st, i) => {
          const p = pt(angle(i));
          const on = i === active;
          return (
            <button key={st.name} type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={on}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-[10px] font-bold shadow-card ring-4 ring-white transition sm:h-20 sm:w-20 sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark
                ${on ? "scale-110 bg-spark text-white" : "bg-white text-ink hover:bg-spark-light"}`}>
              <st.icon size={18} aria-hidden />
              <span className="mt-0.5">{i + 1}. {st.name}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="card">
        <p className="eyebrow">Stage {active + 1} of 5</p>
        <h3 className="mt-1 text-2xl font-bold">{s.name}</h3>
        <p className="text-ink-mute">{s.purpose}</p>
        <p className="mt-3 text-ink-soft">{s.summary}</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-paper p-4">
            <dt className="text-xs font-bold uppercase tracking-wider text-volt">For organizations</dt>
            <dd className="mt-1 text-sm text-ink-soft">{s.client}</dd>
          </div>
          <div className="rounded-xl bg-paper p-4">
            <dt className="text-xs font-bold uppercase tracking-wider text-spark-dark">For individuals</dt>
            <dd className="mt-1 text-sm text-ink-soft">{s.candidate}</dd>
          </div>
        </dl>
        {showLink && (
          <Link href="/our-model" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">
            See the complete model <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
