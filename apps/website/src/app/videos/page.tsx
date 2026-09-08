import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryLink } from "@/components/discovery-link";
import { VideoCard } from "@/components/video-card";
import { VIDEO_EPISODES, YOUTUBE_CHANNEL_URL } from "@/lib/video-series";

export const metadata: Metadata = {
  title: "AI Video Hub",
  description:
    "Practical AI videos for Caribbean business owners by GPT Innovation by Attaf.",
};

export default function VideosPage() {
  return (
    <>
      <section className="border-b border-stone-800 bg-stone-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
              AI Video Hub
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-50 sm:text-6xl">
              Watch the workflow.
              <br />
              <span className="text-teal-400">Then improve yours.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">
              Practical AI lessons for Curaçao and Caribbean operators—built
              around real workflows, responsible use and clear owner decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DiscoveryLink
                location="video_hub"
                className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400"
              >
                Start your AI Discovery
              </DiscoveryLink>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-100 hover:border-stone-500 hover:bg-stone-900"
              >
                Visit YouTube channel ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20" aria-labelledby="series-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Season one
              </p>
              <h2
                id="series-heading"
                className="mt-2 text-3xl font-bold text-stone-50"
              >
                Eight practical AI conversations
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-stone-500">
              New episodes will be connected here only after owner approval and
              public YouTube publication.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {VIDEO_EPISODES.map((episode) => (
              <VideoCard key={episode.slug} episode={episode} />
            ))}
          </div>
          <div className="mt-14 rounded-3xl border border-amber-500/20 bg-amber-500/[0.06] p-7 sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-sm font-semibold text-amber-300">
                Have one expensive, repetitive workflow?
              </p>
              <h2 className="mt-2 text-2xl font-bold text-stone-50">
                That is where useful AI starts.
              </h2>
            </div>
            <Link
              href="/discovery"
              className="mt-6 inline-flex rounded-xl bg-stone-50 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-white sm:mt-0"
            >
              Prepare your discovery →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
