import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import { CtaBand, PageHero, Photo } from "@/components/ui";
import { facilities } from "@/data/site";

export const metadata: Metadata = pageMeta("/facilities", "Facilities & Spaces", "Conductivity's training room, meeting room, counselling space and assessment environment, including spaces for hire.");

export default function Facilities() {
  return (
    <>
      <PageHero eyebrow="Facilities" title="Facilities & Spaces">Training, meeting, counselling, assessment and working spaces.</PageHero>
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <article key={f.title} className="card !p-0 overflow-hidden">
              <Photo label={f.title} className="aspect-[16/10] rounded-none" />
              <div className="p-5"><h2 className="text-lg font-semibold">{f.title}</h2><p className="mt-1.5 text-sm text-ink-mute">{f.text}</p></div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Need a space for your session?" text="Ask about availability for corporate sessions, training or events." primary={{ label: "Enquire now", href: "/contact" }} />
    </>
  );
}
