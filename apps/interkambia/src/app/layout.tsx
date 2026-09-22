import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "InterKambia — Curaçao ↔ Netherlands Service Exchange",
  description:
    "A trusted, invite-only B2B service corridor connecting verified businesses and professionals in Curaçao and the Netherlands.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
