import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { weddingFaqs } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal, SectionHeading } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { InstagramStrip } from "@/components/InstagramStrip";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Intimate celebrations to destination weddings — your day, your story, your moment with Marit Events.",
};

const weddingMoments = [
  {
    title: "Intimate",
    body: "Small gatherings with quiet luxury and personal pacing.",
    image: images.entranceDraped,
  },
  {
    title: "Destination",
    body: "Kenya as the stage — coast, city or wilderness, fully hosted.",
    image: images.dianiSunset,
  },
  {
    title: "Heritage",
    body: "Culture and craft woven into an international standard.",
    image: images.weddingFormal,
  },
];

export default function WeddingsPage() {
  return (
    <div>
      <section className="relative min-h-[85svh] overflow-hidden">
        <Image
          src={images.weddingFormal}
          alt="Marit Events wedding marquee with African print and gold chargers"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/20" />
        <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 md:px-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Weddings
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
              Your day.
              <br />
              Your story.
              <br />
              Your moment.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ivory/75">
              From intimate celebrations to spectacular destination weddings,
              Marit brings together the people, places and details that make
              your story unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="Designed around you — not a template."
              body="We listen first. Then we curate venues, suppliers and a timeline that feels effortless on the day. You arrive to a celebration that is unmistakably yours."
            />
            <Link
              href="/enquire"
              className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-champagne"
            >
              Begin your wedding enquiry
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.weddingPortrait}
                alt="Draped floral entrance styled by Marit Events"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-obsidian-soft px-5 py-24 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Ways to celebrate
            </p>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-5xl">
              Every love story asks for a different room.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {weddingMoments.map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i}>
                <article className="group relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-3xl text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-taupe">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={[...weddingFaqs]} title="Planning a wedding with Marit" />
      <InstagramStrip />
    </div>
  );
}
