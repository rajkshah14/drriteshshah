import { Trans, useTranslation } from 'react-i18next'

const profileUrl = 'https://www.narayanahealth.org/c/ahmedabad/neurosurgery/dr-shah-ritesh'
const hospitalUrl = 'https://www.narayanahealth.org/ahmedabad/neuro-sciences'
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Narayana+Multispeciality+Hospital+Rakhial+Ahmedabad+380023'
const phone = 'tel:+918068617787'

function Brand({ t, labelled = false }) {
  return (
    <a className="brand" href="#main" aria-label={labelled ? t('accessibility.home') : undefined}>
      <span className="mark" aria-hidden="true">rs</span>
      <span><strong>{t('brand.name')}</strong><small>{t('brand.specialty')}</small></span>
    </a>
  )
}

function LanguageSwitcher({ t, language }) {
  return (
    <nav className="language-switch" aria-label={t('accessibility.language')}>
      <a href="/?lang=en" lang="en" hrefLang="en" data-language="en" aria-current={language === 'en' ? 'page' : undefined}>English</a>
      <a href="/gu/" lang="gu" hrefLang="gu" data-language="gu" aria-current={language === 'gu' ? 'page' : undefined}>ગુજરાતી</a>
      <a href="/hi/" lang="hi" hrefLang="hi" data-language="hi" aria-current={language === 'hi' ? 'page' : undefined}>हिन्दी</a>
    </nav>
  )
}

const specialties = [
  {
    key: 'brain',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20 8c-5-6-13-1-11 5-6 1-7 9-2 12-2 6 4 11 9 9 3 2 4-1 4-3V8Zm0 0c5-6 13-1 11 5 6 1 7 9 2 12 2 6-4 11-9 9-3 2-4-1-4-3"/><path d="M9 13c4-1 6 2 6 5M7 25c3-3 7-2 8 1m16-13c-4-1-6 2-6 5m8 7c-3-3-7-2-8 1"/></svg>,
  },
  {
    key: 'spine',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M18 3c-8 12 13 21 4 34M23 3c-8 12 13 21 4 34"/><path d="m15 8 11-1M15 14l12-2m-8 9 12-3m-9 10 11-3m-13 9 11-2"/></svg>,
  },
  {
    key: 'endoscopic',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="5"/><path d="M20 2v8m0 20v8M2 20h8m20 0h8m-8-10 5-5M5 35l5-5"/></svg>,
  },
  {
    key: 'vascular',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20 36V23L8 11V3m12 20 12-12V3M20 3v12L8 27v10m12-22 12 12v10"/><circle cx="20" cy="20" r="4" fill="var(--cream)"/></svg>,
  },
  {
    key: 'peripheral',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20 3v13m0 0L9 25m11-9 11 9M9 25l-5 10m5-10 4 10m18-10-4 10m4-10 5 10M10 5l10 11L30 5"/><circle cx="20" cy="16" r="4" fill="var(--cream)"/></svg>,
  },
  {
    key: 'trauma',
    icon: <svg className="icon" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20 3 6 9v11c0 8 7 13 14 17 7-4 14-9 14-17V9L20 3Z"/><path d="M20 12v14m-7-7h14"/></svg>,
  },
]

export default function App() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage

  return (
    <div className="template">
      <a className="skip" href="#main">{t('accessibility.skip')}</a>
      <div className="topbar">
        <div className="wrap">
          <span>{t('brand.topbar')}</span>
          <a href={phone}>{t('brand.hospitalAppointments')}</a>
          <LanguageSwitcher t={t} language={language} />
        </div>
      </div>
      <header className="wrap nav">
        <Brand t={t} labelled />
        <nav className="navlinks" aria-label={t('accessibility.navigation')}>
          <a href="#expertise">{t('nav.expertise')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#visit">{t('nav.visit')}</a>
          <a className="button" href="#appointments">{t('nav.appointments')} <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main">
        <section className="wrap hero" aria-labelledby="hero-heading">
          <div>
            <p className="eyebrow"><span className="dot" aria-hidden="true"></span> {t('hero.eyebrow')}</p>
            <h1 id="hero-heading"><Trans i18nKey="hero.heading" components={{ emphasis: <em /> }} /></h1>
            <p className="intro">{t('hero.intro')}</p>
            <div className="actions">
              <a className="button" href="#appointments">{t('hero.consultation')} <span className="arrow" aria-hidden="true">↗</span></a>
              <a className="button outline" href="#expertise">{t('hero.expertise')}</a>
            </div>
            <p className="subnote">{t('hero.qualifications')}</p>
          </div>
          <div className="portrait-card">
            <div className="portrait-bg" aria-hidden="true"></div>
            <img className="portrait" src="/portrait.jpg" width="637" height="694" alt={t('accessibility.portrait')} fetchPriority="high" />
            <div className="portrait-number" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M16 5c-4-5-10-1-9 3-5 1-6 7-3 10-2 5 2 10 7 9 2 3 5 1 5-2V5Zm0 0c4-5 10-1 9 3 5 1 6 7 3 10 2 5-2 10-7 9-2 3-5 1-5-2"/><path d="M7 8c1 0 4 1 4 4m-7 6c2-2 5-1 6 1m1 8c-2-2-1-5 1-6M25 8c-1 0-4 1-4 4m7 6c-2-2-5-1-6 1m-1 8c2-2 1-5-1-6"/></svg>
            </div>
            <div className="portrait-label"><strong>{t('brand.name')}</strong><small>{t('brand.portraitCaption')}</small></div>
          </div>
        </section>
        <div className="qualifications">
          <div className="wrap qualification-grid">
            <div><small>{t('qualifications.speciality')}</small><strong>{t('qualifications.neurosurgery')}</strong></div>
            <div><small>{t('qualifications.advanced')}</small><strong>{t('qualifications.mch')}</strong></div>
            <div><small>{t('qualifications.hospitalLabel')}</small><strong>{t('qualifications.hospital')}</strong></div>
          </div>
        </div>
        <section className="wrap section" id="expertise" aria-labelledby="expertise-heading">
          <div className="section-heading">
            <div><p className="eyebrow">{t('expertise.eyebrow')}</p><h2 id="expertise-heading"><Trans i18nKey="expertise.heading" /></h2></div>
            <p>{t('expertise.intro')}</p>
          </div>
          <div className="specialties">
            {specialties.map(({ key, icon }) => (
              <article className="specialty" key={key}>{icon}<h3>{t(`expertise.${key}.title`)}</h3><p>{t(`expertise.${key}.description`)}</p></article>
            ))}
          </div>
        </section>
        <section className="about section" id="about" aria-labelledby="about-heading">
          <div className="wrap about-grid">
            <div><p className="eyebrow">{t('about.eyebrow')}</p><h2 id="about-heading">{t('brand.name')}</h2><p><Trans i18nKey="about.subtitle" /></p></div>
            <div>
              <p>{t('about.intro')}</p><p>{t('about.areas')}</p>
              <ul className="credentials">
                <li><span>{t('about.medical')}</span><strong>MBBS</strong></li>
                <li><span>{t('about.postgraduate')}</span><strong>{t('about.ms')}</strong></li>
                <li><span>{t('about.superSpeciality')}</span><strong>{t('qualifications.mch')}</strong></li>
              </ul>
              <a className="official" href={profileUrl} target="_blank" rel="noopener noreferrer">{t('about.official')} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
        <section className="wrap section visit-grid" id="visit" aria-labelledby="visit-heading">
          <div>
            <p className="eyebrow">{t('visit.eyebrow')}</p>
            <h2 id="visit-heading"><Trans i18nKey="visit.heading" /></h2>
            <p className="muted">{t('visit.intro')}</p>
            <ol className="steps">
              <li><div><strong>{t('visit.arrange')}</strong>{t('visit.arrangeDescription')}</div></li>
              <li><div><strong>{t('visit.records')}</strong>{t('visit.recordsDescription')}</div></li>
              <li><div><strong>{t('visit.questions')}</strong>{t('visit.questionsDescription')}</div></li>
            </ol>
          </div>
          <div className="visit-card">
            <span className="location-tag">{t('visit.city')}</span>
            <svg className="pin" aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M32 16c0 10-12 20-12 20S8 26 8 16a12 12 0 1 1 24 0Z"/><circle cx="20" cy="16" r="4"/></svg>
            <p className="eyebrow">{t('visit.location')}</p>
            <h3><Trans i18nKey="visit.hospital" /></h3>
            <address><Trans i18nKey="visit.address" /></address>
            <a className="button outline" href={mapsUrl} target="_blank" rel="noopener noreferrer">{t('visit.maps')} <span aria-hidden="true">↗</span></a>
            <p className="subnote" style={{ margin: '24px 0 0' }}>{t('visit.notice')}</p>
          </div>
        </section>
        <section className="faq section" aria-labelledby="faq-heading">
          <div className="wrap faq-grid">
            <div><p className="eyebrow">{t('faq.eyebrow')}</p><h2 id="faq-heading"><Trans i18nKey="faq.heading" /></h2></div>
            <div>
              <details><summary>{t('faq.locationQuestion')}</summary><p>{t('faq.locationAnswer')}</p></details>
              <details>
                <summary>{t('faq.appointmentQuestion')}</summary>
                <p><Trans i18nKey="faq.appointmentAnswer" components={{ phone: <a href={phone} />, profile: <a href={profileUrl} target="_blank" rel="noopener noreferrer" /> }} /></p>
              </details>
              <details><summary>{t('faq.recordsQuestion')}</summary><p>{t('faq.recordsAnswer')}</p></details>
              <details><summary>{t('faq.emergencyQuestion')}</summary><p>{t('faq.emergencyAnswer')}</p></details>
            </div>
          </div>
        </section>
        <section className="wrap contact" id="appointments" aria-labelledby="contact-heading">
          <div className="contact-box">
            <div><p className="eyebrow">{t('contact.eyebrow')}</p><h2 id="contact-heading">{t('contact.heading')}</h2><p>{t('contact.description')}</p></div>
            <div className="actions">
              <a className="button" href={phone}>{t('contact.call')} <span aria-hidden="true">↗</span></a>
              <a className="subnote" href={profileUrl} target="_blank" rel="noopener noreferrer">{t('contact.profile')}</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <Brand t={t} />
            <div className="footer-links"><a href="#expertise">{t('nav.expertise')}</a><a href="#visit">{t('footer.location')}</a><a href="#appointments">{t('nav.appointments')}</a></div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.note')}</p>
            <div className="sources">
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">{t('footer.profileSource')}</a>{' \u00a0 '}
              <a href={hospitalUrl} target="_blank" rel="noopener noreferrer">{t('footer.hospitalSource')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
