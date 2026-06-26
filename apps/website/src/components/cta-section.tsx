import Link from "next/link";

interface CtaLink {
  label: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="border-t border-stone-800 bg-stone-900/40 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-50 sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-stone-400">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryCta.href}
            className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="rounded-xl border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
