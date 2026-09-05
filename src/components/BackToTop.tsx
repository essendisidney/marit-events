"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const onEnquire = pathname === "/enquire";

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
          className={`fixed left-5 z-40 border border-white/15 bg-obsidian/90 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-taupe backdrop-blur transition hover:border-champagne hover:text-champagne md:bottom-8 ${
            onEnquire
              ? "bottom-28 md:bottom-8"
              : "bottom-[calc(5.25rem+env(safe-area-inset-bottom))] md:bottom-8"
          }`}
          aria-label="Back to top"
        >
          Top ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
