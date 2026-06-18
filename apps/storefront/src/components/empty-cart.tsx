import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center sm:py-20">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border border-stone-700 bg-stone-900 ring-4 ring-stone-950"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-7 w-7 text-stone-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-base font-semibold text-stone-200">Your cart is empty</h2>
      <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-stone-500 sm:max-w-xs">
        Add AI products for hospitality, marketing, real estate, and more.
      </p>
      <Link
        href="/#products"
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
      >
        Browse Products
      </Link>
    </div>
  );
}
