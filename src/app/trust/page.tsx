import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Bot, Eye, FileLock2, Handshake, Lock, Scale } from "lucide-react";
import { pageMeta } from "@/data/seo";
import { PageHero, Placeholder } from "@/components/ui";

export const metadata: Metadata = pageMeta("/trust", "Trust & Responsible Practices",
  "How Conductivity protects employer and candidate information, uses consent, keeps assessments fair, avoids misleading claims and oversees any use of AI.");

// Trust, governance and responsible talent practices (blueprint §16): what we commit to, and where to see it on the site.
const commitments = [
  { Icon: Lock, title: "Confidentiality", text: "Employer requirements and candidate records are kept confidential and seen only by the team that needs them.",
    see: { label: "How talent data is handled", href: "/legal/candidate-data" } },
  { Icon: Handshake, title: "Consent", text: "Every form explains why we ask and what we do with your information. Nothing is shared with an employer without your permission.",
    see: { label: "Start your career readiness journey", href: "/talent#start" } },
  { Icon: Eye, title: "Transparency", text: "Before any work starts, we tell you whether it is free or paid, and whether it is engagement, assessment, training, advisory or recruitment.",
    see: { label: "See the service types below", href: "#services" } },
  { Icon: Scale, title: "Fairness", text: "We evaluate people consistently, against job-relevant requirements, using methods suited to the role.",
    see: { label: "Career assessments", href: "/talent/assessments" } },
  { Icon: BadgeCheck, title: "Professional integrity", text: "No misleading vacancies, no guaranteed-placement promises, no unverified credentials and no exaggerated results.",
    see: { label: "Our opportunity commitments", href: "/opportunities" } },
  { Icon: Bot, title: "Responsible AI", text: "We do not currently use AI to assess, score or match people. If we introduce it, we will say so here, and a person will review every significant decision.",
    see: { label: "Read about responsible AI in talent", href: "/insights#themes" } },
  { Icon: FileLock2, title: "Data stewardship", text: "Restricted access to candidate records, secure storage, clear retention rules and lawful sharing only. You can ask for a copy, correction or deletion at any time.",
    see: { label: "Preferences & data requests", href: "/preferences" } },
];

// Service types, so visitors know what kind of engagement they are entering (§16 Transparency). Prices are not shown until confirmed.
const serviceTypes = [
  { type: "Free engagement", examples: "Registering your interest, newsletter, insights and resources" },
  { type: "Assessments", examples: "Career and competency assessments, professional profiling" },
  { type: "Training and programs", examples: "Workshops, readiness programs, bootcamps, corporate training" },
  { type: "Advisory work", examples: "Talent Pipeline Diagnostic, HR and organization development consulting" },
  { type: "Recruitment services", examples: "Sourcing, screening, selection support and placement for employers" },
];

export default function TrustPage() {
  return (
    <>
      <PageHero eyebrow="Trust & governance" title="Trust & Responsible Practices">
        We handle people&apos;s careers and organizations&apos; plans. Trust is part of what we deliver, so here is exactly what we commit to.
      </PageHero>

      <section className="section !py-10 sm:!py-12">
        <div className="container-x">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <li key={c.title} className="flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink/5">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${i % 2 ? "bg-volt" : "bg-spark"}`}><c.Icon size={18} aria-hidden /></span>
                <h2 className="mt-3 font-bold">{c.title}</h2>
                <p className="mt-1.5 flex-1 text-sm text-ink-soft">{c.text}</p>
                <Link href={c.see.href} className="mt-3 text-xs font-semibold text-spark-dark hover:underline">{c.see.label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="section scroll-mt-16 bg-paper !py-10 sm:!py-12">
        <div className="container-x">
          <p className="eyebrow">Transparency</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Know what kind of service you are using</h2>
          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-white"><tr><th className="p-3">Service type</th><th className="p-3">Examples</th><th className="p-3">Cost</th></tr></thead>
              <tbody>
                {serviceTypes.map((s) => (
                  <tr key={s.type} className="border-t border-ink/10 align-top">
                    <th scope="row" className="p-3 font-semibold">{s.type}</th>
                    <td className="p-3 text-ink-soft">{s.examples}</td>
                    <td className="p-3 text-ink-mute">{s.type === "Free engagement" ? "Free" : "Confirmed before any work begins"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Placeholder title="Fees and free sessions to be confirmed by management" className="mt-4 !p-3 text-sm">
            List which sessions, assessments and programs are free and the fee basis for paid services once approved.
          </Placeholder>
        </div>
      </section>

      <section className="section !py-10 sm:!py-12">
        <div className="container-x">
          <Placeholder title="Legal review before launch" className="!p-4">
            Privacy policies and employment-related terms must be reviewed by a lawyer for each jurisdiction we work in, together with retention periods and data-sharing rules, before launch.
          </Placeholder>
        </div>
      </section>
    </>
  );
}
