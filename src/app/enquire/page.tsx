import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Plan Your Event",
  description:
    "Tell Marit Events about your celebration. We'll be in touch within 24 hours.",
};

export default function EnquirePage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Enquire"
              title="Tell us about your celebration."
              body="Share the essentials. We'll respond with care — and clarity — within 24 hours."
            />
            <div className="mt-10 space-y-4 text-sm text-taupe">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ivory hover:text-champagne"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ivory hover:text-champagne"
                >
                  Let&apos;s talk →
                </a>
              </p>
              <p>{siteConfig.location}</p>
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
