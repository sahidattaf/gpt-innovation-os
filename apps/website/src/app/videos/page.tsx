import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DiscoveryLink } from "@/components/discovery-link";
import { VideoCard } from "@/components/video-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import {
  getYouTubeThumbnailUrl,
  VIDEO_EPISODES,
  WHATSAPP_URL,
  YOUTUBE_CHANNEL_URL,
} from "@/lib/video-series";

export const metadata: Metadata = {
  title: "AI Video Hub",
  description:
    "Nine practical AI videos and five Shorts for Caribbean business owners by GPT Innovation by Attaf.",
};

const VIDEO_SHORTS = VIDEO_EPISODES.filter((episode) => episode.shortUrl);
const FEATURED_EPISODE = VIDEO_EPISODES.find((episode) => episode.number === 9);
const SERIES_EPISODES = VIDEO_EPISODES.filter(
  (episode) => episode.number !== 9,
);

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
              around useful workflows, responsible use and clear owner
              decisions.
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
              <WhatsAppLink
                location="video_hub"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-teal-500/50 px-5 py-3 text-sm font-semibold text-teal-300 hover:bg-teal-500/10"
              >
                Message Coach Sahid ↗
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>
      {FEATURED_EPISODE?.youtubeId && FEATURED_EPISODE.youtubeUrl ? (
        <section
          className="border-b border-stone-800 bg-stone-900/35 py-16 sm:py-20"
          aria-labelledby="featured-episode-heading"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <a
              href={FEATURED_EPISODE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video overflow-hidden rounded-3xl border border-stone-700 bg-stone-950"
            >
              <Image
                src={getYouTubeThumbnailUrl(FEATURED_EPISODE.youtubeId)}
                alt={`YouTube thumbnail for ${FEATURED_EPISODE.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-stone-950 shadow-lg">
                <span aria-hidden="true" className="ml-0.5 text-xl">
                  ▶
                </span>
                <span className="sr-only">Watch Episode 9</span>
              </span>
            </a>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Newest episode · {FEATURED_EPISODE.duration}
              </p>
              <h2
                id="featured-episode-heading"
                className="mt-3 text-3xl font-bold text-stone-50 sm:text-4xl"
              >
                {FEATURED_EPISODE.title}
              </h2>
              <p className="mt-5 leading-relaxed text-stone-400">
                {FEATURED_EPISODE.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={FEATURED_EPISODE.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400"
                >
                  Watch Episode 9 ↗
                </a>
                <DiscoveryLink
                  location="video_hub"
                  className="rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-100 hover:border-stone-500"
                >
                  Apply this to my business
                </DiscoveryLink>
              </div>
            </div>
          </div>
        </section>
      ) : null}
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
                Nine practical AI conversations
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-stone-500">
              All nine full episodes are published on the GPT Innovation by
              Attaf YouTube channel.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERIES_EPISODES.map((episode) => (
              <VideoCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="border-y border-stone-800 bg-stone-900/35 py-16 sm:py-20"
        aria-labelledby="shorts-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
              Quick lessons
            </p>
            <h2
              id="shorts-heading"
              className="mt-2 text-3xl font-bold text-stone-50"
            >
              Watch the AI Shorts
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
              Short ideas from Episodes 5–9. Open any Short on YouTube, then
              continue with its full episode guide.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {VIDEO_SHORTS.map((episode) => (
              <article
                key={episode.shortUrl}
                className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-950"
              >
                {episode.shortId ? (
                  <a
                    href={episode.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[9/16] overflow-hidden bg-stone-900"
                  >
                    <Image
                      src={getYouTubeThumbnailUrl(episode.shortId)}
                      alt={`YouTube Short thumbnail for Episode ${episode.number}`}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-stone-950">
                      Watch Short ↗
                    </span>
                  </a>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    Episode {episode.number} Short
                  </p>
                  <h3 className="mt-3 font-semibold leading-snug text-stone-100">
                    {episode.shortTitle}
                  </h3>
                  <Link
                    href={`/videos/${episode.slug}`}
                    className="mt-4 inline-flex text-sm font-medium text-stone-400 hover:text-stone-100"
                  >
                    Full episode guide →
                  </Link>
                </div>
              </article>
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
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-0 sm:justify-end">
              <Link
                href="/discovery"
                className="inline-flex rounded-xl bg-stone-50 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-white"
              >
                Prepare your discovery →
              </Link>
              <WhatsAppLink
                location="video_hub"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-teal-500/50 px-5 py-3 text-sm font-semibold text-teal-300 hover:bg-teal-500/10"
              >
                Message Coach Sahid ↗
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
