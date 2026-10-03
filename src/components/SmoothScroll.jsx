import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScrollContext = createContext(() => {})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      lenisRef.current?.destroy()
      lenisRef.current = preference.matches
        ? null
        : new Lenis({ autoRaf: true, duration: 0.75, smoothWheel: true })
    }

    update()
    preference.addEventListener('change', update)
    return () => {
      preference.removeEventListener('change', update)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) return

    if (lenisRef.current) {
      const navHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 0
      lenisRef.current.scrollTo(element, { offset: -navHeight - 12 })
      return
    }

    element.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <SmoothScrollContext.Provider value={scrollTo}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
