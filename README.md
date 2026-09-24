# Maaz Ali — Portfolio

Editorial portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Lenis smooth scroll and React View Transitions. Motion (framer-motion) powers the mobile menu.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm run start      # serve the production build
npm run type-check
```

Node 20.9 or newer is required.

## Editing content

Everything on the site comes from one file: `src/content/site.ts`.

- `site`: name, headline, intro, statement, email, links, timezone.
- `projects`: every project. `tier` decides where it appears:
  - `featured`: large brand-stage cards at the top of Selected work
  - `selected`: the "Also built" row
  - `index`: the "More work" grid
- `caseStudy: true` gives a project its own page at `/work/<slug>`.
- `experience`, `education`, `stack`: the timeline and stack sections.

Only add facts that are true and verifiable. `outcomes` and `stats` are shown prominently.

### Images

Put screenshots in `public/work/<slug>/` and list them in the project's `images` array. Capture pages at 1440×900 with 2× pixel density for crisp results. WebP is ideal, and Next.js optimises every image automatically.

Per-image options:

- `zoom`: scale inside slideshow windows, for dense dashboards (for example `1.25`)
- `focus`: crop anchor, as a CSS `object-position` (default `left top`)
- `stripOnly`: used only by the hero strip, hidden everywhere else

Per-project options:

- `color`: brand colour, used for the hero strip tile and stages
- `stage`: a custom stage colour when the brand colour clashes with the product UI
- `showcaseFrom`: the image the featured slideshow and case study start from (the hero strip always uses the first image)
- `offline`: hides outbound links while a live site is down

### Hero portrait

A transparent cutout in `public/portrait/`, pre-sized as `mobile-<width>.webp` at 480, 720, 960 and 1254px and served as-is, because the image optimiser's AVIF softens hair and skin. Phones show it large on a studio backdrop; from 768px wide it is a small circle beside the intro. Replace all four sizes when you change the photo.

## Domain and SEO

Set `NEXT_PUBLIC_SITE_URL` in Vercel (for example `https://yourdomain.com`). Metadata, Open Graph images, `sitemap.xml` and `robots.txt` all follow it. It defaults to `https://maazport.vercel.app`.

## Accessibility and motion

All motion respects `prefers-reduced-motion`. Slideshows and the hero strip have pause controls and never autoplay for reduced-motion users. Scroll reveals only hide content once JavaScript has loaded.
