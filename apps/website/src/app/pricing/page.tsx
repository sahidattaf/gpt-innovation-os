import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { PricingCard } from "@/components/pricing-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent AI pricing for entrepreneurs — from a free discovery call to a full AI operating system. No hidden fees.",
};

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description:
      "A 45-minute discovery call to understand your business, identify AI opportunities, and get honest advice — no commitment required.",
    features: [
      "45-minute strategy call",
      "AI readiness assessment",
      "Use-case recommendations",
      "No obligation or lock-in",
    ],
    cta: "Book Free Call",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Build",
    price: "Custom",
    description:
      "A scoped AI product or automation built for your specific workflow. Priced per project after discovery — transparent, no surprises.",
    features: [
      "Everything in Starter",
      "Custom AI product or automation",
      "Human-review layer included",
      "Deployment and documentation",
      "30-day post-launch support",
    ],
    cta: "Get a Quote",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Operate",
    price: "Retainer",
    period: "/ month",
    description:
      "Ongoing AI support, maintenance, and iteration for businesses that want their AI systems to stay accurate, current, and improving.",
    features: [
      "Everything in Build",
      "Monthly system review",
      "Prompt and model updates",
      "Performance reporting",
      "Priority incident response",
      "Dedicated WhatsApp channel",
    ],
    cta: "Talk to Us",
    href: "/contact",
    highlighted: false,
  },
] as const;

const FAQS = [
  {
    q: "How is custom pricing determined?",
    a: "After a discovery call, we scope the work and give you a fixed-price proposal. You know exactly what you're paying before we start.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. Many of our clients are solo operators and small teams. We scope projects to match budget realities, not enterprise expectations.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We invoice via bank transfer and accept payment in USD, ANG, and EUR. Payment schedules are agreed per project.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "No. Project work is per-engagement. Retainer contracts start month-to-month with 30-day notice.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes — contact us and we'll discuss what's possible.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="Transparent, project-based pricing"
            description="We don't do per-seat SaaS. We build AI for your business, price it per project, and support it on retainer. Start with a free discovery call."
            centered
          />
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {PLANS.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-stone-600">
            All prices in USD. Custom projects quoted after discovery call.
            No payment collected on this site.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
          />
          <div className="mt-10 space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-stone-800 pb-6">
                <h3 className="text-sm font-semibold text-stone-100">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which plan fits?"
        description="Book a free discovery call. We'll figure it out together."
        primaryCta={{ label: "Book a Free Call", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
