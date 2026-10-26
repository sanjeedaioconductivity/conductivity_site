import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import { CtaBand, EventCard, PageHero, SectionHead } from "@/components/ui";
import { eventCategories } from "@/data/site";
import { getEvents } from "@/lib/cms";

export const metadata: Metadata = pageMeta("/events", "Events", "Career events, workshops, webinars, university sessions and corporate programs from Conductivity.");

export const revalidate = 300; // re-check the CMS every 5 minutes

export default async function Events() {
  const events = await getEvents();
  return (
    <>
      <PageHero eyebrow="Events" title="Workshops, seminars and programs.">
        Evidence of active engagement with students, professionals, organizations and communities.
      </PageHero>
      <div className="container-x pt-8">
        <ul className="flex flex-wrap gap-2" aria-label="Event types">
          {eventCategories.map((c) => (<li key={c} className="rounded-full bg-spark-light px-3 py-1 text-xs font-semibold text-spark-dark">{c}</li>))}
        </ul>
      </div>
      <section id="upcoming" className="section scroll-mt-16">
        <div className="container-x">
          <SectionHead title="Upcoming events" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{events.filter((e) => e.upcoming).map((e) => <EventCard key={e.slug} e={e} />)}</div>
        </div>
      </section>
      <section id="past" className="section scroll-mt-16 bg-paper">
        <div className="container-x">
          <SectionHead title="Past events" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{events.filter((e) => !e.upcoming).map((e) => <EventCard key={e.slug} e={e} />)}</div>
        </div>
      </section>
      <CtaBand title="Host or join an event" text="Interested in a corporate session, university talk or training program?" primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
