import { useEffect, useRef } from 'react'

/**
 * Perpetual particle field — always-active Canvas background.
 * ~120 particles, organic drift, subtle connections.
 * Runs at ~30fps to minimize CPU. Matches cyan theme.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let anim: number
    let lastTime = 0
    const FPS = 30
    const interval = 1000 / FPS

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 50 : 120
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; hue: number; a: number }> = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.3 + Math.random() * 1.2,
        hue: 180 + Math.random() * 30,
        a: 0.08 + Math.random() * 0.12,
      })
    }

    const tick = (time: number) => {
      anim = requestAnimationFrame(tick)
      const delta = time - lastTime
      if (delta < interval) return
      lastTime = time - (delta % interval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.a})`
        ctx.fill()
      })

      // Connections — only desktop, only nearby
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particles[i].x
            const dy = particles[j].y - particles[i].y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 180) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - d / 180) * 0.04})`
              ctx.lineWidth = 0.4
              ctx.stroke()
            }
          }
        }
      }
    }

    anim = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />
  )
}
