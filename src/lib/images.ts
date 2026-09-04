/** Marit Events imagery — real portfolio first; destinations use curated stock only where needed. */

const local = (file: string) => `/events/${file}`;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

/** Real Marit Events photography */
export const marit = {
  proposal: local("proposal-heart.jpg"),
  kidsBirthday: local("kids-birthday-blue.jpg"),
  weddingAfricanPrint: local("wedding-african-print.jpg"),
  corporateBlackGold: local("corporate-black-gold.jpg"),
  babyShower: local("baby-shower-pink.jpg"),
  receptionRustic: local("reception-rustic-chic.jpg"),
  entranceDraped: local("entrance-draped.jpg"),
} as const;

/** Site imagery — prefer Marit photos; keep a small destination set for Kenya landscapes. */
export const images = {
  hero: marit.receptionRustic,
  weddingFormal: marit.weddingAfricanPrint,
  weddingPortrait: marit.entranceDraped,
  weddingCeremony: marit.proposal,
  weddingModern: marit.weddingAfricanPrint,
  weddingIntimate: marit.entranceDraped,
  weddingEditorial: marit.receptionRustic,
  heritageAttire: marit.weddingAfricanPrint,
  celebrationGold: marit.corporateBlackGold,
  ringMoment: marit.proposal,
  dressDetail: marit.babyShower,
  coupleStanding: marit.entranceDraped,

  /** Destination landscapes (minimal stock set) */
  dianiSunset: u("photo-1691161510065-298039a5b51b", 2000),
  dianiWater: u("photo-1667935837291-1dc178866251", 1800),
  maraBalloon: u("photo-1519659528534-7fd733a832a0", 1800),
  amboseli: u("photo-1691161880599-287b6b52d372", 1800),
  mombasaCoast: u("photo-1506953823976-52e1fdc0149a", 1600),

  /** Nairobi / hospitality — real Marit atmospheres */
  hospitality: marit.receptionRustic,
  nairobiUrban: marit.entranceDraped,
  galaEvening: marit.corporateBlackGold,
  privateTable: marit.weddingAfricanPrint,
  floralDetail: marit.babyShower,

  ...marit,
} as const;
