import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getJournalPost,
  getRelatedJournalPosts,
  journalPosts,
} from "@/lib/journal";
import { canonical, enquireHref, enquireTypeForJournalCategory, siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonical(`/journal/${slug}`) },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const related = getRelatedJournalPosts(slug);
  const enquireType = enquireTypeForJournalCategory(post.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith("http")
      ? post.image
      : `${siteConfig.url}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <article className="pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
            {post.category} · {post.readTime}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-taupe">{post.excerpt}</p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-12 aspect-[21/9] max-w-6xl overflow-hidden px-5 md:px-8">
        <div className="relative h-full min-h-[240px] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        {post.content.map((paragraph, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <p className="mb-6 text-lg leading-relaxed text-ivory/85">
              {paragraph}
            </p>
          </Reveal>
        ))}
        <Reveal className="mt-12 border-t border-white/10 pt-10">
          <Link
            href={enquireHref({ type: enquireType })}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
          >
            Plan your celebration with Marit
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-white/5 bg-obsidian-soft px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                Continue reading
              </p>
              <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
                Related from the journal
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={0.06 * i}>
                  <Link href={`/journal/${item.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-champagne">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ivory transition group-hover:text-champagne">
                      {item.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageCloser
        title="Ready to plan your celebration?"
        body="Tell us what you're imagining — we'll orchestrate the rest."
        primaryHref={enquireHref({ type: enquireType })}
        primaryLabel="Plan your event"
      />
    </article>
  );
}
