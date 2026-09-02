"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  buildDiscoveryWhatsAppUrl,
  DISCOVERY_OPTIONS,
  INITIAL_DISCOVERY_FORM,
  validateDiscoveryForm,
} from "@/lib/discovery";
import type { DiscoveryFormData, DiscoveryFieldErrors } from "@/lib/discovery";

type TextField = Exclude<keyof DiscoveryFormData, "privacyAccepted">;

const INPUT_CLASS =
  "mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2.5 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-amber-500";
const LABEL_CLASS = "text-sm font-medium text-stone-200";

type SelectFieldProps = {
  id: TextField;
  label: string;
  value: string;
  options: readonly string[];
  error?: string | undefined;
  onChange: (field: TextField, value: string) => void;
  optional?: boolean;
};

function SelectField({
  id,
  label,
  value,
  options,
  error,
  onChange,
  optional = false,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label} {optional ? <span className="text-stone-500">(optional)</span> : null}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={INPUT_CLASS}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function DiscoveryForm() {
  const [form, setForm] = useState<DiscoveryFormData>(INITIAL_DISCOVERY_FORM);
  const [errors, setErrors] = useState<DiscoveryFieldErrors>({});
  const [reviewing, setReviewing] = useState(false);

  const clearError = (field: keyof DiscoveryFormData) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const setTextField = (field: TextField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    clearError(field);
  };

  const handleReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDiscoveryForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setReviewing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (reviewing) {
    const whatsappUrl = buildDiscoveryWhatsAppUrl(form);
    const reviewRows = [
      ["Name", form.contactName],
      ["Business", form.businessName],
      ["Role", form.role],
      ["Business type", form.businessType],
      ["Location", form.location],
      ["Main challenge", form.challenge],
      ["Challenge detail", form.challengeDetail],
      ["Desired result", form.desiredResult],
      ["Current tools", form.currentTools],
      ["Urgency", form.urgency],
      ["Investment readiness", form.investmentReadiness],
      ["Support preference", form.supportPreference],
      ["Decision status", form.decisionStatus],
    ].filter(([, value]) => value);

    return (
      <section aria-labelledby="review-heading" className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Step 2 of 2</p>
        <h2 id="review-heading" className="mt-2 text-2xl font-bold text-stone-50">
          Review your discovery request
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Nothing has been sent or stored. Continuing opens WhatsApp with this information in a
          draft. You decide whether to send it.
        </p>
        <dl className="mt-8 divide-y divide-stone-800 rounded-xl border border-stone-800">
          {reviewRows.map(([label, value]) => (
            <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr]">
              <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</dt>
              <dd className="text-sm text-stone-200">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => setReviewing(false)}
            className="rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-800"
          >
            Edit answers
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-400"
          >
            Continue to WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleReview} noValidate className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Step 1 of 2</p>
      <h2 className="mt-2 text-2xl font-bold text-stone-50">Tell us what you want to improve</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-400">
        Your answers stay in this browser until you choose to continue to WhatsApp. They are not
        submitted to this website or added to a CRM.
      </p>

      {Object.keys(errors).length > 0 ? (
        <div role="alert" className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-300">
          Complete the highlighted required fields before reviewing your request.
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {[
          ["contactName", "Your name", "e.g. Maria Martina"],
          ["businessName", "Business name", "e.g. Island View Hotel"],
          ["location", "Location", "Curaçao"],
        ].map(([id, label, placeholder]) => (
          <div key={id}>
            <label htmlFor={id} className={LABEL_CLASS}>{label}</label>
            <input
              id={id}
              type="text"
              value={form[id as TextField]}
              onChange={(event) => setTextField(id as TextField, event.target.value)}
              maxLength={240}
              placeholder={placeholder}
              aria-invalid={Boolean(errors[id as keyof DiscoveryFormData])}
              aria-describedby={errors[id as keyof DiscoveryFormData] ? `${id}-error` : undefined}
              className={INPUT_CLASS}
            />
            {errors[id as keyof DiscoveryFormData] ? (
              <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
                {errors[id as keyof DiscoveryFormData]}
              </p>
            ) : null}
          </div>
        ))}
        <SelectField id="role" label="Your role" value={form.role} options={DISCOVERY_OPTIONS.roles} error={errors.role} onChange={setTextField} />
        <SelectField id="businessType" label="Business type" value={form.businessType} options={DISCOVERY_OPTIONS.businessTypes} error={errors.businessType} onChange={setTextField} />
        <SelectField id="challenge" label="Main workflow challenge" value={form.challenge} options={DISCOVERY_OPTIONS.challenges} error={errors.challenge} onChange={setTextField} />
        <SelectField id="desiredResult" label="Desired result" value={form.desiredResult} options={DISCOVERY_OPTIONS.desiredResults} error={errors.desiredResult} onChange={setTextField} />
        <SelectField id="urgency" label="When would you like to improve this?" value={form.urgency} options={DISCOVERY_OPTIONS.urgencies} error={errors.urgency} onChange={setTextField} />
        <SelectField id="investmentReadiness" label="Investment readiness" value={form.investmentReadiness} options={DISCOVERY_OPTIONS.investmentReadiness} error={errors.investmentReadiness} onChange={setTextField} />
        <SelectField id="decisionStatus" label="Decision-making role" value={form.decisionStatus} options={DISCOVERY_OPTIONS.decisionStatuses} error={errors.decisionStatus} onChange={setTextField} />
        <SelectField id="supportPreference" label="Support preference" value={form.supportPreference} options={DISCOVERY_OPTIONS.supportPreferences} onChange={setTextField} optional />
      </div>

      <div className="mt-6 grid gap-6">
        {[
          ["challengeDetail", "Briefly describe the challenge", "What is slow, repetitive, or unclear?", true],
          ["currentTools", "Current tools", "WhatsApp, email, Notion, booking software, CRM…", true],
        ].map(([id, label, placeholder, optional]) => (
          <div key={String(id)}>
            <label htmlFor={String(id)} className={LABEL_CLASS}>
              {String(label)} {optional ? <span className="text-stone-500">(optional)</span> : null}
            </label>
            <textarea
              id={String(id)}
              rows={3}
              maxLength={240}
              value={form[id as TextField]}
              onChange={(event) => setTextField(id as TextField, event.target.value)}
              placeholder={String(placeholder)}
              className={INPUT_CLASS}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/70 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-300">
          <input
            type="checkbox"
            checked={form.privacyAccepted}
            onChange={(event) => {
              setForm((current) => ({ ...current, privacyAccepted: event.target.checked }));
              clearError("privacyAccepted");
            }}
            aria-invalid={Boolean(errors.privacyAccepted)}
            aria-describedby={errors.privacyAccepted ? "privacy-error" : "privacy-note"}
            className="mt-1 h-4 w-4 accent-amber-500"
          />
          <span>
            I understand that continuing will place my answers in a WhatsApp draft addressed to
            GPT Innovation by Attaf. Nothing is sent until I choose to send it in WhatsApp.
          </span>
        </label>
        <p id="privacy-note" className="mt-2 pl-7 text-xs text-stone-500">
          Do not include passwords, customer or guest data, financial account details, or
          confidential files.
        </p>
        {errors.privacyAccepted ? (
          <p id="privacy-error" className="mt-2 pl-7 text-xs text-red-400" role="alert">
            {errors.privacyAccepted}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400 sm:w-auto"
      >
        Review discovery request
      </button>
    </form>
  );
}
