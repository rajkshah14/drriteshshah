import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createI18n, pageLanguages } from './src/i18n.js'

const root = fileURLToPath(new URL('.', import.meta.url))
const entries = {
  en: resolve(root, 'index.html'),
  gu: resolve(root, 'gu/index.html'),
  hi: resolve(root, 'hi/index.html'),
}

let isBuild = false
let renderServer

const prerender = {
  name: 'prerender-localized-pages',
  configResolved(config) {
    isBuild = config.command === 'build'
  },
  async buildStart() {
    if (isBuild) {
      renderServer = await createServer({
        configFile: false,
        root,
        plugins: [react()],
        server: { middlewareMode: true },
        appType: 'custom',
        logLevel: 'error',
      })
    }
  },
  transformIndexHtml: {
    order: 'pre',
    async handler(html, { filename, server }) {
      const language = Object.keys(entries).find((key) => entries[key] === resolve(filename))
      if (!language) throw new Error(`Unknown HTML entry: ${filename}`)

      const metadata = pageLanguages[language]
      const i18n = createI18n(language)
      const values = {
        __PAGE_LANG__: metadata.htmlLang,
        __PAGE_TITLE__: i18n.t('meta.title'),
        __PAGE_DESCRIPTION__: i18n.t('meta.description'),
        __SOCIAL_DESCRIPTION__: i18n.t('meta.socialDescription'),
        __SITE_NAME__: i18n.t('meta.siteName'),
        __OG_LOCALE__: metadata.ogLocale,
        __PAGE_URL__: `https://drriteshshah.com${metadata.path}`,
      }

      // Localized entry files share the English HTML shell and its structured data.
      let shell = language === 'en' ? html : readFileSync(entries.en, 'utf8')
      for (const [placeholder, value] of Object.entries(values)) {
        if (!shell.includes(placeholder)) throw new Error(`Missing HTML placeholder: ${placeholder}`)
        shell = shell.replaceAll(placeholder, value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'))
      }

      const rootElement = '<div id="root"></div>'
      if (!shell.includes(rootElement)) throw new Error('Missing root element in HTML shell')
      const renderer = server ?? renderServer
      if (!renderer) throw new Error('Missing Vite server for prerendering')
      const { renderPage } = await renderer.ssrLoadModule('/src/render.jsx')
      return shell.replace(rootElement, () => `<div id="root">${renderPage(language)}</div>`)
    },
  },
  async closeBundle() {
    await renderServer?.close()
  },
}

export default defineConfig({
  plugins: [react(), prerender],
  build: {
    rollupOptions: { input: entries },
  },
})
