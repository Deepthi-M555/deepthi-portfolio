import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'
import Reveal from './Reveal'
import { gmailCompose, site } from '../data/site'

function ContactIcon({ type }) {
  if (type === 'github') {
    return <img src="/tech-icons/github.svg" alt="" aria-hidden="true" />
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18V9.67H5.57V18h2.77ZM6.96 8.53a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22ZM18.44 18v-4.56c0-2.44-1.3-3.58-3.04-3.58a2.62 2.62 0 0 0-2.36 1.3V9.67h-2.77V18h2.77v-4.12c0-1.09.21-2.14 1.56-2.14 1.33 0 1.35 1.24 1.35 2.21V18h2.49Z" />
      </svg>
    )
  }

  if (type === 'location') {
    return <MapPin aria-hidden="true" />
  }

  return <Mail aria-hidden="true" />
}

const contactCards = [
  {
    label: 'Email',
    value: site.email,
    icon: 'email',
    href: gmailCompose(),
    accent: 'cyan',
  },
  {
    label: 'GitHub',
    value: '@Deepthi-M555',
    icon: 'github',
    href: site.github,
    accent: 'violet',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Deepthi M',
    icon: 'linkedin',
    href: site.linkedin,
    accent: 'blue',
    external: true,
  },
  {
    label: 'Location',
    value: site.location,
    icon: 'location',
    accent: 'green',
  },
]

export default function Contact() {
  const [mailFallback, setMailFallback] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    form.elements.namedItem('name').setCustomValidity(name ? '' : 'Please enter your name.')
    form.elements.namedItem('message').setCustomValidity(message ? '' : 'Please enter a message.')

    if (!email) {
      form.reportValidity()
      return
    }
    if (!form.reportValidity()) return

    const subject = `Portfolio Contact — ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    const gmailUrl = gmailCompose(subject, body)
    setMailFallback(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <Reveal as="h2" className="contact-title">
          LET&apos;S BUILD<br />SOMETHING<b>.</b>
        </Reveal>
        <Reveal className="contact-intro" delay={50}>
          <p>Have a project or opportunity in mind? I&apos;d be glad to hear from you.</p>
          <h3 className="contact-label">Get in touch</h3>
        </Reveal>

        <div className="contact-cards">
          {contactCards.map(({ label, value, icon, href, accent, external }, index) => {
            const content = (
              <>
                <span className="contact-card-icon"><ContactIcon type={icon} /></span>
                <span className="contact-card-copy">
                  <span className="contact-card-label">{label}</span>
                  <span className="contact-card-value">{value}</span>
                </span>
                {href && <ArrowUpRight className="contact-card-arrow" aria-hidden="true" />}
              </>
            )
            const className = `contact-card contact-card--${accent}`

            return (
              <Reveal key={label} delay={80 + index * 45}>
                {href ? (
                  <motion.a
                    className={className}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${value}${external ? ', opens in a new tab' : ', opens Gmail compose in a new tab'}`}
                    whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.24 }}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.div className={className} whileHover={{ y: -2 }} transition={{ duration: 0.24 }}>{content}</motion.div>
                )}
              </Reveal>
            )
          })}
        </div>

        <div className="contact-lower">
          <Reveal className="contact-form-wrap" delay={120}>
            <h3 className="contact-label">Send a message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required onInput={(event) => event.currentTarget.setCustomValidity(event.currentTarget.value.trim() ? '' : 'Please enter your name.')} />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="4" required onInput={(event) => event.currentTarget.setCustomValidity(event.currentTarget.value.trim() ? '' : 'Please enter a message.')} />
              </label>
              <button className="btn btn-solid contact-submit" type="submit">
                <span>Send message&nbsp; <Send size={14} aria-hidden="true" /></span>
              </button>
              {mailFallback && (
                <a className="contact-mail-fallback" href={mailFallback}>
                  If Gmail doesn&apos;t open, use your email app.
                </a>
              )}
            </form>
          </Reveal>

          <Reveal className="contact-opportunities" delay={170}>
            <h3 className="contact-label">Open to opportunities</h3>
            <ul>
              <li>Full-time</li>
              <li>Internship</li>
              <li>Contract</li>
              <li>Project Opportunities</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
