interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  const alignClass = centered ? "text-center" : "";
  const descAlign = centered ? "mx-auto" : "";

  return (
    <div className={alignClass}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-stone-50 sm:text-3xl">{title}</h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl leading-relaxed text-stone-400 ${descAlign}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
