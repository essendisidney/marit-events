"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import {
  PRELOADER_SESSION_KEY,
  signalPreloaderDone,
} from "@/lib/preloader";

/** Hold on the rings, then part the doors onto the hero. */
const HOLD_MS = 2200;
const EXIT_MS = 1400;
const REVEAL_PAGE_MS = 360;

function liftVeil() {
  document.documentElement.classList.remove("marit-intro");
}

/**
 * First visit of a tab: two rings meet, then the panels open onto the page.
 * Later navigations in the same tab skip it.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (reduce === null || started.current) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
    } catch {
      seen = true;
    }

    if (seen) {
      liftVeil();
      signalPreloaderDone();
      setShow(false);
      return;
    }

    started.current = true;
    setShow(true);

    const hold = reduce ? 900 : HOLD_MS;
    const exit = reduce ? 420 : EXIT_MS;

    const exitTimer = window.setTimeout(() => {
      liftVeil();
      setExiting(true);
      try {
        sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {
        /* private mode */
      }
    }, hold);

    const revealTimer = window.setTimeout(signalPreloaderDone, hold + (reduce ? 80 : REVEAL_PAGE_MS));

    const hideTimer = window.setTimeout(() => {
      liftVeil();
      setShow(false);
    }, hold + exit);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
      try {
        if (sessionStorage.getItem(PRELOADER_SESSION_KEY) !== "1") {
          started.current = false;
        }
      } catch {
        started.current = false;
      }
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Opening Marit Events"
          aria-live="polite"
          className={`pointer-events-auto fixed inset-0 z-[200] ${exiting ? "" : "bg-obsidian"}`}
          initial={false}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{
            duration: exiting ? 0.35 : 0,
            delay: exiting ? EXIT_MS / 1000 - 0.28 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ pointerEvents: exiting ? "none" : "auto" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-obsidian"
            initial={false}
            animate={{ x: exiting ? "-100%" : "0%" }}
            transition={{
              duration: exiting ? EXIT_MS / 1000 : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-obsidian"
            initial={false}
            animate={{ x: exiting ? "100%" : "0%" }}
            transition={{
              duration: exiting ? EXIT_MS / 1000 : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex flex-col items-center"
              initial={false}
              animate={
                exiting
                  ? { opacity: 0, scale: 0.94, y: -8 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{
                duration: exiting ? 0.4 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-32 w-44" aria-hidden>
                <motion.svg
                  viewBox="0 0 120 120"
                  className="absolute left-0 top-1 h-28 w-28"
                  initial={{ x: -36, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="42"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="1.25"
                  />
                </motion.svg>
                <motion.svg
                  viewBox="0 0 120 120"
                  className="absolute right-0 top-1 h-28 w-28"
                  initial={{ x: 36, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="42"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="1.25"
                  />
                </motion.svg>
                <motion.span
                  className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-champagne"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <motion.div
                className="-mt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={siteConfig.mark}
                  alt=""
                  width={172}
                  height={100}
                  priority
                  className="h-14 w-auto"
                />
              </motion.div>
              <motion.p
                className="mt-3 font-display text-sm italic tracking-wide text-champagne-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                Two rings. One moment.
              </motion.p>
              <motion.span
                className="mt-5 block h-px w-16 origin-center bg-champagne/80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
