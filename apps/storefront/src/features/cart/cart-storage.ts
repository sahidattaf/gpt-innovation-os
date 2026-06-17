import type { CartItem } from "./cart-types";

const STORAGE_KEY = "gpt-os-cart-v1";

export const cartStorage = {
  load(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as CartItem[];
    } catch {
      return [];
    }
  },

  save(items: CartItem[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage write failures are non-fatal
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Non-fatal
    }
  },
};
