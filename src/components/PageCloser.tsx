"use client";

import { ButtonLink, Reveal } from "@/components/ui";

type PageCloserProps = {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageCloser({
  title = "Ready for a celebration without the chaos?",
  body = "Tell us what you're imagining. We'll take it from there.",
  primaryHref = "/enquire",
  primaryLabel = "Plan Your Event",
  secondaryHref = "/destination",
  secondaryLabel = "Destination Kenya",
}: PageCloserProps) {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[min(80%,40rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-obsidian/65">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={primaryHref} variant="solid-dark">
              {primaryLabel}
            </ButtonLink>
            {secondaryHref ? (
              <ButtonLink href={secondaryHref} variant="ghost-dark">
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
