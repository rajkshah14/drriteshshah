import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Prerender: put the page markup in index.html so crawlers see it without JS.
const prerender = {
  name: 'prerender-page',
  transformIndexHtml: (html) =>
    html.replace(
      '<div id="root"></div>',
      () => `<div id="root"><div class="template">${readFileSync('src/page.html', 'utf8')}</div></div>`,
    ),
}

export default defineConfig({
  plugins: [react(), prerender],
})
