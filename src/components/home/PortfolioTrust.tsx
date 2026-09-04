"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/lib/portfolio";
import { trustStats } from "@/lib/site";
import { ButtonLink, ImageReveal, Reveal, SectionHeading } from "@/components/ui";
import { StatValue } from "@/components/StatValue";

export function PortfolioPreview() {
  const preview = portfolio.slice(0, 3);
  const [feature, ...rest] = preview;

  return (
    <section className="bg-obsidian px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Recently Orchestrated"
            title="Moments, told like stories."
            body="Editorial glimpses into celebrations shaped with intention — each one a case study in experience."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-7">
            <Link href={`/portfolio/${feature.slug}`} className="group block">
              <ImageReveal className="relative aspect-[4/5] md:aspect-[5/4]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-taupe">
                    {feature.location} · {feature.category}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-ivory md:text-4xl">
                    {feature.title}
                  </h3>
                </div>
              </ImageReveal>
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={0.1 * (i + 1)}>
                <Link href={`/portfolio/${item.slug}`} className="group block">
                  <ImageReveal className="relative aspect-[16/11] lg:aspect-[5/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-taupe">
                        {item.location} · {item.category}
                      </p>
                      <h3 className="mt-1 font-display text-2xl text-ivory">
                        {item.title}
                      </h3>
                    </div>
                  </ImageReveal>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Trust"
            title="Trusted to create the moments that matter."
            body="Figures below are placeholders — swap in verified numbers, real names and photography before launch."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {trustStats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i}>
              <StatValue value={stat.value} />
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-taupe">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 max-w-3xl border-l border-champagne/40 pl-6 md:pl-10">
          <blockquote className="font-display text-3xl leading-snug text-ivory md:text-[2.5rem]">
            “Marit didn&apos;t just plan our wedding. They gave us the freedom to
            actually enjoy it.”
          </blockquote>
          <p className="mt-6 text-sm tracking-[0.12em] text-taupe">
            — Client Name
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[min(80%,40rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">
            Ready for a celebration without the chaos?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-obsidian/65">
            Tell us what you&apos;re imagining. We&apos;ll take it from there.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/enquire" variant="solid-dark">
              Plan Your Event
            </ButtonLink>
            <ButtonLink href="/destination" variant="ghost-dark">
              Destination Kenya
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
