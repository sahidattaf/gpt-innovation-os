import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryLink } from "@/components/discovery-link";

export const metadata: Metadata = {
  title: "About",
  description: "Meet GPT Innovation by Attaf, a Curaçao-based practical AI initiative led by Sahid Attaf.",
};

const PRINCIPLES = [
  ["Start with the work", "Choose a real repeated task before choosing a tool."],
  ["Keep people responsible", "A person checks important information and approves consequential actions."],
  ["Use evidence carefully", "Separate demonstrations and plans from verified client results."],
  ["Share only what is needed", "Use sample or approved information during exploration and testing."],
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-stone-50 sm:text-6xl">Practical AI, explained honestly.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">GPT Innovation by Attaf is a Curaçao-based initiative led by Sahid Attaf. The current public work focuses on practical AI education, discovery and controlled pilot preparation for small businesses.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Founder</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-50">Sahid Attaf</h2>
            <p className="mt-2 text-sm text-stone-500">Founder & AI Operator · Curaçao</p>
            <p className="mt-6 text-sm leading-relaxed text-stone-400">Sahid creates practical learning materials and demonstration workflows for Caribbean business contexts. The video series shows possible ways to structure work with AI; it does not present fictional examples as completed client deployments.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-50">Working principles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map(([title, body]) => <article key={title} className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6"><h3 className="font-semibold text-stone-100">{title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p></article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-stone-800 bg-stone-900/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-stone-50">See the work before starting a conversation</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/videos" className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-100 hover:bg-stone-800">Watch the series</Link><DiscoveryLink location="footer" className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400">Start AI Discovery</DiscoveryLink></div>
        </div>
      </section>
    </>
  );
}
