interface IndustryCardProps {
  title: string;
  description: string;
  capabilities: readonly string[];
}

export function IndustryCard({
  title,
  description,
  capabilities,
}: IndustryCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/50 p-6">
      <div className="mb-1 h-0.5 w-8 rounded-full bg-amber-500" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold text-stone-50">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-400">
        {description}
      </p>
      <ul className="mt-5 space-y-1.5">
        {capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-xs text-stone-500">
            <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
              →
            </span>
            {cap}
          </li>
        ))}
      </ul>
    </div>
  );
}
