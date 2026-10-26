import type { Metadata } from "next";

// Public address of the site, used for the sitemap, robots file, canonical links and social previews.
// TODO(launch): set NEXT_PUBLIC_SITE_URL to the live domain once it is confirmed.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.conductivity.com.pk").replace(/\/$/, "");

/**
 * Page metadata (blueprint §14): a descriptive title and description, a canonical URL,
 * and `noindex` for private or thin pages so search engines skip them.
 */
export function pageMeta(path: string, title: string, description: string, opts: { noindex?: boolean } = {}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${title} | Conductivity`, description },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// Organization structured data shown to search engines on every page (§14 "structured content").
// TODO(content): add address, phone and social profile links once confirmed.
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Conductivity Consultancy (Pvt.) Ltd.",
  alternateName: "Conductivity",
  url: SITE_URL,
  logo: `${SITE_URL}/conductivity-logo-v4.png`,
  email: "info@conductivity.com.pk",
  slogan: "Readiness. Opportunities. Success.",
  description: "The Talent Pipeline Company: talent intelligence, recruitment, HR and organization development, career readiness and global talent access in Pakistan.",
  areaServed: "PK",
};
