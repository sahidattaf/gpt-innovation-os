import Image from "next/image";
import Link from "next/link";
import { getYouTubeThumbnailUrl, type VideoEpisode } from "@/lib/video-series";

export function VideoCard({ episode }: { episode: VideoEpisode }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/70 transition hover:-translate-y-1 hover:border-amber-500/40">
      <div className="relative aspect-video overflow-hidden bg-stone-950">
        {episode.youtubeId ? (
          <Image
            src={getYouTubeThumbnailUrl(episode.youtubeId)}
            alt={`YouTube thumbnail for ${episode.title}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-stone-950/50" />
        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-stone-100">
            <span>Episode {episode.number}</span>
            <span>{episode.duration}</span>
          </div>
          <div>
            <p className="max-w-xs text-xl font-bold leading-tight text-stone-50 sm:text-2xl">
              {episode.shortTitle}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-stone-700 bg-stone-950/70 px-3 py-1 text-xs font-medium text-amber-300">
              {episode.status === "ready"
                ? "Episode ready"
                : episode.status === "in-production"
                  ? "In production"
                  : "Coming soon"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
          {episode.industry}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-stone-100">
          {episode.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          {episode.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {episode.youtubeUrl ? (
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-amber-400"
            >
              Watch on YouTube ↗
            </a>
          ) : null}
          <Link
            href={`/videos/${episode.slug}`}
            className="rounded-lg border border-stone-700 px-4 py-2 text-sm font-semibold text-stone-200 hover:border-stone-500 hover:text-white"
          >
            Episode guide →
          </Link>
        </div>
      </div>
    </article>
  );
}
