"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Restore scroll position after client navigations. */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
