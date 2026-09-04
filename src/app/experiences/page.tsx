import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { canonical, enquireHref, maritExperience, processSteps } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "The Marit way — discover, design, orchestrate and experience celebrations without the chaos.",
  alternates: { canonical: canonical("/experiences") },
};

export default function ExperiencesPage() {
  return (
    <div>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src={images.receptionRustic}
          alt="Marit Events pavilion experience"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/65" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Experiences"
              title="Event experiences, beautifully orchestrated."
              body="Not a list of services — a way of working. We shape celebrations so you can be fully present for the moment."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              How we work
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-ivory md:text-5xl">
              You imagine it. We orchestrate everything.
            </h2>
          </Reveal>
          <div className="mt-16 space-y-0">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={0.06 * i}>
                <div className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[8rem_1fr_1.2fr] md:items-baseline md:gap-10">
                  <p className="font-display text-4xl text-champagne">
                    {step.number}
                  </p>
                  <h3 className="font-display text-3xl text-ivory">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-taupe md:text-lg">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              light
              eyebrow="The Marit Experience"
              title="A celebration without the chaos."
              body="Five principles behind every gathering we create."
            />
          </Reveal>
          <div className="mt-14 divide-y divide-obsidian/10 border-y border-obsidian/10 md:grid md:grid-cols-5 md:divide-x md:divide-y-0">
            {maritExperience.map((item, i) => (
              <Reveal key={item.number} delay={0.04 * i}>
                <div className="px-0 py-8 md:px-5 md:py-10 md:first:pl-0 md:last:pr-0">
                  <p className="text-[11px] tracking-[0.28em] text-champagne">
                    {item.number}
                  </p>
                  <h3 className="mt-5 font-display text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-obsidian/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link
              href={enquireHref()}
              className="inline-block bg-obsidian px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory"
            >
              Plan Your Event →
            </Link>
          </Reveal>
        </div>
      </section>

      <PageCloser />
    </div>
  );
}
