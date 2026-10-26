import { NextResponse } from "next/server";
import { getArticles } from "@/lib/cms";
import { insightAnchor } from "@/data/site";
import type { SearchItem } from "@/data/searchIndex";

export const revalidate = 300; // re-check the CMS every 5 minutes

// Articles for the site search, so anything published in the CMS is searchable without a redeploy.
export async function GET() {
  const items: SearchItem[] = (await getArticles()).map((a) => ({
    title: a.title,
    href: a.body?.length ? `/insights/${a.slug}` : `/insights#${insightAnchor(a.category)}`,
    group: "Insights",
    text: `${a.category} ${a.excerpt}`,
  }));
  return NextResponse.json(items);
}
