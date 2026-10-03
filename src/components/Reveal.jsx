import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function useInView(options = { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, seen]
}

export default function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, seen] = useInView()
  const reduceMotion = useReducedMotion()
  const MotionTag = useMemo(() => motion.create(Tag), [Tag])
  const direction = className.includes('reveal--left')
    ? -18
    : className.includes('reveal--right')
      ? 18
      : 0

  return (
    <MotionTag
      ref={ref}
      style={{ '--d': `${delay}ms` }}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 22, x: direction, rotateX: -3, scale: 0.985, filter: 'blur(4px)', clipPath: 'inset(0 0 10%)' }}
      animate={seen || reduceMotion ? { opacity: 1, y: 0, x: 0, rotateX: 0, scale: 1, filter: 'blur(0)', clipPath: 'inset(0)' } : undefined}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.68, delay: delay / 1000, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </MotionTag>
  )
}
