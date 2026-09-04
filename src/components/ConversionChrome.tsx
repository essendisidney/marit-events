"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  enquireHrefForPath,
  whatsappMessageForPath,
  whatsappUrl,
} from "@/lib/site";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname === "/enquire") return null;

  return (
    <a
      href={whatsappUrl(whatsappMessageForPath(pathname))}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Marit Events on WhatsApp"
      onClick={() => trackWhatsAppClick({ path: pathname })}
      className="fixed bottom-8 right-6 z-40 hidden items-center gap-2 border border-champagne/40 bg-obsidian/85 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-champagne shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-champagne hover:bg-champagne hover:text-obsidian md:flex"
    >
      Let&apos;s talk
      <span aria-hidden>→</span>
    </a>
  );
}

export function MobileStickyBar() {
  const pathname = usePathname();
  if (pathname === "/enquire") return null;
  const enquire = enquireHrefForPath(pathname);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-obsidian/95 backdrop-blur-md md:hidden safe-pb">
      <Link
        href={enquire}
        onClick={() =>
          trackCtaClick({ path: pathname, href: enquire, source: "mobile_bar" })
        }
        className="border-r border-white/10 py-3.5 text-center text-[11px] uppercase tracking-[0.18em] text-champagne active:bg-white/5"
      >
        Enquire
      </Link>
      <a
        href={whatsappUrl(whatsappMessageForPath(pathname))}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Marit Events on WhatsApp"
        onClick={() => trackWhatsAppClick({ path: pathname })}
        className="py-3.5 text-center text-[11px] uppercase tracking-[0.18em] text-ivory active:bg-white/5"
      >
        WhatsApp
      </a>
    </div>
  );
}
