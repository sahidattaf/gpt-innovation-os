import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Products for Entrepreneurs",
};

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-32 text-center sm:py-40">
      <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
        AI Products for Entrepreneurs
      </span>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
        AI tools built for{" "}
        <span className="text-amber-400">real business</span> outcomes
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-400">
        GPT Innovation by Attaf delivers production-ready AI products for
        hospitality, real estate, marketing, operations, and more —
        multilingual, practical, and backed by hands-on deployment support.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/products"
          className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
        >
          Browse Products
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
        >
          Contact Us
        </Link>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {[
          "Multilingual AI (EN · PAP · ES · NL)",
          "Based in Curaçao",
          "WhatsApp-first delivery",
          "Human review on every deployment",
        ].map((signal) => (
          <div key={signal} className="flex items-center gap-2 text-sm text-stone-500">
            <span className="h-1 w-1 rounded-full bg-amber-500" aria-hidden="true" />
            {signal}
          </div>
        ))}
      </div>
    </section>
  );
}
