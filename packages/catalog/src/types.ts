export type ProductCategory =
  | "hospitality"
  | "real-estate"
  | "marketing"
  | "business-operations"
  | "education"
  | "ai-automation";

export type BillingType = "one-time" | "monthly" | "custom";

export type ProductStatus = "active" | "coming-soon";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ProductCategory;
  priceCents: number;
  billingType: BillingType;
  featured: boolean;
  status: ProductStatus;
  capabilities: string[];
  idealFor: string[];
  imagePath: string;
  ctaLabel: string;
}
