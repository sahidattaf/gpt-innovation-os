import { PRODUCTS } from "./products";
import type { BillingType, Product, ProductCategory } from "./types";

export type { Product, ProductCategory, BillingType, ProductStatus } from "./types";
export { PRODUCTS };

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured && p.status === "active");
}

export function formatPrice(priceCents: number, billingType: BillingType): string {
  if (billingType === "custom") return "Custom pricing";
  const dollars = priceCents / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
  return billingType === "monthly" ? `${formatted}/mo` : `${formatted} one-time`;
}

export function formatProductPrice(product: Product): string {
  return formatPrice(product.priceCents, product.billingType);
}
