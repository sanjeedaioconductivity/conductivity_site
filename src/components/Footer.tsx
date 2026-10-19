import Link from "next/link";
import { Logo } from "./Header";
import { contactInfo, moreLinks, nav, SANJEEDA_URL } from "@/data/site";
import { category, employerPages, legalPages, tagline, talentPages } from "@/data/blueprint";

const heading = "text-sm font-bold uppercase tracking-wider text-spark-dark";
const link = "hover:text-spark-dark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-spark bg-white text-ink-soft">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-spark/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-72 w-96 rounded-full bg-spark/10 blur-3xl" />
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm font-semibold text-ink">{category}</p>
          <p className="mt-1 text-sm">{tagline}</p>
        </div>
        <div>
          <h3 className={heading}>For Employers</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/employers" className={link}>Employer Overview</Link></li>
            {employerPages.map((p) => <li key={p.slug}><Link href={`/employers/${p.slug}`} className={link}>{p.title}</Link></li>)}
            <li><Link href="/employers/talent-pipelines#diagnostic" className={link}>Talent Pipeline Diagnostic</Link></li>
          </ul>
        </div>
        <div>
          <h3 className={heading}>For Talent</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/talent" className={link}>Talent Overview</Link></li>
            {talentPages.map((p) => <li key={p.slug}><Link href={`/talent/${p.slug}`} className={link}>{p.title}</Link></li>)}
            <li><Link href="/opportunities" className={link}>Opportunities</Link></li>
            <li><a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-sanj hover:text-sanj-dark">sanjeeda.io ↗</a></li>
          </ul>
        </div>
        <div>
          <h3 className={heading}>Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[...nav.slice(2), ...moreLinks].map((n) => <li key={n.href}><Link href={n.href} className={link}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className={heading}>Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{contactInfo.address}</li>
            <li>{contactInfo.phone}</li>
            <li><a href={`mailto:${contactInfo.email}`} className={link}>{contactInfo.email}</a></li>
            <li className="flex gap-3 pt-1">{contactInfo.social.map((s) => (<a key={s.label} href={s.href} className={link}>{s.label}</a>))}</li>
          </ul>
        </div>
      </div>
      <div className="relative bg-spark py-4 text-xs font-medium text-white">
        <div className="container-x flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© {new Date().getFullYear()} Conductivity Consultancy (Pvt.) Ltd. All rights reserved.</span>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legalPages.map((p) => <li key={p.slug}><Link href={`/legal/${p.slug}`} className="hover:underline">{p.title}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
