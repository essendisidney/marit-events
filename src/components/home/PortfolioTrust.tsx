"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/lib/portfolio";
import { trustStats } from "@/lib/site";
import { ButtonLink, ImageReveal, Reveal, SectionHeading } from "@/components/ui";
import { StatValue } from "@/components/StatValue";
import { trackCtaClick } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export function PortfolioPreview() {
  const preview = portfolio.slice(0, 3);
  const [feature, ...rest] = preview;
  const pathname = usePathname();

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

        <Reveal className="mt-12">
          <ButtonLink
            href="/portfolio"
            variant="ghost"
            onClick={() =>
              trackCtaClick({
                path: pathname,
                href: "/portfolio",
                source: "home_portfolio",
              })
            }
          >
            View full portfolio
          </ButtonLink>
        </Reveal>
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
            body="Nairobi-based. Destination-ready. Orchestrated end to end — so you stay present for the celebration."
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
          <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
            How we work
          </p>
          <p className="mt-4 font-display text-2xl leading-snug text-ivory md:text-3xl">
            Listen first. Design with intent. Orchestrate quietly — from first
            enquiry to the last goodbye.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export { PageCloser as FinalCta } from "@/components/PageCloser";

