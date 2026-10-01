"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { nav, SANJEEDA_URL } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2 font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-spark text-ink"><Zap size={18} strokeWidth={2.5} /></span>
      <span className={light ? "text-white" : "text-ink"}>Conductivity</span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Conductivity home" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden items-center gap-0.5 2xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-paper ${active(n.href) ? "text-spark-dark" : "text-ink-soft"} ${n.href === "/sanjeeda" ? "text-sanj" : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj hidden whitespace-nowrap sm:inline-flex">Explore Sanjeeda</a>
          <button className="rounded-lg p-2 2xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-white 2xl:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-base font-medium ${active(n.href) ? "bg-spark-light text-spark-dark" : "text-ink-soft"}`}>{n.label}</Link>
            ))}
            <a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="btn-sanj mt-3">Explore Sanjeeda</a>
          </div>
        </nav>
      )}
    </header>
  );
}
