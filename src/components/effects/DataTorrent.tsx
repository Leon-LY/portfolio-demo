import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  alpha: number
  size: number
  hue: number
  trail: Array<{ x: number; y: number; alpha: number }>
}

type Phase = 'idle' | 'converge' | 'hold' | 'disperse' | 'static'

function getLogoPoints(cx: number, cy: number): Array<{ x: number; y: number }> {
  const scale = 1.0
  const points: Array<{ x: number; y: number }> = []
  // L — dense vertical + horizontal
  for (let y = -44; y <= 44; y += 3.5) points.push({ x: -72, y })
  for (let x = -72; x <= -26; x += 3.5) points.push({ x, y: 44 })
  // e — dense circular path
  for (let a = 0; a < Math.PI * 2; a += 0.15)
    points.push({ x: -4 + Math.cos(a) * 24, y: 6 + Math.sin(a) * 20 })
  for (let a = 0; a < Math.PI * 2; a += 0.2)
    points.push({ x: -4 + Math.cos(a) * 14, y: 6 + Math.sin(a) * 12 })
  // o — dense double ring
  for (let a = 0; a < Math.PI * 2; a += 0.15)
    points.push({ x: 46 + Math.cos(a) * 24, y: 6 + Math.sin(a) * 20 })
  for (let a = 0; a < Math.PI * 2; a += 0.2)
    points.push({ x: 46 + Math.cos(a) * 14, y: 6 + Math.sin(a) * 12 })
  // n — two verticals + curve
  for (let y = -40; y <= 36; y += 3.5) points.push({ x: 82, y })
  for (let y = -36; y <= 30; y += 3.5) points.push({ x: 118, y: y + 4 })

  return points.map(p => ({ x: cx + p.x * scale, y: cy + p.y * scale }))
}

export default function DataTorrent({
  onComplete,
  skipAnimation,
}: {
  onComplete?: () => void
  skipAnimation?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef<Phase>(skipAnimation ? 'static' : 'idle')
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const startTimeRef = useRef(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  const initParticles = useCallback((canvas: HTMLCanvasElement, mode: 'edges' | 'random' | 'logo') => {
    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    const isMobile = w < 768
    const count = isMobile ? 100 : 200
    const particles: Particle[] = []

    if (mode === 'logo') {
      const logoPoints = getLogoPoints(cx, cy)
      logoPoints.forEach(p => {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          targetX: p.x, targetY: p.y,
          vx: 0, vy: 0, alpha: 0.4 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 1.5,
          hue: 180 + Math.random() * 20,
          trail: [],
        })
      })
      return particles
    }

    if (mode === 'edges') {
      for (let i = 0; i < count; i++) {
        let x: number, y: number
        const edge = Math.random()
        if (edge < 0.25) { x = Math.random() * w; y = -20 }
        else if (edge < 0.5) { x = w + 20; y = Math.random() * h }
        else if (edge < 0.75) { x = Math.random() * w; y = h + 20 }
        else { x = -20; y = Math.random() * h }
        particles.push({
          x, y, targetX: 0, targetY: 0, vx: 0, vy: 0,
          alpha: 0.3 + Math.random() * 0.5,
          size: 1 + Math.random() * 2.5,
          hue: 180 + Math.random() * 30 - 15,
          trail: [],
        })
      }
      return particles
    }

    // random
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        targetX: Math.random() * w, targetY: Math.random() * h,
        vx: 0, vy: 0, alpha: 0.3 + Math.random() * 0.4,
        size: 1 + Math.random() * 2,
        hue: 180 + Math.random() * 30 - 15,
        trail: [],
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    if (skipAnimation) {
      particlesRef.current = initParticles(canvas, 'random')
      phaseRef.current = 'static'
    } else {
      particlesRef.current = initParticles(canvas, 'edges')
      phaseRef.current = 'idle'
      startTimeRef.current = 0
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const particles = particlesRef.current
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2

      // Phase transitions
      if (!skipAnimation) {
        if (elapsed < 1200 && phaseRef.current === 'idle') {
          const logoPoints = getLogoPoints(cx, cy)
          particles.forEach((p, i) => {
            const target = logoPoints[i % logoPoints.length]
            p.targetX = target.x; p.targetY = target.y
          })
          if (elapsed > 300) phaseRef.current = 'converge'
        } else if (elapsed >= 1200 && phaseRef.current !== 'hold' && phaseRef.current !== 'disperse') {
          phaseRef.current = 'hold'
        } else if (elapsed >= 3000 && phaseRef.current === 'hold') {
          phaseRef.current = 'disperse'
          particles.forEach(p => {
            p.targetX = Math.random() * w
            p.targetY = Math.random() * h
          })
          completeRef.current?.()
        }
      }

      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        const strength = phaseRef.current === 'converge' ? 0.04 :
          phaseRef.current === 'hold' ? 0.06 :
          phaseRef.current === 'disperse' ? 0.03 : 0.005
        p.vx += dx * strength
        p.vy += dy * strength
        p.vx *= phaseRef.current === 'hold' ? 0.85 : 0.92
        p.vy *= phaseRef.current === 'hold' ? 0.85 : 0.92
        p.x += p.vx
        p.y += p.vy

        // Trail
        if (phaseRef.current === 'converge' || phaseRef.current === 'disperse') {
          p.trail.push({ x: p.x, y: p.y, alpha: 1 })
          if (p.trail.length > 8) p.trail.shift()
          p.trail.forEach(t => { t.alpha *= 0.85 })
        } else if (phaseRef.current === 'static' || phaseRef.current === 'hold') {
          p.trail = []
        }

        // Draw trail
        if (p.trail.length > 1 && w >= 768) {
          ctx.beginPath()
          ctx.moveTo(p.trail[0].x, p.trail[0].y)
          for (let j = 1; j < p.trail.length; j++)
            ctx.lineTo(p.trail[j].x, p.trail[j].y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha * 0.2})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }

        // Draw particle
        const glowAlpha = phaseRef.current === 'hold' ? 0.9 : p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${glowAlpha})`
        ctx.fill()

        // Glow ring
        if (p.size > 1.5 || phaseRef.current === 'hold') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size + 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${glowAlpha * 0.12})`
          ctx.fill()
        }
      })

      // Center glow during hold
      if (phaseRef.current === 'hold') {
        const grd = ctx.createRadialGradient(cx, cy, 5, cx, cy, 200)
        grd.addColorStop(0, 'rgba(0, 229, 255, 0.18)')
        grd.addColorStop(0.4, 'rgba(0, 229, 255, 0.06)')
        grd.addColorStop(0.7, 'rgba(124, 58, 237, 0.03)')
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grd
        ctx.fillRect(cx - 200, cy - 200, 400, 400)
        // Pulsing ring during hold
        const ringAlpha = 0.1 + Math.sin(elapsed * 0.005) * 0.05
        ctx.beginPath()
        ctx.arc(cx, cy, 120, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 229, 255, ${ringAlpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Connection lines in static/disperse
      if ((phaseRef.current === 'static' || phaseRef.current === 'disperse') && w >= 768) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particles[i].x
            const dy = particles[j].y - particles[i].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 150) {
              const alpha = (1 - dist / 150) * 0.06
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

      // Drift in static
      if (phaseRef.current === 'static' && elapsed > 3000) {
        particles.forEach(p => {
          p.x += (Math.random() - 0.5) * 0.15
          p.y += (Math.random() - 0.5) * 0.15
          if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20
        })
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [skipAnimation, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
