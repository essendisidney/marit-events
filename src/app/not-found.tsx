import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <Logo size="footer" href="/" />
      <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-champagne">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
        This moment isn&apos;t here.
      </h1>
      <p className="mt-4 max-w-md text-taupe">
        The page you&apos;re looking for may have moved — or the celebration is
        still being designed.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-champagne px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-obsidian"
        >
          Back home
        </Link>
        <Link
          href="/enquire"
          className="border border-champagne/50 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-champagne"
        >
          Plan your event
        </Link>
      </div>
    </div>
  );
}
