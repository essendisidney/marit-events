"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackEnquireOpen } from "@/lib/analytics";

export function EnquireBeacon() {
  const params = useSearchParams();

  useEffect(() => {
    trackEnquireOpen({
      type: params.get("type") ?? undefined,
      location: params.get("location") ?? undefined,
    });
  }, [params]);

  return null;
}
