"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/use-cart";

export function StorefrontHeader() {
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800 bg-stone-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          <span className="text-lg font-bold tracking-tight text-stone-50">
            GPT Innovation
          </span>
          <span className="hidden text-sm font-medium text-amber-400 sm:inline">
            by Attaf
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary navigation">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-50"
          >
            Products
          </Link>
          <Link
            href="/request-purchase"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-50 sm:block"
          >
            Request Purchase
          </Link>

          {/* Cart button */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
            className="relative ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-50 focus-visible:outline-2 focus-visible:outline-amber-500"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {itemCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold leading-none text-stone-950"
                aria-hidden="true"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
