import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacySafeAnalytics } from "@/components/privacy-safe-analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GPT Innovation by Attaf — AI for Entrepreneurs",
    template: "%s | GPT Innovation by Attaf",
  },
  description:
    "Practical AI education, discovery and controlled pilot preparation for Caribbean businesses. Based in Curaçao.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "GPT Innovation by Attaf — AI for Entrepreneurs",
    description:
      "Practical AI demonstrations and a controlled Business AI Setup pilot from Curaçao.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-stone-950 font-sans text-stone-50 antialiased">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <PrivacySafeAnalytics />
      </body>
    </html>
  );
}
