import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import ArticleBody from "@/components/ArticleBody";
import { getArticle, getArticles } from "@/lib/cms";
import { insightAnchor } from "@/data/site";

export const revalidate = 300; // re-check the CMS every 5 minutes

type Props = { params: Promise<{ slug: string }> };

// One page per article that has body text in the CMS (blueprint §11, §14 "substantial original articles").
export async function generateStaticParams() {
  return (await getArticles()).filter((a) => a.body?.length).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle((await params).slug);
  if (!a?.body?.length) return {};
  return {
    title: a.title, description: a.excerpt,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = await getArticle((await params).slug);
  if (!a?.body?.length) notFound();
  const date = new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero eyebrow={a.category} title={a.title}>
        {date}{a.author ? ` · ${a.author}` : ""}
      </PageHero>
      <article className="section !py-10">
        <div className="container-x">
          <p className="max-w-3xl text-lg font-medium text-ink">{a.excerpt}</p>
          <ArticleBody body={a.body} />
          <div className="mt-10 flex flex-wrap gap-4 border-t border-ink/10 pt-6 text-sm font-semibold">
            <Link href={`/insights#${insightAnchor(a.category)}`} className="inline-flex items-center gap-1 text-spark-dark hover:gap-2"><ArrowLeft size={14} /> More in {a.category}</Link>
            <Link href="/contact" className="inline-flex items-center gap-1 text-spark-dark hover:gap-2">Talk to us about this <ArrowRight size={14} /></Link>
          </div>
        </div>
      </article>
    </>
  );
}
