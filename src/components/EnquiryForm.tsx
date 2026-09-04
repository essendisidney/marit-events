"use client";

import { FormEvent, useState } from "react";
import { enquiryTypes, siteConfig, whatsappUrl } from "@/lib/site";

type EnquiryType = (typeof enquiryTypes)[number];
type SubmitMode = "whatsapp" | "email";

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [type, setType] = useState<EnquiryType>(enquiryTypes[0]);
  const [mode, setMode] = useState<SubmitMode>("whatsapp");

  function buildPayload(form: FormData) {
    return {
      type: String(form.get("type") || type),
      location: String(form.get("location") || ""),
      date: String(form.get("date") || ""),
      guests: String(form.get("guests") || ""),
      budget: String(form.get("budget") || ""),
      vision: String(form.get("vision") || ""),
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
    };
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const payload = buildPayload(new FormData(e.currentTarget));

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

    if (mode === "email") {
      const subject = encodeURIComponent(
        `Marit Events enquiry — ${payload.type} — ${payload.name}`
      );
      const body = encodeURIComponent(lines);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    } else {
      window.open(whatsappUrl(lines), "_blank", "noopener,noreferrer");
    }

    setSubmitted(true);
    setSending(false);
  }

  if (submitted) {
    return (
      <div className="border border-champagne/35 bg-obsidian-soft px-8 py-14 text-center md:px-12">
        <div className="mx-auto mb-6 h-px w-12 bg-champagne" />
        <p className="font-display text-3xl text-ivory md:text-4xl">
          Thank you.
        </p>
        <p className="mx-auto mt-4 max-w-sm text-taupe">
          {siteConfig.responseTime}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-champagne link-underline"
          >
            Continue on WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[11px] uppercase tracking-[0.2em] text-taupe link-underline"
          >
            Or email {siteConfig.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
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
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Event date" name="date" type="date" />
          <Field
            label="Estimated guest count"
            name="guests"
            placeholder="e.g. 80"
          />
        </div>
        <Field
          label="Estimated budget"
          name="budget"
          placeholder="Optional — a range is fine"
        />
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
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
        </div>
        <Field
          label="WhatsApp / Phone"
          name="phone"
          required
          placeholder="+254…"
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
          className="w-full bg-champagne py-4 text-[11px] uppercase tracking-[0.22em] text-obsidian transition duration-300 hover:bg-champagne-soft disabled:opacity-60 md:w-auto md:min-w-[14rem] md:px-10"
        >
          {sending
            ? "Opening…"
            : mode === "whatsapp"
              ? "Send via WhatsApp →"
              : "Send via Email →"}
        </button>
        <p className="mt-4 text-sm text-taupe">{siteConfig.responseTime}</p>
      </div>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
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
          className={`${classes} min-h-[8rem] resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={classes}
        />
      )}
    </label>
  );
}
