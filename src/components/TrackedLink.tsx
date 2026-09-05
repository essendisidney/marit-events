"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  source: string;
  className?: string;
  children: ReactNode;
};

/** Client Link that fires cta_click — safe to use from Server Components. */
export function TrackedLink({
  href,
  source,
  className,
  children,
}: TrackedLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackCtaClick({
          path: pathname,
          href,
          source,
        })
      }
    >
      {children}
    </Link>
  );
}

export function TrackedWhatsApp({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick({ path: pathname })}
    >
      {children}
    </a>
  );
}

export function TrackedMailto({
  href,
  source = "mailto",
  className,
  children,
}: {
  href: string;
  source?: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        trackCtaClick({
          path: pathname,
          href: "mailto",
          source,
        })
      }
    >
      {children}
    </a>
  );
}
