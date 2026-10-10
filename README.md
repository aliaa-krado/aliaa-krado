# Aliaa Krado — Portfolio

A dark-first, motion-rich personal portfolio for a QA Specialist, built with
**Next.js 16 (App Router)**, **Tailwind CSS v4**, **GSAP + ScrollTrigger**, **Motion** and **Lenis**.

## Highlights

- **Hero** — masked word-reveal headline, pointer-follow spotlight, magnetic CTAs, and a looping
  animated illustrative QA checklist in a terminal-style window.
- **About** — words brighten as you scroll (scrubbed ScrollTrigger), animated counters, education card, CV download.
- **Skills** — bento grid of cursor-tracking spotlight cards, top skills highlighted, infinite tool marquee.
- **Experience** — timeline whose rail fills as you scroll; milestones light up as you reach them.
- **Projects** — selected client work with three featured entries, public product previews, platform filters, and website/app-store links.
- **Contact** — floating-label form with inline validation, copy-email button, Formspree or mailto delivery.
- Dark mode by default + light theme toggle (no flash), scroll progress bar, hide-on-scroll nav, mobile menu.
- Accessible: semantic landmarks, skip link, visible focus, `prefers-reduced-motion` fully respected
  (all motion disabled, content rendered in its final state).

## Edit your content

Everything lives in **`src/data/portfolio.ts`** — profile, socials, about, skills, experience, education and projects.

- Add your GitHub URL to `profile.socials.github` to show the GitHub icon.
- The **projects** contain selected real work, ordered by platform breadth and product complexity.
  Previews live in `public/projects`; internal apps show an access-restricted visual instead.
- `public/Aliaa-Krado-CV.pdf` powers the "Download CV" button.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy (Vercel — recommended)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new, import the repo, keep the defaults (framework: Next.js) and click **Deploy**.
3. Optional: add `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_FORMSPREE_ID` under *Project → Settings → Environment Variables*.

Or from the terminal: `npx vercel` (then `npx vercel --prod`).

### Contact form delivery

Create a free form at https://formspree.io, copy its ID into `NEXT_PUBLIC_FORMSPREE_ID`, and redeploy.
Without it, submitting opens the visitor's email client with the message pre-filled.

## Project structure

```
src/
  app/            layout (fonts, metadata, theme boot script), page, global tokens
  components/     Nav, Hero, TestTerminal, About, Skills, Experience, Projects, Contact, Footer
  components/ui/  Button, Magnetic, Spotlight, SectionHeading, Socials
  data/           portfolio.ts  ← all content
  lib/            gsap.ts (plugin registration), lenis.ts (smooth scroll helpers)
```
