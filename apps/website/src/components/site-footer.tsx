import Link from "next/link";
import { BUSINESS_CONTACT } from "@/lib/contact";

const LINKS = [
  { label: "AI Video Hub", href: "/videos" },
  { label: "Business AI Pilot", href: "/products" },
  { label: "About", href: "/about" },
  { label: "AI Discovery", href: "/discovery" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-base font-bold text-stone-50">GPT Innovation <span className="text-amber-400">by Attaf</span></p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-500">Practical AI education, discovery and controlled pilot preparation from Curaçao. Human review stays part of every important decision.</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">Explore</h2>
            <ul className="mt-4 space-y-2">{LINKS.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-stone-500 hover:text-stone-200">{link.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">Contact</h2>
            <a href={BUSINESS_CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-amber-400 hover:text-amber-300">WhatsApp {BUSINESS_CONTACT.whatsappDisplay}</a>
            <p className="mt-3 text-xs leading-relaxed text-stone-600">A message does not confirm a booking, scope, price or delivery commitment.</p>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-800 pt-6"><p className="text-xs text-stone-600">© {new Date().getFullYear()} GPT Innovation by Attaf. Demonstrations are illustrative unless explicitly identified otherwise.</p></div>
      </div>
    </footer>
  );
}
