import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Conductivity — Career, HR & Talent Ecosystem", template: "%s | Conductivity" },
  description: "Conductivity connects people, organizations, opportunities and capabilities so they can produce better outcomes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} data-palette={process.env.NEXT_PUBLIC_PALETTE === "navy" ? "navy" : "logo"}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
