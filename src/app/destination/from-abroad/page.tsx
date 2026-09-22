import type { Metadata } from "next";
import Image from "next/image";
import {
  abroadFaqs,
  abroadPlanningSteps,
  canonical,
  enquireHref,
  siteConfig,
} from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { Faq } from "@/components/Faq";
import { TrackedLink } from "@/components/TrackedLink";

const enquire = enquireHref({ type: "Destination Event" });

export const metadata: Metadata = {
  title: "Planning a Kenya Wedding from Abroad",
  description:
    "Live in the UK, US, UAE or beyond? Marit Events is your on-the-ground team for destination weddings and celebrations in Kenya — venues, vendors, guest logistics and day-of orchestration.",
  alternates: { canonical: canonical("/destination/from-abroad") },
  keywords: [
    "destination wedding Kenya",
    "plan wedding in Kenya from abroad",
    "Kenya wedding planner for international couples",
    "get married in Kenya",
    "Nairobi destination wedding",
    "Diani wedding planner",
  ],
  openGraph: {
    title: "Planning a Kenya celebration from abroad · Marit Events",
    description:
      "Distance should feel calm. Marit orchestrates Kenya weddings and events for couples and hosts planning from abroad.",
  },
};

export default function PlanningFromAbroadPage() {
  return (
    <div>
      <section className="relative min-h-[75svh] overflow-hidden">
        <Image
          src={images.dianiWater}
          alt="Kenya coast — destination celebrations for international couples"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="relative z-10 mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="For couples & hosts abroad"
              title="Planning Kenya from anywhere."
              body="You imagine it from London, Dubai, New York or Johannesburg. We orchestrate everything on the ground in Kenya — so distance never becomes chaos."
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={enquire}
                source="abroad_hero"
                className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
              >
                Start your Kenya enquiry
              </TrackedLink>
              <TrackedLink
                href="/destination"
                source="abroad_hero_destinations"
                className="border border-ivory/35 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory transition hover:border-champagne hover:text-champagne"
              >
                Explore destinations
              </TrackedLink>
            </div>
            <p className="mt-6 text-sm text-ivory/65">
              {siteConfig.responseTime} WhatsApp and email both work across time
              zones.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Why couples choose Marit"
              title="Your team in Kenya — while you stay where you are."
              body="International celebrations fail on logistics, not love. We hold venues, vendors, timelines and guest journeys so you can decide calmly from abroad."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "On the ground",
                body: "Nairobi-based orchestration with destination reach — coast, city and wilderness.",
              },
              {
                title: "Remote-ready",
                body: "Clear briefs, video design calls and WhatsApp decisions that respect your time zone.",
              },
              {
                title: "Guest-aware",
                body: "Travel, stays and welcome touches considered — so family flying in feel looked after.",
              },
            ].map((item, i) => (
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

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Four steps from first message to the last goodbye."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {abroadPlanningSteps.map((step, i) => (
              <Reveal key={step.number} delay={0.05 * i}>
                <p className="text-[11px] tracking-[0.28em] text-champagne">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-2xl text-ivory">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-taupe">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <TrackedLink
              href={enquire}
              source="abroad_process"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
            >
              Tell us where you&apos;re flying from
              <span aria-hidden>→</span>
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
              <Image
                src={images.weddingFormal}
                alt="Kenya wedding celebration orchestrated by Marit Events"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              What to send first
            </p>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-5xl">
              A short brief is enough to begin.
            </h2>
            <ul className="mt-8 space-y-4 text-taupe">
              {[
                "Where you live now, and where in Kenya you’re drawn to",
                "Rough date window and guest numbers",
                "Wedding, proposal, private celebration — or still deciding",
                "Anything non-negotiable (ritual, budget band, accessibility)",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-base leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                  {line}
                </li>
              ))}
            </ul>
            <TrackedLink
              href={enquire}
              source="abroad_brief"
              className="mt-10 inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
            >
              Begin destination enquiry
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      <Faq
        items={[...abroadFaqs]}
        title="Planning from abroad — answered"
      />

      <PageCloser
        title="Ready to celebrate in Kenya?"
        body="Share where you're flying from and what you're imagining. We'll reply within 2–3 hours with a clear next step."
        primaryHref={enquire}
        primaryLabel="Start your Kenya enquiry"
        secondaryHref="/journal/planning-a-wedding-in-kenya-from-abroad"
        secondaryLabel="Read the abroad guide"
      />
    </div>
  );
}
