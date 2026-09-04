import Image from "next/image";
import { images } from "@/lib/images";
import { ButtonLink, ImageReveal, Reveal, SectionHeading } from "@/components/ui";

export function WeddingsTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images.weddingFormal}
          alt="Marit Events wedding reception with African print accents and gold place settings"
          fill
          className="object-cover object-[center_20%] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/55 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            Weddings
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[1.02] text-ivory md:text-7xl">
            Your day.
            <br />
            Your story.
            <br />
            Your moment.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
            From intimate celebrations to spectacular destination weddings,
            Marit brings together the people, places and details that make your
            story unforgettable.
          </p>
          <div className="mt-10">
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
  return (
    <section className="bg-obsidian px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Destination"
            title="Get married in Kenya."
            body="Bring your people. We'll handle the rest. From Nairobi's sophisticated venues to the coast's tropical landscapes, Marit creates destination experiences that feel effortless for couples and their guests."
          />
          <div className="mt-8">
            <ButtonLink href="/destination" variant="ghost">
              Destination Weddings
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

export function CorporateTeaser() {
  return (
    <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Corporate"
            title="Business deserves a great experience too."
            body="From boardroom to ballroom, we create events that move people, strengthen brands and leave an impression."
          />
          <div className="mt-10">
            <ButtonLink href="/corporate" variant="ghost">
              Plan a Corporate Event
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
