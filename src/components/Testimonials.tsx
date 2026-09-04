"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-obsidian/75" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-8 md:py-36">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            Words from the room
          </p>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.quote}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="mt-8 font-display text-3xl leading-snug text-ivory md:text-5xl"
          >
            “{item.quote}”
          </motion.blockquote>
        </AnimatePresence>
        <p className="mt-8 text-sm tracking-[0.12em] text-taupe">
          — {item.name}
          <span className="mx-2 text-champagne/60">·</span>
          {item.detail}
        </p>
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 transition-all ${
                i === active ? "w-8 bg-champagne" : "w-3 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsIntro() {
  return (
    <div className="sr-only">
      <SectionHeading title="Testimonials" />
    </div>
  );
}
