import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiscoveryLink } from "@/components/discovery-link";
import { VIDEO_EPISODES, YOUTUBE_CHANNEL_URL } from "@/lib/video-series";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return VIDEO_EPISODES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = VIDEO_EPISODES.find((item) => item.slug === slug);
  return episode ? { title: episode.title, description: episode.summary } : {};
}

export default async function VideoEpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = VIDEO_EPISODES.find((item) => item.slug === slug);
  if (!episode) notFound();
  return (
    <article className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/videos"
          className="text-sm font-medium text-stone-400 hover:text-stone-100"
        >
          ← All videos
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="flex aspect-video items-end rounded-3xl border border-stone-800 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18),transparent_35%),radial-gradient(circle_at_15%_85%,rgba(245,158,11,0.22),transparent_40%),#0c0a09] p-7 sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Episode {episode.number} · {episode.duration}
                </p>
                <p className="mt-3 max-w-xl text-2xl font-bold text-stone-50 sm:text-4xl">
                  {episode.shortTitle}
                </p>
              </div>
            </div>
            <p className="mt-5 rounded-xl border border-stone-800 bg-stone-900/60 px-4 py-3 text-sm text-stone-400">
              Video status:{" "}
              <strong className="font-semibold text-amber-300">
                {episode.status === "in-production"
                  ? "in production"
                  : "planned"}
              </strong>
              . The player will appear only after owner-approved publication.
            </p>
          </div>
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
              {episode.industry}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-50">
              {episode.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-400">
              {episode.summary}
            </p>
            <blockquote className="mt-6 border-l-2 border-amber-500 pl-4 text-base italic leading-relaxed text-stone-300">
              “{episode.hook}”
            </blockquote>
            <div className="mt-8 flex flex-col gap-3">
              <DiscoveryLink
                location="video_episode"
                className="rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-400"
              >
                Start AI Discovery
              </DiscoveryLink>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-stone-700 px-5 py-3 text-center text-sm font-semibold text-stone-100 hover:bg-stone-900"
              >
                Follow on YouTube ↗
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
