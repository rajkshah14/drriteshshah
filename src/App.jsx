import { useEffect, useMemo, useRef, useState } from 'react'
import { CONTACT, CLINIC, TREATMENTS, VISIT, FAQ } from './data.js'

const TZ = 'Asia/Kolkata'
const DAY = new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', weekday: 'short' })
const DATE = new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'short' })
const LONG = new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' })
const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

function istNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(new Date()).map((p) => [p.type, Number(p.value)]),
  )
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day))
  return { date, hour: parts.hour, minute: parts.minute, dow: date.getUTCDay() }
}

function hourLabel(h) {
  const s = h < 12 ? 'am' : 'pm'
  return `${h > 12 ? h - 12 : h} ${s}`
}

function workingDays(count = 6) {
  const now = istNow()
  const days = []
  for (let i = 0; days.length < count; i++) {
    const d = new Date(now.date.getTime() + i * 864e5)
    if (d.getUTCDay() === 0) continue
    const isToday = i === 0
    const slots = HOURS.map((h) => ({ h, open: !isToday || h > now.hour }))
    if (isToday && !slots.some((s) => s.open)) continue
    days.push({ d, isToday, isTomorrow: i === 1, slots })
  }
  return days
}

function openStatus() {
  const { hour, dow } = istNow()
  if (dow !== 0 && hour >= CLINIC.openHour && hour < CLINIC.closeHour) return 'Open now, until 8 pm'
  if (dow !== 0 && hour < CLINIC.openHour) return 'Closed now, opens today at 10 am'
  if (dow === 6 || dow === 0) return 'Closed now, opens Monday at 10 am'
  return 'Closed now, opens tomorrow at 10 am'
}

function Booking() {
  const days = useMemo(() => workingDays(), [])
  const [dayIdx, setDayIdx] = useState(0)
  const [hour, setHour] = useState(null)
  const [sent, setSent] = useState(false)
  const day = days[dayIdx]
  const slotOk = hour !== null && day.slots.find((s) => s.h === hour)?.open

  function submit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const when = `${LONG.format(day.d)}, around ${hourLabel(hour)}`
    const body = [
      'Hello, I would like to book a consultation with Dr Ritesh Shah.',
      '',
      `Preferred time: ${when}`,
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `About: ${f.get('about')}`,
    ].join('\n')
    const href = CONTACT.whatsapp
      ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`
      : `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Consultation request: ${when}`)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <form className="book" id="book" onSubmit={submit} aria-labelledby="book-title">
      <h2 id="book-title" className="book-title">Book a consultation</h2>
      <fieldset>
        <legend>Day</legend>
        <div className="days">
          {days.map((x, i) => (
            <button
              type="button" key={x.d.toISOString()} className="chip" aria-pressed={i === dayIdx}
              onClick={() => { setDayIdx(i); setSent(false) }}
            >
              <span>{x.isToday ? 'Today' : x.isTomorrow ? 'Tomorrow' : DAY.format(x.d)}</span>
              <span className="chip-sub">{DATE.format(x.d)}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Time</legend>
        <div className="hours">
          {day.slots.map((s) => (
            <button
              type="button" key={s.h} className="chip" disabled={!s.open} aria-pressed={s.h === hour && s.open}
              onClick={() => { setHour(s.h); setSent(false) }}
            >
              {hourLabel(s.h)}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="fields">
        <label><span>Name</span><input name="name" required autoComplete="name" /></label>
        <label><span>Phone</span><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></label>
        <label className="wide">
          <span>About</span>
          <select name="about" defaultValue="Back or leg pain">
            <option>Back or leg pain</option>
            <option>Neck or arm pain</option>
            <option>Spinal curve or deformity</option>
            <option>Spine injury or fracture</option>
            <option>Brain or nerve problem</option>
            <option>Second opinion on surgery</option>
          </select>
        </label>
      </div>
      <button className="btn btn-light" type="submit" disabled={!slotOk}>
        {slotOk ? `Request ${DAY.format(day.d)} ${DATE.format(day.d)}, ${hourLabel(hour)}` : 'Choose a time to book'}
      </button>
      <p className="book-note" aria-live="polite">
        {sent
          ? `Your ${CONTACT.whatsapp ? 'WhatsApp' : 'email app'} has opened with the request. The clinic will call to confirm the time.`
          : 'The clinic calls back to confirm your time.'}
      </p>
    </form>
  )
}

function useRise() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-rise]')
    if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('in'))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useWordmark(ref) {
  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / window.innerHeight))
      el.style.setProperty('--grow', (0.92 + 0.08 * p).toFixed(4))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [ref])
}

export default function App() {
  const [status, setStatus] = useState(openStatus)
  const wordmark = useRef(null)
  useRise()
  useWordmark(wordmark)
  useEffect(() => {
    const t = setInterval(() => setStatus(openStatus()), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <div className="split">
        <nav className="nav" aria-label="Main">
          <a href="#about">About</a>
          <a href="#treatments">Treatments</a>
          <a href="#visit">First visit</a>
          <a href="#clinic">Clinic</a>
          <a className="nav-book" href="#book">Book</a>
        </nav>

        <aside className="panel">
          <header className="panel-head">
            <h1 className="name">Dr Ritesh Shah</h1>
            <p className="role">Spine surgeon and neurosurgeon in Ahmedabad, at Narayana Multispeciality Hospital, Rakhial.</p>
            <p className="status"><span className="dot" aria-hidden="true" />{status}</p>
          </header>
          <Booking />
        </aside>

        <main className="col">
          <section className="intro" aria-labelledby="intro-title">
            <h2 id="intro-title" data-rise>Spine first, surgery last</h2>
            <p className="statement" data-rise>
              Most back and neck pain never needs an operation. When yours does, it should be the smallest one that will solve it.
            </p>
            <dl className="figures" data-rise>
              <div><dt>13+</dt><dd>years in neurosurgery</dd></div>
              <div><dt>MCh</dt><dd>super-speciality degree in neurosurgery</dd></div>
              <div><dt>6</dt><dd>days a week, 10 am to 8 pm</dd></div>
            </dl>
          </section>

          <section className="treat" id="treatments" aria-labelledby="treat-title">
            <h2 id="treat-title" className="treat-title" data-rise>What he treats</h2>
            <div className="treat-list">
              {TREATMENTS.map((t) => (
                <article className="treat-item" key={t.title} data-rise>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <ul>{t.does.map((d) => <li key={d}>{d}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="about" id="about" aria-labelledby="about-title">
            <h2 id="about-title" data-rise>A note from Dr Shah</h2>
            <div className="letter" data-rise>
              <p>
                I am a neurosurgeon, and most of my days are spent on the spine: discs that press on a nerve, canals that have
                narrowed, necks that have begun to squeeze the cord, curves and fractures that need straightening and holding.
              </p>
              <p>
                <mark>The most useful thing I do happens before any operation:</mark> sitting with you and your scans, finding
                exactly where the trouble is, and telling you plainly whether surgery will help.
              </p>
              <p>
                When it will, I choose the least disruptive route that does the job, through an endoscope or a small tube where
                that is safe, so you are back on your feet sooner.
              </p>
              <p>Bring every scan you have. We will go through them together.</p>
              <p className="sign">Ritesh Shah<span>Spine surgeon and neurosurgeon</span></p>
            </div>
            <dl className="training" data-rise>
              <div><dt>MCh, Neurosurgery</dt><dd>Super-speciality training in brain and spine surgery</dd></div>
              <div><dt>MS, General Surgery</dt><dd>Government Medical College, Surat</dd></div>
              <div><dt>MBBS</dt><dd>Pramukhswami Medical College, Karamsad</dd></div>
            </dl>
          </section>

          <section className="visit" id="visit" aria-labelledby="visit-title">
            <div className="visit-text" data-rise>
              <h2 id="visit-title">Your first visit</h2>
              <p>About forty-five minutes, mostly spent on your scans. You leave with a plan, whether or not it includes surgery.</p>
            </div>
            <div className="slip" data-rise>
              {VISIT.map((g) => (
                <div className="slip-group" key={g.heading}>
                  <h3>{g.heading}</h3>
                  {g.rows.map(([what, time]) => (
                    <p className="slip-row" key={what}><span>{what}</span><i aria-hidden="true" /><span>{time}</span></p>
                  ))}
                </div>
              ))}
              <p className="slip-total"><span>A clear plan, explained</span><span>about 45 min</span></p>
            </div>
          </section>

          <section className="faq" id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title" data-rise>Questions people ask</h2>
            <div className="faq-list" data-rise>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="clinic" id="clinic" aria-labelledby="clinic-title">
            <h2 id="clinic-title" data-rise>Find the clinic</h2>
            <div className="clinic-grid">
              <address data-rise>
                <strong>{CLINIC.name}</strong>
                {CLINIC.lines.map((l) => <span key={l}>{l}</span>)}
              </address>
              <div className="clinic-side" data-rise>
                <p className="clinic-hours">{CLINIC.hours}</p>
                <p className="status status-ink"><span className="dot" aria-hidden="true" />{status}</p>
                <div className="actions">
                  <a className="btn" href={CLINIC.map} target="_blank" rel="noreferrer">Get directions</a>
                  <a className="link" href="#book">Book a time</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="foot">
        <div className="foot-top">
          <nav aria-label="Footer">
            <a href="#about">About</a>
            <a href="#treatments">Treatments</a>
            <a href="#visit">First visit</a>
            <a href="#faq">Questions</a>
            <a href="#book">Book a consultation</a>
          </nav>
          <div className="foot-contact">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            {CONTACT.phone && <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>}
            <span>{CLINIC.name}, Rakhial, Ahmedabad</span>
          </div>
        </div>
        <p className="wordmark" ref={wordmark} aria-hidden="true">ritesh shah</p>
        <p className="legal">
          © {new Date().getFullYear()} Dr Ritesh Shah. This site gives general information and is not a substitute for a consultation.
          In an emergency, go to the nearest hospital.
        </p>
      </footer>
    </>
  )
}
