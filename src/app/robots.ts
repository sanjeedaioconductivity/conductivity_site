import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

// Lets search engines crawl the site and points them to the sitemap (blueprint §12, Phase 1 SEO).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
