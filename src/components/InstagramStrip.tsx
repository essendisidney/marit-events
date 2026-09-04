import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui";

export function InstagramStrip() {
  return (
    <section className="border-y border-white/5 bg-obsidian-soft px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            Instagram
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl text-ivory md:text-5xl">
            Follow the craft behind the celebrations.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-champagne/50 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-obsidian"
          >
            @{siteConfig.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") || "maritevents"}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
      <Reveal className="mx-auto mt-10 max-w-7xl">
        <p className="text-sm text-taupe">
          Prefer WhatsApp?{" "}
          <Link href="/enquire" className="text-ivory underline-offset-4 hover:text-champagne hover:underline">
            Plan your event
          </Link>{" "}
          and we&apos;ll respond within 24 hours.
        </p>
      </Reveal>
    </section>
  );
}
