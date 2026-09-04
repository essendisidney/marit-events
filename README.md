# Marit Events

Premium event experiences website — editorial, luxurious, conversion-focused.

**Live:** [maritevents.com](https://maritevents.com) (also [marit-events.vercel.app](https://marit-events.vercel.app))  
**Repo:** [github.com/essendisidney/marit-events](https://github.com/essendisidney/marit-events)

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

## Before launch

Contact in `src/lib/site.ts` is live (WhatsApp, Gmail, Instagram).

Still optional / pending:

- DNS for `maritevents.com` → Vercel (`A` `76.76.21.21`)
- Verified trust stats + named testimonials
- `RESEND_API_KEY` in Vercel env so enquiries are emailed server-side (see `.env.example`)
- Custom from-address once the domain is verified in Resend

Real event photos live in `public/events/`. Logo: `public/marit-logo.png`.
OG share image is generated at `/opengraph-image`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
