"use client";

import type { ProductCategory } from "@gpt-os/catalog";

const CATEGORY_LABELS: Record<ProductCategory | "all", string> = {
  all: "All Products",
  hospitality: "Hospitality",
  "real-estate": "Real Estate",
  marketing: "Marketing",
  "business-operations": "Business Operations",
  education: "Education",
  "ai-automation": "AI Automation",
};

interface CategoryFilterProps {
  selected: ProductCategory | "all";
  onChange: (category: ProductCategory | "all") => void;
  counts: Partial<Record<ProductCategory | "all", number>>;
}

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  const categories = Object.keys(CATEGORY_LABELS) as Array<ProductCategory | "all">;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {categories.map((cat) => {
        const count = counts[cat] ?? 0;
        const isSelected = selected === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={isSelected}
            className={[
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
              isSelected
                ? "border-amber-500 bg-amber-500/10 text-amber-400"
                : "border-stone-700 bg-transparent text-stone-400 hover:border-stone-600 hover:text-stone-200",
            ].join(" ")}
          >
            {CATEGORY_LABELS[cat]}
            {count > 0 && (
              <span
                className={`text-xs ${isSelected ? "text-amber-500" : "text-stone-600"}`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
