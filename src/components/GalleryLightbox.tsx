"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function GalleryLightbox({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (index === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight")
        setIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setIndex((i) =>
          i === null ? 0 : (i - 1 + images.length) % images.length
        );
      if (e.key === "Tab" && closeRef.current) {
        e.preventDefault();
        closeRef.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [index, images.length]);

  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 pb-24 md:grid-cols-2 lg:grid-cols-3 md:px-8">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden text-left ${
              i === 0 ? "md:col-span-2 md:aspect-[16/10]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={src}
              alt={`${title} detail ${i + 1}`}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute inset-0 bg-obsidian/0 transition group-hover:bg-obsidian/15" />
            <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] text-ivory/0 transition group-hover:text-ivory/80">
              View
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
          >
            <button
              ref={closeRef}
              type="button"
              className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.2em] text-taupe hover:text-ivory"
              onClick={() => setIndex(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) =>
                  i === null ? 0 : (i - 1 + images.length) % images.length
                );
              }}
              aria-label="Previous image"
            >
              ←
            </button>
            <motion.div
              key={index}
              className="relative h-[70vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${title} ${index + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-champagne md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i === null ? 0 : (i + 1) % images.length));
              }}
              aria-label="Next image"
            >
              →
            </button>
            <p className="absolute bottom-6 text-[11px] tracking-[0.18em] text-taupe">
              {index + 1} / {images.length}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
