import Link from "next/link";
import { ImageIcon, ArrowRight, Construction } from "lucide-react";
import type { ReactNode } from "react";
import type { EventItem } from "@/data/site";
/** The word "Conductivity" in the logo's colours: blue letters and the red σ. `chip` puts it on a small white tag so it stays readable on a red band. */
export function Brand({ chip = false }: { chip?: boolean }) {
  const word = <>C<span className="text-[#ff0000]">σ</span>nductivity</>;
  // Arial Black, like the logo. `fontSynthesis: none` stops the browser faking an extra-bold on top of it; where Arial Black is not installed (some phones/Linux) this falls back to real Arial Bold.
  const font = { fontFamily: '"Arial Black", Arial, Helvetica, sans-serif', fontWeight: 900, fontSynthesis: "none" } as const;
  return chip
    ? <span style={font} className="whitespace-nowrap rounded-md bg-white px-2 text-[#0070c0]">{word}</span>
    : <span style={font} className="text-[#0070c0]">{word}</span>;
}

/** Turns every "Conductivity" (or "Cσnductivity") in a string into the logo-coloured <Brand />. Other text is left alone. */
export function withBrand(text: string, chip = false): ReactNode {
  return text.split(/(C[oσ]nductivity)/g).map((part, i) => (i % 2 ? <Brand key={i} chip={chip} /> : part));
}

/** The logo's red "o" (σ) as a faint white watermark for red backgrounds. Purely decorative. */
export function SigmaMark({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/sigma-white.png" alt="" aria-hidden width={512} height={512} className={`pointer-events-none absolute select-none ${className}`} />;
}

/** Page title band: short and red by default. Pass `compact={false}` / `red={false}` for the tall navy-style band. A newline character in the title forces a line break. */
export function PageHero({ eyebrow, title, children, compact = true, red = true, slim = false }: { eyebrow?: string; title: string; children?: ReactNode; compact?: boolean; red?: boolean; slim?: boolean }) {
  return (
    <section className={`relative overflow-hidden text-white ${red ? "bg-spark" : "hero-zone bg-hero"}`}>
      {red
        ? <SigmaMark className="-right-6 -top-10 h-[170%] w-auto -rotate-12 opacity-[0.12] sm:right-10" />
        : <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-hero-blob/20 blur-3xl" />}
      <div className={`container-x relative ${slim ? "py-5" : compact ? "py-8 sm:py-10" : "py-16 sm:py-20"}`}>
        {eyebrow && <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${red ? "text-white/85" : "text-hero-eyebrow"}`}>{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-3" : ""} whitespace-pre-line font-bold leading-tight tracking-tight ${slim ? "text-2xl sm:text-3xl" : compact ? "text-2xl sm:text-4xl" : "max-w-3xl text-4xl sm:text-5xl"}`}>{withBrand(title, true)}</h1>
        {children && <div className={`max-w-2xl leading-relaxed text-white/90 ${compact ? "mt-2 text-sm sm:text-base" : "mt-5 text-lg"}`}>{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{withBrand(title)}</h2>
      {text && <p className="mt-3 text-lg text-ink-mute">{text}</p>}
    </div>
  );
}

/** Stand-in until real photography is supplied. */
export function Photo({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={`Photo placeholder: ${label}`}
      className={`grid place-items-center rounded-2xl bg-gradient-to-br from-spark-light via-paper to-volt-light text-ink-mute ${className}`}>
      <div className="flex flex-col items-center gap-1.5 p-4 text-center text-xs">
        <ImageIcon size={22} /><span>{label}</span><span className="text-[10px] uppercase tracking-wider opacity-70">Replace with real photo</span>
      </div>
    </div>
  );
}

export function CtaBand({ title, text, primary }: { title: string; text?: string; primary: { label: string; href: string } }) {
  // Red heading with the button underneath it. The description line is optional.
  return (
    <section className="py-10 sm:py-12">
      <div className="container-x">
        <div className="flex flex-col items-start gap-4 px-2 py-4 sm:px-4">
          <div className="relative max-w-[30rem]">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-spark sm:text-3xl">{withBrand(title)}</h2>
            {text && <p className="mt-2 max-w-xl text-sm text-spark-dark sm:text-base">{text}</p>}
          </div>

          <Link href={primary.href} className="btn relative bg-spark text-white hover:bg-spark-dark focus-visible:outline-spark">
            {primary.label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EventCard({ e }: { e: EventItem }) {
  const d = new Date(e.date + "T00:00:00");
  return (
    <article className="card flex flex-col overflow-hidden !p-0">
      <Photo label={e.name} className="h-40 rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-spark-light px-2.5 py-0.5 text-xs font-semibold text-spark-dark">{e.category}</span>
        <h3 className="mt-3 text-lg font-semibold">{e.name}</h3>
        <p className="mt-1 text-sm text-ink-mute">{d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {e.location}</p>
        <p className="mt-3 flex-1 text-sm text-ink-soft">{e.description}</p>
        <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">View Event <ArrowRight size={14} /></Link>
      </div>
    </article>
  );
}

/** Marks content that cannot be built yet (needs real data, approvals or a backend). Remove each one as the real thing arrives. */
export function Placeholder({ title, children, className = "" }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5 text-amber-900 ${className}`}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        <Construction size={14} aria-hidden /> Placeholder
      </p>
      <p className="mt-1 font-semibold">{title}</p>
      {children && <div className="mt-1 text-sm text-amber-800">{children}</div>}
    </div>
  );
}

/** A left-to-right chain of short steps joined by arrows; wraps on small screens. */
export function StepChain({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-card ring-1 ring-ink/5">
            <span className="mr-1.5 text-spark">{i + 1}</span>{s}
          </span>
          {i < steps.length - 1 && <ArrowRight size={16} aria-hidden className="text-spark" />}
        </li>
      ))}
    </ol>
  );
}
