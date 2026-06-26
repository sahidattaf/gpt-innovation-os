import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "GPT Innovation by Attaf — AI built by entrepreneurs, for entrepreneurs. Based in Curaçao, serving Caribbean and global markets.",
};

const VALUES = [
  {
    title: "Practical over theoretical",
    body: "Every solution we build solves a real problem. We don't recommend AI because it's trendy — we recommend it because it works for your specific situation.",
  },
  {
    title: "Transparent by default",
    body: "AI systems built with us disclose their nature, limitations, and data usage. We believe transparency builds trust — with your customers and with regulators.",
  },
  {
    title: "Human review is non-negotiable",
    body: "For any AI output that affects a person's rights, safety, or finances, a human reviews before delivery. Always.",
  },
  {
    title: "Minimal data, maximum trust",
    body: "We collect only what is needed, retain only what is legally required, and delete the rest. Privacy is a feature, not a checkbox.",
  },
  {
    title: "Caribbean and global context",
    body: "We understand the unique intersection of Dutch, EU, and local law that governs business in Curaçao and the wider Dutch Caribbean.",
  },
  {
    title: "Long-term partnerships",
    body: "We don't do drive-by consulting. We build relationships with clients and are invested in the long-term success of what we deploy.",
  },
] as const;

const MILESTONES = [
  { year: "2023", event: "Founded in Curaçao with a focus on AI for Caribbean SMEs." },
  { year: "2024", event: "Launched Hospitality Concierge AI and Property Scout AI." },
  { year: "2025", event: "Expanded to EU-compliant AI delivery with Open EU AI Operator framework." },
  { year: "2026", event: "GPT Innovation OS launched — a full AI operating system for entrepreneurs." },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="About us"
            title="AI built by entrepreneurs, for entrepreneurs"
            description="GPT Innovation by Attaf was founded on one belief: that AI should be practical, honest, and accessible to every business — not just the ones with enterprise budgets."
          />
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                Founder
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-50">Sahid Attaf</h2>
              <p className="mt-1 text-sm text-stone-500">Founder & AI Operator · Curaçao</p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-400">
                <p>
                  Sahid Attaf is an entrepreneur and AI practitioner based in Curaçao. He founded
                  GPT Innovation to bridge the gap between what AI can do and what Caribbean
                  businesses can actually use.
                </p>
                <p>
                  With a background in business operations and a deep belief that technology should
                  serve people — not the other way around — Sahid built GPT Innovation to deliver
                  AI that is multilingual, human-reviewed, and grounded in real business outcomes.
                </p>
                <p>
                  He is also the creator of the Open EU AI Operator framework, a practical
                  governance toolkit for entrepreneurs deploying AI in EU-regulated markets.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Curaçao-based", "Multilingual AI", "EU AI Act compliant", "WhatsApp-native"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-800 px-3 py-1 text-xs font-medium text-stone-400"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                Our mission
              </p>
              <p className="mt-4 text-xl font-semibold leading-snug text-stone-50">
                Make AI deployment achievable for a solo operator or a team of five — without
                hiring a compliance consultant or an enterprise software budget.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Every engagement starts with your problem, not our product.",
                  "We disclose AI involvement. Always.",
                  "We build for the Caribbean regulatory context — not against it.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">✓</span>
                    <p className="text-sm leading-relaxed text-stone-400">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we stand for"
            title="Our principles"
            description="These aren't marketing copy. They shape every project, proposal, and decision we make."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5">
                <div className="mb-2 h-0.5 w-8 rounded-full bg-amber-500" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-stone-100">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Journey" title="How we got here" />
          <div className="mt-10 space-y-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex gap-6">
                <div className="w-16 shrink-0 text-sm font-bold text-amber-500">{m.year}</div>
                <div className="flex-1 border-l border-stone-800 pb-6 pl-6">
                  <p className="text-sm leading-relaxed text-stone-400">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Work with us"
        description="Whether you need a single AI product or a long-term AI partner — we'd love to hear about your business."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
