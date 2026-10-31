# drriteshshah.com

Official website of **Dr Ritesh Shah**, MBBS, MS (General Surgery), MCh (Neurosurgery), Visiting Consultant in Neurosurgery at Narayana Multispeciality Hospital, Rakhial, Ahmedabad.

Live: https://drriteshshah.com

## Stack

React 19 + Vite 8, with i18next and react-i18next for localization. Deployed to GitHub Pages with GitHub Actions.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Shared HTML shell and JSON-LD (SEO) |
| `gu/index.html`, `hi/index.html` | Localized build entries using the shared shell |
| `src/App.jsx` | Shared React page markup |
| `src/locales/*.json` | English, Gujarati and Hindi translation resources and per-language metadata |
| `src/i18n.js` | i18next configuration and supported page languages |
| `src/language.js` | Browser-language selection for the homepage |
| `src/styles.css` | Page styles |
| `src/render.jsx`, `vite.config.js` | Prerender the React page in all three languages |
| `public/` | Portrait, `CNAME`, favicon, `robots.txt`, `sitemap.xml`, `llms.txt` (copied as-is) |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages on push to `main` |

## Develop

```sh
npm ci
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve dist/
npm test         # build and run localization checks
```

## Languages

The site has English (`/`), Gujarati (`/gu/`) and Hindi (`/hi/`) versions. On the homepage, JavaScript selects the first supported browser language automatically; English is the fallback. Visitors can also use the language links in the header. Explicit Gujarati and Hindi URLs are never redirected, and the English link uses `/?lang=en` to override browser detection.

All three versions are prerendered, have their own canonical and `hreflang` links, and work without JavaScript. When changing page copy, update the matching keys in all three files in `src/locales/`; `npm test` checks for matching keys and rich-text tags, not translation accuracy. Have a qualified speaker review medical translations before publishing.

## Deploy

Push to `main`. The workflow builds and publishes `dist/` to GitHub Pages.

- Pages **Source must be "GitHub Actions"** (`build_type: workflow`). With "Deploy from a branch", Pages serves unbuilt source and the site shows a blank page.
- Domain: `drriteshshah.com` (DNS at Spaceship: apex A records to GitHub Pages, `www` CNAME to `rajkshah14.github.io`). HTTPS is enforced.
- Pages caches for about 10 minutes, so changes may take that long to appear.

## Content sources

Credentials, address and appointment number come from the [official Narayana Health profile](https://www.narayanahealth.org/c/ahmedabad/neurosurgery/dr-shah-ritesh). Do not add experience, fees, timings or reviews unless they are verified. Get permission before using the hospital's portrait.
