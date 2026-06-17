"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/features/cart/cart-provider";
import { StorefrontHeader } from "./storefront-header";
import { CartDrawer } from "./cart-drawer";

export function CartShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <StorefrontHeader />
      <CartDrawer />
      {children}
    </CartProvider>
  );
}
