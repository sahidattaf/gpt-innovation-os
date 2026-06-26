import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { IndustryCard } from "@/components/industry-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "AI Products for Entrepreneurs",
  description:
    "Production-ready AI products for hospitality, real estate, marketing, and operations. Multilingual. Based in Curaçao.",
};

const FEATURED_SERVICES = [
  {
    icon: "🤖",
    title: "Custom AI Products",
    description:
      "We build production-ready AI systems tailored to your business — not generic chatbots, but tools that integrate into your actual workflows.",
    features: ["Scoped to your use case", "Multilingual by default", "Human-reviewed outputs"],
  },
  {
    icon: "⚡",
    title: "AI Workflow Automation",
    description:
      "Automate repetitive tasks, reporting, and communication with AI workflows that your team can actually trust and manage.",
    features: ["WhatsApp-native delivery", "CRM & Notion integration", "Audit trail included"],
  },
  {
    icon: "🌍",
    title: "Multilingual AI Systems",
    description:
      "AI that speaks your customers' language — Papiamentu, Spanish, English, and Dutch — built for Caribbean and global markets.",
    features: ["EN · PAP · ES · NL", "Localised tone and context", "Regional compliance aware"],
  },
] as const;

const FEATURED_INDUSTRIES = [
  {
    title: "Hospitality & Tourism",
    description:
      "Concierge AI, multilingual guest communication, and automated review management for hotels, resorts, and tour operators.",
    capabilities: ["Guest experience automation", "Multilingual support", "Booking & upsell flows"],
  },
  {
    title: "Real Estate",
    description:
      "Property scouting, lead qualification, and AI-generated listings that accelerate your sales cycle.",
    capabilities: ["Automated property reports", "Lead scoring", "Listing copy generation"],
  },
  {
    title: "Marketing & Agencies",
    description:
      "ContentFlow AI and campaign automation tools that help agencies deliver more value without increasing headcount.",
    capabilities: ["Content generation at scale", "Brand-voice alignment", "Performance reporting"],
  },
] as const;

const TRUST_PILLARS = [
  { title: "Multilingual first", body: "EN · PAP · ES · NL — native, not translated." },
  { title: "Human review always", body: "Every AI output reviewed before delivery." },
  { title: "WhatsApp-native", body: "Reach customers where they already are." },
  { title: "Caribbean-built", body: "Designed for Curaçao and the wider region." },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-800 bg-stone-950 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
              AI Products for Entrepreneurs
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
              AI tools built for{" "}
              <span className="text-amber-400">real business</span> outcomes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-400 sm:text-xl">
              GPT Innovation by Attaf delivers production-ready AI products for hospitality,
              real estate, marketing, and operations — multilingual, practical, and backed by
              hands-on deployment support.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/services"
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
              >
                See Our Services
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
              >
                Talk to Us
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "Multilingual AI (EN · PAP · ES · NL)",
              "Based in Curaçao",
              "WhatsApp-first delivery",
              "Human review on every deployment",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-stone-500">
                <span className="h-1 w-1 rounded-full bg-amber-500" aria-hidden="true" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
            What we build
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="services-heading" className="text-2xl font-bold text-stone-50 sm:text-3xl">
              Services that ship
            </h2>
            <Link
              href="/services"
              className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              All services →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {FEATURED_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries preview */}
      <section
        className="border-t border-stone-800 py-20"
        aria-labelledby="industries-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
            Who we serve
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="industries-heading" className="text-2xl font-bold text-stone-50 sm:text-3xl">
              Industries we know
            </h2>
            <Link
              href="/industries"
              className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              All industries →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {FEATURED_INDUSTRIES.map((i) => (
              <IndustryCard key={i.title} {...i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section
        className="border-t border-stone-800 bg-stone-900/50 py-16"
        aria-labelledby="trust-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="trust-heading"
            className="mb-10 text-center text-xl font-semibold text-stone-50"
          >
            Why GPT Innovation by Attaf
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((p) => (
              <div key={p.title}>
                <div className="mb-2 h-1 w-8 rounded-full bg-amber-500" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-stone-100">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to deploy AI in your business?"
        description="Book a discovery call or browse our AI product catalogue. No lock-in, no promises — just results."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
