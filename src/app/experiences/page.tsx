import type { Metadata } from "next";
import Link from "next/link";
import { maritExperience, processSteps } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "The Marit way — discover, design, orchestrate and experience celebrations without the chaos.",
};

export default function ExperiencesPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Experiences"
              title="Event experiences, beautifully orchestrated."
              body="Not a list of services — a way of working. We shape celebrations so you can be fully present for the moment."
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-obsidian-soft px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i}>
              <p className="text-[11px] tracking-[0.28em] text-champagne">
                {step.number} — {step.title.toUpperCase()}
              </p>
              <p className="mt-4 text-taupe">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              light
              eyebrow="The Marit Experience"
              title="A celebration without the chaos."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {maritExperience.map((item, i) => (
              <Reveal key={item.number} delay={0.05 * i}>
                <div className="border-t border-obsidian/15 pt-6">
                  <p className="text-[11px] tracking-[0.28em] text-champagne">
                    {item.number}
                  </p>
                  <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                  <p className="mt-3 text-obsidian/65">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Link
              href="/enquire"
              className="inline-block bg-obsidian px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory"
            >
              Plan Your Event →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
