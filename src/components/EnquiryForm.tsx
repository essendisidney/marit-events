"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  destinations,
  enquiryTypes,
  resolveEnquiryType,
  siteConfig,
  whatsappUrl,
} from "@/lib/site";
import { trackEnquireSubmit } from "@/lib/analytics";

type EnquiryType = (typeof enquiryTypes)[number];
type SubmitMode = "whatsapp" | "email";

const guestChips = ["Under 50", "50–100", "100–200", "200+"] as const;
const budgetChips = [
  "To discuss",
  "Under $5k",
  "$5k–15k",
  "$15k–40k",
  "$40k+",
] as const;
const locationChips = destinations.map((d) => d.name);

function localDateMin() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialType = useMemo(
    () => resolveEnquiryType(searchParams.get("type")),
    [searchParams]
  );
  const initialLocation = searchParams.get("location") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [handoffBlocked, setHandoffBlocked] = useState(false);
  const [serverReceived, setServerReceived] = useState(false);
  const [brief, setBrief] = useState("");
  const [type, setType] = useState<EnquiryType>(initialType);
  const [mode, setMode] = useState<SubmitMode>("whatsapp");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState(initialLocation);
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(true);
  const guestsGroupRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function buildPayload(form: FormData) {
    return {
      type: String(form.get("type") || type),
      location: String(form.get("location") || location || ""),
      date: String(form.get("date") || ""),
      guests: String(form.get("guests") || guests || ""),
      budget: String(form.get("budget") || budget || ""),
      vision: String(form.get("vision") || ""),
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      company: String(form.get("company") || ""),
    };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const form = e.currentTarget;
    const payload = buildPayload(new FormData(form));

    if (!payload.location) {
      setFormError("Add where the celebration will take place.");
      return;
    }

    if (!payload.guests && !payload.budget) {
      setFormError("Select an estimated guest count or budget to continue.");
      guestsGroupRef.current?.querySelector("button")?.focus();
      return;
    }

    setSending(true);

    const lines = [
      `New Marit enquiry from ${payload.name}`,
      `Type: ${payload.type}`,
      `Location: ${payload.location}`,
      `Date: ${payload.date}`,
      `Guests: ${payload.guests}`,
      `Budget: ${payload.budget}`,
      `Vision: ${payload.vision}`,
      `Email: ${payload.email}`,
      `Phone/WhatsApp: ${payload.phone}`,
    ].join("\n");

    setBrief(lines);
    let emailed = false;
    let ok = false;
    let apiError = "";

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, mode }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        emailed?: boolean;
        brief?: string;
        error?: string;
      };
      if (data.brief) setBrief(data.brief);
      emailed = Boolean(data.emailed);
      ok = Boolean(data.ok) && res.ok;
      if (!ok) apiError = data.error || "Something went wrong. Please try again.";
      if (ok) setServerReceived(true);
    } catch {
      apiError =
        "Couldn't reach our server. Continue on WhatsApp or email below.";
    }

    if (!ok) {
      setFormError(apiError);
      setSending(false);
      return;
    }

    trackEnquireSubmit({ mode, type: payload.type, emailed });

    let blocked = false;
    if (mode === "email") {
      if (!emailed) {
        const subject = encodeURIComponent(
          `Marit Events enquiry — ${payload.type} — ${payload.name}`
        );
        const body = encodeURIComponent(lines);
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      }
    } else {
      const win = window.open(
        whatsappUrl(lines),
        "_blank",
        "noopener,noreferrer"
      );
      if (!win) blocked = true;
    }

    setHandoffBlocked(blocked);
    setSubmitted(true);
    setSending(false);
  }

  if (submitted) {
    return (
      <div
        className="border border-champagne/35 bg-obsidian-soft px-8 py-14 text-center md:px-12"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 h-px w-12 bg-champagne" />
        <p className="font-display text-3xl text-ivory md:text-4xl">
          Thank you.
        </p>
        <p className="mx-auto mt-4 max-w-sm text-taupe">
          {serverReceived ? "We've received your enquiry. " : null}
          {siteConfig.responseTime}
        </p>
        <ol className="mx-auto mt-8 max-w-sm space-y-3 text-left text-sm text-taupe">
          <li>
            <span className="text-champagne">01</span> We review your brief with
            care.
          </li>
          <li>
            <span className="text-champagne">02</span> You hear from us within 24
            hours.
          </li>
          <li>
            <span className="text-champagne">03</span> We propose a clear next
            step — discovery call or WhatsApp.
          </li>
        </ol>

        {handoffBlocked ? (
          <p className="mx-auto mt-6 max-w-sm text-sm text-ivory/80">
            Your message didn&apos;t open automatically — use the options below.
          </p>
        ) : null}

        <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-3">
          <a
            href={whatsappUrl(brief || undefined)}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-champagne link-underline"
          >
            Continue on WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Marit Events enquiry")}&body=${encodeURIComponent(brief)}`}
            className="text-[11px] uppercase tracking-[0.2em] text-taupe link-underline"
          >
            Or email {siteConfig.email}
          </a>
          <button
            type="button"
            className="text-[11px] uppercase tracking-[0.2em] text-taupe link-underline"
            onClick={async () => {
              try {
                await navigator.clipboard?.writeText(brief);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {
                /* ignore */
              }
            }}
          >
            {copied ? "Copied" : "Copy brief"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Brief copied to clipboard" : ""}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative space-y-10">
      {formError ? (
        <div
          className="space-y-3 border border-champagne/40 bg-champagne/5 px-4 py-3"
          role="alert"
        >
          <p className="text-sm text-champagne">{formError}</p>
          {brief ? (
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl(brief)}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-[0.18em] text-ivory link-underline"
              >
                WhatsApp instead
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Marit Events enquiry")}&body=${encodeURIComponent(brief)}`}
                className="text-[11px] uppercase tracking-[0.18em] text-taupe link-underline"
              >
                Email instead
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
      {initialLocation || initialType !== enquiryTypes[0] ? (
        <p className="border border-champagne/25 bg-champagne/5 px-4 py-3 text-sm text-ivory/80">
          We&apos;ve started your enquiry
          {initialType ? (
            <>
              {" "}
              for <span className="text-champagne">{initialType}</span>
            </>
          ) : null}
          {initialLocation ? (
            <>
              {" "}
              in <span className="text-champagne">{initialLocation}</span>
            </>
          ) : null}
          . Edit anything below.
        </p>
      ) : null}

      <fieldset>
        <legend className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
          <span className="text-champagne">01</span>
          What are you planning?
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {enquiryTypes.map((option) => {
            const selected = type === option;
            return (
              <label
                key={option}
                className={`relative flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-sm transition duration-300 ${
                  selected
                    ? "border-champagne bg-champagne/5 text-ivory"
                    : "border-white/10 text-taupe hover:border-white/25 hover:text-ivory/80"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={selected}
                  onChange={() => setType(option)}
                  className="sr-only"
                />
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                    selected ? "border-champagne" : "border-white/30"
                  }`}
                  aria-hidden
                >
                  {selected ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  ) : null}
                </span>
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-6">
        <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
          <span className="text-champagne">02</span>
          The celebration
        </p>
        <Field
          label="Where will it take place?"
          name="location"
          placeholder="Nairobi, Diani, abroad…"
          required
          value={location}
          onChange={setLocation}
          autoComplete="address-level2"
        />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Suggested locations"
        >
          {locationChips.map((chip) => (
            <button
              key={chip}
              type="button"
              aria-pressed={location === chip}
              onClick={() => setLocation(chip)}
              className={`border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition ${
                location === chip
                  ? "border-champagne text-champagne"
                  : "border-white/15 text-taupe hover:border-white/30"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
        <Field
          label="Event date"
          name="date"
          type="date"
          min={localDateMin()}
        />

        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden
        >
          <label>
            Company
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div ref={guestsGroupRef}>
          <p
            id="guests-label"
            className="text-[11px] uppercase tracking-[0.18em] text-taupe/80"
          >
            Estimated guest count
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-labelledby="guests-label"
          >
            {guestChips.map((chip) => (
              <button
                key={chip}
                type="button"
                aria-pressed={guests === chip}
                onClick={() => setGuests(chip)}
                className={`border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition ${
                  guests === chip
                    ? "border-champagne text-champagne"
                    : "border-white/15 text-taupe hover:border-white/30"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
          <input type="hidden" name="guests" value={guests} />
        </div>

        <div>
          <p
            id="budget-label"
            className="text-[11px] uppercase tracking-[0.18em] text-taupe/80"
          >
            Estimated budget
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-labelledby="budget-label"
          >
            {budgetChips.map((chip) => (
              <button
                key={chip}
                type="button"
                aria-pressed={budget === chip}
                onClick={() => setBudget(chip)}
                className={`border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition ${
                  budget === chip
                    ? "border-champagne text-champagne"
                    : "border-white/15 text-taupe hover:border-white/30"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
          <input type="hidden" name="budget" value={budget} />
        </div>

        <Field
          label="Tell us about your vision"
          name="vision"
          textarea
          required
          placeholder="Atmosphere, people, places, anything that matters…"
        />
      </div>

      <div className="space-y-6">
        <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
          <span className="text-champagne">03</span>
          How we reach you
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <Field
          label="WhatsApp / Phone"
          name="phone"
          required
          placeholder="+254…"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div className="border-t border-white/10 pt-8">
        <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-taupe">
          Send via
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          {(
            [
              ["whatsapp", "WhatsApp"],
              ["email", "Email"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                mode === value
                  ? "border-champagne text-champagne"
                  : "border-white/15 text-taupe hover:border-white/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="hidden w-full bg-champagne py-4 text-[11px] uppercase tracking-[0.22em] text-obsidian transition duration-300 hover:bg-champagne-soft disabled:opacity-60 md:inline-flex md:w-auto md:min-w-[14rem] md:items-center md:justify-center md:px-10"
        >
          {sending
            ? mode === "whatsapp"
              ? "Opening WhatsApp…"
              : "Sending…"
            : mode === "whatsapp"
              ? "Send via WhatsApp →"
              : "Send via Email →"}
        </button>
        <p className="mt-4 hidden text-sm text-taupe md:block">
          {siteConfig.responseTime}
        </p>
      </div>

      {stickyVisible ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-obsidian/95 px-5 py-3 backdrop-blur-md md:hidden safe-pb">
          <div className="pointer-events-auto mx-auto flex max-w-lg flex-col gap-1">
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-champagne py-3.5 text-[11px] uppercase tracking-[0.22em] text-obsidian transition disabled:opacity-60"
            >
              {sending
                ? mode === "whatsapp"
                  ? "Opening WhatsApp…"
                  : "Sending…"
                : mode === "whatsapp"
                  ? "Send via WhatsApp →"
                  : "Send via Email →"}
            </button>
            <p className="text-center text-[10px] text-taupe">
              {siteConfig.responseTime}
            </p>
          </div>
        </div>
      ) : null}
      <div className="h-24 md:hidden" aria-hidden />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
  defaultValue,
  value,
  onChange,
  autoComplete,
  inputMode,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: string;
}) {
  const classes =
    "mt-2 w-full border border-white/10 bg-transparent px-4 py-3.5 text-sm text-ivory outline-none transition duration-300 placeholder:text-taupe/35 focus:border-champagne/55";

  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-taupe/80">
        {label}
        {required ? <span className="text-champagne"> *</span> : null}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`${classes} min-h-[8rem] resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={onChange ? undefined : defaultValue}
          value={onChange ? value : undefined}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          autoComplete={autoComplete}
          inputMode={inputMode}
          min={min}
          className={classes}
        />
      )}
    </label>
  );
}
