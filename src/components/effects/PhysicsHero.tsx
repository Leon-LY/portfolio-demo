import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/* ═══════ Palette ═══════ */
const PALETTE = [
  { r: 0, g: 240, b: 255, glow: 'rgba(0,240,255,0.25)', maxAlpha: 0.40 },
  { r: 255, g: 0, b: 127, glow: 'rgba(255,0,127,0.25)', maxAlpha: 0.40 },
  { r: 124, g: 60, b: 255, glow: 'rgba(124,60,255,0.20)', maxAlpha: 0.34 },
  { r: 46, g: 93, b: 255, glow: 'rgba(46,93,255,0.20)', maxAlpha: 0.34 },
  { r: 255, g: 209, b: 102, glow: 'rgba(255,209,102,0.14)', maxAlpha: 0.28 },
]

const BLOCK_SIZE = 30
const DESKTOP_COUNT = 220
const MOBILE_COUNT = 100
const MAX_BLOCKS = 320

/* ═══════ Block rendering ═══════ */
function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, angle: number, size: number,
  color: (typeof PALETTE)[0], alpha: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  // Layer 1: glow halo
  ctx.shadowBlur = 14
  ctx.shadowColor = color.glow
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
  ctx.fillRect(-size / 2, -size / 2, size - 1, size - 1)
  ctx.shadowBlur = 0

  // Layer 2: top highlight
  ctx.fillStyle = `rgba(255,255,255,${alpha * 0.28})`
  ctx.fillRect(-size / 2 + 1, -size / 2, size - 3, 4)

  // Layer 3: bottom shadow
  ctx.fillStyle = `rgba(0,0,0,${alpha * 0.42})`
  ctx.fillRect(-size / 2 + 1, size / 2 - 6, size - 3, 4)

  // Layer 4: inner stroke
  ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.14})`
  ctx.lineWidth = 0.5
  ctx.strokeRect(-size / 2 + 3, -size / 2 + 3, size - 7, size - 7)

  ctx.restore()
}

/* ═══════ Block factory ═══════ */
function createBlock(
  Bodies: any, Body: any,
  x: number, y: number, size: number,
  color: (typeof PALETTE)[0],
  isStatic = false,
) {
  const block = Bodies.rectangle(x, y, size, size, {
    isStatic,
    restitution: 0.26,
    friction: 0.74,
    frictionStatic: 0.85,
    frictionAir: 0.012,
    density: 0.0035,
    chamfer: { radius: 1 },
    sleepThreshold: 120,
    render: { visible: false },
  })
  const b = block as any
  b.size = size
  b.color = color
  // Wider, more dramatic flicker
  b.flickerSpeed = Math.random() * 0.055 + 0.012
  b.alpha = 0.12 + Math.random() * color.maxAlpha
  b.targetAlpha = 0.12 + Math.random() * color.maxAlpha
  if (!isStatic) {
    Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.55)
  }
  return block
}

/* ═══════ Seeded random — deterministic variety per section ═══════ */
function seededRandom(seed: number) {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

/* ═══════ Main component ═══════ */
export default function PhysicsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<any>(null)
  const runnerRef = useRef<any>(null)
  const MatterRef = useRef<any>(null)
  const rafRef = useRef(0)
  const frozenRef = useRef(false)
  const destroyedRef = useRef(false)
  const startTimeRef = useRef(0)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wallsRef = useRef<any[]>([])
  const catchersMapRef = useRef<Map<string, any[]>>(new Map())
  const [isDesktop, setIsDesktop] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
    setPageHeight(Math.max(window.innerHeight, document.body.scrollHeight))
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (!isDesktop || reducedMotion || pageHeight === 0) return
    const canvas = canvasRef.current
    if (!canvas) return

    destroyedRef.current = false
    frozenRef.current = false
    startTimeRef.current = 0

    const init = async () => {
      const Matter = await import('matter-js')
      if (destroyedRef.current) return
      MatterRef.current = Matter
      const { Engine, Runner, Bodies, Body, Composite } = Matter

      const dpr = Math.min(window.devicePixelRatio, 2)
      let vw = window.innerWidth
      let pageH = pageHeight
      const blockCount = isDesktop ? DESKTOP_COUNT : MOBILE_COUNT

      canvas.width = vw * dpr
      canvas.height = pageH * dpr
      canvas.style.width = `${vw}px`
      canvas.style.height = `${pageH}px`
      const ctx = canvas.getContext('2d')!
      ctx.scale(dpr, dpr)

      // Engine
      const engine = Engine.create({ enableSleeping: true })
      engine.world.gravity.x = 0
      engine.world.gravity.y = 2.0
      engineRef.current = engine
      const runner = Runner.create({ delta: 1000 / 60 })
      runnerRef.current = runner

      // Boundary walls
      const wallOpts = { isStatic: true, friction: 0.8, restitution: 0.1, render: { visible: false } }
      const walls = [
        Bodies.rectangle(vw / 2, pageH + 40, vw + 400, 80, wallOpts),
        Bodies.rectangle(-80, pageH / 2, 120, pageH * 2, wallOpts),
        Bodies.rectangle(vw + 80, pageH / 2, 120, pageH * 2, wallOpts),
      ]
      wallsRef.current = walls
      Composite.add(engine.world, walls)

      /* ═══════ Dynamic section catchers — varied positions, sizes, angles ═══════ */
      const catcherBaseOpts = {
        isStatic: true,
        friction: 0.97,
        restitution: 0.03,
        render: { visible: false },
      }

      const getSectionId = (el: Element): string => {
        return el.getAttribute('id') || el.getAttribute('data-section-id') || ''
      }

      const manageCatchers = () => {
        const catchers = catchersMapRef.current
        const sections = document.querySelectorAll('[data-section-physics]')
        const seen = new Set<string>()

        sections.forEach((el, sectionIndex) => {
          const id = getSectionId(el)
          const key = id || el.textContent?.trim().slice(0, 20) || `s${sectionIndex}`
          seen.add(key)
          const rect = el.getBoundingClientRect()

          // Section scrolled far above → remove catchers
          if (rect.bottom < -window.innerHeight * 0.5) {
            if (catchers.has(key)) {
              for (const c of catchers.get(key)!) Composite.remove(engine.world, c)
              catchers.delete(key)
            }
            return
          }

          // Section in/near viewport → ensure catchers exist
          if (rect.top < window.innerHeight * 1.2 && rect.bottom > 0) {
            if (!catchers.has(key)) {
              const top = rect.top + window.scrollY
              const w = rect.width
              const h = rect.height
              const rand = seededRandom(sectionIndex * 137 + key.length * 41)

              // Vary number of platforms. FAQ section: fewer, shorter
              const isFaq = key.includes('faq') || key.includes('FAQ') || key.includes('常见')
              const platformCount = isFaq ? (rand() > 0.5 ? 2 : 1) : (Math.floor(rand() * 3) + 2)

              const newCatchers: any[] = []
              for (let p = 0; p < platformCount; p++) {
                // Vary vertical position: 25%-42% of section height
                const shelfY = top + h * (0.25 + rand() * 0.17)
                // Vary height: 5-16px
                const shelfH = 5 + rand() * 11
                // Width: wide for normal sections (55-88%), short for FAQ (25-40%)
                const widthRange = isFaq ? (0.14 + rand() * 0.10) : (0.55 + rand() * 0.33)
                const shelfW = Math.max(w * widthRange, isFaq ? 20 : 100)
                // Spread x position across section width
                const offsetX = (rand() - 0.5) * (w - shelfW) * 0.85
                const shelfX = rect.left + w / 2 + offsetX
                // Slight random angle
                const angle = (rand() - 0.5) * 0.12

                const catcher = Bodies.rectangle(shelfX, shelfY, shelfW, Math.max(shelfH, 4), {
                  ...catcherBaseOpts,
                  angle,
                })
                newCatchers.push(catcher)
                Composite.add(engine.world, catcher)
              }
              catchers.set(key, newCatchers)
            }
          }
        })

        // Clean up catchers for removed sections
        for (const [key, bodies] of catchers) {
          if (!seen.has(key)) {
            for (const b of bodies) Composite.remove(engine.world, b)
            catchers.delete(key)
          }
        }
      }

      setTimeout(() => {
        if (!destroyedRef.current) manageCatchers()
      }, 500)

      /* ── Spawn: Wave 1 (right side) ── */
      const wave1Count = Math.floor(blockCount * 0.62)
      for (let i = 0; i < wave1Count; i++) {
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        const szRoll = Math.random()
        const size = szRoll > 0.82 ? BLOCK_SIZE * 1.45 : szRoll > 0.55 ? BLOCK_SIZE * 1.15 : BLOCK_SIZE * 0.88
        const block = createBlock(
          Bodies, Body,
          vw * 0.44 + Math.random() * vw * 0.54,
          -80 - Math.random() * pageH * 0.95 - i * 1.2,
          size, color,
        )
        Body.setVelocity(block, { x: (Math.random() - 0.5) * 5.5, y: 1.5 + Math.random() * 5.0 })
        Composite.add(engine.world, block)
      }

      /* ── Spawn: Wave 2 (left side, static → staggered release) ── */
      const wave2Blocks: any[] = []
      const wave2Count = blockCount - wave1Count
      for (let i = 0; i < wave2Count; i++) {
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        const szRoll = Math.random()
        const size = szRoll > 0.82 ? BLOCK_SIZE * 1.45 : szRoll > 0.55 ? BLOCK_SIZE * 1.15 : BLOCK_SIZE * 0.88
        const block = createBlock(
          Bodies, Body,
          vw * 0.03 + Math.random() * vw * 0.56,
          -160 - Math.random() * 400,
          size, color, true,
        )
        wave2Blocks.push(block)
        Composite.add(engine.world, block)
      }

      setTimeout(() => {
        if (destroyedRef.current) return
        wave2Blocks.forEach((block: any, i: number) => {
          setTimeout(() => {
            if (destroyedRef.current || frozenRef.current) return
            Body.setStatic(block, false)
            Body.setVelocity(block, { x: 1.0 + Math.random() * 4.0, y: 2.0 + Math.random() * 4.5 })
            Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.55)
          }, i * 22)
        })
      }, 650)

      /* ── Scroll-based section spawner ── */
      const activatedSections = new Set<string>()
      let scrollTicking = false

      const spawnFallingBlocks = (count: number) => {
        const st = window.scrollY
        const vwW = window.innerWidth
        for (let i = 0; i < count; i++) {
          const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
          const szRoll = Math.random()
          const size = szRoll > 0.84 ? BLOCK_SIZE * 1.38 : szRoll > 0.56 ? BLOCK_SIZE : BLOCK_SIZE * 0.78
          const block = createBlock(
            Bodies, Body,
            vwW * 0.04 + Math.random() * vwW * 0.92,
            st - 180 - Math.random() * 450,
            size, color,
          )
          Body.setVelocity(block, { x: (Math.random() - 0.5) * 3.0, y: 1.0 + Math.random() * 3.0 })
          Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.32)
          Composite.add(engine.world, block)
        }
      }

      const checkSections = () => {
        document.querySelectorAll('[data-section-physics]').forEach((el) => {
          const id = el.getAttribute('id') || el.textContent?.trim().slice(0, 20) || 'unknown'
          if (activatedSections.has(id)) return
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.72 && rect.bottom > 0) {
            activatedSections.add(id)
            // More blocks per section
            spawnFallingBlocks(25 + Math.floor(Math.random() * 16))
          }
        })
      }

      const handleSectionScroll = () => {
        if (scrollTicking) return
        scrollTicking = true
        requestAnimationFrame(() => {
          if (!destroyedRef.current) {
            checkSections()
            manageCatchers()
          }
          scrollTicking = false
        })
      }
      window.addEventListener('scroll', handleSectionScroll, { passive: true })

      // Freeze
      const freezePile = () => {
        frozenRef.current = true
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
        for (const body of Composite.allBodies(engine.world)) {
          if (!body.isStatic && (body as any).color) {
            Body.setVelocity(body, { x: 0, y: 0 })
            Body.setAngularVelocity(body, 0)
            Body.setStatic(body, true)
          }
        }
        Runner.stop(runner)
      }

      /* ═══════ RENDER LOOP ═══════ */
      const renderLoop = () => {
        if (destroyedRef.current) return
        rafRef.current = requestAnimationFrame(renderLoop)

        const now = performance.now()
        if (startTimeRef.current === 0) startTimeRef.current = now
        const elapsed = now - startTimeRef.current

        // 1) Dark cosmic background
        ctx.fillStyle = '#02030A'
        ctx.fillRect(0, 0, vw, pageH)

        // 2) Radial glow at top-right
        const glow = ctx.createRadialGradient(vw * 0.72, pageH * 0.10, 0, vw * 0.72, pageH * 0.10, vw * 0.42)
        glow.addColorStop(0, 'rgba(0, 230, 255, 0.06)')
        glow.addColorStop(0.45, 'rgba(0, 210, 255, 0.02)')
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, vw, pageH)

        // 3) Draw all blocks
        const bodies = Composite.allBodies(engine.world)
        for (const body of bodies) {
          const b = body as any
          if (!b.color) continue

          // Per-block independent alpha breathing — more dramatic swings
          if (typeof b.targetAlpha === 'number') {
            b.alpha += (b.targetAlpha - b.alpha) * b.flickerSpeed
            if (Math.abs(b.targetAlpha - b.alpha) < 0.030) {
              b.targetAlpha = 0.12 + Math.random() * (b.color.maxAlpha - 0.12)
            }
          }
          const alpha = Math.max(0.12, b.alpha || b.color.maxAlpha)

          drawBlock(ctx, body.position.x, body.position.y, body.angle, b.size || BLOCK_SIZE, b.color, alpha)
        }

        // 4) Gradient mask — lighter at top (hero visible), darker at bottom (subtle, warm)
        const maskGrad = ctx.createLinearGradient(0, 0, 0, pageH)
        maskGrad.addColorStop(0, 'rgba(2,3,10,0.0)')       // Hero: no mask
        maskGrad.addColorStop(0.25, 'rgba(6,4,10,0.02)')   // Near hero: very light
        maskGrad.addColorStop(0.50, 'rgba(8,5,10,0.06)')   // Middle: medium
        maskGrad.addColorStop(0.75, 'rgba(10,6,10,0.10)')  // Lower: darker
        maskGrad.addColorStop(1, 'rgba(12,8,10,0.13)')     // Bottom: darkest (warm undertone)
        ctx.fillStyle = maskGrad
        ctx.fillRect(0, 0, vw, pageH)

        // 5) CRT scanlines
        ctx.fillStyle = 'rgba(0,0,0,0.10)'
        for (let sy = 0; sy < pageH; sy += 6) {
          ctx.fillRect(0, sy, vw, 3)
        }

        // Settle detection — only freeze when blocks truly come to rest
        if (!frozenRef.current && elapsed > 6000) {
          let totalSpeed = 0; let count = 0
          for (const body of bodies) {
            if (!body.isStatic && !body.isSleeping && (body as any).color) {
              totalSpeed += Math.abs(body.velocity.x) + Math.abs(body.velocity.y) + Math.abs(body.angularVelocity)
              count++
            }
          }
          if (count > 0 && totalSpeed / count < 0.05) {
            if (!settleTimerRef.current) {
              settleTimerRef.current = setTimeout(() => { if (!destroyedRef.current) freezePile() }, 2000)
            }
          } else if (settleTimerRef.current) {
            clearTimeout(settleTimerRef.current)
            settleTimerRef.current = null
          }
        }
        // No hard freeze — let physics run until natural settle

        // Cleanup
        for (const body of bodies) {
          if (!body.isStatic && body.position.y > pageH + 300 && (body as any).color) {
            Composite.remove(engine.world, body)
          }
        }
        const active = bodies.filter((b: any) => !b.isStatic && !b.isSleeping && b.color)
        if (active.length > MAX_BLOCKS) {
          for (let i = 0; i < active.length - MAX_BLOCKS; i++) Composite.remove(engine.world, active[i])
        }
      }

      // Resize
      const handleResize = () => {
        const nw = window.innerWidth
        const nph = Math.max(window.innerHeight, document.body.scrollHeight)
        canvas.width = nw * dpr
        canvas.height = nph * dpr
        canvas.style.width = `${nw}px`
        canvas.style.height = `${nph}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        pageH = nph
        vw = nw
        Composite.remove(engine.world, walls)
        const newWalls = [
          Bodies.rectangle(nw / 2, nph + 40, nw + 400, 80, wallOpts),
          Bodies.rectangle(-80, nph / 2, 120, nph * 2, wallOpts),
          Bodies.rectangle(nw + 80, nph / 2, 120, nph * 2, wallOpts),
        ]
        Composite.add(engine.world, newWalls)
        walls.length = 0
        walls.push(...newWalls)
        manageCatchers()
      }
      window.addEventListener('resize', handleResize)

      // Start
      Runner.run(runner, engine)
      rafRef.current = requestAnimationFrame(renderLoop)
      setTimeout(() => { if (!destroyedRef.current) { checkSections(); manageCatchers() } }, 800)
    }

    init()

    return () => {
      destroyedRef.current = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      const M = MatterRef.current
      if (M) {
        if (runnerRef.current) { M.Runner.stop(runnerRef.current); runnerRef.current = null }
        if (engineRef.current) { M.Engine.clear(engineRef.current); engineRef.current = null }
      }
    }
  }, [isDesktop, reducedMotion, pageHeight])

  if (!isDesktop || reducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-25" style={{
          background: `
            radial-gradient(ellipse 40% 50% at 25% 35%, rgba(53,221,242,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 75% 55%, rgba(244,91,168,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 25% 35% at 50% 75%, rgba(232,184,93,0.12) 0%, transparent 70%)
          `,
          animation: 'breathe 8s ease-in-out infinite',
        }} />
      </div>
    )
  }

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    />,
    document.body,
  )
}
