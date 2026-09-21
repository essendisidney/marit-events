# Marit Events

Premium event experiences website — editorial, luxurious, conversion-focused.

**Live:** [maritevents.com](https://maritevents.com)  
**Repo:** [github.com/essendisidney/marit-events](https://github.com/essendisidney/marit-events)  
**Host:** **Vercel only** (GitHub `main` → production). Do not run a second live copy on DigitalOcean.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- TypeScript
- Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s live

Contact in `src/lib/site.ts` (WhatsApp, Gmail, Instagram).  
Portfolio photos in `public/events/`. Logo: `public/marit-logo.png`.  
OG share image: `/opengraph-image`. Abroad path: `/destination/from-abroad`.  
Privacy: `/privacy`. Enquire emails: HTML + client auto-reply via Resend (see `.env.example`).

## Rose / ops (not code)

1. **Shut down DigitalOcean** if an old app/droplet still exists — Vercel is production.
2. **Resend** — set `RESEND_API_KEY` + `ENQUIRE_TO_EMAIL` in Vercel; verify `maritevents.com`; set `RESEND_FROM_EMAIL` (e.g. `Marit Events <hello@maritevents.com>`).
3. **Google Business Profile** + Search Console — submit `https://maritevents.com/sitemap.xml`.
4. **Instagram bio** → `https://maritevents.com/enquire` or `/destination/from-abroad`.
5. **Authenticity when ready** — named testimonials (with permission), verified numbers only, higher-res event photos, replace Unsplash destination shots with owned images.

Optional: Google Calendar env vars for live date checks on enquire (see `.env.example`).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
