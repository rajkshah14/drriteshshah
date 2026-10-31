# drriteshshah.com

Official website of **Dr Ritesh Shah**, MBBS, MS (General Surgery), MCh (Neurosurgery), Visiting Consultant in Neurosurgery at Narayana Multispeciality Hospital, Rakhial, Ahmedabad.

Live: https://drriteshshah.com

## Stack

React 19 + Vite 8, deployed to GitHub Pages with GitHub Actions.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | `<head>`: title, meta description, Open Graph, JSON-LD (SEO) |
| `src/page.html` | All visible page content. Edit text here |
| `src/styles.css` | Page styles |
| `src/App.jsx` | Renders `page.html` |
| `public/` | `CNAME`, `favicon.svg`, `robots.txt`, `sitemap.xml` (copied as-is) |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages on push to `main` |

## Develop

```sh
npm ci
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve dist/
```

## Deploy

Push to `main`. The workflow builds and publishes `dist/` to GitHub Pages.

- Pages **Source must be "GitHub Actions"** (`build_type: workflow`). With "Deploy from a branch", Pages serves unbuilt source and the site shows a blank page.
- Domain: `drriteshshah.com` (DNS at Spaceship: apex A records to GitHub Pages, `www` CNAME to `rajkshah14.github.io`). HTTPS is enforced.
- Pages caches for about 10 minutes, so changes may take that long to appear.

## Content sources

Credentials, address and appointment number come from the [official Narayana Health profile](https://www.narayanahealth.org/c/ahmedabad/neurosurgery/dr-shah-ritesh). Do not add experience, fees, timings or reviews unless they are verified. Get permission before using the hospital's portrait.
