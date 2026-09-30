"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);
  const reduceMotion = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Start at the real value so server HTML, crawlers and no-JS visitors see
  // "2h", not "0h". The count-up only replays once the stat scrolls into view.
  const [n, setN] = useState(target ?? 0);

  useEffect(() => {
    if (!shown || target === null || reduceMotion || target < 10) return;
    let frame = 0;
    const frames = 40;
    const id = window.setInterval(() => {
      frame += 1;
      setN(Math.round((target * frame) / frames));
      if (frame >= frames) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [shown, target, reduceMotion]);

  return (
    <p ref={ref} className="font-display text-5xl text-champagne md:text-6xl">
      {target !== null ? (
        <>
          {n}
          {suffix}
        </>
      ) : (
        value
      )}
    </p>
  );
}
