"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { enquireHrefForPath, moreNav, primaryNav, siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { trackCtaClick } from "@/lib/analytics";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const allMobile = [...primaryNav, ...moreNav];
  const enquire = enquireHrefForPath(pathname);
  const moreActive = moreNav.some(
    (l) => pathname === l.href || pathname.startsWith(`${l.href}/`)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!moreOpen && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (moreOpen) {
        setMoreOpen(false);
        moreBtnRef.current?.focus();
      } else if (open) {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen, open]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const linkClass = (active: boolean) =>
    `link-underline text-[11px] uppercase tracking-[0.18em] transition-colors ${
      active ? "text-champagne" : "text-ivory/65 hover:text-ivory"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-obsidian/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.75rem] md:px-8">
        <Logo size="nav" priority />

        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(active)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="relative" ref={moreRef}>
            <button
              ref={moreBtnRef}
              type="button"
              className={linkClass(moreActive || moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
            </button>
            <AnimatePresence>
              {moreOpen ? (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-4 min-w-[11rem] border border-white/10 bg-obsidian/95 p-3 backdrop-blur-md"
                >
                  {moreNav.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2.5 text-[11px] uppercase tracking-[0.16em] transition ${
                          active
                            ? "text-champagne"
                            : "text-ivory/70 hover:text-ivory"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={enquire}
            onClick={() =>
              trackCtaClick({
                path: pathname,
                href: enquire,
                source: "navbar_desktop",
              })
            }
            className="hidden border border-champagne/55 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-champagne transition duration-300 hover:bg-champagne hover:text-obsidian sm:inline-block"
          >
            Plan Your Event
          </Link>
          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full origin-center bg-ivory transition duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full origin-center bg-ivory transition duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-obsidian lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-8 pb-16 pt-28">
              <nav className="flex flex-col gap-5" aria-label="Mobile">
                {allMobile.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-[2.5rem] leading-none text-ivory"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="mb-8">
                  <Logo size="footer" href={null} />
                </div>
                <Link
                  href={enquire}
                  onClick={() =>
                    trackCtaClick({
                      path: pathname,
                      href: enquire,
                      source: "navbar_mobile",
                    })
                  }
                  className="inline-block bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian"
                >
                  Plan Your Event
                </Link>
                <p className="mt-6 text-xs tracking-[0.12em] text-taupe">
                  {siteConfig.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
