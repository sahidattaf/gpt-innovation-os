"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/use-cart";
import { formatPrice } from "@gpt-os/catalog";
import { CartItem } from "@/components/cart-item";
import { EmptyCart } from "@/components/empty-cart";

export default function CartPage() {
  const { items, subtotalCents, itemCount, clearCart } = useCart();
  const hasCustomItems = items.some((i) => i.product.billingType === "custom");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-50">
        Your cart{itemCount > 0 ? ` (${itemCount} item${itemCount !== 1 ? "s" : ""})` : ""}
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Cart items */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900">
            <div className="divide-y divide-stone-800 px-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-stone-400">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-stone-400">
                <span>Subtotal (fixed-price items)</span>
                <span>{formatPrice(subtotalCents, "one-time")}</span>
              </div>
              {hasCustomItems && (
                <div className="flex items-start justify-between gap-4 text-sm text-stone-400">
                  <span>Custom-priced items</span>
                  <span className="text-right text-stone-500">
                    Quoted after discovery call
                  </span>
                </div>
              )}
              <div className="border-t border-stone-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-100">Total due now</span>
                  <span className="font-bold text-stone-50">
                    $0.00
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-600">
                  No payment collected here. You&apos;ll be contacted to confirm and arrange
                  payment via invoice.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Link
              href="/request-purchase"
              className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
            >
              Request Purchase via WhatsApp
            </Link>
            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-xl border border-stone-700 px-6 py-3.5 text-sm font-medium text-stone-300 transition-colors hover:border-stone-600 hover:text-stone-100"
            >
              Continue browsing
            </Link>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-stone-600 transition-colors hover:text-stone-400 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-amber-500"
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
