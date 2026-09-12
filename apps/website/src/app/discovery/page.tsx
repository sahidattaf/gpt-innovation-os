import type { Metadata } from "next";
import { DiscoveryForm } from "@/components/discovery-form";

export const metadata: Metadata = {
  title: "AI Discovery",
  description:
    "Prepare a private AI discovery request for GPT Innovation by Attaf through WhatsApp.",
};

export default function DiscoveryPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Curaçao hospitality
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl">
            Start your AI discovery
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-400">
            Check whether one workflow may fit the Business AI Setup pilot. Your answers stay in
            this browser until you choose to open a WhatsApp draft.
          </p>
        </div>
        <DiscoveryForm />
        <aside className="mt-8 rounded-2xl border border-stone-800 p-6">
          <h2 className="text-base font-semibold text-stone-100">A controlled three-step path</h2>
          <ol className="mt-4 grid gap-4 text-sm text-stone-400 sm:grid-cols-3">
            <li><strong className="block text-amber-400">1. Qualify</strong>Describe one workflow, timing and decision role.</li>
            <li><strong className="block text-amber-400">2. Review</strong>Check your answers and the preliminary fit result.</li>
            <li><strong className="block text-amber-400">3. Choose</strong>Open WhatsApp only if you want a human review.</li>
          </ol>
        </aside>
      </div>
    </main>
  );
}
