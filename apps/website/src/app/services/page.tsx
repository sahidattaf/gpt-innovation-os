import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI strategy, custom product development, workflow automation, multilingual systems, training, and ongoing support — from GPT Innovation by Attaf.",
};

const SERVICES = [
  {
    icon: "🎯",
    title: "AI Strategy & Consulting",
    description:
      "We assess your business, identify where AI creates the most leverage, and build a practical roadmap you can act on — no buzzwords, no bloat.",
    features: [
      "AI readiness assessment",
      "Use-case prioritisation",
      "Vendor and tool selection",
      "Risk and compliance review",
    ],
  },
  {
    icon: "🤖",
    title: "Custom AI Product Development",
    description:
      "We design, build, and deploy production-ready AI systems scoped to your exact workflow — from concierge chatbots to automated reporting engines.",
    features: [
      "Scoped discovery and spec",
      "Build, test, and deploy",
      "Human-review layer built in",
      "Handover and documentation",
    ],
  },
  {
    icon: "⚡",
    title: "AI Workflow Automation",
    description:
      "Repetitive tasks, data entry, reporting, and communication — we automate the work that drains your team so they can focus on what matters.",
    features: [
      "Process mapping and audit",
      "Automation design and build",
      "CRM and Notion integration",
      "Monitoring and audit trail",
    ],
  },
  {
    icon: "🌍",
    title: "Multilingual AI Systems",
    description:
      "AI that speaks Papiamentu, Spanish, English, and Dutch — built for Caribbean entrepreneurs who serve diverse, multilingual customers.",
    features: [
      "EN · PAP · ES · NL support",
      "Localised tone and phrasing",
      "Cultural context awareness",
      "Regional compliance notes",
    ],
  },
  {
    icon: "📚",
    title: "AI Training & Enablement",
    description:
      "Your team needs to trust and use AI effectively. We run workshops, create SOPs, and embed AI literacy into your operations.",
    features: [
      "Team AI literacy workshops",
      "Prompt engineering training",
      "SOP and playbook creation",
      "Ongoing Q&A support",
    ],
  },
  {
    icon: "🛡️",
    title: "Ongoing AI Support",
    description:
      "AI systems need maintenance, updates, and monitoring. We offer retainer packages so your tools stay accurate, safe, and up to date.",
    features: [
      "Monthly system review",
      "Model and prompt updates",
      "Incident response",
      "Performance reporting",
    ],
  },
] as const;

const PROCESS = [
  { step: "01", title: "Discovery", body: "We map your business, goals, and constraints in a focused call." },
  { step: "02", title: "Scope & Spec", body: "We define exactly what we'll build, timelines, and success criteria." },
  { step: "03", title: "Build & Test", body: "We build your AI system and test it against real scenarios." },
  { step: "04", title: "Deploy & Train", body: "We deploy, document, and train your team to use it confidently." },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we offer"
            title="AI services that deliver results"
            description="We don't sell AI for the sake of AI. Every engagement starts with your business problem and ends with a working solution your team can use."
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 sm:py-20" aria-labelledby="services-grid-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="services-grid-heading" className="sr-only">All services</h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="process-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How we work"
            title="A process built for clarity"
            description="Every engagement follows the same four steps — so you always know where we are and what comes next."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step}>
                <span className="text-3xl font-bold text-amber-500/30">{p.step}</span>
                <h3 className="mt-2 text-base font-semibold text-stone-50">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to get started?"
        description="Tell us what you're trying to solve. We'll tell you honestly whether AI can help — and how."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
