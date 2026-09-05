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

/** Once per session — progress eases to 100, then curtains part. */
const HOLD_MS = 1800;
const EXIT_MS = 700;

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

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
    const start = performance.now();
    let raf = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / HOLD_MS);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        exitTimer = window.setTimeout(() => {
          setShow(false);
          signalPreloaderDone();
        }, EXIT_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
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
          className="fixed inset-0 z-[200] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 42%, rgba(201,169,110,0.14), transparent 68%)",
            }}
          />

          {/* Curtain panels */}
          <motion.div
            className="absolute inset-x-0 top-0 z-0 h-[52%] bg-obsidian"
            initial={{ y: 0 }}
            animate={exiting ? { y: "-110%" } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-0 h-[52%] bg-obsidian"
            initial={{ y: 0 }}
            animate={exiting ? { y: "110%" } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Gold seam */}
          <motion.div
            className="absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-champagne"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              exiting
                ? {
                    scaleX: [0, 1, 1],
                    opacity: [0, 1, 0],
                    transition: { duration: 0.75, times: [0, 0.3, 1] },
                  }
                : { scaleX: 0, opacity: 0 }
            }
          />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6"
            animate={
              exiting
                ? { opacity: 0, scale: 1.03, filter: "blur(6px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.45 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={siteConfig.logo}
                alt=""
                width={240}
                height={92}
                priority
                className="h-[4.5rem] w-auto object-contain md:h-20"
              />
            </motion.div>

            <motion.p
              className="mt-8 max-w-sm text-center text-[10px] uppercase tracking-[0.28em] text-taupe md:tracking-[0.34em]"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: progress > 28 ? 1 : 0,
                y: progress > 28 ? 0 : 8,
              }}
              transition={{ duration: 0.55 }}
            >
              {siteConfig.slogan}
            </motion.p>

            <div className="mt-12 w-48 md:w-56">
              <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.24em] text-taupe/70">
                <span>Loading</span>
                <span className="tabular-nums text-champagne">
                  {String(progress).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3 h-px overflow-hidden bg-white/10">
                <div
                  className="h-full origin-left bg-gradient-to-r from-champagne/40 via-champagne to-champagne-soft transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
