import type { Metadata } from "next";
import Image from "next/image";
import {
  canonical,
  enquireHref,
  founderApproach,
  founderCredentials,
  founderExpectations,
  founderFocusAreas,
  siteConfig,
  storyPillars,
} from "@/lib/site";
import { images, marit } from "@/lib/images";
import { IndexCard, Reveal, SectionHeading } from "@/components/ui";
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

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Meet the Founder"
              title="Rose Kimonge"
              body="Event & Operations Consultant — I bring structure to moving parts, coordinate the people behind the work, and help important projects move from intention to execution."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-3xl border-l border-champagne/40 pl-6 md:pl-10">
            <p className="font-display text-2xl leading-snug text-ivory md:text-3xl">
              <span className="text-champagne">“</span>With over seven years
              of experience supporting executives, coordinating projects and
              events, and managing stakeholders and suppliers, I keep complex
              assignments moving under pressure — identifying what needs to
              happen, who needs to make it happen, and following through
              until the work is done.<span className="text-champagne">”</span>
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {founderFocusAreas.map((area, i) => (
              <IndexCard
                key={area.title}
                index={i + 1}
                title={area.title}
                body={area.body}
                delay={0.05 * i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              My approach
            </p>
          </Reveal>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10 sm:grid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
            {founderApproach.map((step, i) => (
              <Reveal key={step.title} delay={0.05 * i}>
                <article className="group py-8 sm:px-5 sm:py-10 lg:first:pl-0 lg:last:pr-0">
                  <p className="text-[11px] tracking-[0.28em] text-champagne">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-ivory transition duration-500 group-hover:text-champagne">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Experience
            </p>
            <p className="mt-6 leading-relaxed text-taupe">
              At Marit Events, I have coordinated weddings, corporate
              luncheons and stakeholder events — managing vendors, logistics,
              budgets, timelines, rehearsals and event-day execution.
            </p>
            <p className="mt-4 leading-relaxed text-taupe">
              Previously, as Executive Assistant to a CEO, I supported
              high-level meetings, conferences and projects while coordinating
              multiple priorities and external contacts, and coordinated
              decoration arrangements for prominent family weddings. I have
              also led a project event in Machakos that brought together more
              than 200 young people, managing external stakeholders and
              communication throughout.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              What to expect
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {founderExpectations.map((item) => (
                <span
                  key={item}
                  className="border border-white/15 px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] text-taupe transition duration-300 hover:border-champagne/50 hover:text-ivory"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="gold-rule mt-10 h-px w-16" />
            <p className="mt-5 text-sm leading-relaxed text-taupe/70">
              {founderCredentials.join(" · ")}
            </p>
          </Reveal>
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
