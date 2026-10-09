import type { Metadata } from "next";
import { CtaBand, Photo, PageHero, SectionHead } from "@/components/ui";
import HowWeWork from "@/components/HowWeWork";
import ValuesList from "@/components/ValuesList";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Conductivity" title="A connected system for careers and organizations.">
        Cσnductivity connects people, organizations, opportunities and capabilities so they can produce better outcomes.
      </PageHero>

      <section id="story" className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Our story" title="How Cσnductivity evolved" />
            <p className="-mt-4 text-lg leading-relaxed text-ink-soft">
              [Company story to be supplied — founding, milestones and how the work grew from career guidance into a full career, HR, talent and organizational ecosystem.]
            </p>
          </div>
          <Photo label="Founders / company story image" className="aspect-[4/3]" />
        </div>
      </section>

      <section id="philosophy" className="section bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Our philosophy" title="Why “Cσnductivity”?" />
            <p className="-mt-4 text-lg leading-relaxed text-ink-soft">
              Conductivity is the ability of a system to carry energy. People bring capability and potential; organizations create environments and requirements; opportunities give direction. Conductivity is what lets these elements connect and work as one.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card"><h3 className="font-semibold">Mission</h3><p className="mt-2 text-sm text-ink-mute">[Mission statement to be confirmed.]</p></div>
            <div className="card"><h3 className="font-semibold">Vision</h3><p className="mt-2 text-sm text-ink-mute">[Vision statement to be confirmed.]</p></div>
          </div>
        </div>
      </section>

      <section id="leadership" className="section">
        <div className="container-x">
          <SectionHead eyebrow="Leadership" title="CEO, management and consultants" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["Chief Executive Officer", "Head of Consulting", "Head of Training", "Senior Consultant"].map((r) => (
              <div key={r} className="card !p-0 overflow-hidden">
                <Photo label="Portrait" className="aspect-[4/5] rounded-none" />
                <div className="p-4"><p className="font-semibold">[Name]</p><p className="text-sm text-ink-mute">{r}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork id="approach" eyebrow="Our approach" tint />

      <ValuesList />

      <CtaBand title="Work with Conductivity" text="Whether you are building a career or an organization, we would like to hear from you." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
