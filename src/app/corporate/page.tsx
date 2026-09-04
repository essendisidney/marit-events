import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { corporateTypes } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Corporate",
  description:
    "Corporate events, conferences, launches and brand experiences — from boardroom to ballroom.",
};

export default function CorporatePage() {
  return (
    <div>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src={images.celebrationGold}
          alt="Marit Events corporate setup in black and gold"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Corporate"
              title="Business deserves a great experience too."
              body="From boardroom to ballroom, we create events that move people, strengthen brands and leave an impression."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {corporateTypes.map((type, i) => (
              <Reveal key={type} delay={0.04 * i}>
                <div className="border border-white/10 px-6 py-8 transition hover:border-champagne/50">
                  <p className="font-display text-2xl text-ivory">{type}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link
              href="/enquire"
              className="inline-block border border-champagne px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-obsidian"
            >
              Plan a Corporate Event →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
