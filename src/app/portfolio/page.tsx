import type { Metadata } from "next";
import { portfolio } from "@/lib/portfolio";
import { Reveal, SectionHeading } from "@/components/ui";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Recently orchestrated celebrations by Marit Events — weddings, proposals, corporate and private gatherings in Kenya.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-10 md:px-8">
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

      <PortfolioGrid items={portfolio} />
    </div>
  );
}
