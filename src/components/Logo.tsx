import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  href?: string | null;
  className?: string;
  size?: "nav" | "footer" | "hero" | "mark";
  priority?: boolean;
};

const sizes = {
  nav: { width: 148, height: 56, className: "h-10 w-auto md:h-12" },
  footer: { width: 180, height: 68, className: "h-14 w-auto" },
  hero: { width: 280, height: 106, className: "h-16 w-auto md:h-24 lg:h-28" },
  mark: { width: 72, height: 72, className: "h-12 w-auto" },
} as const;

export function Logo({
  href = "/",
  className = "",
  size = "nav",
  priority = false,
}: LogoProps) {
  const s = sizes[size];
  const image = (
    <Image
      src={siteConfig.logo}
      alt={siteConfig.name}
      width={s.width}
      height={s.height}
      priority={priority}
      className={`${s.className} object-contain object-left ${className}`}
    />
  );

  if (href == null) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 transition opacity-95 hover:opacity-100"
      aria-label={siteConfig.name}
    >
      {image}
    </Link>
  );
}
