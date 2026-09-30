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

/** Bump this when the policy text changes — never derive it from the clock. */
const LAST_UPDATED = "30 September 2026";

const sections = [
  {
    title: "Who we are",
    body: `${siteConfig.name} (Nairobi, Kenya) is responsible for the personal data you share through this website. Contact us at ${siteConfig.email} or ${siteConfig.phone} for anything on this page.`,
  },
  {
    title: "What we collect",
    body: "When you enquire, we receive the details you choose to share — name, email, phone or WhatsApp number, celebration type, location, date, guest count, budget band, vision notes and any optional file you attach (PDF or image). We also receive anonymous, cookie-free visit statistics (pages viewed, device type, country) via Vercel Web Analytics. We do not use advertising cookies or tracking pixels.",
  },
  {
    title: "Why we use it",
    body: "Enquiry details are used only to reply to you, understand your celebration and plan next steps with you — the lawful basis is your consent and taking steps toward a contract at your request. We do not sell your information or add you to marketing lists.",
  },
  {
    title: "Who processes it for us",
    body: "Our website is hosted by Vercel; enquiry emails are delivered by Resend; date checks, where enabled, read our Google Calendar. These providers may process data outside Kenya, including in the United States, under their own security and data-protection commitments. Messages you send us by WhatsApp are handled by WhatsApp under its terms.",
  },
  {
    title: "How long we keep it",
    body: "We keep enquiry conversations while we are discussing or delivering your event, and for as long as our business and tax records require afterwards. Enquiries that do not proceed are deleted or archived within 24 months.",
  },
  {
    title: "Your rights",
    body: "Under Kenya's Data Protection Act, 2019 — and the EU and UK GDPR where they apply to you — you can ask what we hold about you, have it corrected or deleted, object to its use, or withdraw consent at any time. Email or WhatsApp us and we will respond within 14 days. If you are unhappy with our response, you can complain to Kenya's Office of the Data Protection Commissioner (odpc.go.ke) or your local data-protection authority.",
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
              Last updated {LAST_UPDATED}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
