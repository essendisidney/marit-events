import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/lib/portfolio";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Recently orchestrated celebrations by Marit Events — weddings, proposals, corporate and private gatherings in Kenya.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="Recently orchestrated."
              body="Real celebrations by Marit — each one a story of vision, curation and calm execution."
            />
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {portfolio.map((item, i) => (
            <Reveal key={item.slug} delay={0.05 * i}>
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
      </section>
    </div>
  );
}
