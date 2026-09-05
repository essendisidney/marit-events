"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/lib/images";
import { Logo } from "@/components/Logo";
import { trackCtaClick } from "@/lib/analytics";
import { usePreloaderReady } from "@/lib/preloader";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const introReady = usePreloaderReady();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const enter = introReady && !reduce;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden grain"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Marit Events pavilion reception with woven lighting and draped ceiling"
          fill
          priority
          className="object-cover object-[center_25%]"
          sizes="100vw"
        />
      </motion.div>
      <div className="editorial-gradient absolute inset-0" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 pt-28 md:px-8 md:pb-32"
      >
        <div
          key={introReady ? "hero-ready" : "hero-wait"}
          className="mx-auto w-full max-w-7xl"
        >
          <motion.div
            initial={enter ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo size="hero" href={null} priority />
          </motion.div>

          <motion.h1
            initial={enter ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-snug text-ivory/92"
          >
            Where extraordinary celebrations come to life.
          </motion.h1>

          <motion.div
            initial={enter ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/enquire"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: "/enquire",
                  source: "hero_primary",
                })
              }
              className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition duration-300 hover:bg-champagne-soft"
            >
              Plan Your Event
            </Link>
            <Link
              href="/weddings"
              onClick={() =>
                trackCtaClick({
                  path: "/",
                  href: "/weddings",
                  source: "hero_secondary",
                })
              }
              className="border border-ivory/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory/90 transition duration-300 hover:border-champagne hover:text-champagne"
            >
              Explore Weddings
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {enter ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          aria-hidden
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-taupe/60">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-champagne/80 to-transparent"
          />
        </motion.div>
      ) : null}
    </section>
  );
}
