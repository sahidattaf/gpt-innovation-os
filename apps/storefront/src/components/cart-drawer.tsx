"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useCart } from "@/features/cart/use-cart";
import { formatPrice } from "@gpt-os/catalog";
import { CartItem } from "./cart-item";
import { EmptyCart } from "./empty-cart";

export function CartDrawer() {
  const { items, subtotalCents, itemCount, closeDrawer, clearCart, isDrawerOpen } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer panel — never inline, always portalled to document.body */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-stone-900 shadow-2xl transition-transform duration-300 sm:max-w-sm"
        style={{ transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <h2 className="text-base font-semibold text-stone-50">
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="divide-y divide-stone-800">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-800 px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-stone-400">Subtotal</span>
              <span className="text-sm font-semibold text-stone-50">
                {formatPrice(subtotalCents, "one-time")}
                {items.some((i) => i.product.billingType === "custom") && (
                  <span className="ml-1 text-xs font-normal text-stone-500">
                    + custom items
                  </span>
                )}
              </span>
            </div>
            <div className="space-y-2">
              <Link
                href="/request-purchase"
                onClick={closeDrawer}
                className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
              >
                Request Purchase
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex w-full items-center justify-center rounded-xl border border-stone-700 px-5 py-3 text-sm font-medium text-stone-300 transition-colors hover:border-stone-600 hover:text-stone-100"
              >
                View full cart
              </Link>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-center text-xs text-stone-600 transition-colors hover:text-stone-400"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>,
    document.body,
  );
}
