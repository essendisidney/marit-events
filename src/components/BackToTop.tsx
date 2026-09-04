"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduce ? "auto" : "smooth",
            })
          }
          className="fixed bottom-24 left-5 z-40 hidden border border-white/15 bg-obsidian/90 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-taupe backdrop-blur transition hover:border-champagne hover:text-champagne md:bottom-8 md:block"
          aria-label="Back to top"
        >
          Top ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
