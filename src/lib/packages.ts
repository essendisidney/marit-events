import { images, marit } from "@/lib/images";
import type { enquiryTypes } from "@/lib/site";

/**
 * Starting prices for international and local clients.
 *
 * CONFIRM WITH ROSE BEFORE GOING LIVE. These figures are the floors of the
 * budget bands already used on the enquiry form (USD first, KES at the same
 * rounded rate the form uses, ~130). They are "typical total celebration
 * budget from" figures — décor, vendors and orchestration — not Marit's fee
 * on its own. Change the numbers here; every page and the schema.org offers
 * read from this list.
 */
export type EventPackage = {
  slug: string;
  name: string;
  tagline: string;
  fromUSD: number;
  fromKES: number;
  guests: string;
  where: string;
  includes: string[];
  image: string;
  enquiryType: (typeof enquiryTypes)[number];
  location?: string;
  featured?: boolean;
};

export const packages: EventPackage[] = [
  {
    slug: "intimate",
    name: "Intimate Celebration",
    tagline: "Small weddings, proposals and private dinners with full polish.",
    fromUSD: 5000,
    fromKES: 650000,
    guests: "Up to 50 guests",
    where: "Nairobi & surrounds",
    includes: [
      "Discovery call and design direction",
      "Venue shortlist and vendor curation",
      "Styling, florals and tablescape design",
      "Run-of-show timeline",
      "On-the-day orchestration",
    ],
    image: marit.proposal,
    enquiryType: "Private Celebration",
  },
  {
    slug: "signature-wedding",
    name: "Signature Wedding",
    tagline: "The full Marit experience for a Nairobi wedding.",
    fromUSD: 15000,
    fromKES: 2000000,
    guests: "50–250 guests",
    where: "Nairobi",
    includes: [
      "Everything in Intimate, at scale",
      "Full vendor management and contracts",
      "Guest experience and seating design",
      "Traditional and modern ceremony coordination",
      "Rehearsal and full-day team on site",
    ],
    image: marit.weddingAfricanPrint,
    enquiryType: "Wedding",
    featured: true,
  },
  {
    slug: "destination-wedding",
    name: "Destination Wedding",
    tagline: "Coast or wilderness, planned remotely and delivered on the ground.",
    fromUSD: 15000,
    fromKES: 2000000,
    guests: "Up to 150 guests",
    where: "Diani, Mombasa, Maasai Mara, Amboseli",
    includes: [
      "Remote planning by video call, email and WhatsApp",
      "Venue and season guidance",
      "Guest travel, stays and transfers coordination",
      "Welcome and farewell events",
      "Full orchestration across the celebration days",
    ],
    image: images.dianiSunset,
    enquiryType: "Destination Event",
    location: "Diani / Kenya coast",
  },
  {
    slug: "vows-and-safari",
    name: "Vows & Safari",
    tagline: "A Kenya wedding with a safari stay for you, or your guests too.",
    fromUSD: 25000,
    fromKES: 3250000,
    guests: "Up to 60 guests",
    where: "Maasai Mara or Amboseli",
    includes: [
      "Everything in Destination Wedding",
      "Ceremony in the wild with Kilimanjaro or Mara views",
      "Safari stay coordinated with your choice of lodge",
      "Game drives, bush dinners and sundowners",
      "Honeymoon extension to the coast on request",
    ],
    image: images.maraBalloon,
    enquiryType: "Destination Event",
    location: "Maasai Mara",
  },
  {
    slug: "corporate",
    name: "Corporate & Brand",
    tagline: "Conferences, launches, galas and team experiences.",
    fromUSD: 5000,
    fromKES: 650000,
    guests: "Any size",
    where: "Nairobi and across Kenya",
    includes: [
      "Brief and brand-led concept",
      "Venue, AV and production coordination",
      "Delegate and guest journey",
      "Supplier management and on-site team",
      "Post-event wrap-up",
    ],
    image: marit.corporateBlackGold,
    enquiryType: "Corporate Event",
  },
];

export function formatUSD(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export function formatKES(n: number) {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `KES ${Number.isInteger(m) ? m : m.toFixed(2).replace(/0$/, "")}M`;
  }
  return `KES ${Math.round(n / 1000)}k`;
}
