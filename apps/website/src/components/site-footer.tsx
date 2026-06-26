import Link from "next/link";

const FOOTER_NAV = {
  Products: [
    { label: "Browse All", href: "/products" },
    { label: "Hospitality AI", href: "/products#hospitality" },
    { label: "Real Estate AI", href: "/products#real-estate" },
    { label: "Marketing AI", href: "/products#marketing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Open EU AI Operator", href: "/open-eu" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "EU AI Act Compliance", href: "/open-eu/eu-ai-act" },
  ],
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="text-base font-bold text-stone-50">GPT Innovation</p>
            <p className="text-sm font-medium text-amber-400">by Attaf</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Production-ready AI products for Caribbean and global
              entrepreneurs. Multilingual, practical, human-reviewed.
            </p>
            <p className="mt-4 text-xs text-stone-600">Based in Curaçao</p>
          </div>

          {/* Link columns */}
          {(Object.entries(FOOTER_NAV) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  {group}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone-500 transition-colors hover:text-stone-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-6 sm:flex-row">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} GPT Innovation by Attaf. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-amber-500" aria-hidden="true" />
            <span className="text-xs text-stone-600">AI products — not AI promises</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
