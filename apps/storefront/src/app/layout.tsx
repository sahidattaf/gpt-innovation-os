import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartShell } from "@/components/cart-shell";
import { StorefrontFooter } from "@/components/storefront-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GPT Innovation by Attaf — AI Products for Entrepreneurs",
    template: "%s | GPT Innovation by Attaf",
  },
  description:
    "Browse and request AI-powered products for hospitality, real estate, marketing, operations, and more. Multilingual. Based in Curaçao.",
  openGraph: {
    title: "GPT Innovation by Attaf — AI Products for Entrepreneurs",
    description:
      "Production-ready AI products for Caribbean and global businesses. Multilingual, practical, backed by hands-on deployment support.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-50 antialiased">
        <CartShell>
          <main id="main-content">{children}</main>
          <StorefrontFooter />
        </CartShell>
      </body>
    </html>
  );
}
