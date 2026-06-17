import Link from "next/link";

export function StorefrontFooter() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-base font-bold text-stone-50">GPT Innovation by Attaf</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-400">
              AI consulting, custom GPT products, and agent deployment for entrepreneurs
              and businesses — based in Curaçao, serving the world.
            </p>
            <p className="mt-4 text-xs text-stone-600">
              Multilingual support: English · Papiamentu · Spanish · Dutch
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Products
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Hospitality AI", href: "/products/hospitality-concierge-ai" },
                { label: "Property Scout AI", href: "/products/property-scout-ai" },
                { label: "ContentFlow AI", href: "/products/contentflow-ai" },
                { label: "Operations Command GPT", href: "/products/operations-command-gpt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-stone-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Browse All Products", href: "/" },
                { label: "Request Purchase", href: "/request-purchase" },
                { label: "View Cart", href: "/cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-stone-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs text-stone-600">Contact via WhatsApp</p>
              <a
                href="https://wa.me/59995230683"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
              >
                +599 9523 0683
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-8">
          <p className="text-center text-xs text-stone-600">
            © {new Date().getFullYear()} GPT Innovation by Attaf. Curaçao, Dutch Caribbean.
          </p>
        </div>
      </div>
    </footer>
  );
}
