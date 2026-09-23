import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  canonical,
  enquireHref,
  siteConfig,
} from "@/lib/site";
import { downloadCatalog } from "@/lib/downloads";
import { Reveal, SectionHeading } from "@/components/ui";
import { PageCloser } from "@/components/PageCloser";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download Marit Events capability documents — company profile and planning resources.",
  alternates: { canonical: canonical("/downloads") },
};

function availableDownloads() {
  return downloadCatalog.filter((item) =>
    existsSync(join(process.cwd(), "public", item.publicPath))
  );
}

export default function DownloadsPage() {
  const files = availableDownloads();
  const enquire = enquireHref();

  return (
    <div>
      <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Downloads"
              title="Documents you can take with you."
              body="Capability overview and planning resources — download instantly, or enquire if you need something tailored."
            />
          </Reveal>

          <div className="mt-16 space-y-6">
            {files.length > 0 ? (
              files.map((item, i) => (
                <Reveal key={item.id} delay={0.04 * i}>
                  <div className="border border-white/10 bg-obsidian-soft px-6 py-8 md:px-8">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                      PDF
                    </p>
                    <h2 className="mt-3 font-display text-2xl text-ivory md:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-taupe">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      download={item.filename}
                      className="mt-8 inline-flex items-center gap-3 bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
                    >
                      Download
                      <span aria-hidden>↓</span>
                    </a>
                  </div>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <div className="border border-white/10 px-6 py-10 md:px-8">
                  <p className="text-base leading-relaxed text-taupe">
                    The company profile PDF is being prepared for this page.
                    Meanwhile, tell us what you need — we&apos;ll send the right
                    document within {siteConfig.responseWindow}.
                  </p>
                  <TrackedLink
                    href={enquire}
                    source="downloads_empty"
                    className="mt-8 inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
                  >
                    Request documents
                  </TrackedLink>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <PageCloser
        title="Prefer a conversation?"
        body="Share your celebration brief — we'll reply with a clear next step."
        primaryHref={enquire}
        primaryLabel="Plan your event"
        secondaryHref="/consultation"
        secondaryLabel="Book a consultation"
      />
    </div>
  );
}
