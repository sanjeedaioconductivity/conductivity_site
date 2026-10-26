import { createClient } from "@sanity/client";
import { events as localEvents, insightCategories, insights as localInsights, type EventItem } from "@/data/site";
import { opportunities as localOpportunities, type Opportunity } from "@/data/blueprint";

// Content from the Sanity CMS (blueprint §18, criterion 5): staff edit articles, opportunities and events in Sanity Studio.
// Until NEXT_PUBLIC_SANITY_PROJECT_ID is set, or if Sanity cannot be reached, the site uses the local data files instead.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const cmsEnabled = Boolean(projectId);
const client = projectId ? createClient({ projectId, dataset, apiVersion: "2026-09-01", useCdn: true }) : null;

/** How often pages re-check Sanity for changes, in seconds. Published edits appear within this time, no redeploy needed. */
export const CMS_REVALIDATE = 300;

// Minimal Portable Text (Sanity's rich text) types used by the article renderer.
export type Span = { _type: "span"; _key?: string; text: string; marks?: string[] };
export type Block = { _type: "block"; _key?: string; style?: string; listItem?: "bullet" | "number"; children: Span[]; markDefs?: { _key: string; _type: string; href?: string }[] };

export type Article = {
  slug: string; title: string; category: (typeof insightCategories)[number]; excerpt: string; date: string;
  author?: string; body?: Block[];
};

async function fetchOr<T>(query: string, fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(query, {}, { next: { revalidate: CMS_REVALIDATE } } as never);
    return data ?? fallback;
  } catch {
    return fallback; // Sanity unreachable: keep the site up with local content.
  }
}

/** Insights articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const local: Article[] = localInsights.map((i) => ({ ...i }));
  const rows = await fetchOr<Article[] | null>(
    `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
      "slug": slug.current, title, category, excerpt, "date": publishedAt, author, body
    }`, null);
  if (!rows || rows.length === 0) return local;
  return rows.filter((r) => (insightCategories as readonly string[]).includes(r.category));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

/** Opportunities still open today; expired ones never appear (§14). */
export async function getOpportunities(today = new Date().toISOString().slice(0, 10)): Promise<Opportunity[]> {
  const rows = await fetchOr<Opportunity[]>(
    `*[_type == "opportunity"] | order(posted desc) {
      title, type, organization, location, posted, closes, apply, description, employmentType, remote
    }`, localOpportunities);
  return rows.filter((o) => o.closes >= today);
}

/** Events, with "upcoming" worked out from the date. */
export async function getEvents(today = new Date().toISOString().slice(0, 10)): Promise<EventItem[]> {
  const rows = await fetchOr<Omit<EventItem, "upcoming">[] | null>(
    `*[_type == "event" && defined(slug.current)] | order(date desc) {
      "slug": slug.current, name, date, location, category, description
    }`, null);
  if (!rows || rows.length === 0) return localEvents;
  return rows.map((e) => ({ ...e, upcoming: e.date >= today }));
}
