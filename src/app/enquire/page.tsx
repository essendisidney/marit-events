import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Plan Your Event",
  description:
    "Tell Marit Events about your celebration. We'll be in touch within 24 hours.",
};

export default function EnquirePage() {
  return (
    <div>
      <section className="relative hidden min-h-[40svh] overflow-hidden md:block">
        <Image
          src={images.entranceDraped}
          alt="Marit Events draped celebration entrance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="relative z-10 mx-auto flex min-h-[40svh] max-w-7xl items-end px-5 pb-12 pt-28 md:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Enquire
            </p>
            <h1 className="mt-4 font-display text-4xl text-ivory md:text-6xl">
              Tell us about your celebration.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.2fr]">
          <Reveal>
            <div className="md:hidden">
              <SectionHeading
                eyebrow="Enquire"
                title="Tell us about your celebration."
                body="Share the essentials. We'll respond with care — and clarity — within 24 hours."
              />
            </div>
            <p className="hidden text-taupe md:block md:text-lg">
              Share the essentials. We&apos;ll respond with care — and clarity —
              within 24 hours.
            </p>
            <div className="mt-10 space-y-5 border-t border-white/10 pt-8 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-block text-ivory transition hover:text-champagne"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                  WhatsApp
                </p>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-ivory transition hover:text-champagne"
                >
                  Let&apos;s talk →
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                  Based in
                </p>
                <p className="mt-2 text-ivory">{siteConfig.location}</p>
              </div>
              <p className="pt-4 text-xs italic text-champagne/80">
                {siteConfig.slogan}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
