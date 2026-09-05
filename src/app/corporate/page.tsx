import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { canonical, corporateFaqs, corporateTypes, enquireHref } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { PageCloser } from "@/components/PageCloser";

export const metadata: Metadata = {
  title: "Corporate",
  description:
    "Corporate events, conferences, launches and brand experiences — from boardroom to ballroom.",
  alternates: { canonical: canonical("/corporate") },
};

export default function CorporatePage() {
  return (
    <div>
      <section className="relative min-h-[75svh] overflow-hidden">
        <Image
          src={images.celebrationGold}
          alt="Marit Events corporate setup in black and gold"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="relative z-10 mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Corporate"
              title="Business deserves a great experience too."
              body="From boardroom to ballroom, we create events that move people, strengthen brands and leave an impression."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              What we create
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl text-ivory md:text-5xl">
              Brand experiences with operational clarity.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {corporateTypes.map((type, i) => (
              <Reveal key={type} delay={0.04 * i}>
                <div className="border border-white/10 px-6 py-8 transition hover:border-champagne/50">
                  <p className="text-[11px] tracking-[0.2em] text-champagne">
                    0{i + 1}
                  </p>
                  <p className="mt-4 font-display text-2xl text-ivory">{type}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link
              href={enquireHref({ type: "Corporate Event" })}
              className="inline-block border border-champagne px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-obsidian"
            >
              Plan a Corporate Event →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src={images.galaEvening}
                alt="Corporate event styling by Marit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl text-ivory md:text-5xl">
              Presence without the noise.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-taupe">
              We design guest journeys that balance substance and atmosphere —
              arrivals, programme, dining and networking as one continuous
              experience.
            </p>
            <Link
              href="/portfolio/black-and-gold-corporate"
              className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-champagne"
            >
              See a corporate case study
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Faq items={[...corporateFaqs]} title="Corporate planning with Marit" />
      <PageCloser
        title="Ready to elevate your next corporate moment?"
        primaryHref={enquireHref({ type: "Corporate Event" })}
        primaryLabel="Plan a corporate event"
        secondaryHref="/portfolio"
        secondaryLabel="See our work"
      />
    </div>
  );
}
