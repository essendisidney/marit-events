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
  // Monogram-only mark — bold letterform reads cleanly at compact sizes
  // and against busy photo backgrounds; the full lockup's wordmark/tagline
  // text goes illegible this small.
  nav: {
    width: 172,
    height: 100,
    src: siteConfig.mark,
    className: "h-9 w-auto md:h-11 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]",
  },
  mark: { width: 172, height: 100, src: siteConfig.mark, className: "h-12 w-auto" },
  // Full lockup (arc + monogram + wordmark + tagline) — has room to breathe.
  footer: { width: 180, height: 68, src: siteConfig.logo, className: "h-14 w-auto" },
  hero: {
    width: 280,
    height: 106,
    src: siteConfig.logo,
    className: "h-16 w-auto md:h-24 lg:h-28",
  },
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
      src={s.src}
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
