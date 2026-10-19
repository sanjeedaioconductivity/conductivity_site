import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Placeholder } from "@/components/ui";
import { legalPages } from "@/data/blueprint";

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  return page ? { title: page.title, robots: { index: false } } : {};
}

// Utility pages (blueprint §5.2 H). The text must come from a legal review (§16) before launch.
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} slim />
      <section className="section">
        <div className="container-x max-w-3xl">
          <Placeholder title={`${page.title} — awaiting legal review`}>
            This page must be written and approved for the relevant jurisdictions before the website launches.
          </Placeholder>
        </div>
      </section>
    </>
  );
}
