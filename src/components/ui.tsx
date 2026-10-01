import Link from "next/link";
import { ImageIcon, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { EventItem } from "@/data/site";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-spark/20 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-spark">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{children}</div>}
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
        <div className="rounded-3xl bg-ink px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">{text}</p>
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
