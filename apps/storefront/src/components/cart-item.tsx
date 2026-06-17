"use client";

import type { CartItem as CartItemType } from "@/features/cart/use-cart";
import { useCart } from "@/features/cart/use-cart";
import { formatPrice } from "@gpt-os/catalog";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increment, decrement, removeItem } = useCart();
  const { product, quantity } = item;

  const displayPrice = formatPrice(product.priceCents, product.billingType);

  return (
    <div className="flex items-start gap-4 py-4">
      {/* Product info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-stone-100">{product.name}</p>
        <p className="mt-0.5 text-xs text-stone-500">{displayPrice}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => decrement(product.id)}
          aria-label={`Decrease quantity of ${product.name}`}
          className="flex h-6 w-6 items-center justify-center rounded border border-stone-700 text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <span
          className="w-5 text-center text-sm font-medium tabular-nums text-stone-200"
          aria-label={`Quantity: ${quantity}`}
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => increment(product.id)}
          aria-label={`Increase quantity of ${product.name}`}
          className="flex h-6 w-6 items-center justify-center rounded border border-stone-700 text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => removeItem(product.id)}
          aria-label={`Remove ${product.name} from cart`}
          className="ml-1 flex h-6 w-6 items-center justify-center rounded text-stone-600 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
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
    </div>
  );
}
