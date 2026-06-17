"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/use-cart";
import { formatPrice } from "@gpt-os/catalog";

type ContactMethod = "whatsapp" | "email" | "phone";

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  notes: string;
  preferredContact: ContactMethod;
}

const WHATSAPP_NUMBER = "59995230683";

function buildWhatsAppMessage(form: FormState, cartSummary: string): string {
  const lines = [
    "*Purchase Request — GPT Innovation by Attaf*",
    "",
    "*Customer Details:*",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `WhatsApp: ${form.whatsapp}`,
    form.company ? `Company: ${form.company}` : null,
    "",
    "*Selected Products:*",
    cartSummary,
    "",
    form.notes ? `*Notes:*\n${form.notes}` : null,
    "",
    `*Preferred Contact:* ${form.preferredContact}`,
    "",
    "_Sent via GPT Innovation storefront_",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return lines;
}

export default function RequestPurchasePage() {
  const { items, subtotalCents, clearCart } = useCart();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    notes: "",
    preferredContact: "whatsapp",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [step, setStep] = useState<"form" | "confirm" | "sent">("form");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Your name is required.";
    if (!form.email.trim()) {
      next.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.whatsapp.trim()) {
      next.whatsapp = "Your WhatsApp number is required.";
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(form.whatsapp)) {
      next.whatsapp = "Enter a valid phone number, e.g. +599 9 523 0683.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStep("confirm");
  }

  function handleConfirm() {
    const cartSummary =
      items.length === 0
        ? "No specific products selected (general enquiry)"
        : items
            .map((i) => {
              const price = formatPrice(i.product.priceCents, i.product.billingType);
              return `• ${i.product.name} x${i.quantity} — ${price}`;
            })
            .join("\n");

    const message = buildWhatsAppMessage(form, cartSummary);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setStep("sent");
    clearCart();
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  if (step === "sent") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-400"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-stone-50">Request sent</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Your WhatsApp message has been prepared and your browser should have opened
          WhatsApp. If it didn&apos;t open, contact us directly at{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
          >
            +599 9523 0683
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-stone-500">
          We aim to respond within one business day. No payment has been collected.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
        >
          Back to products
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    const cartSummary =
      items.length === 0
        ? "No specific products selected (general enquiry)"
        : items
            .map((i) => {
              const price = formatPrice(i.product.priceCents, i.product.billingType);
              return `${i.product.name} × ${i.quantity} — ${price}`;
            })
            .join(", ");

    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-stone-50">
            You&apos;re about to open WhatsApp
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Clicking &ldquo;Open WhatsApp&rdquo; will open a pre-filled message to{" "}
            <span className="font-medium text-stone-200">GPT Innovation by Attaf</span>.
            No payment will be collected. We&apos;ll follow up to confirm your request and
            arrange next steps.
          </p>

          <div className="mt-6 space-y-2 rounded-xl border border-stone-800 bg-stone-950/50 p-4 text-sm">
            <div className="flex gap-2">
              <span className="shrink-0 text-stone-600">Name:</span>
              <span className="text-stone-300">{form.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-stone-600">Email:</span>
              <span className="text-stone-300">{form.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-stone-600">Products:</span>
              <span className="text-stone-300">{cartSummary}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleConfirm}
              className="flex flex-1 items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500"
            >
              Open WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="flex flex-1 items-center justify-center rounded-xl border border-stone-700 px-5 py-3 text-sm font-medium text-stone-300 transition-colors hover:border-stone-600 hover:text-stone-100"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-stone-500">
            <li>
              <Link href="/" className="transition-colors hover:text-stone-300">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-300">Request Purchase</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold text-stone-50">Request a purchase</h1>
        <p className="mt-2 text-stone-400">
          Fill in your details and we&apos;ll follow up via your preferred channel to
          confirm and arrange next steps. No payment is collected here.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 lg:col-span-3"
          aria-label="Purchase request form"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-stone-200"
            >
              Full name <span className="text-amber-500" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Your full name"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-stone-200"
            >
              Email address <span className="text-amber-500" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label
              htmlFor="whatsapp"
              className="mb-1.5 block text-sm font-medium text-stone-200"
            >
              WhatsApp number{" "}
              <span className="text-amber-500" aria-hidden="true">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
              aria-invalid={!!errors.whatsapp}
              value={form.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              className="w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="+599 9 000 0000"
            />
            {errors.whatsapp && (
              <p id="whatsapp-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.whatsapp}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-1.5 block text-sm font-medium text-stone-200"
            >
              Company{" "}
              <span className="text-stone-600 text-xs font-normal">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              className="w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Your company name"
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-medium text-stone-200"
            >
              Additional notes{" "}
              <span className="text-stone-600 text-xs font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className="w-full resize-none rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Tell us about your business, timeline, or any specific requirements."
            />
          </div>

          {/* Preferred contact method */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-stone-200">
              Preferred contact method
            </legend>
            <div className="flex flex-wrap gap-3">
              {(["whatsapp", "email", "phone"] as ContactMethod[]).map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={form.preferredContact === method}
                    onChange={() => set("preferredContact", method)}
                    className="accent-amber-500"
                  />
                  <span className="text-sm capitalize text-stone-300">{method}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2"
          >
            Review and send via WhatsApp
          </button>
        </form>

        {/* Cart summary sidebar */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-stone-800 bg-stone-900 p-5">
            <h2 className="mb-4 text-sm font-semibold text-stone-200">
              {items.length === 0 ? "No products selected" : "Selected products"}
            </h2>

            {items.length === 0 ? (
              <p className="text-xs text-stone-500">
                You can still submit a general enquiry or{" "}
                <Link href="/" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
                  browse products first
                </Link>
                .
              </p>
            ) : (
              <>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-stone-300">
                        {item.product.name}
                        {item.quantity > 1 && (
                          <span className="ml-1 text-stone-500">×{item.quantity}</span>
                        )}
                      </span>
                      <span className="shrink-0 text-stone-500">
                        {formatPrice(item.product.priceCents, item.product.billingType)}
                      </span>
                    </li>
                  ))}
                </ul>
                {subtotalCents > 0 && (
                  <div className="mt-4 border-t border-stone-800 pt-4 flex items-center justify-between text-sm">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="font-semibold text-stone-200">
                      {formatPrice(subtotalCents, "one-time")}
                    </span>
                  </div>
                )}
              </>
            )}

            <p className="mt-4 text-xs leading-relaxed text-stone-600">
              No payment is collected here. You&apos;ll receive a confirmed invoice after
              your request is reviewed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
