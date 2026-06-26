import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  industry: string;
  description: string;
  outcome: string;
  href?: string;
}

export function CaseStudyCard({
  title,
  industry,
  description,
  outcome,
  href,
}: CaseStudyCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
      <span className="self-start rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
        {industry}
      </span>
      <h3 className="mt-4 text-base font-semibold text-stone-50">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-400">
        {description}
      </p>
      <div className="mt-5 rounded-xl border border-stone-800 bg-stone-950/60 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          Outcome
        </p>
        <p className="mt-1 text-sm text-stone-300">{outcome}</p>
      </div>
      {href && (
        <Link
          href={href}
          className="mt-4 text-xs font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          Read case study →
        </Link>
      )}
    </div>
  );
}
