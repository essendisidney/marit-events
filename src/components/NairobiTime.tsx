"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

type Status = {
  nairobi: string;
  open: boolean;
  /** Reply window expressed in the visitor's own time zone, or null if they're in EAT. */
  localWindow: string | null;
  /** When replies resume, in the visitor's time, while closed. */
  resumes: string | null;
};

const { open: OPEN, close: CLOSE, timeZone: TZ, label: TZ_LABEL } =
  siteConfig.replyHours;
/** EAT is a fixed UTC+3 with no daylight saving. */
const EAT_OFFSET_H = 3;

function timeIn(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

/** A Date for today's (or tomorrow's) hour `h` in Nairobi. */
function nairobiHour(now: Date, h: number, dayOffset = 0) {
  const nairobiDate = new Date(now.getTime() + EAT_OFFSET_H * 3600_000);
  return new Date(
    Date.UTC(
      nairobiDate.getUTCFullYear(),
      nairobiDate.getUTCMonth(),
      nairobiDate.getUTCDate() + dayOffset,
      h - EAT_OFFSET_H
    )
  );
}

function compute(now: Date): Status {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: TZ,
    }).format(now)
  );
  const open = hour >= OPEN && hour < CLOSE;
  const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const sameZone =
    visitorTz === TZ ||
    -now.getTimezoneOffset() === EAT_OFFSET_H * 60;

  const localWindow = sameZone
    ? null
    : `${timeIn(nairobiHour(now, OPEN))}–${timeIn(nairobiHour(now, CLOSE))}`;

  let resumes: string | null = null;
  if (!open) {
    const next = nairobiHour(now, OPEN, hour >= CLOSE ? 1 : 0);
    resumes = timeIn(next);
  }

  return { nairobi: timeIn(now, TZ), open, localWindow, resumes };
}

/**
 * Live Nairobi clock + reply-hours status, translated into the visitor's own
 * time zone. Renders a fixed-height placeholder on the server so there is no
 * layout shift when the client value arrives.
 */
export function NairobiTime({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(compute(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p
      className={`min-h-[1.5rem] text-sm text-ivory/70 ${className}`}
      aria-live="off"
    >
      {status ? (
        <>
          <span
            aria-hidden
            className={`mr-2 inline-block h-2 w-2 rounded-full align-middle ${
              status.open ? "bg-emerald-400" : "bg-champagne/60"
            }`}
          />
          It&apos;s {status.nairobi} in Nairobi ({TZ_LABEL}).{" "}
          {status.open
            ? "We're replying now — within 2 hours."
            : `We'll reply from ${status.resumes}${
                status.localWindow ? " your time" : ""
              }.`}
          {status.localWindow ? (
            <span className="text-ivory/50">
              {" "}
              Reply hours in your time: {status.localWindow}.
            </span>
          ) : null}
        </>
      ) : (
        <span className="invisible">Nairobi time</span>
      )}
    </p>
  );
}
