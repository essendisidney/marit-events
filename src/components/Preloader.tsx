"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  PRELOADER_SESSION_KEY,
  signalPreloaderDone,
} from "@/lib/preloader";

/**
 * "Two paths. One moment."
 *
 * Two golden threads run in from opposite edges of the screen, each loops
 * into a ring, the rings interlock and a spark lands where they cross. The
 * name resolves letter by letter, then the camera flies through the rings
 * while an iris opens from the centre onto the hero.
 *
 * Total ~3.3s (inside the 4.5s veil cap in intro-boot and lib/preloader). Click, tap or any key
 * skips straight to the reveal. Reduced motion gets a still lockup and a fade.
 */
const HOLD_MS = 2200;
const EXIT_MS = 1100;
const REVEAL_PAGE_MS = 250;

const REDUCED_HOLD_MS = 900;
const REDUCED_EXIT_MS = 420;

const GOLD = "#C9A96E";
const GOLD_SOFT = "#D4BC8A";
const ease = [0.22, 1, 0.36, 1] as const;
const drawEase = [0.65, 0, 0.35, 1] as const;

/** Thread in from the left, then a full ring centred at (170,100). */
const LEFT_THREAD =
  "M -900 100 L 122 100 A 48 48 0 1 1 218 100 A 48 48 0 1 1 122 100";
/** Thread in from the right, then a full ring centred at (230,100). */
const RIGHT_THREAD =
  "M 1300 100 L 278 100 A 48 48 0 1 0 182 100 A 48 48 0 1 0 278 100";
/** Share of each path that is the ring; the rest is the lead-in thread. */
const LEAD_IN = 1022;
const RING = 2 * Math.PI * 48;
const RING_SHARE = RING / (LEAD_IN + RING);

const LETTERS = ["M", "A", "R", "I", "T"];

/** Fixed positions so the dust looks scattered but renders identically every time. */
const DUST = [
  { x: 12, y: 78, s: 2, d: 0.2, t: 3.2 },
  { x: 22, y: 64, s: 1.5, d: 0.6, t: 2.8 },
  { x: 31, y: 86, s: 1, d: 0.1, t: 3.6 },
  { x: 38, y: 58, s: 2.5, d: 0.9, t: 3.0 },
  { x: 46, y: 82, s: 1.5, d: 0.4, t: 3.4 },
  { x: 54, y: 70, s: 1, d: 1.1, t: 2.6 },
  { x: 61, y: 88, s: 2, d: 0.3, t: 3.1 },
  { x: 68, y: 60, s: 1.5, d: 0.8, t: 3.5 },
  { x: 75, y: 79, s: 2.5, d: 0.5, t: 2.9 },
  { x: 83, y: 66, s: 1, d: 1.0, t: 3.3 },
  { x: 90, y: 84, s: 2, d: 0.7, t: 3.0 },
  { x: 7, y: 92, s: 1, d: 1.2, t: 2.7 },
  { x: 50, y: 94, s: 1.5, d: 0.15, t: 3.7 },
  { x: 95, y: 72, s: 1.5, d: 0.95, t: 3.2 },
];

function liftVeil() {
  document.documentElement.classList.remove("marit-intro");
}

function markSeen() {
  try {
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
  } catch {
    /* private mode */
  }
}

/**
 * First visit of a tab to the homepage only. Deep links and later navigations
 * skip it, so a guest arriving on /weddings from Instagram or Google sees
 * content on the first frame.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const started = useRef(false);
  const timers = useRef<number[]>([]);
  const exitStarted = useRef(false);

  // Iris: a transparent hole in the overlay that grows from the centre.
  const iris = useMotionValue(-1);
  const irisX = useMotionValue(50);
  const irisY = useMotionValue(50);
  const mask = useMotionTemplate`radial-gradient(circle at ${irisX}% ${irisY}%, transparent ${iris}vmax, #000 calc(${iris}vmax + 1.5px))`;
  const ringsRef = useRef<SVGSVGElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const [zoomOrigin, setZoomOrigin] = useState("50% 30%");

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const beginExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    clearTimers();

    const exitMs = reduce ? REDUCED_EXIT_MS : EXIT_MS;
    liftVeil();
    markSeen();
    setExiting(true);

    if (!reduce) {
      // Open the iris — and fly the camera — through the centre of the rings.
      const rings = ringsRef.current?.getBoundingClientRect();
      const lockup = lockupRef.current?.getBoundingClientRect();
      if (rings && lockup) {
        const cx = rings.left + rings.width / 2;
        const cy = rings.top + rings.height / 2;
        irisX.set((cx / window.innerWidth) * 100);
        irisY.set((cy / window.innerHeight) * 100);
        setZoomOrigin(`${cx - lockup.left}px ${cy - lockup.top}px`);
      }
      animate(iris, 90, { duration: exitMs / 1000, ease: [0.76, 0, 0.24, 1] });
    }

    timers.current.push(
      window.setTimeout(signalPreloaderDone, reduce ? 80 : REVEAL_PAGE_MS),
      window.setTimeout(() => {
        liftVeil();
        setShow(false);
      }, exitMs)
    );
  }, [iris, irisX, irisY, reduce]);

  useEffect(() => {
    if (reduce === null || started.current) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
    } catch {
      seen = true;
    }

    if (seen || window.location.pathname !== "/") {
      liftVeil();
      signalPreloaderDone();
      setShow(false);
      return;
    }

    started.current = true;
    setShow(true);
    timers.current.push(
      window.setTimeout(beginExit, reduce ? REDUCED_HOLD_MS : HOLD_MS)
    );

    return () => {
      clearTimers();
      try {
        if (sessionStorage.getItem(PRELOADER_SESSION_KEY) !== "1") {
          started.current = false;
          exitStarted.current = false;
        }
      } catch {
        started.current = false;
        exitStarted.current = false;
      }
    };
  }, [reduce, beginExit]);

  // Any key skips the intro.
  useEffect(() => {
    if (!show || exiting) return;
    const onKey = () => beginExit();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, exiting, beginExit]);

  const still = !!reduce;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Opening Marit Events"
          aria-live="polite"
          onClick={beginExit}
          className="fixed inset-0 z-[200] cursor-pointer overflow-hidden bg-obsidian"
          style={{
            pointerEvents: exiting ? "none" : "auto",
            ...(still ? {} : { maskImage: mask, WebkitMaskImage: mask }),
          }}
          initial={false}
          animate={{ opacity: still && exiting ? 0 : 1 }}
          transition={{ duration: still ? REDUCED_EXIT_MS / 1000 : 0 }}
        >
          {/* Warm glow behind the rings */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,169,110,0.16) 0%, rgba(201,169,110,0.05) 40%, transparent 70%)",
            }}
            initial={still ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease }}
          />

          {/* Gold dust drifting upward */}
          {!still ? (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {DUST.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-champagne-soft"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.s,
                    height: p.s,
                    boxShadow: `0 0 ${p.s * 3}px ${GOLD_SOFT}`,
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.9, 0], y: -120 - p.s * 30 }}
                  transition={{ delay: p.d, duration: p.t, ease: "easeOut" }}
                />
              ))}
            </div>
          ) : null}

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              ref={lockupRef}
              className="relative flex flex-col items-center"
              initial={false}
              animate={
                exiting && !still
                  ? { scale: 7, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                duration: exiting ? EXIT_MS / 1000 : 0,
                ease: [0.7, 0, 0.84, 0],
              }}
              style={{ transformOrigin: zoomOrigin }}
            >
              {/* Threads and rings */}
              <svg
                ref={ringsRef}
                viewBox="0 0 400 200"
                className="h-auto w-[min(78vw,440px)] overflow-visible"
                aria-hidden
              >
                <defs>
                  <linearGradient id="marit-gold" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor={GOLD_SOFT} />
                    <stop offset="50%" stopColor={GOLD} />
                    <stop offset="100%" stopColor="#A8874C" />
                  </linearGradient>
                  <filter id="marit-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[LEFT_THREAD, RIGHT_THREAD].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="url(#marit-gold)"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    filter="url(#marit-glow)"
                    initial={still ? false : { pathLength: 0, pathOffset: 0, opacity: 1 }}
                    animate={
                      still
                        ? { pathLength: 1, opacity: 1 }
                        : {
                            // Draw the whole path, then let the lead-in thread
                            // retract so only the ring remains.
                            pathLength: [0, 1, RING_SHARE],
                            pathOffset: [0, 0, 1 - RING_SHARE],
                          }
                    }
                    transition={{
                      duration: 1.5,
                      times: [0, 0.72, 1],
                      ease: drawEase,
                      delay: i * 0.08,
                    }}
                  />
                ))}

                {/* Spark where the rings cross */}
                <motion.g
                  initial={still ? false : { scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: [0, 1.35, 1], rotate: 0, opacity: 1 }}
                  transition={{ delay: 1.15, duration: 0.6, ease }}
                  style={{ transformOrigin: "200px 62.5px", transformBox: "view-box" }}
                >
                  <path
                    d="M200 50 L202.2 60.3 L212.5 62.5 L202.2 64.7 L200 75 L197.8 64.7 L187.5 62.5 L197.8 60.3 Z"
                    fill={GOLD_SOFT}
                    filter="url(#marit-glow)"
                  />
                </motion.g>
              </svg>

              {/* Name, letter by letter */}
              <div
                className="mt-2 flex pl-[0.42em] font-display text-[clamp(2rem,7vw,3.25rem)] font-medium text-ivory"
                aria-hidden
              >
                {LETTERS.map((l, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={
                      still
                        ? false
                        : { opacity: 0, y: 14, filter: "blur(8px)", letterSpacing: "0.9em" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.42em" }}
                    transition={{ delay: 0.85 + i * 0.09, duration: 0.8, ease }}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
              <motion.p
                aria-hidden
                className="mt-1 text-[10px] uppercase tracking-[0.6em] text-champagne"
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35, duration: 0.6 }}
              >
                Events
              </motion.p>
              <motion.p
                className="mt-6 font-display text-base italic tracking-wide text-champagne-soft"
                initial={still ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease }}
              >
                Two paths. One moment.
              </motion.p>
            </motion.div>
          </div>

          {!still ? (
            <motion.p
              aria-hidden
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em] text-taupe/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ delay: exiting ? 0 : 1.2, duration: 0.5 }}
            >
              Tap to enter
            </motion.p>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
