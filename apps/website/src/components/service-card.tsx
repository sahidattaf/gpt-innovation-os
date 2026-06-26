interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features?: readonly string[];
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm">
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-xl"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-stone-50">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-stone-400">
        {description}
      </p>
      {features && features.length > 0 && (
        <ul className="mt-5 space-y-1.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
