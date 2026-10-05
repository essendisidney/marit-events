import { siteConfig, whatsappUrl } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";
import { NairobiTime } from "@/components/NairobiTime";
import { TrackedWhatsApp } from "@/components/TrackedLink";

/** Hosts allowed in the CSP frame-src (see next.config.ts). */
const EMBEDDABLE = /^https:\/\/(cal\.com|app\.cal\.com|calendly\.com)\//;

/**
 * "Book a video call" block. Embeds the Cal.com / Calendly page from
 * NEXT_PUBLIC_BOOKING_URL; without it, falls back to a WhatsApp request so
 * the section still converts.
 */
export function BookCall({
  eyebrow = "Meet us on video",
  title = "Book a free 30-minute introduction call.",
  body = "Pick a time that suits you, wherever you are. We'll talk through your date window, guests and the feeling you want — no obligation.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const url = siteConfig.bookingUrl;
  const embeddable = EMBEDDABLE.test(url);

  return (
    <section
      id="book-a-call"
      className="border-y border-white/5 bg-obsidian-soft px-5 py-24 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
          <NairobiTime className="mt-6" />
        </Reveal>
        <Reveal className="mt-12">
          {embeddable ? (
            <div className="overflow-hidden border border-white/10 bg-ivory">
              <iframe
                src={url}
                title="Book a video call with Marit Events"
                loading="lazy"
                className="h-[720px] w-full"
              />
            </div>
          ) : url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
            >
              Choose a call time
            </a>
          ) : (
            <TrackedWhatsApp
              href={whatsappUrl(
                "Hello Marit — I'd like to book a video call to plan a celebration. My time zone is: "
              )}
              className="inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne-soft"
            >
              Request a video call on WhatsApp
            </TrackedWhatsApp>
          )}
        </Reveal>
      </div>
    </section>
  );
}
