import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import test from 'node:test'
import { browserLanguageRedirect, preferredLanguage } from '../src/language.js'
import { createI18n, pageLanguages, resources } from '../src/i18n.js'

const location = (pathname = '/', search = '', hash = '') => ({ pathname, search, hash })
const leafKeys = (value, prefix = '') => Object.entries(value).flatMap(([key, child]) => {
  const path = prefix ? `${prefix}.${key}` : key
  return typeof child === 'string' ? [path] : leafKeys(child, path)
}).sort()

test('uses the first supported browser language and falls back to English', () => {
  assert.equal(preferredLanguage(['gu-IN', 'en-US']), 'gu')
  assert.equal(preferredLanguage(['HI-in', 'gu-IN']), 'hi')
  assert.equal(preferredLanguage(['en-US', 'gu-IN']), 'en')
  assert.equal(preferredLanguage(['fr-FR', 'hi-IN']), 'hi')
  assert.equal(preferredLanguage(['fr-FR', undefined]), 'en')
  assert.equal(preferredLanguage([]), 'en')
})

test('redirects only the default page and respects an explicit language choice', () => {
  assert.equal(browserLanguageRedirect(location('/', '?ref=search', '#visit'), ['gu-IN']), '/gu/?ref=search#visit')
  assert.equal(browserLanguageRedirect(location('/index.html'), ['hi-IN']), '/hi/')
  assert.equal(browserLanguageRedirect(location('/', '?lang=en'), ['gu-IN']), null)
  assert.equal(browserLanguageRedirect(location('/', '?lang=hi'), ['gu-IN']), '/hi/?lang=hi')
  assert.equal(browserLanguageRedirect(location('/gu/'), ['hi-IN']), null)
  assert.equal(browserLanguageRedirect(location('/hi/'), ['en-US']), null)
  assert.equal(browserLanguageRedirect(location(), ['en-US', 'gu-IN']), null)
})

test('provides complete, keyed i18next resources for every language', () => {
  const englishKeys = leafKeys(resources.en.translation)
  const richKeys = ['hero.heading', 'expertise.heading', 'about.subtitle', 'visit.heading', 'visit.hospital', 'visit.address', 'faq.heading', 'faq.appointmentAnswer']
  const tags = (text) => text.match(/<\/?[a-zA-Z]+\s*\/?>/g) ?? []

  for (const [language, resource] of Object.entries(resources)) {
    const i18n = createI18n(language)
    assert.equal(i18n.isInitialized, true)
    assert.equal(i18n.resolvedLanguage, language)
    assert.deepEqual(leafKeys(resource.translation), englishKeys)
    for (const key of englishKeys) {
      assert.equal(typeof i18n.t(key), 'string')
      assert.ok(i18n.t(key).trim(), `${language}: empty translation for ${key}`)
    }
    for (const key of richKeys) {
      assert.deepEqual(tags(i18n.t(key)), tags(createI18n('en').t(key)), `${language}: markup differs for ${key}`)
    }
  }
  assert.equal(createI18n('gu').t('nav.expertise'), 'વિશેષતા')
  assert.equal(createI18n('hi').t('nav.expertise'), 'विशेषज्ञता')
  assert.throws(() => createI18n('fr'), /Unsupported language: fr/)
})

test('builds indexable HTML, metadata, assets and sitemap entries for every language', () => {
  const expectedText = {
    en: ['Brain &amp; spine care.', 'Where does Dr Ritesh Shah consult?'],
    gu: ['મગજ અને કરોડની સંભાળ.', 'ડૉ. રિતેશ શાહ ક્યાં પરામર્શ આપે છે?'],
    hi: ['मस्तिष्क और रीढ़ की देखभाल।', 'डॉ. रितेश शाह कहाँ परामर्श देते हैं?'],
  }
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
  const llms = readFileSync(new URL('../dist/llms.txt', import.meta.url), 'utf8')
  const portrait = readFileSync(new URL('../dist/portrait.jpg', import.meta.url))
  assert.equal(portrait[0], 0xff)
  assert.equal(portrait[1], 0xd8)
  let englishLinks
  let englishIds

  for (const [language, metadata] of Object.entries(pageLanguages)) {
    const file = language === 'en' ? '../dist/index.html' : `../dist/${language}/index.html`
    const html = readFileSync(new URL(file, import.meta.url), 'utf8')
    const canonical = `https://drriteshshah.com${metadata.path}`
    const i18n = createI18n(language)
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((match) => match[1])
    const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1])
    if (language === 'en') {
      englishLinks = links
      englishIds = ids
    } else {
      assert.deepEqual(links, englishLinks)
      assert.deepEqual(ids, englishIds)
    }

    assert.ok(html.includes(`<html lang="${metadata.htmlLang}">`))
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`))
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`))
    assert.ok(html.includes(`<title>${i18n.t('meta.title')}</title>`))
    for (const text of expectedText[language]) assert.ok(html.includes(text))
    assert.ok(html.includes(`data-language="${language}" aria-current="page"`))
    assert.ok(html.includes('tel:+918068617787'))
    assert.ok(html.includes('src="/portrait.jpg"'))
    assert.equal((html.match(/<details>/g) ?? []).length, 4)
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`))
    assert.ok(!html.includes('__PAGE_'))
    for (const [alternate, path] of [['en', '/'], ['gu', '/gu/'], ['hi', '/hi/'], ['x-default', '/']]) {
      assert.ok(html.includes(`hreflang="${alternate}" href="https://drriteshshah.com${path}"`))
    }
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
      assert.ok(existsSync(new URL(`../dist${match[1]}`, import.meta.url)), `Missing asset ${match[1]}`)
    }

    const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    assert.equal(JSON.parse(jsonLd[1]).telephone, '+91-80-6861-7787')
  }
  assert.ok(llms.includes('https://drriteshshah.com/gu/'))
  assert.ok(llms.includes('https://drriteshshah.com/hi/'))
})
