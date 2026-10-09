"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  // No hamburger: the links are always visible. On wide screens they sit between the logo and the
  // button; on narrower ones they drop to their own row and scroll sideways if they do not fit.
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex flex-wrap items-center justify-between 
      gap-x-4 
      py-2 
      lg:h-[70px] 
      lg:flex-nowrap 
      lg:py-0 lg:px-8 xl:px-12">
        <Link href="/" aria-label="Conductivity home"><Logo /></Link>
        <nav className="order-3 -mx-1 w-full overflow-x-auto lg:order-none lg:mx-0 lg:w-auto lg:overflow-visible" aria-label="Main">
          <div className="flex items-center gap-0 whitespace-nowrap">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`rounded-full px-1.5 py-1.5 text-sm xl:px-2.5 font-medium transition hover:bg-paper ${active(n.href) ? "text-spark-dark" : "text-ink-soft"} ${n.href === "/sanjeeda" ? "text-sanj" : ""}`}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}