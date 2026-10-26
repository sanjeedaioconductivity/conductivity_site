"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Landmark, UserRound } from "lucide-react";
import Reveal from "@/components/Reveal";
import { audiences, type Audience } from "@/data/blueprint";

const look: Record<Audience["id"], { Icon: typeof Building2; tone: string; solid: string; soft: string; ring: string }> = {
  employers: { Icon: Building2, tone: "text-volt", solid: "bg-volt text-white", soft: "bg-volt-light text-volt", ring: "ring-volt" },
  talent: { Icon: UserRound, tone: "text-spark-dark", solid: "bg-spark text-white", soft: "bg-spark-light text-spark-dark", ring: "ring-spark" },
  partners: { Icon: Landmark, tone: "text-ink", solid: "bg-ink text-white", soft: "bg-paper text-ink", ring: "ring-ink" },
};

/** Homepage intent picker (§4): visitors say who they are and get the right pathway straight away. */
export function AudiencePaths() {
  const [active, setActive] = useState<Audience["id"]>("employers");
  const a = audiences.find((x) => x.id === active)!;
  const l = look[a.id];

  return (
    <Reveal>
      <div role="tablist" aria-label="Who are you?" className="reveal grid gap-3 md:grid-cols-3">
        {audiences.map((x) => {
          const xl = look[x.id];
          const on = x.id === active;
          return (
            <button key={x.id} role="tab" aria-selected={on} aria-controls="audience-panel" onClick={() => setActive(x.id)}
              className={`flex items-center gap-4 rounded-2xl p-5 text-left transition ${on ? `${xl.solid} shadow-card` : "bg-white ring-1 ring-ink/10 hover:ring-ink/25"}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${on ? "bg-white/15" : xl.soft}`}><xl.Icon size={20} aria-hidden /></span>
              <span>
                <span className={`block text-[11px] font-bold uppercase tracking-wider ${on ? "text-white/75" : "text-ink-mute"}`}>{x.priority} audience · {x.label}</span>
                <span className="mt-0.5 block font-semibold leading-snug">{x.headline}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="audience-panel" role="tabpanel" key={a.id} className="reveal mt-4 grid gap-8 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8 lg:grid-cols-[1.3fr_1fr]" style={{ "--i": 1 } as CSSProperties}>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${l.tone}`}>This pathway is for</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {a.segments.map((s) => (
              <li key={s} className="flex gap-2 text-sm"><Check size={16} className={`mt-0.5 shrink-0 ${l.tone}`} aria-hidden />{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper p-5">
          <p className={`text-xs font-bold uppercase tracking-wider ${l.tone}`}>Your next step</p>
          <ul className="mt-3 space-y-2">
            {a.conversions.map((c) => (
              <li key={c.label}>
                <Link href={c.href} className="group flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm font-semibold ring-1 ring-ink/5 transition hover:ring-ink/20">
                  {c.label} <ArrowRight size={14} className={`${l.tone} transition group-hover:translate-x-1`} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={a.href} className={`btn mt-4 w-full ${l.solid} hover:opacity-90`}>{a.cta} <ArrowRight size={16} /></Link>
        </div>
      </div>
    </Reveal>
  );
}

/** Landing-page block (§4): who this pathway is for and the actions it leads to. */
export function AudienceFit({ id }: { id: Audience["id"] }) {
  const a = audiences.find((x) => x.id === id)!;
  const l = look[id];
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="reveal">
        <p className="eyebrow">Who this is for</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{a.label}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {a.segments.map((s) => (
            <li key={s} className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-sm font-medium shadow-card ring-1 ring-ink/5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${l.soft}`}><Check size={14} aria-hidden /></span>{s}
            </li>
          ))}
        </ul>
      </div>
      <div className={`reveal self-start rounded-3xl p-6 sm:p-8 ${l.solid}`} style={{ "--i": 1 } as CSSProperties}>
        <p className="text-xs font-bold uppercase tracking-wider text-white">Your next step</p>
        <ul className="mt-4 space-y-2">
          {a.conversions.map((c) => (
            <li key={c.label}>
              <Link href={c.href} className="group flex items-center justify-between rounded-xl bg-black/15 px-4 py-3 text-sm font-semibold transition hover:bg-black/25">
                {c.label} <ArrowRight size={14} className="transition group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
