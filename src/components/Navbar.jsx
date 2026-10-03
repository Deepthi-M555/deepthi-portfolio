import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gmailCompose, navLinks, site } from '../data/site'
import { useSmoothScroll } from './SmoothScroll'

export default function Navbar() {
  const scrollTo = useSmoothScroll()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(window.scrollY > 24)
        setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const ids = [...navLinks.map(([, h]) => h.slice(1)), 'contact']
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      {rootMargin: '-35% 0px -55% 0px'}
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary">
        <div className="wrap nav-in">
          <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')}>
            Deepthi M
          </a>
          <ul className="nav-links">
            {navLinks.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className={`ulink ${active === href.slice(1) ? 'is-active' : ''}`}
                  onClick={(e) => go(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <a className="ulink nav-sec" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="ulink nav-sec" href={site.resume} target="_blank" rel="noreferrer">Resume</a>
            <a className="nav-cta" href="#contact" onClick={(e) => go(e, '#contact')}>Get in touch</a>
          </div>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav-toggle-label">{open ? 'Close' : 'Menu'}</span>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
        <span className="scroll-progress" style={{ '--progress': `${progress}%` }} aria-hidden="true" />
      </nav>

      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="wrap menu-in">
          <ul className="menu-links">
            {[...navLinks, ['Contact', '#contact']].map(([label, href], i) => (
              <li key={href} style={{ '--i': i }}>
                <a href={href} tabIndex={open ? 0 : -1} onClick={(e) => go(e, href)}>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-foot">
            <a className="ulink" tabIndex={open ? 0 : -1} href={gmailCompose()} target="_blank" rel="noopener noreferrer">{site.email}</a>
            <div className="menu-foot-row">
              <a className="ulink" tabIndex={open ? 0 : -1} href={site.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="ulink" tabIndex={open ? 0 : -1} href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="ulink" tabIndex={open ? 0 : -1} href={site.resume} target="_blank" rel="noreferrer">Resume</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
