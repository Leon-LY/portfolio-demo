import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { personalInfo, services, heroStats, workflowSteps, clients, faqItems } from '../data/config'
import { projectGroups, allProjects } from '../data/projects'
import Counter from '../components/Counter'

/* ═══════════════════════════════════════════════════════
   Scroll Progress Bar
   ═══════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const h = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="scroll-progress" style={{ width: `${width}%` }} />
}

/* ═══════════════════════════════════════════════════════
   Particle Network Canvas — enhanced
   ═══════════════════════════════════════════════════════ */
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let anim: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // More particles with varied speeds
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0025,
      vy: (Math.random() - 0.5) * 0.0025,
    }))

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current
      const particles = particlesRef.current

      particles.forEach((p, i) => {
        // Move with time-based drift
        p.x += p.vx + Math.sin(time + i) * 0.00015
        p.y += p.vy + Math.cos(time + i * 0.7) * 0.00015

        // Wrap around
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        const px = p.x * canvas.width
        const py = p.y * canvas.height

        // Draw connections with distance-based color
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = q.x * canvas.width - px
          const dy = q.y * canvas.height - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.15
            // Color gradient based on position
            const hue = 240 + (p.x * 60) + (q.y * 40)
            ctx.beginPath()
            ctx.moveTo(px, py)
            ctx.lineTo(q.x * canvas.width, q.y * canvas.height)
            ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Draw point — size varies with mouse proximity
        const dm = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2)
        const r = dm < 0.12 ? 3.5 : dm < 0.25 ? 2 : 1.2
        const a = dm < 0.12 ? 0.7 : dm < 0.25 ? 0.3 : 0.15
        const hue = 240 + p.x * 60

        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${a})`
        ctx.fill()

        // Glow ring for nearby particles
        if (dm < 0.12) {
          ctx.beginPath()
          ctx.arc(px, py, r + 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 70%, 65%, 0.08)`
          ctx.fill()
        }
      })

      anim = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

/* ═══════════════════════════════════════════════════════
   Cursor Glow — enhanced with color shift
   ═══════════════════════════════════════════════════════ */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', h, { passive: true })
    let anim: number
    const tick = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * 0.06
      c.y += (t.y - c.y) * 0.06
      if (glowRef.current) {
        glowRef.current.style.left = `${c.x * 100}%`
        glowRef.current.style.top = `${c.y * 100}%`
      }
      anim = requestAnimationFrame(tick)
    }
    anim = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('mousemove', h)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.1) 30%, rgba(6,182,212,0.05) 50%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[130px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/3 blur-[120px]" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Terminal Showcase — enhanced
   ═══════════════════════════════════════════════════════ */
function TerminalShowcase() {
  const allLines = [
    '$ leon --stack',
    '> React · Vue · Node.js · SpringBoot · PostgreSQL',
    '$ leon --specialty',
    '> 数据可视化 · 系统架构 · 全栈开发 · AI 集成',
    '$ leon --deploy',
    '> Docker · Nginx · K8s · CI/CD · Cloud',
    '$ leon --status',
    '> ✅ 当前可接受新项目委托',
  ]

  const fullText = allLines.join('\n')
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (charCount < fullText.length) {
      const delay = fullText[charCount] === '\n' ? 180 : 20 + Math.random() * 18
      const t = setTimeout(() => setCharCount(c => c + 1), delay)
      return () => clearTimeout(t)
    }
  }, [charCount, fullText])

  const displayed = fullText.slice(0, charCount)
  const displayedLines = displayed.split('\n')

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden font-mono text-xs sm:text-sm shadow-2xl shadow-black/40 ring-1 ring-white/[0.03]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/[0.04]">
        <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.3)]" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
        <span className="ml-2 text-[11px] text-slate-500 tracking-wide">terminal — leon@dev</span>
      </div>
      <div className="p-5 space-y-1.5 min-h-[220px]">
        {displayedLines.map((l, i) => {
          const isLastLine = i === displayedLines.length - 1
          const isTyping = isLastLine && charCount < fullText.length
          if (l.startsWith('$')) {
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-emerald-400 font-medium">❯</span>
                <span className="text-emerald-300">{l.slice(2)}</span>
                {isTyping && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse align-middle rounded-sm" />}
              </div>
            )
          }
          return (
            <div key={i} className="text-slate-400 pl-5">
              {l}
              {isTyping && <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse align-middle rounded-sm" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Parallax Image
   ═══════════════════════════════════════════════════════ */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="aspect-[16/9] overflow-hidden relative">
      <motion.img
        src={src} alt={alt} loading="lazy" style={{ y }}
        className="w-full h-[120%] object-cover -mt-[10%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Tilt Card — enhanced
   ═══════════════════════════════════════════════════════ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)

  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        rx.set((e.clientY - r.top) / r.height * -10 + 5)
        ry.set((e.clientX - r.left) / r.width * 10 - 5)
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1400 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   FAQ Item — animated accordion
   ═══════════════════════════════════════════════════════ */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-white/[0.05] rounded-2xl overflow-hidden bg-[#111827]/50 backdrop-blur-sm hover:border-white/[0.08] transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <span className="text-sm font-medium text-white pr-4">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-400"
        >
          <span className="text-lg leading-none">+</span>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.1, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <PageTransition>
      <ScrollProgress />

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <ParticleNetwork />
        <CursorGlow />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.1, 0.2, 1] }}
              className="lg:col-span-3"
            >
              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                </span>
                <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                  当前可接受新项目委托
                </span>
              </motion.div>

              {/* Name with gradient */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-3">
                <span className="text-white">{personalInfo.name}</span>
                <span className="text-gradient">.</span>
              </h1>

              {/* Hero title */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-bold tracking-tight mb-5">
                {personalInfo.heroTitle}
              </p>

              {/* Bio */}
              <div className="text-base sm:text-lg text-slate-400 leading-relaxed space-y-2 mb-8 max-w-xl">
                {personalInfo.heroBio.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#portfolio"
                  className="btn-glow group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  查看作品
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-lg hover:shadow-white/[0.02] transition-all duration-300"
                >
                  联系合作
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                {heroStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  >
                    <span className="text-3xl font-black text-white">
                      <Counter to={parseInt(s.value) || 0} suffix={s.value.replace(/[0-9]/g, '')} />
                    </span>
                    <span className="text-xs text-slate-500 ml-2 tracking-wide">{s.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Credibility */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 text-xs text-slate-600"
              >
                {personalInfo.heroCredibility}
              </motion.p>
            </motion.div>

            {/* Terminal showcase */}
            <div className="lg:col-span-2 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.1, 0.2, 1] }}
                className="relative"
              >
                <TerminalShowcase />
                {/* Terminal glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-violet-500/5 rounded-3xl blur-xl pointer-events-none -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOFT TRANSITION ═══════ */}
      <div className="relative z-[5] h-24 -mt-24 bg-gradient-to-b from-transparent via-[#0a0e1a]/60 to-[#0a0e1a] pointer-events-none" />

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">服务方向</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">专注领域</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
                className="group"
              >
                <div className="relative bg-[#111827]/60 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/[0.05] hover:border-blue-500/25 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] transition-all duration-400 overflow-hidden">
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-violet-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />

                  {/* Icon dot */}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="portfolio" className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                Real Project
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">项目案例</h2>
            <p className="text-sm text-slate-500 mb-3">每个项目都代表一类可交付的技术方案。</p>
            <div className="section-divider mb-12" />
          </ScrollReveal>

          <div className="space-y-20">
            {projectGroups.map((group) => {
              const items = group.items.map(id => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                      {group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
                      >
                        <Link to={p.link}>
                          <TiltCard className="scan-line group bg-[#111827]/60 backdrop-blur-sm rounded-2xl border border-white/[0.05] hover:border-blue-500/25 hover:shadow-[0_12px_40px_rgba(99,102,241,0.18)] transition-all duration-400 overflow-hidden h-full flex flex-col">
                            {p.images?.[0] && <ParallaxImage src={p.images[0]} alt={p.title} />}
                            <div className="p-5 flex-1 flex flex-col relative z-10">
                              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                                {p.category}
                              </p>
                              <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
                                {p.title}
                              </h4>
                              <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-2">
                                {p.overview || p.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-4">
                                {p.tech.slice(0, 4).map(t => (
                                  <span key={t} className="text-[10px] text-slate-400 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-md group-hover:border-blue-500/20 group-hover:text-slate-300 transition-all duration-300">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </TiltCard>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ EXPLORE MORE ═══════ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-slate-500 border border-slate-500/20 px-2.5 py-0.5 rounded-full">Demo</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-300 mb-2">探索更多</h2>
            <p className="text-sm text-slate-500 mb-3">从产品官网到电商平台，以下页面展示了不同场景下的技术实现能力。</p>
            <div className="section-divider mb-12" />
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                label: '产品级 Web',
                items: [
                  { id: 'demo-saas', title: 'CloudFlow', sub: 'SaaS 数据分析', link: '/saas' },
                  { id: 'demo-marketing', title: 'GrowthPulse', sub: '数字营销官网', link: '/marketing' },
                  { id: 'demo-dashboard', title: '监控大屏', sub: '实时数据可视化', link: '/dashboard' },
                ],
              },
              {
                label: '品牌电商',
                items: [
                  { id: 'demo-ecommerce', title: 'LuxeCart', sub: '高端时尚电商', link: '/ecommerce' },
                  { id: 'demo-corporate', title: 'Meridian', sub: '跨国企业官网', link: '/corporate' },
                ],
              },
              {
                label: '开发者工具',
                items: [
                  { id: 'demo-api', title: 'API 文档', sub: '开发者门户', link: '/api-docs' },
                  { id: 'demo-admin', title: '后台管理', sub: 'CRUD + 权限', link: '/admin-demo' },
                ],
              },
              {
                label: '移动端',
                items: [
                  { id: 'demo-mobile', title: 'FitTrack Pro', sub: 'App 落地页', link: '/mobile-app' },
                ],
              },
            ].map(col => (
              <div key={col.label} className="space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 px-1">{col.label}</p>
                {col.items.map(p => (
                  <ScrollReveal key={p.id}>
                    <Link
                      to={p.link}
                      className="group block bg-[#111827]/60 backdrop-blur-sm border border-white/[0.04] rounded-xl p-4 hover:border-blue-500/25 hover:-translate-x-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {p.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                        </div>
                        <ArrowUpRight size={14} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WORKFLOW ═══════ */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">合作流程</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">怎么合作</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-4">
            {workflowSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 0.1, 0.2, 1] }}
                className="group relative"
              >
                <div className="bg-[#111827]/60 backdrop-blur-sm border border-white/[0.05] rounded-2xl p-6 h-full hover:border-blue-500/20 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-violet-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  <span className="text-5xl font-black text-white/[0.03] absolute top-4 right-5">{item.step}</span>
                  <h3 className="text-base font-bold text-white mb-2 relative z-10 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
                </div>
                {/* Connector line */}
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CLIENTS ═══════ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3 text-center">曾服务单位</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {clients.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-[#111827]/60 backdrop-blur-sm border border-white/[0.03] rounded-xl p-4 text-center hover:border-blue-500/20 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all duration-300"
              >
                <p className="text-xs text-slate-400 font-medium group-hover:text-white transition-colors duration-300">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">常见问题</p>
            <h2 className="text-3xl font-extrabold text-white mb-3">FAQ</h2>
            <div className="section-divider mb-10" />
          </ScrollReveal>
          <div className="space-y-2">
            {faqItems.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section id="contact" className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#111827]/80 to-[#0f172a]/80 backdrop-blur-sm border border-white/[0.06] rounded-3xl p-12 sm:p-16 hover:border-blue-500/15 hover:shadow-[0_12px_48px_rgba(99,102,241,0.12)] transition-all duration-400 overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  有项目需要<span className="text-gradient">落地</span>？
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto">
                  需求沟通 → 方案设计 → 开发 → 部署上线，每个环节直接和我对接。
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <a
                    href="tel:18389118642"
                    className="btn-glow group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    预约技术咨询
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                  >
                    查看作品
                  </a>
                </div>
                <div className="flex justify-center gap-8 text-xs text-slate-500">
                  <a href="tel:18389118642" className="hover:text-white transition-colors duration-300 link-underline">
                    📞 18389118642
                  </a>
                  <a href="mailto:554295000@qq.com" className="hover:text-white transition-colors duration-300 link-underline">
                    ✉️ 554295000@qq.com
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
