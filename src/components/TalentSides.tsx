import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, Building2, UserRound, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";
import { connectedJourney, connectionPoint, talentSides } from "@/data/blueprint";

type Side = keyof typeof talentSides;
const sideStyle = {
  client: { Icon: Building2, tone: "text-volt", bar: "bg-volt", chip: "bg-volt-light text-volt", who: "For organizations", cta: "Explore employer solutions" },
  candidate: { Icon: UserRound, tone: "text-spark-dark", bar: "bg-spark", chip: "bg-spark-light text-spark-dark", who: "For individuals", cta: "Explore talent solutions" },
};

function SideCard({ side, i }: { side: Side; i: number }) {
  const s = talentSides[side];
  const st = sideStyle[side];
  return (
    <div className="reveal card relative flex flex-col overflow-hidden !p-0" style={{ "--i": i } as CSSProperties}>
      <div className={`h-1.5 ${st.bar}`} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <st.Icon className={st.tone} aria-hidden />
          <p className={`text-xs font-bold uppercase tracking-wider ${st.tone}`}>{s.label}</p>
        </div>
        <p className="mt-2 text-sm text-ink-mute">{s.audience}</p>
        <ol className="mt-5 flex-1 space-y-2.5">
          {s.questions.map((q, n) => (
            <li key={q} className="flex gap-3 text-sm">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${st.chip}`}>{n + 1}</span>
              <span className="font-medium">{q}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-mute">How Conductivity responds</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {s.responses.map((r) => <li key={r} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${st.chip}`}>{r}</li>)}
        </ul>
        <Link href={s.href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">{st.cta} <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}

/** §2.1–2.3: both sides of talent with Conductivity at the point where they connect. */
export function TwoSidesBridge() {
  return (
    <Reveal className="grid items-stretch gap-5 lg:grid-cols-[1fr_15rem_1fr]">
      <SideCard side="client" i={0} />
      <div className="reveal flex flex-col items-center justify-center gap-3 text-center" style={{ "--i": 1 } as CSSProperties}>
        {/* Each label points at its own side: left to organizations, right to individuals (up/down when stacked). */}
        <p className="flex w-full items-center gap-2 rounded-xl bg-volt-light px-3 py-2 text-left text-xs font-semibold text-volt">
          <ArrowLeft size={16} className="hidden shrink-0 lg:block" aria-hidden /><ArrowUp size={16} className="shrink-0 lg:hidden" aria-hidden />
          {connectionPoint.employer}
        </p>
        <ArrowUpDown size={18} className="text-spark" aria-hidden />
        <div className="w-full rounded-2xl bg-spark p-5 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Conductivity</p>
          <p className="mt-1 font-semibold leading-snug">{connectionPoint.core}</p>
        </div>
        <ArrowUpDown size={18} className="text-spark" aria-hidden />
        <p className="flex w-full items-center gap-2 rounded-xl bg-spark-light px-3 py-2 text-left text-xs font-semibold text-spark-dark">
          <span className="flex-1">{connectionPoint.individual}</span>
          <ArrowRight size={16} className="hidden shrink-0 lg:block" aria-hidden /><ArrowDown size={16} className="shrink-0 lg:hidden" aria-hidden />
        </p>
      </div>
      <SideCard side="candidate" i={2} />
    </Reveal>
  );
}

/** §2.3: the hire is one event inside a much longer talent relationship. */
export function RelationshipLine() {
  return (
    <Reveal className="rounded-3xl bg-brand p-6 text-white sm:p-10">
      <div className="reveal max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">The connected journey</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">A hire is one event. The talent relationship is much longer.</h3>
      </div>
      <div className="relative mt-10">
        {/* The relationship track, with the recruitment transaction marked as a single point on it. */}
        <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-1 rounded-full bg-white/20 md:block" />
        <ol className="relative grid gap-4 md:grid-cols-4">
          {connectedJourney.map((step, i) => (
            <li key={step} className="reveal flex items-center gap-3 md:flex-col md:items-start" style={{ "--i": i + 1 } as CSSProperties}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-volt ring-4 ring-brand">
                {i === connectedJourney.length - 1 ? <RefreshCw size={16} aria-hidden /> : i + 1}
              </span>
              <span className="font-semibold">{step}</span>
              {i === 0 && (
                <span className="rounded-full bg-spark px-2.5 py-1 text-xs font-bold md:mt-1">The hire: one event</span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <p className="reveal mt-8 border-t border-white/15 pt-6 text-white/80" style={{ "--i": 5 } as CSSProperties}>
        The recruitment transaction is only one event inside a much longer talent relationship. We stay with both sides through deployment, development and continuity.
      </p>
    </Reveal>
  );
}

/** The seven questions one side is asking, for that side's landing page. */
export function SideQuestions({ side }: { side: Side }) {
  const s = talentSides[side];
  const st = sideStyle[side];
  return (
    <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
      <div className="reveal">
        <p className="eyebrow">{st.who}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The questions you are asking</h2>
        <p className="mt-4 text-lg text-ink-soft">{s.audience}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-mute">How Conductivity responds</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {s.responses.map((r) => <li key={r} className={`rounded-full px-3 py-1 text-sm font-semibold ${st.chip}`}>{r}</li>)}
        </ul>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {s.questions.map((q, n) => (
          <li key={q} className="reveal card flex gap-3 !p-4" style={{ "--i": Math.min(n + 1, 6) } as CSSProperties}>
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${st.chip}`}>{n + 1}</span>
            <span className="font-medium">{q}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
