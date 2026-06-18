import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-stone-800 bg-stone-950 py-20 sm:py-28">
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
            AI Products for Entrepreneurs
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
            AI tools built for{" "}
            <span className="text-amber-400">real business</span> outcomes
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-stone-400 sm:text-xl">
            GPT Innovation by Attaf delivers production-ready AI products for hospitality,
            real estate, marketing, operations, and more — multilingual, practical, and
            backed by hands-on deployment support.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#products"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-xl bg-amber-500 px-6 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
            >
              Browse Products
            </a>
            <Link
              href="/request-purchase"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-xl border border-stone-700 bg-transparent px-6 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
            >
              Request Purchase
            </Link>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-16 sm:gap-y-4">
          {[
            "Multilingual AI (EN · PAP · ES · NL)",
            "Based in Curaçao",
            "WhatsApp-first delivery",
            "Human review on every deployment",
          ].map((signal) => (
            <div key={signal} className="flex items-center gap-2 text-sm text-stone-500">
              <span className="h-1 w-1 rounded-full bg-amber-500" aria-hidden="true" />
              {signal}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
