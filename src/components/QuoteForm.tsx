"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ButtonLink, buttonClass } from "@/components/ui";
import { createCateringInquiry } from "@/lib/catering";
import { isFirebaseConfigured } from "@/lib/firebase";
import { BUDGET_RANGES, PACKAGES, SERVICES } from "@/lib/site";

const OTHER_SERVICE = "Other";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="font-display text-xs uppercase tracking-[0.16em] text-cream/60">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function QuoteForm() {
  const params = useSearchParams();
  const initialService =
    SERVICES.find((s) => s.slug === params.get("service"))?.title ?? "";
  const initialMenu = PACKAGES.find((p) => p.slug === params.get("menu"))?.title;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    location: "",
    guestCount: "",
    budget: "",
    serviceType: initialService,
    message: "",
  });
  const [menuPreferences, setMenuPreferences] = useState<string[]>(
    initialMenu ? [initialMenu] : []
  );
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update(key: keyof typeof form) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function toggleMenu(title: string) {
    setMenuPreferences((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createCateringInquiry({
        ...form,
        guestCount: Number.parseInt(form.guestCount, 10) || 0,
        menuPreferences,
      });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send your request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-gold/30 bg-charcoal p-8 sm:p-10">
        <h2 className="font-display text-3xl uppercase tracking-wide text-cream">
          Request received
        </h2>
        <p className="mt-4 max-w-lg text-cream/75">
          Thank you, {form.name.split(" ")[0] || "friend"}. We&apos;ll review
          your event details and be in touch soon with menu ideas and a
          quote.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back home
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {!isFirebaseConfigured() && (
        <p className="border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-cream/90">
          Firebase is not configured yet. Add your project keys to{" "}
          <code className="text-gold">.env.local</code> to receive quote
          requests.
        </p>
      )}

      <fieldset className="space-y-5">
        <legend className="font-display text-lg uppercase tracking-[0.14em] text-gold">
          Your details
        </legend>
        <Field label="Full name *">
          <input required value={form.name} onChange={update("name")} className="field-input" autoComplete="name" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone *">
            <input required type="tel" value={form.phone} onChange={update("phone")} className="field-input" autoComplete="tel" />
          </Field>
          <Field label="Email *">
            <input required type="email" value={form.email} onChange={update("email")} className="field-input" autoComplete="email" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-lg uppercase tracking-[0.14em] text-gold">
          Your event
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Event date *">
            <input required type="date" value={form.eventDate} onChange={update("eventDate")} className="field-input" />
          </Field>
          <Field label="Guest count *">
            <input
              required
              type="number"
              min={1}
              inputMode="numeric"
              value={form.guestCount}
              onChange={update("guestCount")}
              className="field-input"
              placeholder="e.g. 120"
            />
          </Field>
        </div>
        <Field label="Event location *">
          <input
            required
            value={form.location}
            onChange={update("location")}
            className="field-input"
            placeholder="Venue name, city, or address"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Service type *">
            <select required value={form.serviceType} onChange={update("serviceType")} className="field-input">
              <option value="" disabled>
                Select one
              </option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
            </select>
          </Field>
          <Field label="Budget *">
            <select required value={form.budget} onChange={update("budget")} className="field-input">
              <option value="" disabled>
                Select a range
              </option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-lg uppercase tracking-[0.14em] text-gold">
          Menu preferences
        </legend>
        <p className="mt-1 text-sm text-cream/55">Pick any that interest you.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PACKAGES.map((p) => {
            const checked = menuPreferences.includes(p.title);
            return (
              <label
                key={p.slug}
                className={`flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors ${
                  checked
                    ? "border-gold bg-gold/10"
                    : "border-smoke/70 bg-charcoal hover:border-gold/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMenu(p.title)}
                  className="mt-1 accent-[var(--gold)]"
                />
                <span>
                  <span className="block font-display text-sm uppercase tracking-[0.1em] text-cream">
                    {p.title}
                  </span>
                  <span className="block text-xs text-cream/55">{p.blurb}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field label="Anything else we should know?">
        <textarea
          rows={5}
          value={form.message}
          onChange={update("message")}
          className="field-input"
          placeholder="Event timing, dietary needs, service style, favorite dishes…"
        />
      </Field>

      {error && (
        <p className="border border-gold/50 bg-gold/10 px-3 py-2 text-sm text-cream">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`${buttonClass()} w-full disabled:opacity-60 sm:w-auto`}
      >
        {submitting ? "Sending…" : "Request my quote"}
      </button>
    </form>
  );
}
