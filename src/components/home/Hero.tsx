"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/lib/images";
import { Logo } from "@/components/Logo";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden grain"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Marit Events pavilion reception with woven lighting and draped ceiling"
          fill
          priority
          className="object-cover object-[center_25%] img-kenburns"
          sizes="100vw"
        />
      </motion.div>
      <div className="editorial-gradient absolute inset-0" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 pt-28 md:px-8 md:pb-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo size="hero" href={null} priority />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-snug text-ivory/92"
          >
            Where extraordinary celebrations come to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/enquire"
              className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian transition duration-300 hover:bg-champagne-soft"
            >
              Plan Your Event
            </Link>
            <Link
              href="/weddings"
              className="border border-ivory/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory/90 transition duration-300 hover:border-champagne hover:text-champagne"
            >
              Explore Weddings
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {!reduce ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
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
