export function preferredLanguage(languages) {
  for (const language of languages) {
    if (typeof language !== 'string') continue
    const primary = language.toLowerCase().split(/[-_]/, 1)[0]
    if (['en', 'gu', 'hi'].includes(primary)) return primary
  }
  return 'en'
}

export function browserLanguageRedirect({ pathname, search, hash }, languages) {
  if (pathname !== '/' && pathname !== '/index.html') return null

  const requested = new URLSearchParams(search).get('lang')
  const language = ['en', 'gu', 'hi'].includes(requested) ? requested : preferredLanguage(languages)
  return language === 'en' ? null : `/${language}/${search}${hash}`
}
