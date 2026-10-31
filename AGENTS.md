# AGENTS.md

Single-page site for Dr Ritesh Shah (neurosurgeon, spine focus, Narayana Multispeciality Hospital, Rakhial, Ahmedabad). React 19 + Vite 8, deployed on GitHub Pages at drriteshshah.com.

## Rules

- **Design follows the owner's supplied design.** Do not restyle or refactor it unless the user asks. The language switch and script-specific typography are intentional additions.
- Shared page markup lives in `src/App.jsx`. English, Gujarati and Hindi copy lives in `src/locales/*.json` and uses i18next; update matching keys in every language and run `npm test`.
- **Never invent medical facts.** That includes credentials, years of experience, procedures, fees, timings, reviews and testimonials. Use only facts from the official Narayana Health profile or facts the user gives you.
- SEO lives in `index.html` (`<head>` meta and JSON-LD) and in `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt`. Keep name, address and phone identical everywhere.
- `src/render.jsx` and `vite.config.js` prerender `/`, `/gu/` and `/hi/` with the same i18next configuration used by `src/main.jsx` during hydration. The homepage selects a browser language; explicit locale URLs and the English `?lang=en` link override detection.
- Static files go in `public/`. Do not delete `public/CNAME`.

## Commands

- `npm ci`: install dependencies
- `npm run build`: production build into `dist/`. Run it to verify changes
- `npm test`: build and run localization checks
- `npm run dev`: local dev server

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`. GitHub Pages must stay on `build_type: workflow`; with "legacy" the live site renders blank. Check with `gh api repos/rajkshah14/drriteshshah/pages`.

## Git

Commit or push only when the user asks.
