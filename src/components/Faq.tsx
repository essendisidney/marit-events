"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      className={`px-5 py-24 md:px-8 md:py-32 ${
        light ? "bg-ivory text-obsidian" : "bg-obsidian"
      }`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
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
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  id={buttonId}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
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
                {isOpen ? (
                  reduceMotion ? (
                    <div id={panelId} role="region" aria-labelledby={buttonId}>
                      <p
                        className={`pb-6 text-base leading-relaxed ${
                          light ? "text-obsidian/65" : "text-taupe"
                        }`}
                      >
                        {item.a}
                      </p>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
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
                    </AnimatePresence>
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
