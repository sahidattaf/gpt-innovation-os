import type { Metadata } from "next";
import { DiscoveryLink } from "@/components/discovery-link";
import { BUSINESS_CONTACT } from "@/lib/contact";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = { title: "Contact", description: "Prepare an AI discovery request or contact Coach Sahid on WhatsApp." };

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-stone-50 sm:text-6xl">Start with a clear business problem.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">Use the private discovery guide to organize your request. You review the summary before choosing whether to open WhatsApp.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <article className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-7"><p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Recommended</p><h2 className="mt-4 text-2xl font-bold text-stone-50">Prepare your discovery</h2><p className="mt-3 text-sm leading-relaxed text-stone-400">Describe one repeated task, the desired result and who will review important outputs.</p><DiscoveryLink location="contact" className="mt-7 inline-flex rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400">Start AI Discovery</DiscoveryLink></article>
          <article className="rounded-2xl border border-stone-800 bg-stone-900/60 p-7"><p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Direct contact</p><h2 className="mt-4 text-2xl font-bold text-stone-50">Message Coach Sahid</h2><p className="mt-3 text-sm leading-relaxed text-stone-400">WhatsApp opens a conversation only. It does not confirm a booking, price, scope or delivery commitment.</p><WhatsAppLink location="contact" href={BUSINESS_CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-100 hover:bg-stone-800">WhatsApp {BUSINESS_CONTACT.whatsappDisplay}</WhatsAppLink></article>
        </div>
      </section>
    </main>
  );
}
