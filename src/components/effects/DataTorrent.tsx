import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number; y: number; tx: number; ty: number; vx: number; vy: number
  alpha: number; size: number; hue: number
  trail: Array<{ x: number; y: number; a: number }>
}

type Phase = 'idle' | 'converge' | 'hold' | 'disperse'

/**
 * Renders "Leon" text onto an offscreen canvas, reads back non-transparent pixels,
 * and returns them as an array of {x, y} positions (centered around cx, cy).
 */
function getTextPixels(cx: number, cy: number, w: number, h: number): Array<{ x: number; y: number }> {
  const off = new OffscreenCanvas(w, h)
  const octx = off.getContext('2d')!
  octx.fillStyle = '#ffffff'
  octx.font = `bold ${Math.floor(h * 0.24)}px "Space Grotesk", "PingFang SC", "Microsoft YaHei", sans-serif`
  octx.textAlign = 'center'
  octx.textBaseline = 'middle'
  octx.fillText('Leon', cx, cy)

  const img = octx.getImageData(0, 0, w, h)
  const pixels: Array<{ x: number; y: number }> = []
  // Sample every 3rd pixel for density
  for (let y = 0; y < h; y += 3) {
    for (let x = 0; x < w; x += 3) {
      const idx = (y * w + x) * 4
      if (img.data[idx + 3] > 80) {
        pixels.push({ x, y })
      }
    }
  }
  return pixels
}

export default function DataTorrent({
  onComplete,
}: {
  onComplete?: () => void
  skipAnimation?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef<Phase>('idle')
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const startRef = useRef(0)
  const cbRef = useRef(onComplete)
  cbRef.current = onComplete

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2
    const isMobile = w < 768
    const count = isMobile ? 150 : 300
    const particles: Particle[] = []

    // Get pixel-perfect "Leon" points
    const targetPoints = getTextPixels(cx, cy, w, h)

    // Each particle starts at a random edge and targets a random text pixel
    for (let i = 0; i < count; i++) {
      let x: number, y: number
      const edge = Math.random()
      if (edge < 0.25)      { x = Math.random() * w; y = -30 }
      else if (edge < 0.5)  { x = w + 30; y = Math.random() * h }
      else if (edge < 0.75) { x = Math.random() * w; y = h + 30 }
      else                  { x = -30; y = Math.random() * h }

      const tp = targetPoints[i % targetPoints.length]
      particles.push({
        x, y, tx: tp.x, ty: tp.y, vx: 0, vy: 0,
        alpha: 0.3 + Math.random() * 0.5,
        size: 1.2 + Math.random() * 1.8,
        hue: 185 + Math.random() * 20 - 10,
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

    particlesRef.current = init(canvas)
    phaseRef.current = 'idle'
    startRef.current = 0

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const particles = particlesRef.current
      const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2
      const isMobile = w < 768

      // ── Phase management ──
      if (elapsed < 2200 && phaseRef.current === 'idle') {
        if (elapsed > 400) phaseRef.current = 'converge'
      } else if (elapsed >= 2200 && phaseRef.current !== 'hold') {
        phaseRef.current = 'hold'
        cbRef.current?.()
      } else if (elapsed >= 3200 && phaseRef.current === 'hold') {
        phaseRef.current = 'disperse'
        particles.forEach(p => { p.tx = Math.random() * w; p.ty = Math.random() * h })
      }

      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        const s = phaseRef.current === 'converge' ? 0.05 :
                  phaseRef.current === 'hold' ? 0.08 :
                  phaseRef.current === 'disperse' ? 0.03 : 0.02
        p.vx += dx * s
        p.vy += dy * s
        p.vx *= phaseRef.current === 'hold' ? 0.82 : 0.91
        p.vy *= phaseRef.current === 'hold' ? 0.82 : 0.91
        p.x += p.vx
        p.y += p.vy

        // Trail
        if (phaseRef.current === 'converge' || phaseRef.current === 'disperse') {
          p.trail.push({ x: p.x, y: p.y, a: 1 })
          if (p.trail.length > 10) p.trail.shift()
          p.trail.forEach(t => { t.a *= 0.82 })
        } else { p.trail = [] }

        // Draw trail
        if (p.trail.length > 1 && !isMobile) {
          ctx.beginPath()
          ctx.moveTo(p.trail[0].x, p.trail[0].y)
          for (let j = 1; j < p.trail.length; j++) ctx.lineTo(p.trail[j].x, p.trail[j].y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha * 0.18})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }

        // Glow ring (hold phase only)
        if (phaseRef.current === 'hold') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size + 4, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, 0.15)`
          ctx.fill()
        }

        // Core dot
        const ga = phaseRef.current === 'hold' ? 0.95 : p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${ga})`
        ctx.fill()
      })

      // ── Hold phase: text glow + pulse ring ──
      if (phaseRef.current === 'hold') {
        const grd = ctx.createRadialGradient(cx, cy, 10, cx, cy, 240)
        grd.addColorStop(0, 'rgba(0, 229, 255, 0.14)')
        grd.addColorStop(0.35, 'rgba(0, 229, 255, 0.05)')
        grd.addColorStop(0.7, 'rgba(124, 58, 237, 0.02)')
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grd
        ctx.fillRect(cx - 240, cy - 240, 480, 480)

        ctx.beginPath()
        ctx.arc(cx, cy, 140 + Math.sin(elapsed * 0.004) * 20, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 + Math.sin(elapsed * 0.004) * 0.04})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // ── Disperse/fallback connections ──
      if (phaseRef.current === 'disperse' && !isMobile) {
        for (let i = 0; i < Math.min(particles.length, 80); i++) {
          for (let j = i + 1; j < Math.min(particles.length, 80); j++) {
            const dx2 = particles[j].x - particles[i].x
            const dy2 = particles[j].y - particles[i].y
            const d = Math.sqrt(dx2 * dx2 + dy2 * dy2)
            if (d < 160) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - d / 160) * 0.05})`
              ctx.lineWidth = 0.4
              ctx.stroke()
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize) }
  }, [init])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />
  )
}
