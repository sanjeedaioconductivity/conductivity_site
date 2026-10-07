import Link from "next/link";
import { ImageIcon, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { EventItem } from "@/data/site";
/** Page title band: short and red by default. Pass `compact={false}` / `red={false}` for the tall navy-style band. A newline character in the title forces a line break. */
export function PageHero({ eyebrow, title, children, compact = true, red = true }: { eyebrow: string; title: string; children?: ReactNode; compact?: boolean; red?: boolean }) {
  return (
    <section className={`relative overflow-hidden text-white ${red ? "bg-spark" : "hero-zone bg-hero"}`}>
      <div aria-hidden className={`pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl ${red ? "bg-white/15" : "bg-hero-blob/20"}`} />
      <div className={`container-x relative ${compact ? "py-8 sm:py-10" : "py-16 sm:py-20"}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${red ? "text-white/85" : "text-hero-eyebrow"}`}>{eyebrow}</p>
        <h1 className={`mt-3 whitespace-pre-line font-bold leading-tight tracking-tight ${compact ? "text-2xl sm:text-4xl" : "max-w-3xl text-4xl sm:text-5xl"}`}>{title}</h1>
        {children && <div className={`max-w-2xl leading-relaxed text-white/90 ${compact ? "mt-2 text-sm sm:text-base" : "mt-5 text-lg"}`}>{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
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

export function CtaBand({ title, text, primary, secondary }: { title: string; text: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="hero-zone rounded-3xl bg-hero px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">{text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn-primary">{primary.label}</Link>
            {secondary && <Link href={secondary.href} className="btn-ghost">{secondary.label}</Link>}
          </div>
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
