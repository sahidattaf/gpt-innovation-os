import type { Metadata } from "next";
import { PRODUCTS, getFeaturedProducts } from "@gpt-os/catalog";
import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Browse AI Products",
  description:
    "Explore the full catalogue of AI products from GPT Innovation by Attaf — for hospitality, real estate, marketing, operations, education, and AI automation.",
};

export default function StorefrontPage() {
  const featured = getFeaturedProducts();
  const featuredIds = new Set(featured.map((p) => p.id));
  const allProducts = PRODUCTS.filter((p) => !featuredIds.has(p.id));

  return (
    <>
      <HeroSection />

      {/* Featured products */}
      {featured.length > 0 && (
        <section
          className="border-b border-stone-800 py-16 sm:py-20"
          aria-labelledby="featured-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="featured-heading"
              className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500"
            >
              Featured
            </h2>
            <p className="mb-6 text-2xl font-bold text-stone-50 sm:mb-8">
              Most requested products
            </p>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full catalogue — featured products excluded */}
      <section
        id="products"
        className="py-16 sm:py-20"
        aria-labelledby="catalogue-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="catalogue-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-500"
          >
            All products
          </h2>
          <p className="mb-6 text-2xl font-bold text-stone-50 sm:mb-8">
            The full AI product catalogue
          </p>
          <ProductGrid products={allProducts} />
        </div>
      </section>

      {/* Trust section */}
      <section
        className="border-t border-stone-800 bg-stone-900/50 py-16"
        aria-labelledby="trust-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="trust-heading"
            className="mb-10 text-center text-xl font-semibold text-stone-50"
          >
            Why GPT Innovation by Attaf
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Multilingual first",
                body: "Products support Papiamentu, Spanish, English, and Dutch — natively, not as an afterthought.",
              },
              {
                title: "Human review on every delivery",
                body: "Every AI output is reviewed by a human before it reaches your clients or systems.",
              },
              {
                title: "WhatsApp-native support",
                body: "Reach us and your customers where they already are — no tickets, no wait queues.",
              },
              {
                title: "Built for Caribbean business",
                body: "Designed for the regulatory, cultural, and market realities of Curaçao and the wider Caribbean.",
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="mb-2 h-1 w-8 rounded-full bg-amber-500" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-stone-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
