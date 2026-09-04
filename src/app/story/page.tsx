import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Marit Events — African soul, international luxury. Event experiences beautifully orchestrated from Nairobi, Kenya.",
};

export default function StoryPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="African soul. International luxury."
              body="Marit Events was built for people who want extraordinary celebrations — without the chaos. Based in Nairobi, we orchestrate weddings, destination experiences and corporate gatherings with calm precision and personal care."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.heritageAttire}
                alt="Marit Events wedding table with African print runners and gold chargers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-3xl leading-snug text-ivory md:text-4xl">
              We don&apos;t simply plan events. We create the conditions for
              presence — so you can feel every moment while we manage every
              detail.
            </p>
            <p className="mt-6 text-taupe leading-relaxed">
              Our work sits at the intersection of hospitality, design and
              flawless execution. Whether you are celebrating in Kenya or
              bringing guests from across the world, the standard is the same:
              curated, orchestrated, unmistakably yours.
            </p>
            <p className="mt-4 text-sm tracking-[0.12em] text-taupe/70">
              {siteConfig.location} · Event Experiences, Beautifully Orchestrated.
            </p>
            <Link
              href="/enquire"
              className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
            >
              Plan Your Event
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
