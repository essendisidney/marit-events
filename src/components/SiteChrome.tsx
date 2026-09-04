import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MobileStickyBar, WhatsAppFloat } from "@/components/ConversionChrome";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-champagne focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pb-[4.5rem] md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileStickyBar />
    </>
  );
}
