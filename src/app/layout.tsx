import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationJsonLd, SITE_URL } from "@/data/seo";
import CampaignTracker from "@/components/CampaignTracker";
import Analytics from "@/components/Analytics";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const description = "Conductivity builds and sustains talent pipelines by connecting organizational talent needs with individual career readiness, professional capability and meaningful opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Conductivity — The Talent Pipeline Company", template: "%s | Conductivity" },
  description,
  // Social sharing previews (blueprint §12, Phase 1 SEO).
  openGraph: { type: "website", siteName: "Conductivity", title: "Conductivity — The Talent Pipeline Company", description, locale: "en_PK" },
  twitter: { card: "summary", title: "Conductivity — The Talent Pipeline Company", description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} data-palette={process.env.NEXT_PUBLIC_PALETTE === "navy" ? "navy" : "logo"}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a href="#main" className="skip-link">Skip to main content</a>
        <CampaignTracker />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
