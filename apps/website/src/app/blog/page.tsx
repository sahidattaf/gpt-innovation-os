import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical AI insights for Caribbean entrepreneurs — from GPT Innovation by Attaf. No hype, just what works.",
};

const POSTS = [
  {
    slug: "what-is-ai-for-smes",
    title: "What AI Actually Means for Small Businesses in 2026",
    excerpt:
      "AI is everywhere in the headlines. But for a hotel owner in Curaçao or a real estate agent in Aruba, what does it actually mean in practice? We break it down.",
    category: "AI Strategy",
    date: "2026-06-01",
    readTime: "5 min",
  },
  {
    slug: "multilingual-ai-caribbean",
    title: "Why Multilingual AI Is Non-Negotiable for Caribbean Businesses",
    excerpt:
      "Your customers speak Papiamentu, Spanish, Dutch, and English — often in the same conversation. Generic AI fails them. Here's what to do instead.",
    category: "Multilingual AI",
    date: "2026-05-20",
    readTime: "6 min",
  },
  {
    slug: "eu-ai-act-small-operators",
    title: "The EU AI Act: What Small Operators Actually Need to Know",
    excerpt:
      "Most EU AI Act guides are written for enterprise legal teams. This one is for entrepreneurs who need to know what they're actually required to do — in plain language.",
    category: "Compliance",
    date: "2026-05-10",
    readTime: "8 min",
  },
  {
    slug: "human-review-ai-outputs",
    title: "Why We Always Review AI Outputs Before They Reach Customers",
    excerpt:
      "Every AI output we deploy has a human review gate. Here's why that's not a limitation — it's what makes our systems trustworthy and our clients confident.",
    category: "AI Operations",
    date: "2026-04-28",
    readTime: "4 min",
  },
  {
    slug: "whatsapp-ai-delivery",
    title: "WhatsApp as an AI Delivery Channel: Why It Works for Caribbean SMEs",
    excerpt:
      "Our clients' customers are on WhatsApp — not apps, not portals. Delivering AI through WhatsApp isn't a workaround; it's the right architecture for this market.",
    category: "Product",
    date: "2026-04-14",
    readTime: "5 min",
  },
  {
    slug: "ai-workflow-automation-101",
    title: "AI Workflow Automation 101: Where to Start Without the Hype",
    excerpt:
      "Before you automate anything, you need to understand what's actually slowing you down. Here's our step-by-step approach to identifying and prioritising AI automation opportunities.",
    category: "AI Strategy",
    date: "2026-04-01",
    readTime: "7 min",
  },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "AI Strategy": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Multilingual AI": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Compliance: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "AI Operations": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Product: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Blog"
            title="Practical AI insights"
            description="No hype. No jargon. Just what actually works for Caribbean entrepreneurs deploying AI in the real world."
          />
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Latest
            </p>
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20"}`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-stone-600">{formatDate(featured.date)}</span>
                <span className="text-xs text-stone-600">{featured.readTime} read</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-stone-50 sm:text-2xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-stone-400">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
              >
                Read article →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20"}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-stone-600">{post.readTime} read</span>
                </div>
                <h3 className="mt-3 flex-1 text-sm font-semibold leading-snug text-stone-50">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-stone-600">{formatDate(post.date)}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-medium text-amber-400 transition-colors hover:text-amber-300"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
