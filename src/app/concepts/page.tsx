import type { Metadata } from "next";
import Image from "next/image";
import { canonical, enquireHref } from "@/lib/site";
import { concepts, visionSteps } from "@/lib/concepts";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { TrackedLink } from "@/components/TrackedLink";

const enquire = enquireHref({ type: "Private Celebration" });

export const metadata: Metadata = {
  title: "Vision to Venue — Design Concepts",
  description:
    "Share your idea and Marit Events designs the concept — palette, backdrop, seating, cake and print — and shows you the room before you commit.",
  alternates: { canonical: canonical("/concepts") },
  keywords: [
    "event design concept Kenya",
    "wedding mood board Nairobi",
    "anniversary decor ideas Nairobi",
    "event visualisation Kenya",
  ],
  openGraph: {
    title: "Vision to Venue · Marit Events",
    description:
      "From your idea to a designed concept — see your celebration before you commit.",
  },
};

function ConceptBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-champagne/50 bg-obsidian/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-champagne backdrop-blur ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-champagne" />
      Concept visualisation
    </span>
  );
}

export default function ConceptsPage() {
  const [featured] = concepts;

  return (
    <div>
      <section className="relative min-h-[80svh] overflow-hidden">
        <Image
          src={featured.room.src}
          alt={featured.room.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/20" />
        <ConceptBadge className="absolute right-5 top-24 z-10 md:right-8 md:top-28" />
        <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Vision to Venue"
              title="See your celebration before you commit."
              body="Send us an idea — a screenshot, a TikTok, a feeling. We design the concept and show you the room, so you can say yes with confidence."
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={enquire}
                source="concepts_hero"
                className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
              >
                Share your vision
              </TrackedLink>
              <a
                href={`#${featured.slug}`}
                className="border border-ivory/35 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory transition hover:border-champagne hover:text-champagne"
              >
                See a concept
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From a spark of an idea to the finished room."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {visionSteps.map((step, i) => (
              <Reveal key={step.number} delay={0.05 * i}>
                <p className="text-[11px] tracking-[0.28em] text-champagne">
                  {step.number}
                </p>
                <h2 className="mt-4 font-display text-2xl text-ivory">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-taupe">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {concepts.map((concept) => (
        <section
          key={concept.slug}
          id={concept.slug}
          className="scroll-mt-24 border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                {concept.occasion} · {concept.setting}
              </p>
              <h2 className="mt-4 font-display text-4xl text-ivory md:text-6xl">
                {concept.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-taupe md:text-lg">
                {concept.brief}
              </p>
            </Reveal>

            <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <figure>
                  <div className="relative overflow-hidden border border-white/10">
                    <Image
                      src={concept.board.src}
                      alt={concept.board.alt}
                      width={concept.board.width}
                      height={concept.board.height}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <ConceptBadge className="absolute left-3 top-3" />
                  </div>
                  <figcaption className="mt-3 text-xs text-taupe">
                    The concept board — step two.
                  </figcaption>
                </figure>
              </Reveal>

              <div>
                <Reveal>
                  <figure>
                    <div className="relative overflow-hidden border border-white/10">
                      <Image
                        src={concept.room.src}
                        alt={concept.room.alt}
                        width={concept.room.width}
                        height={concept.room.height}
                        className="h-auto w-full"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <ConceptBadge className="absolute left-3 top-3" />
                    </div>
                    <figcaption className="mt-3 text-xs text-taupe">
                      The room, visualised — step three.
                    </figcaption>
                  </figure>
                </Reveal>

                <Reveal className="mt-12">
                  <h3 className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                    The details
                  </h3>
                  <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {concept.elements.map((el) => (
                      <div key={el.name} className="border-t border-white/10 pt-4">
                        <dt className="font-display text-xl text-ivory">
                          {el.name}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-taupe">
                          {el.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal className="mt-10">
                  <h3 className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                    Palette
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-5">
                    {concept.palette.map((c) => (
                      <li key={c.name} className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="h-9 w-9 rounded-full border border-white/20"
                          style={{ background: c.hex }}
                        />
                        <span className="text-sm text-ivory/80">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="px-5 py-20 md:px-8">
        <Reveal className="mx-auto max-w-3xl border-l border-champagne/40 pl-6 md:pl-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
            A note on what you&apos;re seeing
          </p>
          <p className="mt-4 text-base leading-relaxed text-taupe md:text-lg">
            Concepts are design visualisations we create for planning — they
            show how a celebration could look, not photographs of completed
            events. To see celebrations we have delivered, visit our{" "}
            <TrackedLink
              href="/portfolio"
              source="concepts_portfolio"
              className="text-champagne underline-offset-4 hover:underline"
            >
              portfolio
            </TrackedLink>
            .
          </p>
        </Reveal>
      </section>

      <PageCloser
        title="What are you imagining?"
        body="Send us your idea — anniversary, wedding, birthday or brand moment. We'll turn it into a concept you can see."
        primaryHref={enquire}
        primaryLabel="Share your vision"
        secondaryHref="/portfolio"
        secondaryLabel="See our real work"
      />
    </div>
  );
}
