import type { Metadata } from "next";
import { PageHero, Photo } from "@/components/ui";

export const metadata: Metadata = { title: "Inside Conductivity" };

const tags = ["Events", "Training", "Office activities", "Meetings", "Seminars", "Workshops", "Team activities", "Client / partner activities"];

export default function Inside() {
  return (
    <>
      <PageHero eyebrow="Inside Conductivity" title="Latest from Conductivity">Recent photographs and videos from our events, training and everyday work.</PageHero>
      <section className="section">
        <div className="container-x">
          <ul className="mb-8 flex flex-wrap gap-2">{tags.map((t) => (<li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft ring-1 ring-ink/10">{t}</li>))}</ul>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {tags.concat(tags.slice(0, 4)).map((t, i) => (
              <Photo key={i} label={t} className={i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"} />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-mute">This feed is designed to be updated regularly with real images and video so the site always feels current.</p>
        </div>
      </section>
    </>
  );
}
