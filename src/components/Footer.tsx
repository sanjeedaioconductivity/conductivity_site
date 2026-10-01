import Link from "next/link";
import { Logo } from "./Header";
import { contactInfo, nav, SANJEEDA_URL } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Conductivity connects people and organizations; Sanjeeda helps people become ready for the opportunities within that connected ecosystem.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.slice(1, 7).map((n) => (<li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>))}
            <li><a href={SANJEEDA_URL} target="_blank" rel="noopener noreferrer" className="text-sanj-light hover:text-white">sanjeeda.io ↗</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{contactInfo.address}</li>
            <li>{contactInfo.phone}</li>
            <li><a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a></li>
            <li className="flex gap-3 pt-1">{contactInfo.social.map((s) => (<a key={s.label} href={s.href} className="hover:text-white">{s.label}</a>))}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© {new Date().getFullYear()} Conductivity. All rights reserved.</div>
    </footer>
  );
}
