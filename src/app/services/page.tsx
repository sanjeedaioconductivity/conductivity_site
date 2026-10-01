import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CtaBand, PageHero } from "@/components/ui";
import { serviceGroups } from "@/data/site";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Career, HR, organizational, training, talent and mobility solutions.">
        Six connected service areas that serve people and organizations alike.
      </PageHero>

      <div className="container-x">
        <nav aria-label="Service categories" className="-mt-6 flex gap-2 overflow-x-auto rounded-full bg-white p-2 shadow-card ring-1 ring-ink/5">
          {serviceGroups.map((s) => (<a key={s.id} href={`#${s.id}`} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium hover:bg-spark-light">{s.title}</a>))}
        </nav>
      </div>

      {serviceGroups.map((s, i) => (
        <section key={s.id} id={s.id} className={`section scroll-mt-16 ${i % 2 ? "bg-paper" : ""}`}>
          <div className="container-x grid gap-8 lg:grid-cols-3">
            <div>
              <s.icon className="text-spark-dark" size={32} />
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h2>
              <p className="mt-2 text-ink-mute">{s.blurb}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
              {s.items.map((it) => (
                <li key={it} className="card flex items-start gap-3 !p-4"><Check size={18} className="mt-0.5 shrink-0 text-spark-dark" /><span className="text-sm font-medium">{it}</span></li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand title="Not sure which service fits?" text="Tell us your goal and we will point you to the right starting point." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
