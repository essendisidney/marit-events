"use client";

import { useEffect, useState } from "react";

export const PRELOADER_SESSION_KEY = "marit-preloader-seen";
export const PRELOADER_DONE_EVENT = "marit:preloader-done";

export function signalPreloaderDone() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
}

/** True when intro curtains are done (or skipped). */
export function usePreloaderReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PRELOADER_SESSION_KEY)) {
        setReady(true);
        return;
      }
    } catch {
      setReady(true);
      return;
    }

    const onDone = () => setReady(true);
    window.addEventListener(PRELOADER_DONE_EVENT, onDone);
    // Safety if preloader skipped without signalling
    const fallback = window.setTimeout(() => setReady(true), 4500);
    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
