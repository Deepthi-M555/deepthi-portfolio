import { useEffect, useRef } from 'react'

function randomNormal() {
  return (Math.random() + Math.random() + Math.random() - 1.5) * 0.72
}

function createGalaxyTexture(width, height) {
  const scale = 0.5
  const texture = document.createElement('canvas')
  texture.width = Math.max(1, Math.round(width * scale))
  texture.height = Math.max(1, Math.round(height * scale))

  const context = texture.getContext('2d')
  if (!context) return texture

  context.scale(scale, scale)
  context.globalCompositeOperation = 'screen'

  for (let index = 0; index < 560; index += 1) {
    const x = Math.random() * width
    const normalizedX = x / width
    const bandCenter = height * (0.57 - (normalizedX - 0.5) * 0.3)
    const y = bandCenter + randomNormal() * height * 0.105
    const radius = 7 + Math.random() * 28
    const stretch = 1.3 + Math.random() * 2.7
    const alpha = 0.016 + Math.random() * 0.026
    const tint = Math.random() < 0.2 ? '177, 192, 220' : '207, 218, 233'

    context.save()
    context.translate(x, y)
    context.rotate(-0.28)
    context.scale(stretch, 1)
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius)
    gradient.addColorStop(0, `rgba(${tint}, ${alpha})`)
    gradient.addColorStop(0.42, `rgba(${tint}, ${alpha * 0.48})`)
    gradient.addColorStop(1, `rgba(${tint}, 0)`)
    context.fillStyle = gradient
    context.beginPath()
    context.arc(0, 0, radius, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }

  context.globalCompositeOperation = 'source-over'
  context.globalAlpha = 1
  return texture
}

function createStars(width, height) {
  const count = Math.min(900, Math.max(210, Math.round((width * height) / 2600)))

  return Array.from({ length: count }, (_, index) => {
    const depth = Math.random()
    const bright = index < Math.max(8, Math.round(count * 0.018))
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      depth,
      radius: bright ? 0.95 + Math.random() * 0.9 : 0.25 + depth * 0.95,
      alpha: bright ? 0.72 + Math.random() * 0.24 : 0.25 + Math.random() * 0.53,
      speed: (3 + depth * 11) * (bright ? 0.42 : 1),
      drift: (Math.random() - 0.5) * (1.4 + depth * 3.2),
      phase: Math.random() * Math.PI * 2,
      twinkle: bright ? 0.07 + Math.random() * 0.12 : Math.random() * 0.2,
      bright,
    }
  })
}

export default function AmbientField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let stars = []
    let galaxyTexture = null
    let width = 0
    let height = 0
    let frame = 0
    let lastTime = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 620 ? 1.2 : 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      stars = createStars(width, height)
      galaxyTexture = createGalaxyTexture(width, height)
    }

    const render = (time, delta) => {
      context.clearRect(0, 0, width, height)

      if (galaxyTexture) {
        context.globalAlpha = 0.84
        context.drawImage(galaxyTexture, 0, 0, width, height)
        context.globalAlpha = 1
      }

      stars.forEach((star) => {
        const twinkle = reducedMotion.matches
          ? 1
          : 1 - star.twinkle * (0.5 + Math.sin(time * 0.0007 + star.phase) * 0.5)
        const alpha = star.alpha * twinkle
        const glowRadius = star.bright ? star.radius * 3.8 : star.radius * 2.2

        context.beginPath()
        context.fillStyle = star.bright
          ? `rgba(221, 233, 255, ${alpha * 0.13})`
          : `rgba(185, 205, 234, ${alpha * 0.07})`
        context.arc(star.x, star.y, glowRadius, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = `rgba(235, 242, 255, ${alpha})`
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fill()

        if (star.bright) {
          context.strokeStyle = `rgba(226, 237, 255, ${alpha * 0.28})`
          context.lineWidth = 0.45
          context.beginPath()
          context.moveTo(star.x - star.radius * 2.1, star.y)
          context.lineTo(star.x + star.radius * 2.1, star.y)
          context.moveTo(star.x, star.y - star.radius * 2.1)
          context.lineTo(star.x, star.y + star.radius * 2.1)
          context.stroke()
        }

        if (!reducedMotion.matches) {
          star.y += star.speed * delta * 0.001
          star.x += star.drift * delta * 0.001
          if (star.y > height + 4) {
            star.y = -4
            star.x = (star.x + width) % width
          }
          if (star.x < -4) star.x = width + 4
          else if (star.x > width + 4) star.x = -4
        }
      })
    }

    const animate = (time) => {
      const delta = lastTime ? Math.min(time - lastTime, 50) : 16
      lastTime = time
      render(time, delta)
      if (!reducedMotion.matches && document.visibilityState === 'visible') {
        frame = window.requestAnimationFrame(animate)
      }
    }

    const start = () => {
      window.cancelAnimationFrame(frame)
      lastTime = 0
      frame = window.requestAnimationFrame(animate)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !reducedMotion.matches) start()
      else window.cancelAnimationFrame(frame)
    }

    const onMotionChange = () => {
      window.cancelAnimationFrame(frame)
      lastTime = 0
      if (reducedMotion.matches) render(performance.now(), 0)
      else if (document.visibilityState === 'visible') start()
    }

    const onResize = () => {
      resize()
      if (reducedMotion.matches) render(performance.now(), 0)
    }

    resize()
    if (reducedMotion.matches) render(0, 0)
    else start()

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onMotionChange)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="ambient-field" aria-hidden="true" />
}
