"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import {
  PRELOADER_SESSION_KEY,
  signalPreloaderDone,
} from "@/lib/preloader";

const SESSION_KEY = PRELOADER_SESSION_KEY;

const EASE = [0.22, 1, 0.36, 1] as const;
/** Rings settle, then the doors ease open onto the hero. */
const HOLD_MS = 2400;
const EXIT_MS = 1400;
/** Let the photograph show through before the hero type arrives. */
const REVEAL_PAGE_MS = 420;

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduce) {
      signalPreloaderDone();
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        signalPreloaderDone();
        return;
      }
    } catch {
      signalPreloaderDone();
      return;
    }

    setShow(true);
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, HOLD_MS);
    const revealTimer = window.setTimeout(
      () => signalPreloaderDone(),
      HOLD_MS + REVEAL_PAGE_MS
    );
    const hideTimer = window.setTimeout(() => setShow(false), HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className={`fixed inset-0 z-[200] overflow-hidden ${exiting ? "pointer-events-none" : ""}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          role="status"
          aria-live="polite"
          aria-label="Opening Marit Events"
        >
          <motion.div
            className="absolute inset-y-0 left-0 z-0 w-1/2 bg-obsidian will-change-transform"
            initial={{ x: 0 }}
            animate={exiting ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1], delay: exiting ? 0.12 : 0 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 z-0 w-1/2 bg-obsidian will-change-transform"
            initial={{ x: 0 }}
            animate={exiting ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1], delay: exiting ? 0.12 : 0 }}
          />

          <motion.div
            className="absolute inset-y-[18%] left-1/2 z-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne/80 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              exiting
                ? { scaleY: 1, opacity: [0, 0.9, 0] }
                : { scaleY: 0.35, opacity: 0.35 }
            }
            transition={{ duration: exiting ? 1.05 : 1.4, ease: EASE }}
          />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={
              exiting
                ? { opacity: 0, y: -18 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: exiting ? 0.55 : 0.8, ease: EASE }}
          >
            <div className="relative mb-7 h-16 w-36">
              <Ring side="left" />
              <Ring side="right" />
              <motion.span
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-champagne"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={exiting ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ delay: exiting ? 0 : 1.05, duration: 0.7, ease: EASE }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={exiting ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ delay: exiting ? 0 : 0.72, duration: 0.9, ease: EASE }}
              className="flex flex-col items-center"
            >
              <Image
                src={siteConfig.mark}
                alt=""
                width={172}
                height={100}
                priority
                className="h-12 w-auto object-contain md:h-14"
              />
              <p className="mt-4 font-display text-xl uppercase tracking-[0.22em] text-ivory md:text-2xl">
                {siteConfig.name}
              </p>
            </motion.div>

            <motion.p
              className="mt-5 font-display text-lg italic text-champagne md:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={exiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: exiting ? 0 : 1.15, duration: 0.8, ease: EASE }}
            >
              Two rings. One moment.
            </motion.p>

            <div className="mt-10 h-px w-40 overflow-hidden bg-white/10 md:w-48">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-transparent via-champagne to-champagne-soft"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: exiting ? 1 : 1 }}
                transition={{ duration: 2.15, ease: EASE, delay: 0.35 }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Ring({ side }: { side: "left" | "right" }) {
  const from = side === "left" ? -28 : 28;
  const to = side === "left" ? 14 : -14;

  return (
    <motion.svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      className="absolute top-0"
      style={{ left: side === "left" ? 0 : undefined, right: side === "right" ? 0 : undefined }}
      aria-hidden
      initial={{ x: from, opacity: 0 }}
      animate={{ x: to, opacity: 1 }}
      transition={{ duration: 1.55, ease: EASE }}
    >
      <motion.circle
        cx="36"
        cy="36"
        r="20"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1.1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease: EASE }}
      />
      <motion.circle
        cx="36"
        cy="36"
        r="24"
        fill="none"
        stroke="rgba(212,188,138,0.4)"
        strokeWidth="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.18, ease: EASE }}
      />
    </motion.svg>
  );
}
