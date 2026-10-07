import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";
import ServicesExplorer from "@/components/ServicesExplorer";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={"Career, HR, organizational,\ntraining, talent and mobility solutions."} />

      <ServicesExplorer />

      <CtaBand title="Not sure which service fits?" text="Tell us your goal and we will point you to the right starting point." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
