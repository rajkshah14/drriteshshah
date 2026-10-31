# AGENTS.md

Single-page site for Dr Ritesh Shah (neurosurgeon, spine focus, Narayana Multispeciality Hospital, Rakhial, Ahmedabad). React 19 + Vite 8, deployed on GitHub Pages at drriteshshah.com.

## Rules

- **Design is a verbatim copy of the owner's supplied design.** `src/page.html` and `src/styles.css` must not be restyled, refactored or "improved" unless the user asks. Make text edits in `src/page.html`.
- **Never invent medical facts.** That includes credentials, years of experience, procedures, fees, timings, reviews and testimonials. Use only facts from the official Narayana Health profile or facts the user gives you.
- SEO lives in `index.html` (`<head>` meta and JSON-LD) and in `public/robots.txt` and `public/sitemap.xml`. Keep name, address and phone identical everywhere.
- `vite.config.js` prerenders `src/page.html` into `index.html` at build time, and `src/main.jsx` hydrates it. `App.jsx` must render exactly the same markup.
- Static files go in `public/`. Do not delete `public/CNAME`.

## Commands

- `npm ci`: install dependencies
- `npm run build`: production build into `dist/`. Run it to verify changes
- `npm run dev`: local dev server

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`. GitHub Pages must stay on `build_type: workflow`; with "legacy" the live site renders blank. Check with `gh api repos/rajkshah14/drriteshshah/pages`.

## Git

Commit or push only when the user asks.
