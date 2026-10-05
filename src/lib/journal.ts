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
    slug: "best-time-of-year-for-a-kenya-wedding",
    title: "The best time of year for a Kenya wedding",
    excerpt:
      "Dry seasons, rains, the Great Migration and holiday peaks — a season-by-season guide to choosing your date in Nairobi, on the coast or on safari.",
    category: "Destination",
    date: "2026-10-05",
    updated: "2026-10-05",
    readTime: "8 min",
    image: images.maraBalloon,
    content: [
      "Kenya sits on the equator, so there is no cold winter to avoid. What shapes your wedding date is rain, wildlife, heat on the coast and how busy the country is when your guests want to travel. Choose well and the landscape does half the styling for you.",
      "Here is how the year really moves, and how we help couples choose a date that works for the celebration, the guests and the budget.",
      "## The short answer",
      "Kenya has two main dry seasons: roughly late June to October, and from late December to early March. These are the most reliable months for outdoor ceremonies anywhere in the country. Kenya also has two rainy seasons: the long rains, roughly April to early June, and the short rains, usually from late October or November into December.",
      "Rains in Kenya rarely last all day. They often arrive as heavy afternoon or evening showers with clear mornings. But for a wedding, reliability matters more than averages, so we plan every outdoor moment with a covered alternative whatever the month.",
      "## Late June to October: the classic season",
      "This is Kenya at its most dependable. Skies are mostly clear, the air is dry and the light is beautiful for photography. In Nairobi, days are mild, typically in the low twenties Celsius, and evenings are genuinely cool — plan for wraps, heaters or fire pits if you are celebrating outdoors after sunset.",
      "July to October is also when the Great Migration usually reaches the Maasai Mara, with dramatic river crossings often peaking in August and September. If a safari wedding or a safari for your guests is part of the dream, this is the window.",
      "The trade-off is demand. July and August overlap with European and American summer holidays, so the best lodges, camps and coastal villas book up well ahead and rates are at their highest. For this season, enquire nine to twelve months out.",
      "## Late December to early March: warm, dry and festive",
      "The second dry season brings hot, sunny days, especially on the coast. Diani and Watamu are at their most tropical, with warm turquoise water and long golden evenings. Inland, the Mara and Amboseli are dry and green from the short rains, and Kilimanjaro views from Amboseli are often at their best on clear early mornings.",
      "December deserves its own note. It is the month when many Kenyans living abroad come home, which makes it the most popular time for diaspora weddings — family is already travelling. It also means Christmas and New Year peak rates, busy flights and venues that book early. If you want a December date, treat it like July: secure the venue first.",
      "## April to early June: the green season",
      "The long rains are Kenya's wettest period, with April and May usually the heaviest months — and on the coast, May can be especially wet. Some safari camps and coastal hotels close for maintenance during these weeks.",
      "For the right couple, though, the green season is a gift. Landscapes are lush, rates are often noticeably lower, and you will have far more choice of venues and suppliers. An indoor, marquee or covered celebration in Nairobi can be every bit as beautiful in May as in August. We recommend this season for couples who want value and flexibility, with a fully covered plan rather than one that depends on the sky.",
      "## Late October to December: the short rains",
      "The short rains are lighter and less predictable than the long rains, often arriving as brief showers. Many weddings take place happily in November with a sensible weather plan. Early in this window you may still catch the end of the migration in the Mara; by mid-December the festive peak begins.",
      "## Region by region",
      "Nairobi sits at roughly 1,700–1,800 metres, so it is pleasant all year with cool evenings. It suits weddings in any season, provided outdoor elements have a covered alternative during the rains.",
      "The coast — Diani, Mombasa and Watamu — is hot and humid year-round. The most comfortable months for guests are usually July to October, when sea breezes keep things fresh, and January to March, when it is hotter but dry. Avoid relying on an open beach ceremony in April to June.",
      "The Maasai Mara is at its most spectacular from July to October. January to March is also excellent, quieter and dry. Many camps are limited or closed in April and May.",
      "Amboseli is best in the dry seasons, when wildlife gathers around the swamps and the mountain views are more often clear.",
      "## Dates to check before you commit",
      "Kenyan public holidays — including Easter, Madaraka Day on 1 June, Mashujaa Day on 20 October, Jamhuri Day on 12 December, Christmas and Boxing Day — can affect government offices, supplier availability and travel. If you are having a legal ceremony in Kenya, avoid planning your registry appointment around them. Ramadan and Eid dates move each year and matter for coastal venues and Muslim families. School holiday calendars in your guests' home countries matter too: they decide when families can actually fly.",
      "## How we help you choose",
      "When you enquire, tell us your preferred months, where your guests are flying from and the feeling you want — a cool garden evening in Nairobi, a barefoot beach ceremony or vows with the Mara behind you. We will tell you honestly which dates suit that vision, what each season costs and how we would plan for the weather.",
      "Weather patterns in Kenya vary from year to year, and rainy seasons can start early or late. Use this guide to shortlist, and let us confirm the details for your venue and date.",
    ],
  },
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
