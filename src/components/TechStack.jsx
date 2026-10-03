import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { skills } from '../data/skills'
import { neutralTechnologyIcons, technologyIcons } from '../data/technologyIcons'
import { useSmoothScroll } from './SmoothScroll'

export default function TechStack() {
  const scrollTo = useSmoothScroll()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const steps = useRef([])
  const displayedRef = useRef(0)
  const transitionTimer = useRef(null)

  const selectCategory = (index) => {
    setActive(index)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.clearTimeout(transitionTimer.current)
      displayedRef.current = index
      setDisplayed(index)
      setIsExiting(false)
      return
    }
    if (index === displayedRef.current) {
      window.clearTimeout(transitionTimer.current)
      setIsExiting(false)
      return
    }
    window.clearTimeout(transitionTimer.current)
    setIsExiting(true)
    transitionTimer.current = window.setTimeout(() => {
      displayedRef.current = index
      setDisplayed(index)
      requestAnimationFrame(() => setIsExiting(false))
    }, 320)
  }

  const scrollToCategory = (index) => {
    selectCategory(index)
    scrollTo(steps.current[index])
  }

  useEffect(() => {
    const targets = steps.current.filter(Boolean)
    if (!('IntersectionObserver' in window)) return () => window.clearTimeout(transitionTimer.current)

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) selectCategory(Number(current.target.dataset.index))
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    )
    targets.forEach((step) => observer.observe(step))
    return () => {
      observer.disconnect()
      window.clearTimeout(transitionTimer.current)
    }
  }, [])

  const [group, technologies] = skills[displayed]

  return (
    <Section id="skills" title="Skills" aside="Move through the list to explore the tools I use.">
      <div className="stack-experience">
        <div className="stack-stage" aria-live="off">
          <div className="stack-index">
            <p className="eyebrow">SKILLS / {String(active + 1).padStart(2, '0')}—{String(skills.length).padStart(2, '0')}</p>
            <div className="stack-index-list" aria-label="Skills categories">
              {skills.map(([name], index) => (
                <button
                  key={name}
                  type="button"
                  className={`stack-index-button ${active === index ? 'is-active' : ''}`}
                  aria-pressed={active === index}
                  onClick={() => scrollToCategory(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className={`stack-current ${isExiting ? 'is-exiting' : ''}`} key={group}>
            <motion.p
              className="stack-category"
              initial={false}
              animate={isExiting
                ? { opacity: 0, y: -12, clipPath: 'inset(0 0 100%)' }
                : { opacity: 1, y: 0, clipPath: 'inset(0)' }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.2, 0.7, 0.1, 1] }}
            >
              {group}
            </motion.p>
            <motion.ul
              className={`stack-tech-list ${group === 'CS Fundamentals' ? 'stack-tech-list--fundamentals' : ''}`}
              initial={false}
              animate={isExiting ? 'exit' : 'enter'}
              variants={{
                enter: { transition: reduceMotion ? { staggerChildren: 0 } : { delayChildren: 0.025, staggerChildren: 0.045 } },
                exit: { transition: reduceMotion ? { staggerChildren: 0 } : { staggerChildren: 0.018, staggerDirection: -1 } },
              }}
            >
              {technologies.map((name, index) => (
                <motion.li
                  key={name}
                  style={{ '--item-index': index, '--item-count': technologies.length }}
                  variants={{
                    enter: {
                      opacity: 1,
                      filter: 'blur(0px)',
                      clipPath: 'inset(0)',
                      x: 0,
                      y: 0,
                      z: 0,
                      rotateX: 0,
                      scale: 1,
                      transition: reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.2, 0.7, 0.1, 1] },
                    },
                    exit: {
                      opacity: 0,
                      filter: 'blur(5px)',
                      clipPath: 'inset(0 0 100%)',
                      x: -8,
                      y: -12,
                      z: -55,
                      rotateX: 10,
                      scale: 0.94,
                      transition: { duration: reduceMotion ? 0 : 0.2 },
                    },
                  }}
                  initial={reduceMotion ? false : { opacity: 0, filter: 'blur(6px)', clipPath: 'inset(12% 0 0)', x: 12, y: 18, z: -70, rotateX: -12, scale: 0.94 }}
                  whileHover={reduceMotion ? undefined : { y: -3, rotateX: 2, scale: 1.01 }}
                >
                  <span className="stack-tech-badge">
                    <img
                      className={`stack-tech-icon ${neutralTechnologyIcons.has(technologyIcons[name]) ? 'stack-tech-icon--neutral' : ''}`}
                      src={`/tech-icons/${technologyIcons[name]}`}
                      alt=""
                      aria-hidden="true"
                      width="24"
                      height="24"
                    />
                  </span>
                  <span className="stack-tech-name">{name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
        <div className="stack-scroll-track" aria-hidden="true">
          {skills.map(([name], index) => (
            <div
              className="stack-step"
              key={name}
              data-index={index}
              ref={(element) => { steps.current[index] = element }}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
