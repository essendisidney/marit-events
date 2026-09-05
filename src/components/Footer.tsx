"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  enquireHrefForPath,
  moreNav,
  navLinks,
  siteConfig,
  whatsappMessageForPath,
  whatsappUrl,
} from "@/lib/site";
import { Logo } from "@/components/Logo";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";

export function Footer() {
  const pathname = usePathname();
  const enquire = enquireHrefForPath(pathname);

  return (
    <footer
      className={`border-t border-white/5 bg-obsidian md:pb-0 ${
        pathname === "/enquire"
          ? "pb-6"
          : "pb-[calc(5rem+env(safe-area-inset-bottom))]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <p className="font-display text-4xl leading-[1.08] text-ivory md:text-6xl">
            Let&apos;s create something
            <br className="hidden sm:block" /> worth remembering.
          </p>
          <Link
            href={enquire}
            onClick={() =>
              trackCtaClick({ path: pathname, href: enquire, source: "footer" })
            }
            className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne transition duration-300 hover:gap-5"
          >
            Plan your event
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3">
          <div>
            <Logo size="footer" />
            <p className="mt-4 text-sm text-taupe">{siteConfig.location}</p>
            <p className="mt-1 text-sm italic text-taupe/80">
              {siteConfig.slogan}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks
              .filter((l) =>
                ["Experiences", "Weddings", "Corporate", "Destination"].includes(
                  l.label
                )
              )
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ivory/70 transition hover:text-champagne"
                >
                  {link.label}
                </Link>
              ))}
            {moreNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ivory/70 transition hover:text-champagne"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ivory/70 transition hover:text-champagne"
            >
              Instagram
            </a>
            <a
              href={whatsappUrl(whatsappMessageForPath(pathname))}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick({ path: pathname })}
              className="text-sm text-ivory/70 transition hover:text-champagne"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="text-sm text-ivory/70 transition hover:text-champagne"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-ivory/70 transition hover:text-champagne"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <p className="mt-16 text-xs tracking-[0.12em] text-taupe/60">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
