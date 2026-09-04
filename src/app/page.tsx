import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import {
  BrandIntro,
  MaritExperienceSection,
} from "@/components/home/Experience";
import {
  CelebrationsTeaser,
  CorporateTeaser,
  DestinationTeaser,
  WeddingsTeaser,
} from "@/components/home/Teasers";
import {
  FinalCta,
  PortfolioPreview,
  TrustSection,
} from "@/components/home/PortfolioTrust";
import { Testimonials } from "@/components/Testimonials";
import { InstagramStrip } from "@/components/InstagramStrip";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <MaritExperienceSection />
      <WeddingsTeaser />
      <CelebrationsTeaser />
      <DestinationTeaser />
      <CorporateTeaser />
      <PortfolioPreview />
      <Testimonials />
      <TrustSection />
      <InstagramStrip />
      <FinalCta />
    </>
  );
}
