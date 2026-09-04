"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0.6 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.15, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="mb-5 flex items-center gap-4">
          <span
            className="hidden h-px w-8 bg-champagne sm:block"
            aria-hidden
          />
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2
        className={`font-display text-4xl leading-[1.08] text-balance md:text-5xl lg:text-[3.5rem] ${
          light ? "text-obsidian" : "text-ivory"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${
            light ? "text-obsidian/65" : "text-taupe"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "ghost-dark" | "solid-dark";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-champagne text-obsidian hover:bg-champagne-soft",
    secondary:
      "border border-ivory/35 text-ivory hover:border-champagne hover:text-champagne",
    "solid-dark":
      "bg-obsidian text-ivory hover:bg-obsidian/90",
    ghost:
      "text-champagne hover:gap-5",
    "ghost-dark":
      "text-obsidian hover:gap-5",
  } as const;

  const isGhost = variant === "ghost" || variant === "ghost-dark";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
        isGhost ? "" : "px-7 py-3.5"
      } ${styles[variant]} ${className}`}
    >
      {children}
      {isGhost ? <span aria-hidden>→</span> : null}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5 ${
        light ? "text-obsidian" : "text-champagne"
      }`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
