"use client";

import Link from "next/link";
import type { Product } from "@gpt-os/catalog";
import { formatProductPrice, PRODUCTS } from "@gpt-os/catalog";
import { useCart } from "@/features/cart/use-cart";
import { ProductCard } from "./product-card";

const CATEGORY_LABELS: Record<string, string> = {
  hospitality: "Hospitality",
  "real-estate": "Real Estate",
  marketing: "Marketing",
  "business-operations": "Business Operations",
  education: "Education",
  "ai-automation": "AI Automation",
};

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, openDrawer } = useCart();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

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

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <Link href="/" className="transition-colors hover:text-stone-300">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-stone-300">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-stone-700 px-3 py-1 text-xs font-medium text-stone-400">
              {categoryLabel}
            </span>
            {product.status === "coming-soon" && (
              <span className="rounded-full bg-stone-800 px-3 py-1 text-xs font-medium text-stone-500">
                Coming soon
              </span>
            )}
            {product.featured && (
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                Featured product
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-stone-50 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-stone-400">
            {product.shortDescription}
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-300">
            {product.fullDescription.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Capabilities */}
          <section className="mt-10" aria-labelledby="capabilities-heading">
            <h2
              id="capabilities-heading"
              className="text-base font-semibold text-stone-50"
            >
              What&apos;s included
            </h2>
            <ul className="mt-4 space-y-3">
              {product.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-sm text-stone-300">{cap}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Ideal for */}
          <section className="mt-10" aria-labelledby="idealfor-heading">
            <h2
              id="idealfor-heading"
              className="text-base font-semibold text-stone-50"
            >
              Ideal for
            </h2>
            <ul className="mt-4 space-y-3">
              {product.idealFor.map((who) => (
                <li key={who} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-stone-600" aria-hidden="true">
                    →
                  </span>
                  <span className="text-sm text-stone-300">{who}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Pricing sidebar */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-stone-700 bg-stone-900 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Pricing
            </h2>

            <div className="mt-4">
              {product.billingType === "custom" ? (
                <>
                  <p className="text-2xl font-bold text-stone-50">Custom quote</p>
                  <p className="mt-1 text-sm text-stone-400">
                    Scoped to your requirements after a discovery call.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-stone-50">
                    {formatProductPrice(product)}
                  </p>
                  {product.billingType === "monthly" && (
                    <p className="mt-1 text-sm text-stone-400">
                      Billed monthly. Cancel anytime.
                    </p>
                  )}
                  {product.billingType === "one-time" && (
                    <p className="mt-1 text-sm text-stone-400">
                      One-time setup fee. No ongoing subscription.
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {product.status === "active" ? (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
                >
                  {product.ctaLabel}
                </button>
              ) : (
                <Link
                  href="/request-purchase"
                  className="flex w-full items-center justify-center rounded-xl bg-stone-800 px-5 py-3 text-sm font-semibold text-stone-300 transition-colors hover:bg-stone-700"
                >
                  Join waitlist
                </Link>
              )}
              <Link
                href="/request-purchase"
                className="flex w-full items-center justify-center rounded-xl border border-stone-700 px-5 py-3 text-sm font-medium text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-300"
              >
                Request via WhatsApp
              </Link>
            </div>

            <div className="mt-6 space-y-2 border-t border-stone-800 pt-6">
              <p className="flex items-center gap-2 text-xs text-stone-500">
                <span aria-hidden="true">✓</span> Human review before delivery
              </p>
              <p className="flex items-center gap-2 text-xs text-stone-500">
                <span aria-hidden="true">✓</span> WhatsApp support included
              </p>
              <p className="flex items-center gap-2 text-xs text-stone-500">
                <span aria-hidden="true">✓</span> Multilingual on request
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="mb-6 text-xl font-semibold text-stone-50"
          >
            More in {categoryLabel}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
