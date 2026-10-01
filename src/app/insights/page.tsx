import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { insightCategories, insights } from "@/data/site";

export const metadata: Metadata = { title: "Insights" };

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Knowledge on careers, HR, organizations and the future of work." />
      {insightCategories.map((c, idx) => (
        <section key={c} id={c.toLowerCase().replace(/\s+/g, "-")} className={`section scroll-mt-16 ${idx % 2 ? "bg-paper" : ""}`}>
          <div className="container-x">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">{c}</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {insights.filter((i) => i.category === c).map((i) => (
                <article key={i.slug} className="card">
                  <time className="text-xs text-ink-mute" dateTime={i.date}>{new Date(i.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
                  <h3 className="mt-2 font-semibold">{i.title}</h3>
                  <p className="mt-2 text-sm text-ink-mute">{i.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
