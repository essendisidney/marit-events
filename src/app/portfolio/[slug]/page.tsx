import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioItem, portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

export default async function PortfolioCasePage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const blocks = [
    { label: "The Brief", body: item.brief },
    { label: "The Experience", body: item.experience },
    { label: "The Details", body: item.details },
    { label: "The Result", body: item.result },
  ];

  return (
    <article>
      <section className="relative min-h-[80svh] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />
        <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
              {item.location} · {item.year}
            </p>
            <h1 className="mt-4 font-display text-5xl text-ivory md:text-7xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ivory/75">{item.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={0.05 * i} className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              {block.label}
            </p>
            <p className="mt-4 text-xl leading-relaxed text-ivory/85 md:text-2xl font-display">
              {block.body}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-24 md:grid-cols-3 md:px-8">
        {item.gallery.map((src, i) => (
          <Reveal key={src} delay={0.05 * i}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={src}
                alt={`${item.title} detail ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-white/5 px-5 py-16 text-center md:px-8">
        <Link
          href="/enquire"
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
        >
          Create your own story with Marit
          <span aria-hidden>→</span>
        </Link>
      </section>
    </article>
  );
}
