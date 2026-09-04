import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Guides to weddings in Kenya, destination celebrations and luxury event planning — from Marit Events.",
};

export default function JournalPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-16 md:px-8">
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

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={0.05 * i}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-champagne">
                  {post.category} · {post.readTime}
                </p>
                <h2 className="mt-3 font-display text-3xl text-ivory group-hover:text-champagne">
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
    </div>
  );
}
