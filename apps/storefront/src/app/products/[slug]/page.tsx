import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@gpt-os/catalog";
import { ProductDetail } from "@/components/product-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | GPT Innovation by Attaf`,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
