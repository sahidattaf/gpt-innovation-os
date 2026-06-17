import { createContext, useContext } from "react";
import type { CartContextValue } from "./cart-types";

export const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
