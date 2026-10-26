import Image from "next/image";
import { Building2, UserRound } from "lucide-react";
import { connectionPoint, pipelineStages } from "@/data/blueprint";

// Hero visual (blueprint §6, section 1): people and organizations as one connected talent ecosystem.
// TODO(content): add authentic photos (no handshake stock) to /public/hero/ and set `src` below; until then each frame shows a labelled placeholder.
const frames = {
  org: [
    { src: "", label: "HR leader with their team", pos: "left-0 top-[4%]" },
    { src: "", label: "Organization at work", pos: "left-0 top-[54%]" },
  ],
  people: [
    { src: "", label: "Graduate in a mentoring session", pos: "right-0 top-[4%]" },
    { src: "", label: "Professional at work", pos: "right-0 top-[54%]" },
  ],
};

function Frame({ src, label, pos, side }: { src: string; label: string; pos: string; side: "org" | "people" }) {
  const Icon = side === "org" ? Building2 : UserRound;
  const tone = side === "org" ? "from-volt-light to-white text-volt" : "from-spark-light to-white text-spark-dark";
  return (
    <figure className={`absolute ${pos} z-10 aspect-[4/5] w-[30%] overflow-hidden rounded-2xl shadow-card ring-4 ring-white`}>
      {src
        ? <Image src={src} alt={label} fill sizes="(min-width: 1024px) 12rem, 30vw" className="object-cover" />
        : (
          <div role="img" aria-label={`Photo placeholder: ${label}`} className={`flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-b p-2 text-center ${tone}`}>
            <Icon size={26} strokeWidth={1.5} aria-hidden />
            <span className="text-[10px] font-medium leading-tight text-ink-mute sm:text-[11px]">{label}</span>
          </div>
        )}
    </figure>
  );
}

export default function HeroEcosystem() {
  // Connection lines in a 100×100 box: each photo frame's inner edge to the hub in the centre.
  const toHub = ["M30 24 Q42 26 50 46", "M30 74 Q42 72 50 54"];
  const fromHub = ["M50 46 Q58 26 70 24", "M50 54 Q58 72 70 74"];

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="relative mt-7 aspect-[6/5]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
          {[...toHub, ...fromHub].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2" className={i < 2 ? "stroke-volt/25" : "stroke-spark/25"} />
              <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2" strokeLinecap="round" pathLength={100}
                className={`eco-flow ${i < 2 ? "stroke-volt" : "stroke-spark"}`} style={{ animationDelay: `${(i % 2) * 0.8}s` }} />
            </g>
          ))}
        </svg>

        <p className="absolute -top-1 left-[31%] z-10 -translate-y-full rounded-full bg-volt-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-volt sm:text-[11px]">Organizations</p>
        <p className="absolute -top-1 right-[31%] z-10 -translate-y-full rounded-full bg-spark-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-spark-dark sm:text-[11px]">People</p>

        {frames.org.map((f) => <Frame key={f.label} {...f} side="org" />)}
        {frames.people.map((f) => <Frame key={f.label} {...f} side="people" />)}

        {/* The hub: Conductivity at the point where both sides connect. */}
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span aria-hidden className="eco-pulse absolute inset-0 m-auto aspect-square w-full rounded-full bg-spark/20" />
          <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-full bg-spark p-2 text-center text-white shadow-card ring-[6px] ring-white">
            <Image src="/sigma-white.png" alt="" width={40} height={40} className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wider sm:text-[11px]">Conductivity</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs font-semibold" title={`${connectionPoint.employer} ↔ ${connectionPoint.core} ↔ ${connectionPoint.individual}`}>
        <span className="text-volt">Employer demand</span>
        <span className="text-spark"> ↔ Conductivity ↔ </span>
        <span className="text-spark-dark">Individual potential</span>
      </p>

      {/* A simple representation of the talent pipeline under the ecosystem. */}
      <div className="mt-4 rounded-2xl bg-paper px-4 py-4">
        <ol className="relative flex justify-between" aria-label="The Conductivity Talent Pipeline">
          <span aria-hidden className="absolute left-3 right-3 top-[0.55rem] h-0.5 bg-gradient-to-r from-volt via-spark to-volt opacity-40" />
          {pipelineStages.map((s, i) => (
            <li key={s.name} className="relative flex flex-col items-center gap-1.5">
              <span className="eco-step h-[1.1rem] w-[1.1rem] rounded-full border-[3px] border-white bg-spark shadow" style={{ animationDelay: `${i * 0.5}s` }} />
              <span className="text-[10px] font-semibold text-ink-soft sm:text-xs">{s.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
