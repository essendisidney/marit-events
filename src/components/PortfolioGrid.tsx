"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { enquireHref } from "@/lib/site";
import { Reveal } from "@/components/ui";
import { TrackedLink } from "@/components/TrackedLink";

const filters = [
  "All",
  "Wedding",
  "Corporate",
  "Proposal",
  "Private Celebration",
] as const;

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  return (
    <div>
      <div
        className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-10 md:px-8"
        role="group"
        aria-label="Portfolio filters"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition ${
              filter === f
                ? "border-champagne text-champagne"
                : "border-white/10 text-taupe hover:border-white/25 hover:text-ivory"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-28 md:grid-cols-2 md:px-8">
        {visible.map((item, i) => (
          <Reveal key={item.slug} delay={0.04 * i}>
            <Link href={`/portfolio/${item.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-taupe">
                    {item.location} · {item.category}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-ivory md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-ivory/70">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="px-5 pb-28 text-center md:px-8">
          <p className="text-taupe">No stories in this category yet.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="border border-champagne/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-champagne transition hover:bg-champagne hover:text-obsidian"
            >
              Show all
            </button>
            <TrackedLink
              href={enquireHref()}
              source="portfolio_empty"
              className="text-[11px] uppercase tracking-[0.16em] text-ivory link-underline"
            >
              Plan your event
            </TrackedLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
