import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl font-bold text-stone-700" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-stone-100">Product not found</h1>
      <p className="mt-2 max-w-sm text-sm text-stone-500">
        The product you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
        >
          Browse all products
        </Link>
        <Link
          href="/request-purchase"
          className="inline-flex items-center rounded-xl border border-stone-700 px-5 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-200"
        >
          Request a custom product
        </Link>
      </div>
    </div>
  );
}
