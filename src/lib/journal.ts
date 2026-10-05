import { images } from "@/lib/images";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  /** ISO date of the last factual review, for guides that need to stay current. */
  updated?: string;
  readTime: string;
  image: string;
  /** Paragraphs. A block starting with "## " renders as a section heading. */
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "how-to-legally-marry-in-kenya-as-a-foreigner",
    title: "How to legally marry in Kenya as a foreigner",
    excerpt:
      "Documents, notice periods, ceremony types and timelines for international couples — plus the simpler option most destination couples choose.",
    category: "Destination",
    date: "2026-10-05",
    updated: "2026-10-05",
    readTime: "9 min",
    image: images.dianiSunset,
    content: [
      "Kenya is one of the few places where you can say your vows on a white-sand beach in the morning and watch elephants cross the plains by evening. It is also a country where foreigners can legally marry, and where the paperwork is manageable with a little planning.",
      "This guide covers what international couples need to know. Requirements and fees are set by Kenya's Registrar of Marriages and can change, so treat this as a planning map and confirm the details for your situation before you book flights. When you plan with Marit, we check the current requirements with the Registrar for you.",
      "## Two routes: legal in Kenya, or legal at home",
      "Most destination couples choose one of two routes. The first is a legally binding marriage in Kenya, registered under Kenya's Marriage Act, 2014. The second is to complete the legal formalities at home, often a short registry appointment, and hold a symbolic ceremony in Kenya with the full celebration, vows and guests.",
      "The symbolic route removes almost all of the paperwork and timing risk, and your guests will not know the difference. The legal route means your certificate comes from Kenya. Both are beautiful; the right one depends on your timeline and what matters to you.",
      "## Who can marry in Kenya",
      "Both partners must be at least 18 years old, free to marry (single, divorced or widowed), and marrying of their own free will. Neither partner needs to be a Kenyan citizen or resident.",
      "Kenyan law recognises civil, Christian, Hindu, Islamic and customary marriages. Most international couples choose a civil marriage, conducted by a Registrar of Marriages, or a Christian marriage, conducted by a licensed minister.",
      "## Documents you will typically need",
      "Valid passports for both partners, plus copies. Passport-size photographs. Birth certificates. Evidence that you are free to marry, usually a certificate of no impediment or a sworn affidavit of single status from your home country. If either of you has been married before, the decree absolute or divorce certificate, or the former spouse's death certificate. Two witnesses over 18 with their passports or national IDs.",
      "Documents not in English generally need a certified translation. Some couples are also asked for proof of the documents' authenticity. Start gathering these early, because certificates of no impediment can take weeks to issue in some countries.",
      "## Notice of intention to marry",
      "Before a civil or Christian marriage, the couple gives notice of intention to marry, which in Kenya is now lodged through the government's eCitizen portal. The notice is published for at least 21 days before the wedding, and it remains valid for a limited period (typically three months), so the ceremony must take place within that window.",
      "If you cannot meet the 21-day period, the Registrar can grant a special licence that shortens it, for an additional fee. Plan for the standard notice period wherever possible; it is the least stressful route.",
      "Expect the Registrar to want to see original documents, and plan for both of you to be in Kenya a few days before the ceremony in case an in-person appointment is required.",
      "## The ceremony and certificate",
      "A civil ceremony can take place at a Registrar's office, or a registrar can officiate at your chosen venue, which usually carries an extra fee. A Christian ceremony is led by a licensed minister at a licensed place of worship or approved venue. Your two witnesses sign the register with you.",
      "You receive a Kenyan marriage certificate. Before you travel, check with your home country's registry whether it needs legalisation, translation or registration to be recognised there.",
      "## A realistic timeline",
      "Six to twelve months ahead: decide between the legal and symbolic routes, choose your region and season, and book the venue. Three to four months ahead: request your certificates of no impediment and gather documents. Around two months ahead: lodge the notice of intention to marry. One week ahead: arrive in Kenya, attend any Registrar appointment and confirm witnesses. Wedding day: sign, celebrate, and let us handle everything else.",
      "## Choosing when and where",
      "Kenya's main dry seasons run roughly from late June to October and from December to March. July to October also brings the Great Migration to the Maasai Mara. The coast at Diani is warm year-round, with the long rains usually falling between April and June.",
      "## How Marit helps",
      "We become your team on the ground: confirming current Registrar requirements, booking a registrar or minister for your venue, coordinating witnesses if you need them, and building the paperwork timeline into your wider plan. You focus on the vows. We handle the rest.",
      "Requirements in this guide were reviewed in October 2026. Always confirm with the Registrar of Marriages or your planner before making travel decisions.",
    ],
  },
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
      "How international couples in the UK, US, UAE and beyond can create a Kenya celebration — without flying in for every decision.",
    category: "Destination",
    date: "2026-02-20",
    readTime: "8 min",
    image: images.weddingEditorial,
    content: [
      "Distance should not mean uncertainty. With the right partner on the ground in Kenya, planning from London, Dubai, New York or Johannesburg can feel clear and calm.",
      "Begin with vision and constraints: date window, guest numbers, budget band and the kind of experience you want people to feel — city elegance, coastal light or wilderness drama.",
      "Then lean on local orchestration: venues, vendors, timelines, guest logistics and the quiet details that make a destination wedding feel effortless for everyone flying in.",
      "Your first message to Marit only needs the essentials — where you live now, where in Kenya you're drawn to, and what matters most. We reply within 2 hours with a clear next step.",
      "Marit exists for exactly this: you imagine it from abroad. We orchestrate everything in Kenya.",
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
