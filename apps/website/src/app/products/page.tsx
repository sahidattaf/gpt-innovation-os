import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "AI Products",
  description:
    "Browse GPT Innovation's production-ready AI products — for hospitality, real estate, marketing, operations, education, and AI automation. Multilingual. Based in Curaçao.",
};

const CATEGORY_COLORS: Record<string, string> = {
  hospitality: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "real-estate": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  marketing: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "business-operations": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  education: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "ai-automation": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const CATEGORY_LABELS: Record<string, string> = {
  hospitality: "Hospitality",
  "real-estate": "Real Estate",
  marketing: "Marketing",
  "business-operations": "Business Ops",
  education: "Education",
  "ai-automation": "AI Automation",
};

const PRODUCTS = [
  {
    slug: "hospitality-concierge-ai",
    name: "Hospitality Concierge AI",
    category: "hospitality",
    shortDescription:
      "Multilingual AI guest assistant for hotels, resorts, and vacation rentals.",
    price: "$297/mo",
    featured: true,
    capabilities: [
      "24/7 multilingual support (EN · PAP · ES · NL)",
      "Automated check-in / check-out FAQ handling",
      "WhatsApp and web chat deployment",
    ],
  },
  {
    slug: "property-scout-ai",
    name: "Property Scout AI",
    category: "real-estate",
    shortDescription:
      "AI-powered property matching and lead qualification for real estate agents.",
    price: "$197/mo",
    featured: true,
    capabilities: [
      "Automated buyer lead qualification",
      "Multilingual listing descriptions",
      "Automated follow-up sequences",
    ],
  },
  {
    slug: "contentflow-ai",
    name: "ContentFlow AI",
    category: "marketing",
    shortDescription:
      "AI content engine for social media, email, and multilingual marketing copy.",
    price: "$147/mo",
    featured: false,
    capabilities: [
      "Weekly social media content calendar",
      "Multilingual copy generation",
      "Brand voice training from existing content",
    ],
  },
  {
    slug: "operations-command-gpt",
    name: "Operations Command GPT",
    category: "business-operations",
    shortDescription:
      "AI business operations assistant for reporting, documentation, and process automation.",
    price: "$397/mo",
    featured: true,
    capabilities: [
      "SOP and policy document drafting",
      "Meeting transcript summarisation",
      "Weekly performance report generation",
    ],
  },
  {
    slug: "coursebuilder-ai",
    name: "CourseBuilder AI",
    category: "education",
    shortDescription:
      "AI-powered course design and content generation for trainers and educators.",
    price: "$97/mo",
    featured: false,
    capabilities: [
      "Full course outline generation",
      "Quiz and assessment question generation",
      "Multilingual content adaptation",
    ],
  },
  {
    slug: "agent-deployment-pack",
    name: "Agent Deployment Pack",
    category: "ai-automation",
    shortDescription:
      "Bespoke multi-agent AI system design, build, and deployment for your business.",
    price: "Custom pricing",
    featured: true,
    capabilities: [
      "Custom agent architecture design",
      "Integration with your existing stack",
      "30-day post-launch monitoring",
    ],
  },
  {
    slug: "proposal-generator-pro",
    name: "Proposal Generator Pro",
    category: "business-operations",
    shortDescription:
      "One-time AI setup that produces professional client proposals in minutes.",
    price: "$497 one-time",
    featured: false,
    capabilities: [
      "Brand voice and tone configuration",
      "One-click proposal generation",
      "Export to PDF or Google Docs",
    ],
  },
  {
    slug: "multilingual-sales-bot",
    name: "Multilingual Sales Bot",
    category: "marketing",
    shortDescription:
      "AI sales assistant in Papiamentu, Spanish, English, and Dutch for Caribbean B2B teams.",
    price: "$197/mo",
    featured: false,
    capabilities: [
      "Inbound B2B lead qualification in four languages",
      "Discovery call booking via WhatsApp",
      "CRM integration for lead capture",
    ],
  },
] as const;

export default function ProductsPage() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const rest = PRODUCTS.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="AI Products"
            title="Production-ready AI for your business"
            description="Every product is built for real workflows — not demos. Multilingual, human-reviewed, and deployed to Caribbean and global businesses."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
              <span
                key={cat}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[cat] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20"}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-b border-stone-800 py-16 sm:py-20" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-amber-500">
              Most requested
            </p>
            <h2 id="featured-heading" className="sr-only">Featured products</h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {featured.map((product) => {
                const colorClass = CATEGORY_COLORS[product.category] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20";
                const catLabel = CATEGORY_LABELS[product.category] ?? product.category;
                return (
                  <article
                    key={product.slug}
                    className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
                        {catLabel}
                      </span>
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
                        Featured
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-stone-50">
                      {product.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-400">
                      {product.shortDescription}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {product.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-xs text-stone-500">
                          <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">✓</span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-4">
                      <span className="text-sm font-semibold text-stone-200">{product.price}</span>
                      <Link
                        href="/contact"
                        className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500"
                      >
                        Request
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All other products */}
      <section className="py-16 sm:py-20" aria-labelledby="all-products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-stone-500">
            All products
          </p>
          <h2 id="all-products-heading" className="sr-only">All products</h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {rest.map((product) => {
              const colorClass = CATEGORY_COLORS[product.category] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20";
              const catLabel = CATEGORY_LABELS[product.category] ?? product.category;
              return (
                <article
                  key={product.slug}
                  className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/50 p-5"
                >
                  <span className={`self-start inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
                    {catLabel}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-stone-50">{product.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-stone-400">
                    {product.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-4">
                    <span className="text-xs font-semibold text-stone-300">{product.price}</span>
                    <Link
                      href="/contact"
                      className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-200"
                    >
                      Request
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Storefront note */}
      <div className="border-t border-stone-800 bg-stone-900/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold text-stone-200">Looking for the full product catalogue?</p>
              <p className="mt-1 text-sm text-stone-500">
                Browse detailed specs, pricing, and add products to your cart in the GPT Innovation Storefront.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-xl border border-stone-700 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800"
            >
              Contact Us to Order
            </Link>
          </div>
        </div>
      </div>

      <CTASection
        title="Not sure which product fits your business?"
        description="Book a free discovery call. We'll identify the right product — or build something custom if nothing fits."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
