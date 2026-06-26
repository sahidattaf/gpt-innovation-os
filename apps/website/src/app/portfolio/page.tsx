import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { CaseStudyCard } from "@/components/case-study-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from GPT Innovation by Attaf — real AI deployments for hospitality, real estate, marketing, and operations businesses.",
};

const CASE_STUDIES = [
  {
    title: "Hospitality Concierge AI for a Curaçao Resort",
    industry: "Hospitality",
    description:
      "A mid-size resort needed to handle multilingual guest enquiries around the clock without adding front-desk staff. We built a concierge AI covering EN, PAP, ES, and NL — integrated into their existing WhatsApp channel.",
    outcome:
      "Guest enquiry response time reduced from 4 hours to under 3 minutes. Staff freed for in-person service.",
  },
  {
    title: "Property Scout AI for a Caribbean Real Estate Agency",
    industry: "Real Estate",
    description:
      "The agency was spending 6+ hours per week manually compiling property research reports for buyers. We automated the scouting, scoring, and report generation pipeline.",
    outcome:
      "Research time cut by 80%. Agents now deliver same-day property shortlists that previously took 3 days.",
  },
  {
    title: "ContentFlow AI for a Regional Marketing Agency",
    industry: "Marketing",
    description:
      "The agency needed to scale social content production for 12 clients without hiring additional copywriters. We built a brand-voice-aware content generation workflow with built-in human review gates.",
    outcome:
      "Content output increased 4× with the same team. Client retention improved due to faster turnaround.",
  },
  {
    title: "Automated Operations Reporting for a Logistics SME",
    industry: "Business Operations",
    description:
      "Weekly status reports were taking a senior manager 3 hours to compile from spreadsheets. We automated the data collection, summarisation, and formatting pipeline.",
    outcome:
      "Report preparation time reduced from 3 hours to 15 minutes. Management now gets reports every Monday morning without human effort.",
  },
] as const;

const METRICS = [
  { value: "4×", label: "Average content output increase" },
  { value: "80%", label: "Research time reduction" },
  { value: "< 3 min", label: "Guest response time (from 4 hrs)" },
  { value: "100%", label: "Human-reviewed AI outputs" },
] as const;

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="What we've shipped"
            description="Real AI deployments for real businesses. Each case study is a production system — not a proof of concept."
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-stone-800 bg-stone-900/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-2xl font-bold text-amber-400 sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs text-stone-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.title} {...cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <p className="text-xs text-stone-600">
          Case studies are illustrative of typical client outcomes. Specific business details
          are anonymised with client permission.
        </p>
      </div>

      <CTASection
        title="Want results like these?"
        description="Book a discovery call and we'll show you what's possible for your specific business."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
