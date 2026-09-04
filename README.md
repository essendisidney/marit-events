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

Update contact details in `src/lib/site.ts`:

- `email`
- `phone` / `whatsapp`
- `instagram`
- Trust stats (only verified numbers)
- Destination list (only locations Marit actually services)
- Optional: `NEXT_PUBLIC_SITE_URL` for custom domain

Real event photos live in `public/events/`. Logo: `public/marit-logo.png`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
