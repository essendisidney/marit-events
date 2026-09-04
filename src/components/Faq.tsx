"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  title = "Questions, answered",
  light = false,
}: {
  items: FaqItem[];
  title?: string;
  light?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={`px-5 py-24 md:px-8 md:py-32 ${
        light ? "bg-ivory text-obsidian" : "bg-obsidian"
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className={`text-[11px] uppercase tracking-[0.28em] ${
            light ? "text-champagne" : "text-champagne"
          }`}
        >
          FAQ
        </p>
        <h2
          className={`mt-4 font-display text-3xl md:text-5xl ${
            light ? "text-obsidian" : "text-ivory"
          }`}
        >
          {title}
        </h2>
        <div className="mt-12 divide-y divide-current/10 border-y border-current/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-xl md:text-2xl ${
                      light ? "text-obsidian" : "text-ivory"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span className="text-champagne" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`pb-6 text-base leading-relaxed ${
                          light ? "text-obsidian/65" : "text-taupe"
                        }`}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
