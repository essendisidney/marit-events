import { marit, images } from "@/lib/images";

export type PortfolioItem = {
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  excerpt: string;
  image: string;
  brief: string;
  experience: string;
  details: string;
  result: string;
  gallery: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "african-print-celebration",
    title: "An African Print Celebration",
    location: "Nairobi, Kenya",
    category: "Wedding",
    year: "2025",
    excerpt:
      "White marquees, gold chargers and heritage textiles — international polish with unmistakable Kenyan soul.",
    image: marit.weddingAfricanPrint,
    brief:
      "A reception that needed to feel luxurious for international guests while honouring African identity through fabric, colour and craft.",
    experience:
      "Marit shaped the full guest journey — from draped marquees to table runners and chair accents in traditional print — so culture and elegance read as one design language.",
    details:
      "Marquee draping, gold place settings, African textile runners and sashes, floral accents, seating layout and on-site orchestration.",
    result:
      "A celebration that looked premium to any eye — and personal to every guest who recognised the fabric of home.",
    gallery: [
      marit.weddingAfricanPrint,
      marit.entranceDraped,
      marit.receptionRustic,
      marit.proposal,
    ],
  },
  {
    slug: "starlit-pavilion-reception",
    title: "A Starlit Pavilion Reception",
    location: "Nairobi",
    category: "Wedding",
    year: "2025",
    excerpt:
      "Woven light, fairy skies and natural textures — rustic chic at scale.",
    image: marit.receptionRustic,
    brief:
      "An outdoor pavilion reception designed for warmth and wonder — soft draping, artisanal lighting and tables that felt grounded rather than stiff.",
    experience:
      "From ceiling lights to cane-back seating and dried botanical centrepieces, every layer was coordinated so the space felt immersive the moment guests arrived.",
    details:
      "Tent draping, pendant lighting, furniture hire, linen styling, floral and botanical design, layout and evening run of show.",
    result:
      "A reception guests remember for atmosphere — not for waiting, confusion or unfinished corners.",
    gallery: [
      marit.receptionRustic,
      marit.entranceDraped,
      marit.weddingAfricanPrint,
      marit.corporateBlackGold,
    ],
  },
  {
    slug: "she-said-yes",
    title: "She Said Yes",
    location: "Nairobi",
    category: "Proposal",
    year: "2025",
    excerpt:
      "A private proposal staged down to the petal — red carpet, neon vows and a moment made unforgettable.",
    image: marit.proposal,
    brief:
      "A surprise proposal that had to feel cinematic, intimate and completely ready before the question was asked.",
    experience:
      "Marit built the scene in secret — heart arch, neon signage, rose petals and a VIP path — then stepped back so the moment could belong only to them.",
    details:
      "Balloon installation, neon signage, floral petal styling, red carpet and gold stanchions, lighting and discreet setup logistics.",
    result:
      "She said yes. The photographs say everything else.",
    gallery: [
      marit.proposal,
      marit.entranceDraped,
      marit.babyShower,
      marit.kidsBirthday,
    ],
  },
  {
    slug: "black-and-gold-corporate",
    title: "Black & Gold Corporate",
    location: "Nairobi",
    category: "Corporate",
    year: "2025",
    excerpt:
      "Boardroom clarity meets ballroom presence — black chair covers, gold sashes, impeccable rows.",
    image: marit.corporateBlackGold,
    brief:
      "A formal indoor programme that needed to look branded, premium and camera-ready without distracting from the content on stage.",
    experience:
      "We styled the full room in Marit's signature black and gold language — consistent, polished and aligned to how the brand presents itself.",
    details:
      "Chair styling, sash detailing, room layout, AV coordination support and on-site presentation standards.",
    result:
      "An event space that felt as intentional as the agenda itself.",
    gallery: [
      marit.corporateBlackGold,
      marit.weddingAfricanPrint,
      marit.receptionRustic,
      marit.entranceDraped,
    ],
  },
  {
    slug: "celebrations-in-colour",
    title: "Celebrations in Colour",
    location: "Nairobi",
    category: "Private Celebration",
    year: "2025",
    excerpt:
      "From baby showers to birthday marquees — joyful themes executed with the same precision as a wedding.",
    image: marit.babyShower,
    brief:
      "Social celebrations that still deserve professional draping, cohesive colour stories and guest-ready styling.",
    experience:
      "Marit delivered themed environments — pink and gold showers, blue birthday marquees — with clean lines and considered detail.",
    details:
      "Balloon installations, backdrop styling, table dressing, chair selection, thematic props and outdoor setup.",
    result:
      "Parties that feel special in person and beautiful in every photograph.",
    gallery: [
      marit.babyShower,
      marit.kidsBirthday,
      marit.proposal,
      marit.entranceDraped,
    ],
  },
];

export function getPortfolioItem(slug: string) {
  return portfolio.find((item) => item.slug === slug);
}

/** Keep destination Unsplash refs available via images export */
export { images };
