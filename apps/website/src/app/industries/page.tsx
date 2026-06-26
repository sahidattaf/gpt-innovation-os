import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { IndustryCard } from "@/components/industry-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI solutions for hospitality, real estate, marketing, business operations, education, and healthcare — built for Caribbean and global markets.",
};

const INDUSTRIES = [
  {
    title: "Hospitality & Tourism",
    description:
      "Caribbean hotels, resorts, and tour operators use our AI to handle multilingual guest communication, automate reviews, and personalise the guest journey from booking to checkout.",
    capabilities: [
      "Multilingual concierge AI (EN · PAP · ES · NL)",
      "Automated guest messaging and follow-up",
      "Review response generation",
      "Upsell and cross-sell workflows",
      "Post-stay feedback automation",
    ],
  },
  {
    title: "Real Estate",
    description:
      "Agencies and independent agents use our AI to scout properties, qualify leads, and generate listings at scale — cutting research time and accelerating the sales cycle.",
    capabilities: [
      "AI-powered property scouting reports",
      "Lead qualification and scoring",
      "Automated listing copy generation",
      "Buyer and seller follow-up sequences",
      "Market summary and insight reports",
    ],
  },
  {
    title: "Marketing & Agencies",
    description:
      "Digital agencies and in-house marketing teams use our ContentFlow AI to scale content production, maintain brand voice, and automate campaign reporting.",
    capabilities: [
      "Content generation at scale",
      "Brand-voice prompt engineering",
      "Social media scheduling automation",
      "Campaign performance summaries",
      "Client reporting automation",
    ],
  },
  {
    title: "Business Operations",
    description:
      "Operations teams use our AI to eliminate repetitive admin, automate internal reporting, and build knowledge bases that onboard staff faster.",
    capabilities: [
      "SOP and policy document generation",
      "Internal knowledge base automation",
      "Meeting summary and action items",
      "Email and communication drafting",
      "Automated status and progress reports",
    ],
  },
  {
    title: "Education",
    description:
      "Schools, training providers, and e-learning platforms use our AI to personalise learning content, automate grading support, and engage students in their language.",
    capabilities: [
      "Personalised learning content",
      "Multilingual student Q&A",
      "Automated quiz and assessment generation",
      "Curriculum planning assistance",
      "Parent and guardian communication",
    ],
  },
  {
    title: "Healthcare & Wellness",
    description:
      "Clinics, wellness centres, and health practitioners use our AI to handle appointment communication, patient education, and administrative triage — safely and compliantly.",
    capabilities: [
      "Appointment reminders and follow-up",
      "Patient education content",
      "Multilingual intake communication",
      "Administrative triage support",
      "Wellness programme content generation",
    ],
  },
] as const;

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who we serve"
            title="Built for the industries we know"
            description="We focus on sectors where AI creates immediate, measurable value — and where Caribbean businesses are underserved by generic tools."
          />
        </div>
      </section>

      {/* Industries grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <IndustryCard key={i.title} {...i} />
            ))}
          </div>
        </div>
      </section>

      {/* Regional note */}
      <section className="border-t border-stone-800 bg-stone-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Caribbean & Global
          </p>
          <h2 className="mt-3 text-2xl font-bold text-stone-50 sm:text-3xl">
            Local roots. Global standards.
          </h2>
          <p className="mt-4 leading-relaxed text-stone-400">
            Based in Curaçao, we understand the regulatory, cultural, and linguistic realities
            of the Dutch Caribbean. Our AI systems are built to work within those constraints —
            not around them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {["EU AI Act aware", "GDPR baseline", "Dutch–Caribbean context", "Multilingual native"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-stone-700 px-3 py-1 text-xs font-medium text-stone-400"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Your industry. Your workflows. Our AI."
        description="Book a free discovery call and we'll show you exactly how AI can help your specific business."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
