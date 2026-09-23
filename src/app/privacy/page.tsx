import type { Metadata } from "next";
import Link from "next/link";
import { canonical, siteConfig } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Marit Events handles enquiry details you share with us — simply and honestly.",
  alternates: { canonical: canonical("/privacy") },
};

const sections = [
  {
    title: "What we collect",
    body: "When you enquire, we receive the details you choose to share — name, contact information, celebration type, location, date, guest count, budget band, vision notes and any optional file you attach (PDF or image). We also receive basic analytics about site visits (pages viewed, device type) via Vercel Analytics, without selling personal profiles.",
  },
  {
    title: "Why we use it",
    body: "Enquiry details are used only to reply to you, understand your celebration and plan next steps. We do not sell your information or use it for unrelated marketing lists.",
  },
  {
    title: "How we store it",
    body: `Messages reach us by email (${siteConfig.email}) and/or WhatsApp (${siteConfig.phone}). They are kept in the tools we already use to run Marit Events — not on a separate marketing database.`,
  },
  {
    title: "How long we keep it",
    body: "We keep enquiry conversations for as long as we need them to serve you and our business records, then delete or archive them in the ordinary course of work.",
  },
  {
    title: "Your choices",
    body: `Email or WhatsApp us anytime to ask what we hold, correct something, or request deletion of an enquiry that is no longer needed. We'll respond within a few business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Privacy"
              title="How we handle what you share."
              body="Short version: your enquiry stays with Marit Events so we can plan with you — nothing more."
            />
          </Reveal>

          <div className="mt-16 space-y-12">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={0.04 * i}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ivory md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-taupe">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 border-t border-white/10 pt-10">
            <p className="text-sm text-taupe">
              Questions?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ivory underline-offset-4 hover:text-champagne hover:underline"
              >
                {siteConfig.email}
              </a>
              {" · "}
              <Link
                href="/enquire"
                className="text-ivory underline-offset-4 hover:text-champagne hover:underline"
              >
                Plan your event
              </Link>
            </p>
            <p className="mt-6 text-xs tracking-[0.12em] text-taupe/60">
              Last updated {new Date().getFullYear()}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
