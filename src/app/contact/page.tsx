import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk.">Send an inquiry or reach us through any of the channels below.</PageHero>
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <div id="location" className="card space-y-4 scroll-mt-16">
              <p className="flex gap-3"><MapPin className="shrink-0 text-spark-dark" /> {contactInfo.address}</p>
              <p className="flex gap-3"><Phone className="shrink-0 text-spark-dark" /> {contactInfo.phone}</p>
              <p className="flex gap-3"><Mail className="shrink-0 text-spark-dark" /> <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a></p>
              <p className="flex flex-wrap gap-4 text-sm font-medium">{contactInfo.social.map((s) => <a key={s.label} href={s.href} className="text-spark-dark hover:underline">{s.label}</a>)}</p>
            </div>
            <div role="img" aria-label="Map placeholder" className="grid aspect-video place-items-center rounded-2xl bg-paper text-sm text-ink-mute ring-1 ring-ink/10">Map embed goes here</div>
          </div>
          <div id="inquiry" className="scroll-mt-16 lg:col-span-3"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
