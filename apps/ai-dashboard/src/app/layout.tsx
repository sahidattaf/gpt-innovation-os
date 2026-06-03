import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Dashboard — GPT Innovation OS",
  description: "AI analytics, token usage, and conversation monitoring",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  );
}
