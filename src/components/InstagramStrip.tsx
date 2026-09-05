"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  enquireHrefForPath,
  siteConfig,
  whatsappMessageForPath,
  whatsappUrl,
} from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal } from "@/components/ui";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";

const tiles = [
  {
    src: images.weddingFormal,
    alt: "African print wedding styling",
    href: "/portfolio/african-print-celebration",
  },
  {
    src: images.proposal,
    alt: "Proposal heart floor installation",
    href: "/portfolio/she-said-yes",
  },
  {
    src: images.celebrationGold,
    alt: "Black and gold corporate evening",
    href: "/portfolio/black-and-gold-corporate",
  },
  {
    src: images.entranceDraped,
    alt: "Draped floral entrance",
    href: "/portfolio/starlit-pavilion-reception",
  },
  {
    src: images.receptionRustic,
    alt: "Rustic chic reception pavilion",
    href: "/portfolio/starlit-pavilion-reception",
  },
  {
    src: images.babyShower,
    alt: "Soft pink celebration tablescape",
    href: "/portfolio/celebrations-in-colour",
  },
];

export function InstagramStrip() {
  const pathname = usePathname();
  const enquire = enquireHrefForPath(pathname);
  const handle =
    siteConfig.instagram
      .replace(/https?:\/\/(www\.)?instagram\.com\//, "")
      .replace(/\/$/, "") || "maritevents";

  return (
    <section className="border-y border-white/5 bg-obsidian-soft px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Instagram
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl text-ivory md:text-5xl">
              Follow the craft behind the celebrations.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-champagne/50 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-obsidian"
            >
              @{handle}
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {tiles.map((tile, i) => (
            <Reveal key={`${tile.href}-${i}`} delay={0.04 * i}>
              <Link
                href={tile.href}
                onClick={() =>
                  trackCtaClick({
                    path: pathname,
                    href: tile.href,
                    source: "instagram_tile",
                  })
                }
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <span className="absolute inset-0 bg-obsidian/0 transition group-hover:bg-obsidian/35" />
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-champagne transition duration-500 group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-sm text-taupe">
            Prefer WhatsApp?{" "}
            <a
              href={whatsappUrl(whatsappMessageForPath(pathname))}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick({ path: pathname })}
              className="text-ivory underline-offset-4 hover:text-champagne hover:underline"
            >
              Message Marit
            </a>{" "}
            — or{" "}
            <Link
              href={enquire}
              onClick={() =>
                trackCtaClick({
                  path: pathname,
                  href: enquire,
                  source: "instagram_strip",
                })
              }
              className="text-ivory underline-offset-4 hover:text-champagne hover:underline"
            >
              plan your event
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
