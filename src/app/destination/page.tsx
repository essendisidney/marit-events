import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Destination",
  description:
    "Get married in Kenya — destination weddings and celebrations from Nairobi to the coast and beyond.",
};

export default function DestinationPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Destination Kenya"
              title="Get married in Kenya."
              body="Bring your people. We'll handle the rest. From Nairobi's sophisticated venues to the coast's tropical landscapes, Marit creates destination experiences that feel effortless for couples and their guests."
            />
            <Link
              href="/enquire"
              className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
            >
              Destination Weddings
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((place, i) => (
            <Reveal key={place.name} delay={0.05 * i}>
              <article className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-display text-3xl text-ivory">
                    {place.name}
                  </h2>
                  <p className="mt-2 text-sm text-taupe">{place.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-sm text-taupe/70">
          Locations shown are illustrative. Confirm destinations Marit currently
          services before publishing.
        </p>
      </section>
    </div>
  );
}
