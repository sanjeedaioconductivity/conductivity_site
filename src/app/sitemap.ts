import type { MetadataRoute } from "next";
import { employerPages, partnerPages, talentPages } from "@/data/blueprint";
import { SITE_URL } from "@/data/seo";
import { getArticles, getOpportunities } from "@/lib/cms";

export const revalidate = 3600; // pick up new CMS articles and opportunities hourly

// Search engine sitemap (blueprint §12 and §14): every indexable page in the sitemap (§5.2), plus published articles.
// Left out on purpose: legal pages awaiting review, the preferences page, and Opportunities while it is empty.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, opportunities] = await Promise.all([getArticles(), getOpportunities()]);
  const paths = [
    "/", "/employers", "/talent", "/our-model", "/partners", "/partners/become-a-partner",
    "/insights", "/about", "/trust", "/contact", "/events", "/careers", "/sanjeeda",
    ...(opportunities.length ? ["/opportunities"] : []),
    ...employerPages.map((p) => `/employers/${p.slug}`),
    ...talentPages.map((p) => `/talent/${p.slug}`),
    ...partnerPages.map((p) => `/partners/${p.slug}`),
    ...articles.filter((a) => a.body?.length).map((a) => `/insights/${a.slug}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
