"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SiteSearch from "@/components/SiteSearch";
import { insightAnchor, insightCategories, nav } from "@/data/site";
import { ctas, employerPages, partnerPages, talentPages } from "@/data/blueprint";

// Sub-pages shown under each main link (blueprint sitemap §5.2). Sections without an entry have no dropdown.
const subNav: Record<string, { label: string; href: string }[]> = {
  "/employers": [{ label: "Employer Overview", href: "/employers" }, ...employerPages.map((p) => ({ label: p.title, href: `/employers/${p.slug}` }))],
  "/talent": [{ label: "Talent Overview", href: "/talent" }, ...talentPages.map((p) => ({ label: p.title, href: `/talent/${p.slug}` })), { label: "Opportunities", href: "/opportunities" }],
  "/our-model": [
    { label: "The Conductivity Talent Pipeline", href: "/our-model" },
    { label: "Readiness, Opportunities & Success", href: "/our-model#tagline" },
    { label: "Our Approach to Talent Intelligence", href: "/our-model#talent-intelligence" },
  ],
  "/partners": [{ label: "Partners Overview", href: "/partners" }, ...partnerPages.map((p) => ({ label: p.title, href: `/partners/${p.slug}` })), { label: "Become a Partner", href: "/partners/become-a-partner" }],
  "/insights": insightCategories.map((c) => ({ label: c, href: `/insights#${insightAnchor(c)}` })),
  "/about": [
    { label: "Our Philosophy", href: "/about#philosophy" },
    { label: "Our Story", href: "/about#story" },
    { label: "Leadership & Team", href: "/about#leadership" },
    { label: "Impact and Client Stories", href: "/about#impact" },
    { label: "Trust & Responsible Practices", href: "/trust" },
    { label: "Contact", href: "/contact" },
  ],
};

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
  const [expanded, setExpanded] = useState<string | null>(null);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href) || (href === "/talent" && path.startsWith("/opportunities")));
  const linkClass = (href: string) => (active(href) ? "text-spark-dark" : "text-ink-soft");
  const close = () => { setOpen(false); setExpanded(null); };

  // Wide screens: the links sit inline between the logo and the two permanent calls to action (blueprint §5.1);
  // a link with sub-pages opens a dropdown on hover or keyboard focus. Below lg they collapse into a hamburger.
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-x-4 py-2 lg:h-[70px] lg:py-0 lg:px-8 xl:px-12">
        <Link href="/" aria-label="Conductivity home" onClick={close}><Logo /></Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-0 whitespace-nowrap">
            {nav.map((n) => {
              const subs = subNav[n.href];
              return (
                <li key={n.href} className="group relative">
                  <Link href={n.href} aria-haspopup={subs ? "true" : undefined}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-paper ${linkClass(n.href)}`}>
                    {n.label}{subs && <ChevronDown size={14} aria-hidden className="transition group-hover:rotate-180 group-focus-within:rotate-180" />}
                  </Link>
                  {subs && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="min-w-[17rem] rounded-xl bg-white p-2 shadow-card ring-1 ring-ink/10">
                        {subs.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} className={`block rounded-lg px-3 py-2 text-sm hover:bg-paper ${path === s.href ? "font-semibold text-spark-dark" : "text-ink-soft"}`}>{s.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 xl:gap-2">
          <SiteSearch />
          <div className="hidden items-center gap-2 whitespace-nowrap xl:flex">
            <Link href={ctas.talent.href} className="btn-outline !px-4 !py-2">{ctas.talent.label}</Link>
            <Link href={ctas.employer.href} className="btn-primary !px-4 !py-2">{ctas.employer.label}</Link>
          </div>

          <button type="button" onClick={() => (open ? close() : setOpen(true))} aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-paper lg:hidden">
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink/10 bg-white lg:hidden" aria-label="Main">
          <div className="container-x flex flex-col py-2">
            {nav.map((n) => {
              const subs = subNav[n.href];
              const isOpen = expanded === n.href;
              return (
                <div key={n.href}>
                  <div className="flex items-center">
                    <Link href={n.href} onClick={close}
                      className={`flex-1 rounded-lg px-2 py-3 text-base font-medium hover:bg-paper ${linkClass(n.href)}`}>
                      {n.label}
                    </Link>
                    {subs && (
                      <button type="button" onClick={() => setExpanded(isOpen ? null : n.href)} aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${n.label} pages`} className="grid h-10 w-10 place-items-center rounded-lg text-ink-soft hover:bg-paper">
                        <ChevronDown size={18} aria-hidden className={`transition ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {subs && isOpen && (
                    <ul className="mb-2 ml-3 border-l-2 border-spark/30 pl-3">
                      {subs.map((s) => (
                        <li key={s.href}><Link href={s.href} onClick={close} className="block rounded-lg px-2 py-2 text-sm text-ink-soft hover:bg-paper">{s.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pb-2 pt-4 sm:flex-row">
              <Link href={ctas.employer.href} onClick={close} className="btn-primary">{ctas.employer.label}</Link>
              <Link href={ctas.talent.href} onClick={close} className="btn-outline">{ctas.talent.label}</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
