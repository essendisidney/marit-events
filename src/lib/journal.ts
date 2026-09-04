import { images } from "@/lib/images";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "destination-wedding-venues-kenya",
    title: "Best destination wedding venues in Kenya",
    excerpt:
      "From Nairobi rooftops to Diani shores — a considered guide to celebrating in Kenya.",
    category: "Destination",
    date: "2026-03-12",
    readTime: "6 min",
    image: images.dianiWater,
    content: [
      "Kenya offers something rare for destination weddings: genuine luxury alongside landscapes that feel cinematic without trying.",
      "Nairobi brings sophisticated hotels, gardens and private estates. The coast — Diani, Watamu, Mombasa — offers light, warmth and water. Further inland, the Mara and Amboseli create ceremonies guests will never forget.",
      "The right venue is not only beautiful. It must hold your guest count, support your timeline, and feel like you. That is where orchestration begins.",
      "If you are planning from abroad, start with season, guest travel and the emotional tone of the day. Then choose the place that makes everything else possible.",
    ],
  },
  {
    slug: "planning-a-wedding-in-kenya-from-abroad",
    title: "Planning a wedding in Kenya from abroad",
    excerpt:
      "How international couples can create a Kenya celebration without the chaos.",
    category: "Weddings",
    date: "2026-02-20",
    readTime: "7 min",
    image: images.weddingEditorial,
    content: [
      "Distance should not mean uncertainty. With the right partner on the ground, planning from London, Dubai, New York or Johannesburg can feel clear and calm.",
      "Begin with vision and constraints: date window, guest numbers, budget band and the kind of experience you want people to feel.",
      "Then lean on local orchestration — vendors, venues, timelines, guest logistics and the quiet details that make a destination wedding feel effortless.",
      "Marit exists for exactly this: you imagine it. We orchestrate everything.",
    ],
  },
  {
    slug: "nairobi-wedding-venues",
    title: "Nairobi wedding venues worth knowing",
    excerpt:
      "City elegance for couples who want intimacy, architecture and atmosphere.",
    category: "Weddings",
    date: "2026-01-18",
    readTime: "5 min",
    image: images.weddingFormal,
    content: [
      "Nairobi's best wedding venues share a quality: they feel intentional. Gardens that hold soft light. Rooms with presence. Outdoor spaces that still feel composed.",
      "Whether you want a black-tie evening or a sunlit gathering, the city can hold both — when the venue, flow and styling are designed as one experience.",
      "We help couples look beyond aesthetics alone: access, guest comfort, weather contingencies and how the day will actually move.",
    ],
  },
  {
    slug: "luxury-wedding-planners-kenya",
    title: "What luxury wedding planning in Kenya should feel like",
    excerpt:
      "Premium is not more decoration. It is more clarity, care and presence.",
    category: "Brand",
    date: "2025-12-04",
    readTime: "4 min",
    image: images.hero,
    content: [
      "Luxury wedding planning is not a longer checklist. It is the freedom to be fully present while someone exceptional manages every detail behind the scenes.",
      "At Marit, that means listening first, curating with purpose, and orchestrating with precision — so your day feels unmistakably yours.",
      "If you are searching for a planner in Kenya who understands both African soul and international expectation, you are in the right place.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function getRelatedJournalPosts(slug: string, limit = 2) {
  const current = getJournalPost(slug);
  if (!current) return [];
  const sameCategory = journalPosts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );
  const others = journalPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
