"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { images } from "@/lib/images";
import { enquireHref } from "@/lib/site";
import { trackCtaClick } from "@/lib/analytics";
import { ButtonLink, ImageReveal, Reveal, SectionHeading } from "@/components/ui";

export function WeddingsTeaser() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.05]);
  const enquire = enquireHref({ type: "Wedding" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={images.weddingFormal}
          alt="Marit Events wedding reception with African print accents and gold place settings"
          fill
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-obsidian/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/55 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            Weddings
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[1.02] text-ivory md:text-7xl">
            From quiet vows
            <br />
            to destination days.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
            Intimate gatherings and spectacular Kenya celebrations — designed
            around your story, orchestrated so you stay present.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink
              href={enquire}
              variant="ghost"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: enquire,
                  source: "teaser_weddings",
                })
              }
            >
              Begin wedding enquiry
            </ButtonLink>
            <ButtonLink href="/weddings" variant="ghost">
              Explore Weddings
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DestinationTeaser() {
  const enquire = enquireHref({ type: "Destination Event" });

  return (
    <section className="bg-obsidian px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Destination"
            title="Get married in Kenya."
            body="Bring your people. We'll handle the rest. From Nairobi's sophisticated venues to the coast's tropical landscapes, Marit creates destination experiences that feel effortless for couples and their guests."
          />
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink
              href={enquire}
              variant="ghost"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: enquire,
                  source: "teaser_destination",
                })
              }
            >
              Plan a destination event
            </ButtonLink>
            <ButtonLink href="/destination" variant="ghost">
              Destination Kenya
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ImageReveal className="relative aspect-[4/5] md:aspect-[5/4]">
            <Image
              src={images.dianiSunset}
              alt="Sunset over Diani Beach, Kenya"
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ImageReveal>
        </Reveal>
      </div>
    </section>
  );
}

export function CelebrationsTeaser() {
  const enquire = enquireHref({ type: "Private Celebration" });

  return (
    <section className="bg-obsidian px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Celebrations"
            title="Proposals. Showers. Birthdays. Moments that matter."
            body="Every gathering deserves the same care as a wedding — intentional design, calm execution, unforgettable atmosphere."
          />
          <div className="mt-8">
            <ButtonLink
              href={enquire}
              variant="ghost"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: enquire,
                  source: "teaser_celebrations",
                })
              }
            >
              Plan a celebration
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <Link
              href="/portfolio/she-said-yes"
              className="group relative block aspect-[4/5] overflow-hidden md:aspect-[5/4]"
            >
              <Image
                src={images.proposal}
                alt="Proposal setup by Marit Events"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">
                  Proposal
                </p>
                <h3 className="mt-2 font-display text-3xl text-ivory">
                  She said yes
                </h3>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/portfolio/celebrations-in-colour"
              className="group relative block aspect-[4/5] overflow-hidden md:aspect-[5/4]"
            >
              <Image
                src={images.babyShower}
                alt="Baby shower styled by Marit Events"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">
                  Private celebration
                </p>
                <h3 className="mt-2 font-display text-3xl text-ivory">
                  Celebrations in colour
                </h3>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CorporateTeaser() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);
  const enquire = enquireHref({ type: "Corporate Event" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={images.celebrationGold}
          alt="Marit Events corporate black and gold setup"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-obsidian/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            Corporate
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] text-ivory md:text-6xl">
            Presence without the noise.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
            From boardroom to ballroom — brand experiences that look premium and
            run with precision.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink
              href={enquire}
              variant="ghost"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: enquire,
                  source: "teaser_corporate",
                })
              }
            >
              Plan a Corporate Event
            </ButtonLink>
            <ButtonLink href="/corporate" variant="ghost">
              Explore Corporate
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
