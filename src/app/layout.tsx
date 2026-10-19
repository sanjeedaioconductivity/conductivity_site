import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Conductivity — The Talent Pipeline Company", template: "%s | Conductivity" },
  description: "Conductivity builds and sustains talent pipelines by connecting organizational talent needs with individual career readiness, professional capability and meaningful opportunities.",
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
