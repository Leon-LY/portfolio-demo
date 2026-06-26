import { useEffect, useRef } from 'react'

/**
 * Visible particle field — prominent Canvas background.
 * 200+ particles, bright cyan glow, organic drift, visible connections.
 * Adds an aurora-like gradient layer for depth.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let anim: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 80 : 200
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; r: number; hue: number; a: number; pulse: number; pulseSpeed: number
    }> = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 0.6 + Math.random() * 2.2,
        hue: 185 + Math.random() * 25,
        a: 0.15 + Math.random() * 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.03,
      })
    }

    // FPS-locked loop
    let lastTime = 0
    const interval = 1000 / 60

    const tick = (time: number) => {
      anim = requestAnimationFrame(tick)
      const delta = time - lastTime
      if (delta < interval) return
      lastTime = time - (delta % interval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      // Draw aurora layer — large soft color blobs
      const t = time * 0.0005
      const grd1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.6)
      grd1.addColorStop(0, `rgba(0, 229, 255, ${0.025 + Math.sin(t) * 0.01})`)
      grd1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd1
      ctx.fillRect(0, 0, w, h)

      const grd2 = ctx.createRadialGradient(w * 0.75, h * 0.6, 0, w * 0.75, h * 0.6, w * 0.5)
      grd2.addColorStop(0, `rgba(124, 58, 237, ${0.02 + Math.cos(t * 1.3) * 0.008})`)
      grd2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd2
      ctx.fillRect(0, 0, w, h)

      // Update & draw particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        p.x += p.vx
        p.y += p.vy
        if (p.x < -30) p.x = w + 30
        if (p.x > w + 30) p.x = -30
        if (p.y < -30) p.y = h + 30
        if (p.y > h + 30) p.y = -30

        const pulseA = p.a * (0.7 + 0.3 * Math.sin(p.pulse))
        const pulseR = p.r * (0.8 + 0.2 * Math.sin(p.pulse))

        // Outer glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulseR + 5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${pulseA * 0.2})`
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${pulseA})`
        ctx.fill()
      })

      // Connections — visible, desktop only
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particles[i].x
            const dy = particles[j].y - particles[i].y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 200) {
              const alpha = (1 - d / 200) * 0.06
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`
              ctx.lineWidth = 0.5
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
