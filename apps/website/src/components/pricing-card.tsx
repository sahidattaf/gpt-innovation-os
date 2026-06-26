import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  href,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={[
        "flex flex-col rounded-2xl border p-6",
        highlighted
          ? "border-amber-500/50 bg-amber-500/5 ring-1 ring-amber-500/20"
          : "border-stone-800 bg-stone-900/60",
      ].join(" ")}
    >
      {highlighted && (
        <span className="mb-4 self-start rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold text-stone-950">
          Most Popular
        </span>
      )}
      <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
        {name}
      </p>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-3xl font-bold text-stone-50">{price}</span>
        {period && (
          <span className="mb-1 text-sm text-stone-500">{period}</span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-stone-400">{description}</p>

      <ul className="my-6 flex-1 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-stone-300">
            <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={[
          "flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
          highlighted
            ? "bg-amber-500 text-stone-950 hover:bg-amber-400"
            : "border border-stone-700 text-stone-200 hover:border-stone-600 hover:bg-stone-800",
        ].join(" ")}
      >
        {cta}
      </Link>
    </div>
  );
}
