import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryLink } from "@/components/discovery-link";
import { BUSINESS_CONTACT } from "@/lib/contact";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Business AI Setup Pilot",
  description: "Explore one focused Business AI Setup pilot with owner review at every important step.",
};

const PILOT_STEPS = [
  ["01", "Choose one workflow", "Start with one repeated task, such as customer questions, lead intake, handovers or reporting."],
  ["02", "Define the information", "Identify approved source material, boundaries and the people responsible for checking output."],
  ["03", "Prepare a controlled pilot", "Test a small workflow using sample or owner-approved information before any wider use."],
  ["04", "Review the evidence", "Decide whether the pilot is useful, what needs revision and whether implementation should be scoped."],
] as const;

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Pilot offer</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-50 sm:text-6xl">Business AI Setup</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-400">A focused pilot to explore one useful AI-assisted workflow for your business—with clear limits, owner-approved information and human review.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
              <p className="text-sm font-semibold text-amber-300">Pilot · scope confirmed after discovery</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">No price is published on this website. Discovery is not a contract, confirmed booking or promise of implementation.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20" aria-labelledby="pilot-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="pilot-heading" className="text-3xl font-bold text-stone-50">What the pilot is designed to do</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-stone-800 bg-stone-800 md:grid-cols-2">
            {PILOT_STEPS.map(([number, title, body]) => (
              <article key={number} className="bg-stone-950 p-7">
                <p className="text-xs font-bold text-amber-400">{number}</p>
                <h3 className="mt-5 text-xl font-semibold text-stone-100">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-stone-800 bg-stone-900/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Good starting points</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-300"><li>Repeated customer-question drafts</li><li>Structured lead or request intake</li><li>Staff handovers, checklists or SOP lookup</li><li>Manager-reviewed summaries and follow-up drafts</li></ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Important boundaries</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-400"><li>The public videos and examples are demonstrations, not client case studies.</li><li>No integration, deployment, performance result or compliance status is promised.</li><li>Important outputs require human review before anyone acts on them.</li><li>Final scope, responsibilities and commercial terms require separate approval.</li></ul>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-stone-50">Start with your business problem</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-stone-400">Prepare a private discovery request, review it yourself, then decide whether to continue on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DiscoveryLink location="pilot" className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400">Check pilot fit</DiscoveryLink>
            <WhatsAppLink location="pilot" href={BUSINESS_CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-100 hover:border-stone-500 hover:bg-stone-900">Message Coach Sahid</WhatsAppLink>
            <Link href="/videos" className="px-4 py-3 text-sm font-semibold text-amber-300 hover:text-amber-200">Watch the demonstrations →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
