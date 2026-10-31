import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json' with { type: 'json' }
import gu from './locales/gu.json' with { type: 'json' }
import hi from './locales/hi.json' with { type: 'json' }

export const resources = {
  en: { translation: en },
  gu: { translation: gu },
  hi: { translation: hi },
}

export const pageLanguages = {
  en: { htmlLang: 'en-IN', ogLocale: 'en_IN', path: '/' },
  gu: { htmlLang: 'gu-IN', ogLocale: 'gu_IN', path: '/gu/' },
  hi: { htmlLang: 'hi-IN', ogLocale: 'hi_IN', path: '/hi/' },
}

export function createI18n(language) {
  if (!Object.hasOwn(resources, language)) throw new Error(`Unsupported language: ${language}`)

  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    supportedLngs: Object.keys(resources),
    initAsync: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  return instance
}
