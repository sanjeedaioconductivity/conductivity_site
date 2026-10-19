import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Users } from "lucide-react";
import { PageHero, Placeholder, SectionHead } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { partnerPages, partnerTypes } from "@/data/blueprint";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return partnerPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = partnerPages.find((p) => p.slug === slug);
  return page ? { title: `${page.title} — Partners`, description: page.description } : {};
}

// How a partnership starts (blueprint §4.3, §9): inquiry, meeting, a joint initiative, then results reviewed.
const steps = [
  { title: "Tell us your objective", text: "Use the form below: the goal, the group it serves, the outcomes you expect and what you could contribute." },
  { title: "Institutional meeting", text: "We meet to understand your context and test whether the partnership fits both sides." },
  { title: "Design the initiative", text: "Together we shape a joint program or talent development initiative with clear responsibilities." },
  { title: "Deliver and review", text: "We run it and review results for effectiveness, efficiency and sustainability." },
];

// Partner sub-pages from the blueprint sitemap (§5.2 E), e.g. /partners/institutions.
export default async function PartnerTypePage({ params }: Props) {
  const { slug } = await params;
  const page = partnerPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const types = partnerTypes.filter((t) => page.types.includes(t.id));
  const others = [...partnerPages.filter((p) => p.slug !== page.slug).map((p) => ({ href: `/partners/${p.slug}`, title: p.title })), { href: "/partners/become-a-partner", title: "Become a Partner" }];

  return (
    <>
      <PageHero eyebrow={`Partners · ${page.title}`} title={page.headline}>
        {page.intro}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href="#partner-form" className="btn bg-white text-spark-dark hover:bg-white/90">Build a Talent Partnership <ArrowRight size={16} /></Link>
          <Link href="/partners" className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"><ArrowLeft size={14} /> Partners overview</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="What we do together" title="Areas of collaboration" />
            <div className="space-y-4">
              {types.map((t) => (
                <article key={t.id} className="card">
                  <div className="flex items-center gap-3"><t.icon className="text-spark" aria-hidden /><h3 className="text-lg font-bold">{t.title}</h3></div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.text.replace(/\.$/, "").split(", ").map((s) => (
                      <li key={s} className="flex gap-2 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden /><span className="first-letter:uppercase">{s.replace(/^and /, "")}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <SectionHead eyebrow="Who this is for" title="Partners we work with" />
              <ul className="space-y-3">
                {page.who.map((w) => <li key={w} className="flex gap-3 rounded-xl bg-paper p-4 font-medium"><Users size={20} className="mt-0.5 shrink-0 text-spark" aria-hidden />{w}</li>)}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-bold">What a partnership aims for</h3>
              <ul className="mt-3 space-y-2">
                {page.outcomes.map((o) => <li key={o} className="flex gap-2 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-spark" aria-hidden />{o}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHead eyebrow="How it works" title="From first conversation to joint program" />
          <ol className="grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card !p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-spark text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Current partners</h2>
            <Placeholder title={`Approved ${page.title.toLowerCase()}`}>Add partner names, logos and a joint initiative here only after each partner has approved it.</Placeholder>
          </div>
          {page.related && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Related</h2>
              <Link href={page.related.href} className="card group flex items-center justify-between gap-3 transition hover:-translate-y-0.5">
                <span className="font-semibold">{page.related.label}</span>
                <ArrowRight size={16} className="shrink-0 text-spark-dark transition group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section id="partner-form" className="section scroll-mt-16 bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Build a Talent Partnership</h2>
            <p className="mt-4 text-ink-soft">Describe the objective, who it is for, the outcomes you expect and what you could contribute.</p>
          </div>
          <InquiryForm kind="partner" interest={types[0]?.title} />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="mb-6 text-2xl font-bold">Other partnerships</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.href} href={o.href} className="card group flex items-center justify-between gap-3 !p-5 transition hover:-translate-y-0.5">
                <span className="font-semibold">{o.title}</span>
                <ArrowRight size={16} className="shrink-0 text-spark-dark transition group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
