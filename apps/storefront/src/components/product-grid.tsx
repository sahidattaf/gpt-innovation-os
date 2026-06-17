"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@gpt-os/catalog";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selected, setSelected] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () =>
      selected === "all"
        ? products
        : products.filter((p) => p.category === selected),
    [products, selected],
  );

  const counts = useMemo(() => {
    const map: Partial<Record<ProductCategory | "all", number>> = {
      all: products.length,
    };
    for (const product of products) {
      map[product.category] = (map[product.category] ?? 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <div>
      <div className="mb-8">
        <CategoryFilter
          selected={selected}
          onChange={setSelected}
          counts={counts}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-stone-800 bg-stone-900">
          <p className="text-sm text-stone-500">
            No products found in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
