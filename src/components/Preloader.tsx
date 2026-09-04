"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

const SESSION_KEY = "marit-preloader-seen";

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* ignore */
    }
    setShow(true);
    const done = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2200);
    return () => window.clearTimeout(done);
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Image
              src={siteConfig.logo}
              alt=""
              width={220}
              height={84}
              priority
              className="h-16 w-auto object-contain md:h-20"
            />
          </motion.div>
          <motion.div
            className="mt-10 h-px origin-center bg-champagne"
            initial={{ scaleX: 0, width: 64 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="mt-6 text-[10px] uppercase tracking-[0.32em] text-taupe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {siteConfig.slogan}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
