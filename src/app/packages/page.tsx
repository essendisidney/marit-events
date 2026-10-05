import type { Metadata } from "next";
import Image from "next/image";
import { canonical, enquireHref, siteConfig } from "@/lib/site";
import { formatKES, formatUSD, packages } from "@/lib/packages";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { TrackedLink } from "@/components/TrackedLink";
import { BookCall } from "@/components/BookCall";

export const metadata: Metadata = {
  title: "Packages & Starting Prices",
  description:
    "Starting prices for weddings, destination weddings, safari weddings and corporate events in Kenya — in USD and KES. Every celebration is scoped to you.",
  alternates: { canonical: canonical("/packages") },
  keywords: [
    "Kenya wedding cost",
    "destination wedding Kenya price",
    "safari wedding Kenya",
    "wedding planner Nairobi prices",
    "Maasai Mara wedding package",
  ],
  openGraph: {
    title: "Packages & starting prices · Marit Events",
    description:
      "Clear starting points for weddings, destination celebrations and corporate events in Kenya.",
  },
};

export default function PackagesPage() {
  const base = siteConfig.url.replace(/\/$/, "");
  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Marit Events packages",
    url: canonical("/packages"),
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.tagline,
      areaServed: p.where,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: p.fromUSD,
        priceCurrency: "USD",
      },
      seller: { "@id": `${base}/#business` },
      itemOffered: { "@type": "Service", name: p.name },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }}
      />
      <section className="relative min-h-[60svh] overflow-hidden">
        <Image
          src={images.hero}
          alt="Marit Events reception styled under woven lights"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/65" />
        <div className="relative z-10 mx-auto flex min-h-[60svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Packages & starting prices"
              title="Clear starting points. Shaped around you."
              body="Typical total celebration budgets (décor, vendors and orchestration) so you can plan with confidence. Every proposal is scoped to your date, guests and place."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <article
                id={p.slug}
                className={`flex h-full flex-col border ${
                  p.featured ? "border-champagne/60" : "border-white/10"
                } bg-obsidian-soft`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} by Marit Events`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {p.featured ? (
                    <span className="absolute left-4 top-4 bg-champagne px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-obsidian">
                      Most requested
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                    {p.where}
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-ivory">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {p.tagline}
                  </p>
                  <p className="mt-6 font-display text-4xl text-ivory">
                    <span className="text-base text-taupe">from </span>
                    {formatUSD(p.fromUSD)}
                  </p>
                  <p className="mt-1 text-sm text-taupe">
                    ≈ {formatKES(p.fromKES)} · {p.guests}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm text-ivory/80">
                    {p.includes.map((line) => (
                      <li key={line} className="flex gap-3 leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    href={enquireHref({ type: p.enquiryType, location: p.location })}
                    source={`packages_${p.slug}`}
                    className={`mt-8 inline-block px-6 py-3 text-center text-[11px] uppercase tracking-[0.2em] transition ${
                      p.featured
                        ? "bg-champagne text-obsidian hover:bg-champagne-soft"
                        : "border border-ivory/30 text-ivory hover:border-champagne hover:text-champagne"
                    }`}
                  >
                    Enquire about {p.name}
                  </TrackedLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-taupe">
            KES figures are rounded guides, not live exchange rates. Prices
            depend on season, guest count and venue. Need advice only?{" "}
            <TrackedLink
              href="/consultation"
              source="packages_consultation"
              className="text-champagne underline-offset-4 hover:underline"
            >
              Consultation starts from KES 5,000
            </TrackedLink>
            .
          </p>
        </Reveal>
      </section>

      <BookCall
        eyebrow="Talk it through"
        title="Not sure which fits? Book a free 30-minute call."
      />

      <PageCloser
        title="Ready for a tailored proposal?"
        body="Share your date window, guest count and budget range. We'll recommend the right starting point — no obligation."
        primaryHref="/enquire"
        primaryLabel="Get a tailored proposal"
        secondaryHref="/destination/from-abroad"
        secondaryLabel="Planning from abroad?"
      />
    </div>
  );
}
