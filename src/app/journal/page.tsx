import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";
import { canonical } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Guides to weddings in Kenya, destination celebrations and luxury event planning — from Marit Events.",
  alternates: { canonical: canonical("/journal") },
};

export default function JournalPage() {
  const [featured, ...rest] = journalPosts;

  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Journal"
              title="For anyone dreaming of celebrating in Kenya."
              body="Editorial guides for destination weddings, Nairobi venues and planning from abroad — written to help international guests discover and trust Marit."
            />
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/journal/${featured.slug}`}
              className="group mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-2"
            >
              <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[28rem]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center border border-t-0 border-white/10 bg-obsidian-soft p-8 lg:border-l-0 lg:border-t lg:p-12">
                <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">
                  Featured · {featured.category} · {featured.readTime}
                </p>
                <h2 className="mt-4 font-display text-3xl text-ivory transition group-hover:text-champagne md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-taupe">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-champagne">
                  Read article
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={0.05 * i}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-champagne">
                  {post.category} · {post.readTime}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ivory transition group-hover:text-champagne md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-taupe">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCloser
        title="Planning a celebration in Kenya?"
        secondaryHref="/destination"
        secondaryLabel="Destination Kenya"
      />
    </div>
  );
}
