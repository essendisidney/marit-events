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
