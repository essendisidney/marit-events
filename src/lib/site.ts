/** Marit Events — site configuration. Update contact details before launch. */

import { images } from "@/lib/images";

export const siteConfig = {
  name: "Marit Events",
  shortName: "MARIT",
  tagline: "Exceptional moments. Impeccably orchestrated.",
  slogan: "Designed with Passion, Delivered with Perfection",
  description:
    "Premium event experiences, beautifully orchestrated — weddings, destination celebrations and corporate events from Nairobi, Kenya.",
  location: "Nairobi, Kenya",
  locationLine: "Nairobi, Kenya · Creating experiences wherever your celebration takes us",
  email: "maritevents@gmail.com",
  phone: "+254115251888",
  whatsapp: "254115251888",
  instagram: "https://instagram.com/maritevents",
  responseTime: "We'll be in touch within 24 hours.",
  /** Production URL — update when custom domain is connected */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://maritevents.com",
  logo: "/marit-logo.png",
  ogImage: "/events/reception-rustic-chic.jpg",
};

export const navLinks = [
  { href: "/experiences", label: "Experiences" },
  { href: "/weddings", label: "Weddings" },
  { href: "/corporate", label: "Corporate" },
  { href: "/destination", label: "Destination" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Tell us what you're imagining.",
  },
  {
    number: "02",
    title: "Design",
    description: "We turn your vision into an experience.",
  },
  {
    number: "03",
    title: "Orchestrate",
    description: "Vendors, timelines, logistics, guests, details.",
  },
  {
    number: "04",
    title: "Experience",
    description: "You arrive. Everything is ready.",
  },
] as const;

export const maritExperience = [
  {
    number: "01",
    title: "Vision",
    description: "We listen before we plan.",
  },
  {
    number: "02",
    title: "Curated",
    description: "Every supplier, detail and decision has purpose.",
  },
  {
    number: "03",
    title: "Orchestrated",
    description: "Your event is managed down to the minute.",
  },
  {
    number: "04",
    title: "Personal",
    description: "Your celebration should feel unmistakably yours.",
  },
  {
    number: "05",
    title: "Exceptional",
    description: "Because extraordinary moments don't happen by accident.",
  },
] as const;

/** Placeholder trust metrics — replace with verified figures before launch. */
export const trustStats = [
  { value: "100+", label: "Events Delivered" },
  { value: "—", label: "Happy Clients" },
  { value: "—", label: "Vendors & Partners" },
  { value: "—", label: "Years Experience" },
] as const;

export const destinations = [
  {
    name: "Nairobi",
    description: "Sophisticated venues, skyline evenings, city elegance.",
    image: images.hospitality,
  },
  {
    name: "Diani",
    description: "Coastal light, white sand, celebrations by the Indian Ocean.",
    image: images.dianiSunset,
  },
  {
    name: "Mombasa",
    description: "Heritage, warmth and coastal grandeur.",
    image: images.mombasaCoast,
  },
  {
    name: "Maasai Mara",
    description: "Wilderness drama for unforgettable destination vows.",
    image: images.maraBalloon,
  },
  {
    name: "Amboseli",
    description: "Kilimanjaro horizons and open-sky ceremonies.",
    image: images.amboseli,
  },
] as const;

export const corporateTypes = [
  "Corporate Events",
  "Conferences",
  "Product Launches",
  "Gala Dinners",
  "Team Experiences",
  "Brand Activations",
] as const;

export const testimonials = [
  {
    quote:
      "Marit didn't just plan our wedding. They gave us the freedom to actually enjoy it.",
    name: "A Nairobi couple",
    detail: "Wedding · Nairobi",
    image: images.weddingFormal,
  },
  {
    quote:
      "From the first call to the last song, everything felt calm, considered and completely ours.",
    name: "Destination clients",
    detail: "Celebration · Coast",
    image: images.dianiSunset,
  },
  {
    quote:
      "Our corporate evening looked premium and ran with precision. Guests still talk about it.",
    name: "Brand team",
    detail: "Corporate · Nairobi",
    image: images.celebrationGold,
  },
] as const;

export const storyPillars = [
  {
    title: "Listen deeply",
    body: "Every celebration begins with your story — not a package.",
  },
  {
    title: "Design with intent",
    body: "Spaces, light, flow and detail composed as one experience.",
  },
  {
    title: "Orchestrate quietly",
    body: "Vendors, timelines and logistics managed so you stay present.",
  },
] as const;

export const weddingFaqs = [
  {
    q: "Can you plan a wedding in Kenya if we live abroad?",
    a: "Yes. Many of our clients plan from London, Dubai, Johannesburg and beyond. We handle venues, vendors, guest logistics and on-the-day orchestration so distance never becomes chaos.",
  },
  {
    q: "How far in advance should we enquire?",
    a: "For peak wedding seasons and destination celebrations, 6–12 months is ideal. Shorter timelines are possible — tell us your date window and we'll be honest about what's achievable.",
  },
  {
    q: "Do you only do large weddings?",
    a: "No. We design intimate gatherings and spectacular destination weddings with the same standard — presence, polish and personal detail.",
  },
  {
    q: "What's included in working with Marit?",
    a: "Discovery, design direction, vendor curation, timelines, guest experience planning and full on-the-day orchestration. Every engagement is scoped to your celebration.",
  },
] as const;

export const corporateFaqs = [
  {
    q: "What kinds of corporate events do you deliver?",
    a: "Conferences, product launches, gala dinners, team experiences, brand activations and executive gatherings — from boardroom precision to ballroom presence.",
  },
  {
    q: "Can you work with our brand guidelines?",
    a: "Absolutely. We translate brand systems into spatial experience — styling, flow, production and guest journey — without losing operational clarity.",
  },
  {
    q: "How quickly can you turn around a corporate enquiry?",
    a: "We'll respond within 24 hours. Timeline depends on scale and date — share your brief and we'll propose a clear next step.",
  },
] as const;

export const enquireFaqs = [
  {
    q: "How soon will we hear back?",
    a: "Within 24 hours on working days. Urgent dates — say so in your enquiry and WhatsApp us directly.",
  },
  {
    q: "Do we need a finished budget?",
    a: "A range is enough to begin. We'll help you understand where investment creates the most impact.",
  },
  {
    q: "WhatsApp or email — which should we use?",
    a: "Both work. Local clients often prefer WhatsApp; international clients often prefer email. Choose whichever feels natural on the form.",
  },
] as const;

export const primaryNav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/weddings", label: "Weddings" },
  { href: "/corporate", label: "Corporate" },
  { href: "/destination", label: "Destination" },
] as const;

export const moreNav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
] as const;

export const enquiryTypes = [
  "Wedding",
  "Corporate Event",
  "Private Celebration",
  "Destination Event",
  "Other",
] as const;

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hello Marit — I'd like to talk about planning an event."
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
