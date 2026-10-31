import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import './styles.css'
import App from './App.jsx'
import { createI18n } from './i18n.js'
import { browserLanguageRedirect } from './language.js'

const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
const redirect = browserLanguageRedirect(window.location, languages)

if (redirect) {
  window.location.replace(redirect)
} else {
  const i18n = createI18n(document.documentElement.lang.split('-')[0])
  hydrateRoot(
    document.getElementById('root'),
    <StrictMode>
      <I18nextProvider i18n={i18n}><App /></I18nextProvider>
    </StrictMode>,
  )
}
