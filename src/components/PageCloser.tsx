"use client";

import { usePathname } from "next/navigation";
import { ButtonLink, Reveal } from "@/components/ui";
import { enquireHref, enquireHrefForPath } from "@/lib/site";
import { trackCtaClick } from "@/lib/analytics";

type PageCloserProps = {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const byPath: Record<
  string,
  Required<
    Pick<
      PageCloserProps,
      | "title"
      | "body"
      | "primaryLabel"
      | "secondaryHref"
      | "secondaryLabel"
    >
  >
> = {
  "/": {
    title: "Ready for a celebration without the chaos?",
    body: "Tell us what you're imagining. We'll take it from there.",
    primaryLabel: "Plan Your Event",
    secondaryHref: "/weddings",
    secondaryLabel: "Explore Weddings",
  },
  "/experiences": {
    title: "Ready to feel the Marit difference?",
    body: "Start with a conversation — we'll map the experience from there.",
    primaryLabel: "Begin your enquiry",
    secondaryHref: "/portfolio",
    secondaryLabel: "See the work",
  },
  "/portfolio": {
    title: "Want a celebration like these?",
    body: "Share your date, place and vision — we'll orchestrate the rest.",
    primaryLabel: "Plan your event",
    secondaryHref: "/weddings",
    secondaryLabel: "Explore weddings",
  },
  "/journal": {
    title: "Planning a celebration in Kenya?",
    body: "Ask us anything — destinations, timelines, or how we work.",
    primaryLabel: "Talk to Marit",
    secondaryHref: "/destination",
    secondaryLabel: "Destination Kenya",
  },
  "/story": {
    title: "Ready to begin?",
    body: "Your story deserves quiet orchestration and unmistakable presence.",
    primaryLabel: "Plan your event",
    secondaryHref: "/portfolio",
    secondaryLabel: "View portfolio",
  },
};

export function PageCloser({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageCloserProps) {
  const pathname = usePathname();
  const base = pathname.split("/").slice(0, 2).join("/") || "/";
  const preset = byPath[pathname] || byPath[base];

  const resolvedPrimary =
    primaryHref ?? enquireHrefForPath(pathname) ?? enquireHref();
  const resolvedTitle =
    title ?? preset?.title ?? "Ready for a celebration without the chaos?";
  const resolvedBody =
    body ??
    preset?.body ??
    "Tell us what you're imagining. We'll take it from there.";
  const resolvedPrimaryLabel =
    primaryLabel ?? preset?.primaryLabel ?? "Plan Your Event";
  const resolvedSecondaryHref =
    secondaryHref ?? preset?.secondaryHref ?? "/destination";
  const resolvedSecondaryLabel =
    secondaryLabel ?? preset?.secondaryLabel ?? "Destination Kenya";

  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[min(80%,40rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">
            {resolvedTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-obsidian/65">
            {resolvedBody}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href={resolvedPrimary}
              variant="solid-dark"
              onClick={() =>
                trackCtaClick({
                  path: pathname,
                  href: resolvedPrimary,
                  source: "page_closer",
                })
              }
            >
              {resolvedPrimaryLabel}
            </ButtonLink>
            {resolvedSecondaryHref ? (
              <ButtonLink
                href={resolvedSecondaryHref}
                variant="ghost-dark"
                onClick={() =>
                  trackCtaClick({
                    path: pathname,
                    href: resolvedSecondaryHref,
                    source: "page_closer_secondary",
                  })
                }
              >
                {resolvedSecondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
