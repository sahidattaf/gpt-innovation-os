import Link from "next/link";
import type { VideoEpisode } from "@/lib/video-series";

export function VideoCard({ episode }: { episode: VideoEpisode }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/70 transition hover:-translate-y-1 hover:border-amber-500/40">
      <div className="relative aspect-video overflow-hidden bg-stone-950 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.2),transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
            <span>Episode {episode.number}</span>
            <span>{episode.duration}</span>
          </div>
          <div>
            <p className="max-w-xs text-xl font-bold leading-tight text-stone-50 sm:text-2xl">
              {episode.shortTitle}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-stone-700 bg-stone-950/70 px-3 py-1 text-xs font-medium text-amber-300">
              {episode.status === "in-production"
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
        <Link
          href={`/videos/${episode.slug}`}
          className="mt-5 inline-flex text-sm font-semibold text-amber-400 transition group-hover:text-amber-300"
        >
          View episode guide{" "}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
