"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, SANJEEDA_URL } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  // Full logo with "Consultancy (Pvt.) Ltd." On the dark footer it is flattened to white so it stays legible.
  return (
    <Image src="/conductivity-logo-v4.png" alt="Conductivity Consultancy (Pvt.) Ltd." width={200} height={100} priority
      className={`w-auto ${light ? "h-16 brightness-0 invert" : "h-12"}`} />
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const linkClass = (href: string) =>
    `${active(href) ? "text-spark-dark" : "text-ink-soft"} ${href === "/sanjeeda" ? "text-sanj" : ""}`;

  // Wide screens: the links sit inline between the logo and the edge. Below lg they collapse into a
  // hamburger that opens a dropdown under the logo bar.
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-x-4 py-2 lg:h-[70px] lg:py-0 lg:px-8 xl:px-12">
        <Link href="/" aria-label="Conductivity home" onClick={() => setOpen(false)}><Logo /></Link>

        <nav className="hidden lg:block" aria-label="Main">
          <div className="flex items-center gap-0 whitespace-nowrap">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`rounded-full px-1.5 py-1.5 text-sm font-medium transition hover:bg-paper xl:px-2.5 ${linkClass(n.href)}`}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-paper lg:hidden">
          <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-ink/10 bg-white lg:hidden" aria-label="Main">
          <div className="container-x flex flex-col py-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className={`rounded-lg px-2 py-3 text-base font-medium hover:bg-paper ${linkClass(n.href)}`}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
