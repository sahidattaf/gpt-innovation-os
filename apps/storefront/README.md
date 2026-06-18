# Storefront — GPT Innovation by Attaf

Next.js 15 (App Router) storefront for browsing and requesting AI products.

Runs on port **3001** in development.

## Prerequisites

- Node.js 20+
- pnpm 9+

Install workspace dependencies from the repo root (not this directory):

```bash
pnpm install
```

## Development

```bash
# From repo root
pnpm --filter storefront dev

# Or from this directory
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001).

## Build

```bash
# From repo root
pnpm --filter storefront build

# Then preview the production build
pnpm --filter storefront start
```

## Lint & Typecheck

```bash
# Lint
pnpm --filter storefront lint

# Typecheck
pnpm --filter storefront exec tsc --noEmit
```

## Project Structure

```
src/
  app/                 Next.js App Router pages
    page.tsx           Homepage — hero, featured products, full catalogue
    cart/page.tsx      Cart review page
    products/[slug]/   Product detail pages (SSG via generateStaticParams)
    request-purchase/  WhatsApp purchase-request form
  components/          UI components (Server + Client)
  features/cart/       Cart context, provider, localStorage persistence
```

## Key Notes

- Cart state lives in `localStorage` under the key `gpt-os:cart`. No server state, no payment collection — purchases are routed through a WhatsApp contact flow.
- Featured products are shown in a dedicated section and excluded from the "All products" grid to avoid duplication.
- The cart drawer renders as a React portal to `document.body` (never inline in the page flow).
- All components default to Server Components; `"use client"` is added only where interactivity is needed.
