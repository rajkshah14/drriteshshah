import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import App from './App.jsx'
import { createI18n } from './i18n.js'

export function renderPage(language) {
  const i18n = createI18n(language)
  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}><App /></I18nextProvider>
    </StrictMode>,
  )
}
