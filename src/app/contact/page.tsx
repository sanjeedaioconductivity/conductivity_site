import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import { Mail, MapPin, Phone, Share2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = pageMeta("/contact", "Contact", "Contact Conductivity about talent pipelines, recruitment, HR consulting, career counselling, mentoring or partnerships.");

/** One white info card: red icon, small uppercase title, details underneath. */
function InfoCard({ icon: Icon, title, id, children }: { icon: LucideIcon; title: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-16 bg-white p-6 text-center shadow-card ring-1 ring-ink/5">
      <Icon className="mx-auto text-spark" size={34} strokeWidth={1.6} />
      <h2 className="mt-3 text-xs font-bold uppercase tracking-wider text-ink">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero slim title="Let's talk." />

      <section className="relative bg-[#f5f5f5] pb-12 pt-0 sm:pb-16">
        {/* The grey section starts below the red band; the content is pulled up over the band's lower edge. */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-12 bg-spark" />
        <div className="container-x relative">
          {/* On desktop the cards sit over the left edge of the red form panel. */}
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:relative lg:z-10 lg:-mr-10 lg:self-center">
              <InfoCard icon={MapPin} title="Our main office" id="location">{contactInfo.address}</InfoCard>
              <InfoCard icon={Phone} title="Phone number">{contactInfo.phone}</InfoCard>
              <InfoCard icon={Share2} title="Follow us">
                <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                  {contactInfo.social.map((s) => <a key={s.label} href={s.href} className="font-medium text-spark-dark hover:underline">{s.label}</a>)}
                </p>
              </InfoCard>
              <InfoCard icon={Mail} title="Email">
                <a href={`mailto:${contactInfo.email}`} className="font-medium text-spark-dark underline">
                  {/* <wbr> lets a long address wrap after the @ instead of mid-word */}
                  {contactInfo.email.split("@")[0]}@<wbr />{contactInfo.email.split("@")[1]}
                </a>
              </InfoCard>
            </div>

            <div id="inquiry" className="scroll-mt-16"><ContactForm /></div>
          </div>

          <div role="img" aria-label="Map placeholder" className="mt-6 grid h-52 place-items-center bg-white text-sm text-ink-mute ring-1 ring-ink/10">
            Map embed goes here
          </div>
        </div>
      </section>
    </>
  );
}
