import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { DiscoveryLink } from "@/components/discovery-link";
import { BUSINESS_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GPT Innovation by Attaf. Book a discovery call, send an email, or reach us on WhatsApp.",
};

const CONTACT_METHODS = [
  {
    label: "WhatsApp",
    value: BUSINESS_CONTACT.whatsappDisplay,
    href: BUSINESS_CONTACT.whatsappHref,
    cta: "Message on WhatsApp",
    note: "Preferred channel · Curaçao business hours · EN · PAP · ES · NL",
  },
  {
    label: "Email",
    value: BUSINESS_CONTACT.email,
    href: `mailto:${BUSINESS_CONTACT.email}`,
    cta: "Send an Email",
    note: "We respond within 1 business day",
  },
  {
    label: "Location",
    value: "Curaçao, Dutch Caribbean",
    href: null,
    cta: null,
    note: "UTC−4 · Atlantic Standard Time",
  },
] as const;

const FAQS = [
  {
    q: "What happens on a discovery call?",
    a: "We spend 45 minutes understanding your business, where you're stuck, and where AI might help. You leave with honest recommendations — whether or not you hire us.",
  },
  {
    q: "How quickly do you respond?",
    a: "WhatsApp messages typically within a few hours. Email within 1 business day. We're based in Curaçao (UTC−4).",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We serve clients across the Caribbean, the Netherlands, and internationally. All work is delivered remotely.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get in touch"
            title="Let's talk about your business"
            description="Start with a free discovery call. No pitch, no pressure — just an honest conversation about where AI can help you."
          />
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-stone-50">Not sure where to start?</h2>
              <p className="mt-2 text-sm text-stone-400">
                Prepare a focused discovery request before opening WhatsApp.
              </p>
            </div>
            <DiscoveryLink
              location="contact"
              className="mt-4 inline-flex rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400 sm:mt-0"
            >
              Start AI Discovery
            </DiscoveryLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {CONTACT_METHODS.map((method) => (
              <div
                key={method.label}
                className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                  {method.label}
                </p>
                <p className="mt-3 text-sm font-medium text-stone-200">{method.value}</p>
                <p className="mt-1 text-xs text-stone-500">{method.note}</p>
                {method.href && method.cta && (
                  <a
                    href={method.href}
                    target={method.label === "WhatsApp" ? "_blank" : undefined}
                    rel={method.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="mt-auto pt-6 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
                  >
                    {method.cta} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section
        className="border-t border-stone-800 bg-stone-900/40 py-16 sm:py-20"
        aria-labelledby="expect-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Discovery call"
            title="What to expect"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "45 minutes", body: "Focused conversation about your business and goals." },
              { step: "02", title: "Honest assessment", body: "We tell you whether AI can help — and how." },
              { step: "03", title: "Use-case shortlist", body: "We leave you with 2–3 concrete opportunities." },
              { step: "04", title: "No obligation", body: "You decide what, if anything, to do next." },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-3xl font-bold text-amber-500/30">{item.step}</span>
                <h3 className="mt-2 text-base font-semibold text-stone-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="contact-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader eyebrow="FAQ" title="Before you reach out" />
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
    </>
  );
}
