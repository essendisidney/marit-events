import { maritExperience, processSteps, siteConfig } from "@/lib/site";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";

export function BrandIntro() {
  return (
    <section className="bg-obsidian px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            The difference
          </p>
          <p className="mt-4 text-sm italic tracking-wide text-champagne/85 md:text-base">
            {siteConfig.slogan}
          </p>
          <div className="mt-6">
            <SectionHeading
              title="You imagine it. We orchestrate everything."
              body="From the first conversation to the final guest departure, Marit manages the details behind the scenes so you can be fully present for the moment."
            />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i}>
              <div className="relative pt-6">
                <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
                  <div className="gold-rule h-full w-full" />
                </div>
                <p className="text-[11px] tracking-[0.28em] text-champagne">
                  {step.number}
                </p>
                <h3 className="mt-5 font-display text-3xl text-ivory md:text-[2rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-taupe">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MaritExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-36">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-champagne/10 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            light
            eyebrow="The Marit Experience"
            title="A celebration without the chaos."
            body="This is our philosophy — the quiet standard behind every gathering we create."
          />
        </Reveal>

        <div className="mt-16 divide-y divide-obsidian/10 border-y border-obsidian/10 lg:grid lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {maritExperience.map((item, i) => (
            <Reveal key={item.number} delay={0.05 * i}>
              <article className="group px-0 py-8 transition duration-500 lg:px-5 lg:py-10 lg:first:pl-0 lg:last:pr-0">
                <p className="text-[11px] tracking-[0.28em] text-champagne">
                  {item.number}
                </p>
                <h3 className="mt-5 font-display text-3xl transition duration-500 group-hover:text-champagne">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-obsidian/60">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <ButtonLink href="/experiences" variant="ghost-dark">
            Explore experiences
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
