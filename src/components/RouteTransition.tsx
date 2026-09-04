"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/**
 * Brief editorial veil on client navigations.
 * Skips the first paint (covered by Preloader) and reduced-motion.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
    setActive(true);
    const done = window.setTimeout(() => setActive(false), 720);
    return () => window.clearTimeout(done);
  }, [pathname, reduce]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    // Allow scroll — overlay is brief and non-blocking for a11y
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key={key}
          className="pointer-events-none fixed inset-0 z-[180] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          {/* Soft veil */}
          <motion.div
            className="absolute inset-0 bg-obsidian/88 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Horizontal wipe bars */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[42%] bg-obsidian"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[42%] bg-obsidian"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <Image
              src={siteConfig.logo}
              alt=""
              width={140}
              height={54}
              className="h-10 w-auto object-contain opacity-95"
            />
            <div className="h-px w-10 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-champagne"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: 1,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
