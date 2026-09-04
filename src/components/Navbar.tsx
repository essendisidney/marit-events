"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-champagne" : "text-ivory/65 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/enquire"
            className="hidden border border-champagne/55 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-champagne transition duration-300 hover:bg-champagne hover:text-obsidian sm:inline-block"
          >
            Plan Your Event
          </Link>
          <button
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-[2.75rem] leading-none text-ivory"
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
                  <Logo size="footer" href={undefined} />
                </div>
                <Link
                  href="/enquire"
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
