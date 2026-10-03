import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site, heroFacts } from '../data/site'

const HeroDepth = lazy(() => import('./HeroDepth'))

const MotionTags = {
  span: motion.span,
  div: motion.div,
  dl: motion.dl,
}

function Rise({ as = 'span', index, className = '', children, style }) {
  const reduceMotion = useReducedMotion()
  const MotionTag = MotionTags[as]
  const masked = className === 'rise-mask'

  return (
    <MotionTag
      className={`rise ${className}`}
      style={{ ...style, '--i': index }}
      initial={reduceMotion ? false : { opacity: masked ? 1 : 0, y: masked ? '110%' : 13, rotateX: masked ? -8 : 0 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.68, delay: 0.08 + index * 0.075, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export default function Hero() {
  const pointer = useRef({ x: 0, y: 0 })
  const [showDepth, setShowDepth] = useState(false)

  useEffect(() => {
    const wideViewport = window.matchMedia('(min-width: 621px)')
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setShowDepth(wideViewport.matches && !motionPreference.matches)
    update()
    wideViewport.addEventListener('change', update)
    motionPreference.addEventListener('change', update)
    return () => {
      wideViewport.removeEventListener('change', update)
      motionPreference.removeEventListener('change', update)
    }
  }, [])

  const updatePointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    pointer.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    }
  }

  return (
    <header id="top" className="hero" onPointerMove={updatePointer} onPointerLeave={() => { pointer.current = { x: 0, y: 0 } }}>
      {showDepth && <Suspense fallback={null}><HeroDepth pointer={pointer} /></Suspense>}
      <div className="wrap hero-in">
        <div className="hero-top">
          <Rise index={0} className="hello">Portfolio / 2025—26</Rise>
          <Rise index={1} className="avail">
            <i aria-hidden="true" />Open to software engineering and full-stack roles
          </Rise>
        </div>

        <div className="hero-main">
          <div className="hero-identity">
            <h1 className="hero-name" aria-label="Deepthi M">
              <span className="mask"><Rise index={1} className="rise-mask">Deepthi</Rise></span>{' '}
              <span className="mask"><Rise index={2} className="rise-mask">M</Rise></span>
            </h1>
            <div className="hero-role">
              {site.role.map((line, i) => (
                <span className="mask" key={line}>
                  <Rise index={3 + i} className="rise-mask">{line}</Rise>
                </span>
              ))}
              <span className="mask">
                <Rise index={5} className="hero-tag rise-mask">{site.tagline}</Rise>
              </span>
            </div>
          </div>
          <Rise as="div" index={6} className="hero-copy">
            <p>{site.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#projects"><span>VIEW PROJECTS</span></a>
              <a className="btn" href={site.github} target="_blank" rel="noreferrer"><span>GITHUB <ArrowUpRight size={14} aria-hidden="true" /></span></a>
              <a className="btn" href={site.resume} target="_blank" rel="noreferrer"><span>RESUME <ArrowUpRight size={14} aria-hidden="true" /></span></a>
            </div>
          </Rise>
        </div>

        <Rise as="dl" index={7} className="hero-facts">
          {heroFacts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </Rise>
      </div>
    </header>
  )
}
