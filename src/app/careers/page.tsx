import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { openRoles } from "@/data/site";

export const metadata: Metadata = pageMeta("/careers", "Careers", "Careers at Conductivity: join a team building talent pipelines, career readiness and HR capability in Pakistan.");

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers at Conductivity" title="Join the team connecting people and opportunity." />
      <section className="section">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Current opportunities</h2>
          {openRoles.length ? (
            <ul className="mt-6 space-y-3">
              {openRoles.map((r) => (<li key={r.title} className="card"><h3 className="font-semibold">{r.title}</h3><p className="text-sm text-ink-mute">{r.type} · {r.location}</p></li>))}
            </ul>
          ) : (
            <div className="card mt-6">
              <p className="text-ink-soft">There are no open positions right now. We are always glad to hear from talented consultants, trainers and HR professionals — send us your CV and a short note.</p>
              <Link href="/contact" className="btn-primary mt-5">Get in touch</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
