"use client";

import Link from "next/link";
import type { Product } from "@gpt-os/catalog";
import { formatProductPrice } from "@gpt-os/catalog";
import { useCart } from "@/features/cart/use-cart";

const CATEGORY_COLORS: Record<string, string> = {
  hospitality: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "real-estate": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  marketing: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "business-operations": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  education: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "ai-automation": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const CATEGORY_LABELS: Record<string, string> = {
  hospitality: "Hospitality",
  "real-estate": "Real Estate",
  marketing: "Marketing",
  "business-operations": "Business Ops",
  education: "Education",
  "ai-automation": "AI Automation",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const colorClasses = CATEGORY_COLORS[product.category] ?? "text-stone-400 bg-stone-400/10 border-stone-400/20";
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  function handleAddToCart() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      billingType: product.billingType,
    });
    openDrawer();
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-stone-800 bg-stone-900 transition-colors hover:border-stone-700">
      {/* Category badge & status */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClasses}`}
        >
          {categoryLabel}
        </span>
        {product.status === "coming-soon" && (
          <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-xs font-medium text-stone-500">
            Coming soon
          </span>
        )}
        {product.featured && product.status === "active" && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-stone-50 group-hover:text-amber-400 transition-colors">
          <Link
            href={`/products/${product.slug}`}
            className="focus-visible:rounded focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-400">
          {product.shortDescription}
        </p>

        {/* Capabilities preview */}
        <ul className="mt-4 space-y-1">
          {product.capabilities.slice(0, 3).map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">✓</span>
              {cap}
            </li>
          ))}
          {product.capabilities.length > 3 && (
            <li className="text-xs text-stone-600">
              +{product.capabilities.length - 3} more capabilities
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-stone-800 px-5 py-4">
        <div>
          {product.billingType === "custom" ? (
            <span className="text-sm font-semibold text-stone-300">Custom pricing</span>
          ) : (
            <>
              <span className="text-base font-bold text-stone-50">
                {formatProductPrice(product)}
              </span>
            </>
          )}
        </div>
        {product.status === "active" ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
          >
            {product.ctaLabel}
          </button>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-300"
          >
            Learn more
          </Link>
        )}
      </div>
    </article>
  );
}
