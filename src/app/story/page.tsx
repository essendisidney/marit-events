import type { Metadata } from "next";
import Image from "next/image";
import { canonical, enquireHref, siteConfig, storyPillars } from "@/lib/site";
import { images, marit } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Marit Events — African soul, international luxury. Event experiences beautifully orchestrated from Nairobi, Kenya.",
  alternates: { canonical: canonical("/story") },
};

export default function StoryPage() {
  return (
    <div>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src={marit.receptionRustic}
          alt="Marit Events celebration atmosphere"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Our Story"
              title="African soul. International luxury."
              body="Marit Events was built for people who want extraordinary celebrations — without the chaos."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
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
            <p className="mt-6 leading-relaxed text-taupe">
              Our work sits at the intersection of hospitality, design and
              flawless execution. Whether you are celebrating in Kenya or
              bringing guests from across the world, the standard is the same:
              curated, orchestrated, unmistakably yours.
            </p>
            <p className="mt-4 text-sm tracking-[0.12em] text-taupe/70">
              {siteConfig.location} · {siteConfig.slogan}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              How we think
            </p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {storyPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.06 * i}>
                <p className="text-[11px] tracking-[0.28em] text-champagne">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-3xl text-ivory">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-taupe">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCloser
        title="Ready to begin?"
        primaryHref={enquireHref()}
        secondaryHref="/portfolio"
        secondaryLabel="View portfolio"
      />
    </div>
  );
}
