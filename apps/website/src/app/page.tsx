import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryLink } from "@/components/discovery-link";
import { VideoCard } from "@/components/video-card";
import { VIDEO_EPISODES, YOUTUBE_CHANNEL_URL } from "@/lib/video-series";

export const metadata: Metadata = {
  title: "Practical AI Systems for Caribbean Business",
  description:
    "Watch practical AI workflows for restaurants, hotels, real estate and service businesses, then start a private AI Discovery.",
};

const INDUSTRIES = [
  {
    code: "01",
    title: "Restaurants",
    body: "Verified menu knowledge, staff SOPs, shift summaries and operational checklists.",
  },
  {
    code: "02",
    title: "Hotels",
    body: "Multilingual guest information, handovers and request classification with human review.",
  },
  {
    code: "03",
    title: "Real Estate",
    body: "Structured inquiries, listing drafts and follow-up preparation without invented claims.",
  },
  {
    code: "04",
    title: "Service Business",
    body: "Repeat questions, lead intake, reminders and weekly reporting organized into one workflow.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 bg-stone-950 py-14 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(20,184,166,0.12),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(245,158,11,0.15),transparent_38%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
              Curaçao · Caribbean · Global
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight text-stone-50 sm:text-6xl lg:text-7xl">
              Practical AI.
              <br />
              <span className="text-amber-400">Visible value.</span>
              <br />
              <span className="text-teal-400">Human control.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone-400">
              Watch how useful AI workflows are designed for Caribbean
              businesses—then identify the one process worth improving in yours.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/videos"
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400"
              >
                Watch the series
              </Link>
              <DiscoveryLink
                location="home_video"
                className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-100 hover:border-stone-500 hover:bg-stone-900"
              >
                Start AI Discovery
              </DiscoveryLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-teal-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-stone-700 bg-stone-900 shadow-2xl shadow-black/40">
              <div className="flex aspect-video flex-col justify-between bg-[linear-gradient(135deg,rgba(12,10,9,0.82),rgba(12,10,9,0.3)),radial-gradient(circle_at_75%_20%,#0f766e,transparent_30%),radial-gradient(circle_at_20%_85%,#b45309,transparent_40%),#1c1917] p-6 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold text-white">
                    Episode 01
                  </span>
                  <span className="text-xs font-medium text-stone-300">
                    GPT Innovation by Attaf
                  </span>
                </div>
                <div>
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-6 w-6 fill-current"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="max-w-md text-2xl font-bold leading-tight text-white sm:text-4xl">
                    What practical AI can do for a Curaçao business
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-stone-800 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-stone-400">
                  <strong className="text-amber-300">In production.</strong> No
                  private client data.
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-stone-100 hover:text-amber-300"
                >
                  YouTube channel ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-stone-800 bg-stone-900/35 py-7">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            "EN · PAP · NL · ES",
            "Owner-approved actions",
            "Privacy-aware discovery",
            "Built in Curaçao",
          ].map((item) => (
            <p
              key={item}
              className="text-center text-xs font-semibold uppercase tracking-wider text-stone-400"
            >
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="py-16 sm:py-20" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Watch and apply
              </p>
              <h2
                id="featured-heading"
                className="mt-2 text-3xl font-bold text-stone-50"
              >
                Start with a workflow that matters
              </h2>
            </div>
            <Link
              href="/videos"
              className="text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Explore all eight episodes →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {VIDEO_EPISODES.slice(0, 3).map((episode) => (
              <VideoCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="border-y border-stone-800 bg-stone-900/35 py-16 sm:py-20"
        aria-labelledby="industries-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            Industry experience
          </p>
          <h2
            id="industries-heading"
            className="mt-2 max-w-2xl text-3xl font-bold text-stone-50"
          >
            AI built around how your business actually operates
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-stone-800 bg-stone-800 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <article key={industry.title} className="bg-stone-950 p-6">
                <p className="text-xs font-bold text-amber-400">
                  {industry.code}
                </p>
                <h3 className="mt-8 text-xl font-semibold text-stone-100">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {industry.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
            One controlled next step
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-50 sm:text-5xl">
            Your best AI project starts with one expensive problem.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-400">
            Prepare your request privately, review it yourself, and decide
            whether to open WhatsApp. Nothing is sent automatically.
          </p>
          <DiscoveryLink
            location="home_final"
            className="mt-8 inline-flex rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400"
          >
            Start your AI Discovery
          </DiscoveryLink>
        </div>
      </section>
    </>
  );
}
