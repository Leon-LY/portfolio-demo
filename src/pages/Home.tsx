import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { personalInfo, services, heroStats, workflowSteps, clients, faqItems } from '../data/config'
import { projectGroups, allProjects } from '../data/projects'
import Counter from '../components/Counter'

/* ── Particle network canvas ── */
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const h = (e: MouseEvent) => { mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let anim: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1

        const px = p.x * canvas.width; const py = p.y * canvas.height

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = q.x * canvas.width - px; const dy = q.y * canvas.height - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(q.x * canvas.width, q.y * canvas.height)
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }

        // Draw point
        const dm = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2)
        const r = dm < 0.15 ? 3 : 1.2
        const a = dm < 0.15 ? 0.6 : 0.15
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${a})`; ctx.fill()
      })

      anim = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

/* ── Cursor glow ── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const h = (e: MouseEvent) => { targetRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } }
    window.addEventListener('mousemove', h, { passive: true })
    let anim: number
    const tick = () => {
      const t = targetRef.current; const c = currentRef.current
      c.x += (t.x - c.x) * 0.08; c.y += (t.y - c.y) * 0.08
      if (glowRef.current) {
        glowRef.current.style.left = `${c.x * 100}%`
        glowRef.current.style.top = `${c.y * 100}%`
      }
      anim = requestAnimationFrame(tick)
    }
    anim = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(anim); window.removeEventListener('mousemove', h) }
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div ref={glowRef} className="absolute w-[700px] h-[700px] rounded-full will-change-transform" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 35%, transparent 65%)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/4 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/4 blur-[120px]" />
    </div>
  )
}

/* ── Terminal showcase ── */
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
      const delay = fullText[charCount] === '\n' ? 200 : 25 + Math.random() * 20
      const t = setTimeout(() => setCharCount(c => c + 1), delay)
      return () => clearTimeout(t)
    }
  }, [charCount, fullText])

  const displayed = fullText.slice(0, charCount)
  const displayedLines = displayed.split('\n')

  return (
    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden font-mono text-xs sm:text-sm shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/[0.04]">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[11px] text-slate-500">terminal — leon@dev</span>
      </div>
      <div className="p-5 space-y-1.5 min-h-[220px]">
        {displayedLines.map((l, i) => {
          const isLastLine = i === displayedLines.length - 1
          const isTyping = isLastLine && charCount < fullText.length
          return (
            <div key={i} className={`${l.startsWith('$') ? 'text-emerald-400' : l.startsWith('>') ? 'text-slate-300 pl-3' : 'text-slate-500'}`}>
              {l}
              {isTyping && <span className="inline-block w-2 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Parallax image ── */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className="aspect-[16/9] overflow-hidden">
      <motion.img src={src} alt={alt} loading="lazy" style={{ y }}
        className="w-full h-[115%] object-cover -mt-[7.5%]" />
    </div>
  )
}

/* ── Tilt card ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0); const ry = useMotionValue(0)
  return (
    <motion.div ref={ref}
      onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); rx.set((e.clientY - r.top) / r.height * -8 + 4); ry.set((e.clientX - r.left) / r.width * 8 - 4) }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1200 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={className}>{children}</motion.div>
  )
}

export default function Home() {
  return (
    <PageTransition>
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-40 pb-24">
        <ParticleNetwork />
        <CursorGlow />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">当前可接受新项目委托</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.92] mb-2">
              {personalInfo.name}<span className="text-blue-500">.</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white font-bold tracking-tight mb-4">
              {personalInfo.heroTitle}
            </p>

            <div className="text-base sm:text-lg text-slate-400 leading-relaxed space-y-2 mb-6">
              {personalInfo.heroBio.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all">查看作品 <ArrowUpRight size={16} /></a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">联系合作</a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {heroStats.map(s => (<div key={s.label}><span className="text-2xl font-extrabold text-white"><Counter to={parseInt(s.value)||0} suffix={s.value.replace(/[0-9]/g,'')} /></span><span className="text-xs text-slate-500 ml-1.5">{s.label}</span></div>))}
            </div>

            <p className="mt-8 text-xs text-slate-600">{personalInfo.heroCredibility}</p>
          </motion.div>

          {/* Terminal showcase */}
          <div className="lg:col-span-2 hidden lg:block">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <TerminalShowcase />
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      {/* ═══════ FADE OVERLAY ═══════ */}
      <div className="relative z-[5] h-32 -mt-32 bg-gradient-to-b from-transparent to-[#0a0e1a][#0a0e1a] pointer-events-none" />

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="relative z-10 py-24 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">服务方向</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">专注领域</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
              >
                <div className="bg-[#111827] rounded-2xl p-6 h-full border border-white/[0.04] hover:border-blue-500/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300">
                  <h3 className="text-base font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 真实项目 ═══════ */}
      <section id="portfolio" className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-slate-400 border border-slate-500/30 px-2.5 py-0.5 rounded-full">Real Project</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">项目案例</h2>
            <p className="text-sm text-slate-500 mb-12">每个项目都代表一类可交付的技术方案。</p>
          </ScrollReveal>

          <div className="space-y-16">
            {projectGroups.map((group) => {
              const items = group.items.map(id => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                      <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full" />{group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((p, i) => (
                      <motion.div key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
                      >
                        <Link to={p.link}>
                          <TiltCard className="group bg-[#111827] rounded-2xl border border-white/[0.04] hover:border-blue-500/20 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 overflow-hidden h-full flex flex-col">
                            {p.images?.[0]&&<ParallaxImage src={p.images[0]} alt={p.title} />}
                            <div className="p-5 flex-1 flex flex-col">
                              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">{p.category}</p>
                              <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                              <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-2">{p.overview||p.description}</p>
                              <div className="flex flex-wrap gap-1.5 mt-3">{p.tech.slice(0,4).map(t=><span key={t} className="text-[10px] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-md">{t}</span>)}</div>
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

      {/* ═══════ 探索更多 ═══════ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-slate-500 border border-slate-500/20 px-2.5 py-0.5 rounded-full">Demo</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-400 mb-2">探索更多</h2>
            <p className="text-sm text-slate-500 mb-12">从产品官网到电商平台，以下页面展示了不同场景下的技术实现能力。</p>
          </ScrollReveal>

          {/* Grouped demo display */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">产品级 Web</p>
              {[
                { id:'demo-saas', title:'CloudFlow', sub:'SaaS 数据分析', link:'/saas' },
                { id:'demo-marketing', title:'GrowthPulse', sub:'数字营销官网', link:'/marketing' },
                { id:'demo-dashboard', title:'监控大屏', sub:'实时数据可视化', link:'/dashboard' },
              ].map(p=>(
                <ScrollReveal key={p.id}><Link to={p.link} className="block bg-[#111827] border border-white/[0.03] rounded-xl p-4 hover:border-blue-500/20 hover:-translate-x-1 hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] hover:bg-[#161b2a] transition-all duration-200 group">
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                </Link></ScrollReveal>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">品牌电商</p>
              {[
                { id:'demo-ecommerce', title:'LuxeCart', sub:'高端时尚电商', link:'/ecommerce' },
                { id:'demo-corporate', title:'Meridian', sub:'跨国企业官网', link:'/corporate' },
              ].map(p=>(
                <ScrollReveal key={p.id}><Link to={p.link} className="block bg-[#111827] border border-white/[0.03] rounded-xl p-4 hover:border-blue-500/20 hover:-translate-x-1 hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] hover:bg-[#161b2a] transition-all duration-200 group">
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                </Link></ScrollReveal>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">开发者工具</p>
              {[
                { id:'demo-api', title:'API 文档', sub:'开发者门户', link:'/api-docs' },
                { id:'demo-admin', title:'后台管理', sub:'CRUD + 权限', link:'/admin-demo' },
              ].map(p=>(
                <ScrollReveal key={p.id}><Link to={p.link} className="block bg-[#111827] border border-white/[0.03] rounded-xl p-4 hover:border-blue-500/20 hover:-translate-x-1 hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] hover:bg-[#161b2a] transition-all duration-200 group">
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                </Link></ScrollReveal>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">移动端</p>
              {[
                { id:'demo-mobile', title:'FitTrack Pro', sub:'App 落地页', link:'/mobile-app' },
              ].map(p=>(
                <ScrollReveal key={p.id}><Link to={p.link} className="block bg-[#111827] border border-white/[0.03] rounded-xl p-4 hover:border-blue-500/20 hover:-translate-x-1 hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] hover:bg-[#161b2a] transition-all duration-200 group">
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                </Link></ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 合作流程 ═══════ */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">合作流程</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">怎么合作</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-4">
            {workflowSteps.map((item, i) => (
              <motion.div key={item.step} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.12, ease:[0.22,0.1,0.2,1] }}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6 h-full hover:border-white/[0.08] transition-all">
                  <span className="text-4xl font-black text-white/[0.04]">{item.step}</span>
                  <h3 className="text-base font-bold text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 服务单位 ═══════ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3 text-center">曾服务单位</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {clients.map((name, i) => (
              <motion.div key={name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.06 }}
                className="bg-[#111827] border border-white/[0.03] rounded-xl p-4 text-center hover:border-white/[0.06] transition-all">
                <p className="text-xs text-slate-400 font-medium">{name}</p>
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
            <h2 className="text-3xl font-extrabold text-white mb-10">FAQ</h2>
          </ScrollReveal>
          <div className="space-y-2">
            {faqItems.map((faq, i) => (
              <ScrollReveal key={i} delay={i*0.05}>
                <details className="group bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition-colors list-none">
                    <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                    <span className="text-slate-500 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section id="contact" className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#111827] border border-white/[0.05] rounded-3xl p-12 sm:p-16 hover:border-blue-500/10 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)] transition-all duration-300">
            <div className="max-w-2xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">有项目需要落地？</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">需求沟通 → 方案设计 → 开发 → 部署上线，每个环节直接和我对接。</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:18389118642" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all">预约技术咨询</a>
                  <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">查看作品</a>
                </div>
                <div className="flex justify-center gap-6 mt-6 text-xs text-slate-500">
                  <a href="tel:18389118642" className="hover:text-slate-300 transition-colors">18389118642</a>
                  <a href="mailto:554295000@qq.com" className="hover:text-slate-300 transition-colors">554295000@qq.com</a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
