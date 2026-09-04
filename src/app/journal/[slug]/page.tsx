import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPost, journalPosts } from "@/lib/journal";
import { Reveal } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-24 md:pt-28">
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
            href="/enquire"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
          >
            Plan your celebration with Marit
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
