import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Open EU AI Operator",
  description:
    "A practical EU AI Act and GDPR compliance framework for entrepreneurs deploying AI — without a legal team. Built by GPT Innovation by Attaf.",
};

const COVERAGE = [
  {
    icon: "📋",
    title: "EU AI Act Classification",
    description:
      "Identify your AI system's risk tier — minimal, limited, or high — and understand exactly what obligations apply before you go live.",
    items: ["Risk tier assessment", "Sector-specific guidance", "Conformity checklist"],
  },
  {
    icon: "🔐",
    title: "GDPR Data Mapping",
    description:
      "Art. 30 records of processing, data flow documentation, retention schedules, and subject rights procedures — in a template you can actually complete.",
    items: ["Art. 30 records template", "Processor and transfer mapping", "Breach register"],
  },
  {
    icon: "👁️",
    title: "Transparency Obligations",
    description:
      "User-facing disclosures, AI system labelling, and plain-language notices that meet regulatory requirements without burying your users in legalese.",
    items: ["Disclosure language templates", "AI output labelling guide", "Privacy notice clauses"],
  },
  {
    icon: "🛡️",
    title: "AI System Cards",
    description:
      "Per-system documentation covering purpose, risk, data, human oversight, and incident logging — filed before deployment, reviewed quarterly.",
    items: ["System card template", "Human oversight checklist", "Incident log format"],
  },
  {
    icon: "👥",
    title: "Human Review Protocols",
    description:
      "For high-stakes AI outputs, our framework defines who reviews, what they check, and how they escalate — so human oversight is real, not performative.",
    items: ["Review gate design", "Escalation paths", "Audit trail requirements"],
  },
  {
    icon: "🌍",
    title: "Caribbean & Dutch Context",
    description:
      "Curaçao, Aruba, and Sint Maarten operate at the intersection of Dutch, EU, and local law. The framework acknowledges this — most others ignore it.",
    items: ["Dutch Caribbean context notes", "BES islands guidance", "Cross-border transfer rules"],
  },
] as const;

const AUDIENCES = [
  {
    title: "Solo AI Consultant",
    description:
      "Deploy compliant AI automations for SME clients without needing your own legal counsel for every project.",
  },
  {
    title: "SaaS Founder",
    description:
      "Ship EU-market products with built-in compliance documentation from day one — not retrofitted after a regulator asks.",
  },
  {
    title: "Agency Owner",
    description:
      "Standardise AI delivery across client projects with consistent governance that protects you and your clients.",
  },
  {
    title: "Caribbean Entrepreneur",
    description:
      "Navigate the EU regulatory overlap in Curaçao and the Dutch Caribbean with guidance written for your context.",
  },
] as const;

const TEMPLATES = [
  { name: "VISION.md", description: "Framework purpose, principles, and target users" },
  { name: "AI-SYSTEM-CARD.md", description: "Per-system EU AI Act and transparency checklist" },
  { name: "DATA-MAP-TEMPLATE.md", description: "GDPR Art. 30 records, breach register, AI data section" },
  { name: "EU-AI-ACT-CHECKLIST.md", description: "Risk classification and conformity requirements" },
  { name: "GDPR-CHECKLIST.md", description: "Data protection obligations by processing activity" },
  { name: "AGENT-REGISTRY.md", description: "Register of deployed AI agents and their parameters" },
] as const;

export default function OpenEUPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-800 bg-stone-950 py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
              Open EU AI Operator · v0.2
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl">
              EU AI compliance for entrepreneurs —{" "}
              <span className="text-violet-400">without a legal team</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-400">
              Open EU AI Operator is a practical governance framework for deploying AI in the
              European Union and Dutch Caribbean. Templates, checklists, and guidance written for
              solo operators and small teams — not enterprise compliance departments.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
              >
                Get Compliance Support
              </Link>
              <Link
                href="#templates"
                className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
              >
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="The problem"
                title="EU AI Act obligations are real. The guidance isn't."
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-400">
                <p>
                  Most EU AI Act compliance resources are written for large enterprises with legal
                  departments. Small operators — freelancers, agencies, SaaS founders, and
                  consultants — face the same obligations but with none of the infrastructure.
                </p>
                <p>
                  The gap is clear: obligations are real, tooling is absent, and guidance is
                  inaccessible to anyone without a compliance budget.
                </p>
                <p>
                  Open EU AI Operator closes that gap with opinionated, actionable templates built
                  for operators who need to ship compliant AI — not study for a law exam.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "EU AI Act", status: "In force" },
                { label: "GDPR", status: "Enforceable" },
                { label: "Caribbean Dutch law", status: "Applies" },
                { label: "Generic AI tools", status: "Non-compliant" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                    {item.label}
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      item.status === "Non-compliant" ? "text-red-400" : "text-amber-400"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="coverage-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What it covers"
            title="Governance for every layer of AI deployment"
            description="From risk classification to data mapping to human review protocols — the framework addresses the full compliance lifecycle."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {COVERAGE.map((area) => (
              <div
                key={area.title}
                className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-xl"
                  aria-hidden="true"
                >
                  {area.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-stone-50">{area.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-stone-400">{area.description}</p>
                <ul className="mt-5 space-y-1.5">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-stone-500">
                      <span className="mt-0.5 shrink-0 text-violet-400" aria-hidden="true">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-20" aria-labelledby="audience-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who it's for"
            title="Built for operators, not compliance departments"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {AUDIENCES.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <div className="mb-2 h-0.5 w-8 rounded-full bg-violet-500" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-stone-100">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section
        id="templates"
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="templates-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Templates · v0.2"
            title="Governance documents you can use today"
            description="Every template is opinionated, battle-tested, and written in plain language. Fill in your details — not legalese."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <div
                key={t.name}
                className="flex items-start gap-4 rounded-2xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 text-violet-400"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-100">{t.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-stone-600">
            Templates are provided for informational purposes. Consult a qualified attorney for
            legal advice specific to your jurisdiction and use case.
          </p>
        </div>
      </section>

      <CTASection
        title="Need hands-on compliance support?"
        description="We can help you apply the Open EU AI Operator framework to your specific AI deployments — from risk classification to full documentation."
        primaryCta={{ label: "Get Compliance Support", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
