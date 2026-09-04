/** Marit Events imagery — real portfolio first, curated Unsplash as supplements. */

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

/** Supplemental editorial / destination atmosphere */
export const images = {
  hero: marit.receptionRustic,
  weddingFormal: marit.weddingAfricanPrint,
  weddingPortrait: marit.entranceDraped,
  weddingHands: u("photo-1529519195486-16945f0fb37f", 1400),
  weddingKiss: u("photo-1512060847456-85a2a1bf8b25", 1600),
  weddingCeremony: marit.proposal,
  weddingModern: marit.weddingAfricanPrint,
  weddingIntimate: marit.entranceDraped,
  weddingEditorial: marit.receptionRustic,
  heritageAttire: marit.weddingAfricanPrint,
  celebrationGold: marit.corporateBlackGold,
  ringMoment: marit.proposal,
  dressDetail: marit.babyShower,
  coupleStanding: marit.entranceDraped,

  dianiSunset: u("photo-1691161510065-298039a5b51b", 2000),
  dianiResort: u("photo-1706012955757-6c2048c32668", 1600),
  dianiWater: u("photo-1667935837291-1dc178866251", 1800),
  dianiPool: u("photo-1708119063168-4785d1359824", 1600),
  dianiSand: u("photo-1651860282131-e3257674ccd1", 1600),

  maraBalloon: u("photo-1519659528534-7fd733a832a0", 1800),
  maraSavannah: u("photo-1623951581058-58138db08519", 1600),
  maraLight: u("photo-1518459384564-ecfd8e80721f", 1600),
  amboseli: u("photo-1691161880599-287b6b52d372", 1800),
  kilimanjaro: u("photo-1489392191049-fc10c97e64b6", 1600),
  mombasaCoast: u("photo-1506953823976-52e1fdc0149a", 1600),
  nairobiUrban: u("photo-1580060839134-75a5edca2e99", 1600),
  hospitality: marit.receptionRustic,
  galaEvening: marit.corporateBlackGold,
  privateTable: marit.weddingAfricanPrint,
  floralDetail: marit.babyShower,

  ...marit,
} as const;
