import type { Metadata } from "next";
import Image from "next/image";
import {
  canonical,
  consultationFaqs,
  consultationIncludes,
  enquireHref,
  siteConfig,
} from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { Faq } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";

const enquire = enquireHref({ type: "Event Consultation" });

export const metadata: Metadata = {
  title: "Event Consultation",
  description:
    "Professional event consultation for clients who need expert guidance, assessment, planning direction or operational recommendations — without full event management. From KES 5,000.",
  alternates: { canonical: canonical("/consultation") },
  keywords: [
    "event consultation Kenya",
    "event planner advice Nairobi",
    "wedding consultation Kenya",
    "event assessment Nairobi",
  ],
  openGraph: {
    title: "Event Consultation · Marit Events",
    description:
      "Expert guidance without full management — assessment, direction and operational recommendations. From KES 5,000.",
  },
};

export default function ConsultationPage() {
  return (
    <div>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src={images.privateTable}
          alt="Marit Events consultation — calm planning guidance"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/65" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Event Consultation"
              title="Advice when you need clarity — not a full planning team."
              body="A professional consultation for clients who want expert guidance, event assessment, planning direction or operational recommendations — without engaging Marit Events for full event management."
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={enquire}
                source="consultation_hero"
                className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
              >
                Book a consultation
              </TrackedLink>
              <TrackedLink
                href="/enquire"
                source="consultation_hero_full"
                className="border border-ivory/35 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory transition hover:border-champagne hover:text-champagne"
              >
                Prefer full planning?
              </TrackedLink>
            </div>
            <p className="mt-6 text-sm text-ivory/70">
              Consultation fee: from KES 5,000 · {siteConfig.responseTime}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Who it's for"
              title="Independent advice. Your event stays yours."
              body="You may already have a venue, a committee or a clear date — and simply need a professional eye. We advise; we don't take over unless you later ask us to."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {consultationIncludes.map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                  0{i + 1}
                </p>
                <h2 className="mt-4 font-display text-2xl text-ivory md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-taupe leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Investment
            </p>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-5xl">
              From KES 5,000
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe md:text-lg">
              Scope is agreed when you enquire — a focused call, a written
              assessment, or a short planning-direction session — so the fee
              matches what you actually need.
            </p>
            <TrackedLink
              href={enquire}
              source="consultation_fee"
              className="mt-10 inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
            >
              Enquire about consultation
            </TrackedLink>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-5 text-taupe">
              {[
                "Share what you're planning and where you're stuck",
                "We propose a consultation format and confirm the fee",
                "You leave with clearer decisions — still running your own event",
              ].map((line, i) => (
                <li key={line} className="flex gap-4 text-base leading-relaxed">
                  <span className="text-[11px] tracking-[0.2em] text-champagne">
                    0{i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Faq items={[...consultationFaqs]} title="Consultation — answered" />

      <PageCloser
        title="Need advice, not a full planner?"
        body="Tell us what you're working on. We'll reply within 24 hours with a clear consultation next step."
        primaryHref={enquire}
        primaryLabel="Book a consultation"
        secondaryHref="/experiences"
        secondaryLabel="See how Marit plans"
      />
    </div>
  );
}
