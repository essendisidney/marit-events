# Marit Events — Global Growth Kit

Ready-to-use copy and checklists for the non-code work that wins international
clients. Everything here is written to be honest: don't add numbers, client
names or partnerships until they're real.

---

## 1. This week — switch-ons (Vercel + accounts)

| Task | Where | Notes |
|---|---|---|
| Create `hello@maritevents.com` | Google Workspace / Zoho / forwarding | Then set `NEXT_PUBLIC_CONTACT_EMAIL=hello@maritevents.com` in Vercel and redeploy. Also set `RESEND_FROM_EMAIL=Marit Events <hello@maritevents.com>` after verifying the domain in Resend. |
| Booking page | cal.com or calendly.com | 30-min "Introduction call", buffer 15 min, hours 8am–8pm EAT, ask "Where are you joining from?". Set `NEXT_PUBLIC_BOOKING_URL` in Vercel and redeploy. |
| Confirm package prices | `src/lib/packages.ts` | Starting prices are currently the enquiry-form budget-band floors. |
| Google Business Profile | business.google.com | Category: *Wedding planner* (secondary: *Event planner*). Use the description below. Add all real photos. |
| Search Console | search.google.com/search-console | Submit `https://maritevents.com/sitemap.xml`. |

---

## 2. Collecting real testimonials

Send after every event (within 7 days, while it's fresh):

> Hi {name}, thank you again for trusting Marit with {event}. It was a joy.
> Would you share two or three sentences about how it felt to work with us?
> With your permission we'd love to feature it on our website with your first
> names and the city you live in (e.g. "Amina & James, London"). A Google review
> would mean the world too: {Google review link}
> — Rose

Then add it in `src/lib/site.ts` → `testimonials`, filling `client` and `from`.
Named testimonials automatically appear with the client's name and are published
to Google as reviews.

---

## 3. Directory listings

List on each, using the same name, phone, website and photos everywhere.

| Directory | Market | Priority |
|---|---|---|
| Google Business Profile | Global | Must |
| The Knot / WeddingWire | US | High |
| Hitched.co.uk | UK | High |
| Bridebook | UK | High |
| Zola | US | Medium |
| Destination Wedding directories (e.g. Junebug, Rock My Wedding supplier lists) | Global | Medium |
| Tripadvisor (Events) | Global travellers | Medium |

**Short bio (≈150 chars):**
> Nairobi-based wedding & event planners orchestrating city, coast and safari
> celebrations across Kenya — for couples at home and abroad.

**Long description:**
> Marit Events designs and orchestrates weddings, destination celebrations and
> corporate events across Kenya — from Nairobi's gardens and ballrooms to
> Diani's beaches and ceremonies in the Maasai Mara and Amboseli.
>
> We're your team on the ground when you're planning from London, Dubai,
> New York or Johannesburg: venues, vendors, guest travel, legal paperwork
> guidance and full on-the-day orchestration, with video calls and WhatsApp
> that respect your time zone. Clear starting prices in USD and KES, and a reply
> within 2 hours (8am–8pm Nairobi time).
>
> Founded by Rose Kimonge — Diploma in Event Management, Certificate in
> Wedding Planning.

---

## 4. Portfolio shoot brief

Goal: replace stock destination images and give international couples proof.

- **Shoot 1 — Diani beach ceremony (styled).** Arch on the sand, aisle,
  sunset reception table for 10. Golden hour. Hire models or a real couple
  in exchange for photos.
- **Shoot 2 — Safari vows (Mara or Amboseli).** Small ceremony, bush dinner
  with lanterns, sundowner set-up. Coordinate with a lodge that wants the
  content too (share costs).
- **Deliverables:** 40+ edited photos (landscape + portrait), 3 vertical
  15–30s reels, one 60–90s film. Ask for full commercial usage rights.
- **Then:** add files to `public/events/`, update `src/lib/images.ts`
  (`dianiSunset`, `maraBalloon`, `amboseli`, etc.) and add portfolio entries.

---

## 5. Diaspora ad campaign (Meta: Instagram + Facebook)

**Landing page:** `https://maritevents.com/destination/from-abroad`

**Audiences**
- Locations: UK, US, Canada, UAE, Germany, South Africa
- Interests: Kenya, Nairobi, East African culture, wedding planning, engaged
- Life event: Engaged (6 months / 1 year)
- Optional: people who speak Swahili

**Budget to start:** $10–15/day for 3 weeks, split across 2–3 ads; keep the
best performer by cost per enquiry.

**Ad copy A — Homecoming**
> Getting married back home in Kenya? 🇰🇪
> You plan from London. We handle everything on the ground — venues, vendors,
> family, guest travel and the day itself.
> Free 30-minute video call. → Book yours

**Ad copy B — Safari vows**
> Say "I do" with the Maasai Mara at your back.
> Destination weddings & safari celebrations across Kenya, planned remotely and
> delivered perfectly. Starting prices on our site.

**Ad copy C — Clarity**
> Planning a wedding in Kenya from abroad shouldn't feel chaotic.
> Clear prices in USD. Replies within 2 hours. A team on the ground.

**Measure:** Vercel Analytics events `enquire_submit`, `whatsapp_click`,
`cta_click` (source `abroad_*`).

---

## 6. Partner outreach

**To wedding planners abroad (referrals):**

> Subject: Your clients' Kenya weddings — a trusted team on the ground
>
> Hi {name}, I'm Rose, founder of Marit Events in Nairobi. When your couples
> want to marry in Kenya — Nairobi, the coast or on safari — we can be your
> local partner: venues, vendors, legal paperwork guidance and full
> orchestration, with you staying the client's lead planner.
> We offer a referral fee of {x}% on confirmed bookings. Could we have a
> 20-minute call? {booking link}

**To safari lodges & coast resorts:**

> Hi {name}, Marit Events plans weddings and celebrations across Kenya, and we
> increasingly get couples asking for safari and beach ceremonies. We'd love to
> recommend {lodge} — could we discuss wedding capacity, exclusive-use rates and
> a styled shoot on site that we'd share with you for marketing?

**To corporates, NGOs and international organisations in Nairobi:**

> Subject: Conferences, retreats and launches — orchestrated end to end
>
> Hi {name}, Marit Events delivers conferences, gala dinners, team retreats and
> brand launches in Nairobi and across Kenya — venue, AV, supplier management
> and delegate experience. Our company profile is attached
> (maritevents.com/downloads). Would a short call be useful ahead of your next
> event?

---

## 7. Content calendar (one guide a month)

Each new guide goes in `src/lib/journal.ts` (use `"## "` for section headings).

1. Kenya wedding cost breakdown (USD) — once real price data is confirmed
2. Best time of year for a Kenya wedding (seasons, migration, rains)
3. Diani vs Zanzibar vs Mauritius for a beach wedding
4. A Kenyan traditional ceremony (ruracio / koito / ngurario) for diaspora couples
5. Guest travel guide: visas (eTA), flights and stays for a Kenya wedding
6. Safari wedding in the Maasai Mara: what's possible and what it costs
