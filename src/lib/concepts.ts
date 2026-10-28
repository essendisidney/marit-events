/**
 * Design concepts — "Vision to Venue".
 *
 * These are design visualisations Marit creates from a client's brief to show
 * how a celebration could look before anything is booked. They are NOT
 * photographs of completed events: keep them out of the portfolio (which is
 * real Marit work only) and always label them as concepts.
 */
export type Concept = {
  slug: string;
  title: string;
  occasion: string;
  setting: string;
  brief: string;
  /** The finished room visualisation. */
  room: { src: string; width: number; height: number; alt: string };
  /** The concept board shared with the client. */
  board: { src: string; width: number; height: number; alt: string };
  elements: { name: string; detail: string }[];
  palette: { name: string; hex: string }[];
};

export const concepts: Concept[] = [
  {
    slug: "fifty-golden-years",
    title: "Fifty Golden Years",
    occasion: "Golden wedding anniversary",
    setting: "Indoor reception",
    brief:
      "A warm gold-and-ivory celebration of fifty years together — chrome balloons, gold-framed seating, soft florals and a champagne toast, all indoors.",
    room: {
      src: "/concepts/fifty-golden-years-room.webp",
      width: 1538,
      height: 1028,
      alt: "Concept visualisation of a golden anniversary reception: gold balloon garland, ivory drapes, a 50th Wedding Anniversary sign, gold-framed chairs and blush florals",
    },
    board: {
      src: "/concepts/fifty-golden-years-board.webp",
      width: 606,
      height: 1027,
      alt: "Fifty Golden Years concept board showing the backdrop, seating, welcome sign, cake, print and colour palette",
    },
    elements: [
      {
        name: "The Backdrop",
        detail:
          "Gold chrome balloon garland against white drapes and gold sequin curtains, with a script anniversary sign and a white rose table.",
      },
      {
        name: "The Seating",
        detail:
          "Ivory linens, gold-framed oval-back chairs, blush florals on every table and chandeliers overhead.",
      },
      {
        name: "Welcome Sign",
        detail: "Gold-lettered easel sign with white roses and gold and white balloons.",
      },
      {
        name: "The Cake",
        detail: "Two tiers in ivory with gold drip, white roses and a gold “50” topper.",
      },
      {
        name: "Invitations & Print",
        detail: "Champagne flutes and ribbon in a glowing gold — a mood for invitations and programmes.",
      },
    ],
    palette: [
      { name: "Gold", hex: "#C9A24A" },
      { name: "Champagne", hex: "#E6D7A8" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Ivory", hex: "#F3EBDD" },
      { name: "Blush", hex: "#E7B9BB" },
    ],
  },
];

export const visionSteps = [
  {
    number: "01",
    title: "Share the vision",
    description:
      "A Pinterest board, a TikTok, a photo from a wedding you loved, or just a feeling. Every idea is a starting point.",
  },
  {
    number: "02",
    title: "We design the concept",
    description:
      "Palette, backdrop, seating, florals, cake and print — composed into one concept board that feels like you.",
  },
  {
    number: "03",
    title: "See the room first",
    description:
      "We visualise the space so you can see the celebration before you commit — ideal when you're planning from abroad.",
  },
  {
    number: "04",
    title: "We bring it to life",
    description:
      "Once you love it, we source, build and orchestrate it for real, down to the last candle.",
  },
] as const;
