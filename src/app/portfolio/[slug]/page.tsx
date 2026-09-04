import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioItem, portfolio } from "@/lib/portfolio";
import { enquireHref } from "@/lib/site";
import { Reveal } from "@/components/ui";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { PageCloser } from "@/components/PageCloser";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      images: [{ url: item.image }],
    },
  };
}

export default async function PortfolioCasePage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const index = portfolio.findIndex((p) => p.slug === slug);
  const prev = portfolio[(index - 1 + portfolio.length) % portfolio.length];
  const next = portfolio[(index + 1) % portfolio.length];

  const blocks = [
    { label: "The Brief", body: item.brief },
    { label: "The Experience", body: item.experience },
    { label: "The Details", body: item.details },
    { label: "The Result", body: item.result },
  ];

  return (
    <article>
      <section className="relative min-h-[85svh] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/25" />
        <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
              {item.category} · {item.location} · {item.year}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ivory/75">{item.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 h-px w-16 bg-champagne/70" />
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={0.05 * i} className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              {block.label}
            </p>
            <p className="mt-4 font-display text-xl leading-relaxed text-ivory/85 md:text-2xl">
              {block.body}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="mb-8 text-[11px] uppercase tracking-[0.28em] text-champagne">
              The Gallery
            </p>
          </Reveal>
        </div>
        <GalleryLightbox images={item.gallery} title={item.title} />
      </section>

      <section className="border-t border-white/5 px-5 py-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group max-w-xs text-left"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-taupe">
              Previous
            </p>
            <p className="mt-2 font-display text-2xl text-ivory transition group-hover:text-champagne">
              {prev.title}
            </p>
          </Link>
          <Link
            href={enquireHref({
              type:
                item.category === "Corporate"
                  ? "Corporate Event"
                  : item.category === "Wedding"
                    ? "Wedding"
                    : item.category === "Private Celebration"
                      ? "Private Celebration"
                      : "Other",
              location: item.location,
            })}
            className="inline-flex items-center justify-center gap-3 border border-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-obsidian"
          >
            Plan your event
          </Link>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group max-w-xs text-right md:ml-auto"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-taupe">
              Next
            </p>
            <p className="mt-2 font-display text-2xl text-ivory transition group-hover:text-champagne">
              {next.title}
            </p>
          </Link>
        </div>
      </section>

      <PageCloser
        title="Inspired by this celebration?"
        body="Tell us what you're imagining — we'll orchestrate the rest."
        primaryHref={enquireHref({
          type:
            item.category === "Corporate"
              ? "Corporate Event"
              : item.category === "Wedding"
                ? "Wedding"
                : item.category === "Private Celebration"
                  ? "Private Celebration"
                  : "Other",
          location: item.location,
        })}
        primaryLabel="Plan your event"
        secondaryHref="/portfolio"
        secondaryLabel="More from the portfolio"
      />
    </article>
  );
}
