"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { enquireHref, testimonials } from "@/lib/site";
import { Reveal } from "@/components/ui";
import { trackCtaClick } from "@/lib/analytics";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const item = testimonials[active];
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.45;
  const bgDuration = reduceMotion ? 0 : 0.7;

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  useEffect(() => {
    if (!paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i + 1) % testimonials.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused]);

  function go(delta: number) {
    setActive((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (Math.abs(dx) < 48) return;
    go(dx < 0 ? 1 : -1);
  }

  const enquireType =
    item.detail.toLowerCase().includes("corporate")
      ? "Corporate Event"
      : item.detail.toLowerCase().includes("coast") ||
          item.detail.toLowerCase().includes("destination")
        ? "Destination Event"
        : "Wedding";

  return (
    <section
      className="relative overflow-hidden touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.image}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: bgDuration }}
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
          <h2 className="sr-only">Client reflections</h2>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.quote}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration }}
            className="mt-8 font-display text-3xl leading-snug text-ivory md:text-5xl"
            aria-live="polite"
          >
            “{item.quote}”
          </motion.blockquote>
        </AnimatePresence>
        <p className="mt-8 text-sm tracking-[0.12em] text-taupe">
          — {item.name}
          <span className="mx-2 text-champagne/60">·</span>
          {item.detail}
        </p>
        <Link
          href={enquireHref({ type: enquireType })}
          onClick={() =>
            trackCtaClick({
              path: "/",
              href: enquireHref({ type: enquireType }),
              source: "testimonials",
            })
          }
          className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-champagne transition hover:gap-4"
        >
          Begin your enquiry
          <span aria-hidden>→</span>
        </Link>
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-1.5 transition-all ${
                i === active
                  ? "w-8 bg-champagne"
                  : "w-3 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
