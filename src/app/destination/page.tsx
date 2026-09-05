import type { Metadata } from "next";
import Image from "next/image";
import { canonical, destinationFaqs, destinations, enquireHref } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { Faq } from "@/components/Faq";
import { InstagramStrip } from "@/components/InstagramStrip";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Destination",
  description:
    "Get married in Kenya — destination weddings and celebrations from Nairobi to the coast and beyond.",
  alternates: { canonical: canonical("/destination") },
};

export default function DestinationPage() {
  const [featured, ...rest] = destinations;

  return (
    <div>
      <section className="relative min-h-[75svh] overflow-hidden">
        <Image
          src={images.dianiSunset}
          alt="Kenya coastal destination for celebrations"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="relative z-10 mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Destination Kenya"
              title="Get married in Kenya."
              body="Bring your people. We'll handle the rest — venues, guest logistics, styling and the quiet details that make destination celebrations feel effortless."
            />
            <TrackedLink
              href={enquireHref({ type: "Destination Event" })}
              source="destination_hero"
              className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
            >
              Plan a destination event
              <span aria-hidden>→</span>
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <article className="mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-2">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[32rem]">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center bg-obsidian-soft p-8 md:p-14">
                <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                  Featured location
                </p>
                <h2 className="mt-4 font-display text-4xl text-ivory md:text-6xl">
                  {featured.name}
                </h2>
                <p className="mt-5 max-w-md text-lg text-taupe">
                  {featured.description}
                </p>
                <TrackedLink
                  href={enquireHref({
                    type: "Destination Event",
                    location: featured.name,
                  })}
                  source="destination_featured"
                  className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-champagne"
                >
                  Enquire for {featured.name}
                  <span aria-hidden>→</span>
                </TrackedLink>
              </div>
            </article>
          </Reveal>
        </section>
      ) : null}

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto mb-10 max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Explore
            </p>
            <h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">
              Where extraordinary celebrations unfold.
            </h2>
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((place, i) => (
            <Reveal key={place.name} delay={0.05 * i}>
              <TrackedLink
                href={enquireHref({
                  type: "Destination Event",
                  location: place.name,
                })}
                source="destination_place"
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl text-ivory">
                    {place.name}
                  </h3>
                  <p className="mt-2 text-sm text-taupe">{place.description}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-champagne">
                    Enquire →
                  </p>
                </div>
              </TrackedLink>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq
        items={[...destinationFaqs]}
        title="Destination celebrations with Marit"
      />

      <InstagramStrip />

      <PageCloser
        title="Ready for a Kenya celebration?"
        body="Tell us the place you're dreaming of — we'll orchestrate the rest."
        primaryHref={enquireHref({ type: "Destination Event" })}
        primaryLabel="Plan a destination event"
        secondaryHref="/weddings"
        secondaryLabel="Explore weddings"
      />
    </div>
  );
}
