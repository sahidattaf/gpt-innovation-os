import type { BillingType } from "@gpt-os/catalog";

export interface CartProduct {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  billingType: BillingType;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalCents: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}
