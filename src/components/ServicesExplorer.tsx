"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Award, BadgeCheck, Blocks, Briefcase, Building2, CalendarRange, ChevronRight, ClipboardCheck, Crown,
  FileCheck2, FileSearch, FileText, Filter, Flag, Gauge, Globe2, Handshake, Landmark, Layers, LineChart, MessageCircle,
  MessagesSquare, Mic, Plane, Presentation, Repeat, Rocket, Route, ScrollText, Search, SearchCheck, Shirt, Sparkles,
  Target, TrendingUp, UserCheck, UserPlus, Users, Workflow, Wrench, type LucideIcon,
} from "lucide-react";
import { serviceGroups } from "@/data/site";

/** One icon per service, keyed by the exact wording in data/site.ts. Unknown items fall back to Sparkles. */
const itemIcon: Record<string, LucideIcon> = {
  "Career counselling": MessageCircle, "Career management": Briefcase, "Career assessment": ClipboardCheck,
  "Career planning": Route, "CV / resume development": FileText, "Interview preparation": Mic,
  "Professional grooming": Shirt, "Career transition": Repeat, "Placement support": UserCheck,
  "HR audit": SearchCheck, "HR policies and processes": ScrollText, "Recruitment / talent acquisition": UserPlus,
  "Performance management": Gauge, "Competency development": Layers, "Employee development": TrendingUp,
  "HR process improvement": Workflow,
  "Organizational assessment": FileSearch, "Organizational development": Building2, "Governance": Landmark,
  "Workforce planning": CalendarRange, "Competency frameworks": Blocks, "Performance improvement": LineChart,
  "Training needs analysis": Target,
  "Professional skills": Wrench, "Leadership": Crown, "Communication": MessagesSquare, "Career readiness": Rocket,
  "Employability": BadgeCheck, "Management": Users, "Customized corporate training": Presentation,
  "Employer requirement analysis": FileCheck2, "Talent identification": Search, "Assessment": ClipboardCheck,
  "Candidate matching": Handshake, "Selection support": Filter, "Placement": Flag,
  "International career opportunities": Globe2, "Talent mobility": Plane, "Career pathways": Award,
};

// Full-ring geometry (SVG units). The hovered name shows in the centre.
const R_OUT = 142, R_IN = 76, CX = 150, CY = 150, GAP = 3, W = 300, H = 300;
const rad = (d: number) => (d * Math.PI) / 180;
// Rounded so the server and the browser print identical numbers (raw trig differs in the last digits and breaks hydration).
const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (r: number, deg: number) => [r2(CX + r * Math.cos(rad(deg))), r2(CY + r * Math.sin(rad(deg)))] as const;

function sector(a0: number, a1: number) {
  const [x0, y0] = pt(R_OUT, a0), [x1, y1] = pt(R_OUT, a1), [x2, y2] = pt(R_IN, a1), [x3, y3] = pt(R_IN, a0);
  return `M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3}Z`;
}

function ServiceArc({ items, number }: { items: string[]; number: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  const step = 360 / items.length;

  // The ring is drawn at a fixed size; shrink it if the panel is ever narrower than that.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const HoverIcon = hover !== null ? itemIcon[items[hover]] ?? Sparkles : null;

  return (
    <>
      {/* Phones: no room for a ring, so plain icon tiles with their names always visible. */}
      <ul className="mt-6 grid grid-cols-3 gap-2.5 md:hidden">
        {items.map((it) => {
          const Icon = itemIcon[it] ?? Sparkles;
          return (
            <li key={it} className="flex flex-col items-center gap-1.5 rounded-2xl bg-brand px-2 py-3.5 text-center text-white">
              <Icon size={22} strokeWidth={1.6} />
              <span className="text-[10px] font-semibold leading-tight">{it}</span>
            </li>
          );
        })}
      </ul>

      <div ref={box} className="mt-2 hidden w-full md:block" style={{ height: H * scale }}>
        <div className="relative mx-auto origin-top" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 overflow-visible" role="list" aria-label="Services">
            {items.map((it, i) => {
              const a0 = -90 + i * step + GAP / 2, a1 = -90 + (i + 1) * step - GAP / 2;
              const mid = (a0 + a1) / 2;
              const [ix, iy] = pt((R_OUT + R_IN) / 2, mid);
              const on = hover === i;
              const Icon = itemIcon[it] ?? Sparkles;
              return (
                <g key={it} className="seg-in" style={{ transformOrigin: `${CX}px ${CY}px`, animationDelay: `${i * 70}ms` }}>
                  <g role="listitem" tabIndex={0} aria-label={it} className="cursor-pointer outline-none"
                    style={{ transform: on ? `translate(${r2(8 * Math.cos(rad(mid)))}px, ${r2(8 * Math.sin(rad(mid)))}px)` : "none", transition: "transform .2s ease" }}
                    onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
                    <path d={sector(a0, a1)} className={`transition-colors duration-200 ${on ? "fill-spark" : "fill-brand"}`} />
                    <Icon x={ix - 11} y={iy - 11} width={22} height={22} strokeWidth={1.7} color="#fff" pointerEvents="none" />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Centre of the ring: the category by default, the hovered service while hovering. */}
          <div aria-hidden className="pointer-events-none absolute grid w-[124px] -translate-x-1/2 -translate-y-1/2 place-items-center text-center" style={{ left: CX, top: CY }}>
            {HoverIcon && hover !== null ? (
              <>
                <HoverIcon size={22} strokeWidth={1.7} className="text-spark" />
                <span className="mt-1.5 text-xs font-bold leading-tight text-ink">{items[hover]}</span>
              </>
            ) : (
              <>
                <span className="text-4xl font-black tracking-tighter text-spark/30">{number}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-mute">{items.length} services</span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="mt-1 hidden text-[11px] text-ink-mute md:block">Hover over a tile to see the service.</p>
    </>
  );
}

/** One service area at a time instead of six long lists. Honours /services#hr style links. */
export default function ServicesExplorer() {
  const [active, setActive] = useState(serviceGroups[0].id);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (serviceGroups.some((s) => s.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const pick = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const index = serviceGroups.findIndex((s) => s.id === active);
  const current = serviceGroups[index];
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="py-6 sm:py-8 lg:pb-14">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[minmax(250px,300px)_1fr]">
        <div role="tablist" aria-label="Service areas" aria-orientation="vertical"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {serviceGroups.map((s, i) => {
            const on = s.id === active;
            return (
              <button key={s.id} role="tab" id={`tab-${s.id}`} aria-selected={on} aria-controls={`panel-${s.id}`}
                onClick={() => pick(s.id)}
                className={`group flex min-w-max items-center gap-3 rounded-2xl border px-3.5 py-3 text-left text-sm transition lg:min-w-0 ${
                  on ? "border-transparent bg-hero text-white shadow-card" : "border-ink/10 bg-white hover:border-spark/50"}`}>
                <span className={`text-xs font-bold tabular-nums ${on ? "text-hero-eyebrow" : "text-spark-dark"}`}>{String(i + 1).padStart(2, "0")}</span>
                <s.icon size={18} className={on ? "text-white" : "text-ink-mute"} />
                <span className="font-semibold">{s.title}</span>
                <ChevronRight size={16} className={`ml-auto hidden transition lg:block ${on ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} key={current.id}
          className="relative overflow-hidden rounded-3xl bg-paper p-5 ring-1 ring-ink/5 sm:px-8 sm:py-6">
          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-spark-light px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-spark-dark">{number} · {current.items.length} services</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{current.title}</h2>
            <p className="mt-1 max-w-lg text-sm text-ink-mute">{current.blurb}</p>

            <ServiceArc items={current.items} number={number} />

            <Link href="/contact" className="btn-primary mt-4 !px-4 !py-2 !text-[13px]">Talk to us about this <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
