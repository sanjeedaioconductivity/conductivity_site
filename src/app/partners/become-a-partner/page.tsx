import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { partnerPages } from "@/data/blueprint";

export const metadata: Metadata = pageMeta("/partners/become-a-partner", "Become a Partner", "Propose a talent partnership with Conductivity: the objective, target group, expected outcomes and your contribution.");

// What a partnership proposal should cover (blueprint §9).
const include = [
  { title: "Partnership objective", text: "What you want to achieve, and why now." },
  { title: "Target group", text: "Who it serves — for example final-year students, finance professionals or remote developers." },
  { title: "Expected outcomes", text: "What success looks like for both sides." },
  { title: "Your contribution", text: "Expertise, access, facilities, funding or people you could bring." },
];

export default function BecomeAPartnerPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Become a Partner">
        Help build talent pipelines that go beyond one-to-one assignments — at institutional and industry level.
        <div className="mt-5"><Link href="/partners" className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"><ArrowLeft size={14} /> Partners overview</Link></div>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">What to include</h2>
              <ul className="mt-4 space-y-3">
                {include.map((i) => (
                  <li key={i.title} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-spark" aria-hidden />
                    <span><span className="font-semibold">{i.title}.</span> <span className="text-ink-soft">{i.text}</span></span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-paper p-6">
              <h2 className="font-bold">What happens next</h2>
              <p className="mt-2 text-sm text-ink-soft">We review your proposal and come back to arrange an institutional meeting. If it fits both sides, we design a joint program or talent development initiative together.</p>
            </div>
            <div>
              <h2 className="font-bold">Explore partnership types</h2>
              <ul className="mt-3 space-y-2">
                {partnerPages.map((p) => (
                  <li key={p.slug}><Link href={`/partners/${p.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-spark-dark hover:gap-2">{p.title} <ArrowRight size={14} /></Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div id="partner-form" className="scroll-mt-24"><InquiryForm kind="partner" /></div>
        </div>
      </section>
    </>
  );
}
