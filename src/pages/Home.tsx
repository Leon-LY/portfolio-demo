import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowUpRight, BarChart3, Building2, Layers, Brain, ChevronDown } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { usePortfolioData } from '../data/usePortfolioData'
import Credibility from '../components/sections/Credibility'
import TypewriterText from '../components/effects/TypewriterText'
import TiltCard3D from '../components/effects/TiltCard3D'
import GlowCard from '../components/effects/GlowCard'
import DataTorrent from '../components/effects/DataTorrent'
import ParticleField from '../components/effects/ParticleField'
import Hero3D from '../components/effects/Hero3D'

/* ═══════════════════════════════════════════════════════
   Service icons + color mapping
   ═══════════════════════════════════════════════════════ */
const serviceIcons: Record<string, typeof BarChart3> = {
  '全栈应用开发': Layers,
  '数据可视化': BarChart3,
  '移动端 & 小程序': Building2,
  'AI 集成 & 架构': Brain,
}

/* ═══════════════════════════════════════════════════════
   WordReveal
   ═══════════════════════════════════════════════════════ */
function WordReveal({ text, visible, className = '' }: { text: string; visible: boolean; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 0.1, 0.2, 1] }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >{char === ' ' ? ' ' : char}</motion.span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════
   Scroll Progress Bar
   ═══════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
      style={{ scaleX, background: 'linear-gradient(90deg, #00E5FF, #7C3AED)' }}
    />
  )
}

/* ═══════════════════════════════════════════════════════
   Section Dot Indicator
   ═══════════════════════════════════════════════════════ */
const SECTION_IDS = ['hero', 'services', 'portfolio', 'process', 'clients', 'faq', 'cta']

function SectionIndicator() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const handle = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= scrollPos) { setActive(i); break }
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
      {SECTION_IDS.map((id, i) => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-center w-2 h-2"
          aria-label={`跳转到第${i + 1}屏`}>
          <span className={`absolute rounded-full transition-all duration-300 ${
            i === active ? 'w-2 h-2 bg-accent shadow-[0_0_8px_rgba(0,229,255,0.5)]' : 'w-1.5 h-1.5 bg-white/15 group-hover:bg-white/30'
          }`} />
        </button>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Service Card
   ═══════════════════════════════════════════════════════ */
function ServiceCard({ s, i, Icon }: { s: { title: string; desc: string }; i: number; Icon: typeof BarChart3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 0.1, 0.2, 1] }}>
      <TiltCard3D tiltMax={6}>
        <GlowCard glowColor="rgba(0, 229, 255, 0.06)" glowSize={280}
          className="card-solid rounded-2xl p-7 border-white/[0.06] hover:border-accent/20 transition-all duration-300 group h-full cursor-default">
          <div className="flex gap-5 items-start relative z-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
              <Icon size={22} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </div>
          </div>
        </GlowCard>
      </TiltCard3D>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   FAQ Item
   ═══════════════════════════════════════════════════════ */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="card-premium rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer">
        <span className="text-sm font-semibold text-text-primary pr-4">{q}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-text-secondary text-sm">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 0.1, 0.2, 1] }}
            className="overflow-hidden">
            <p className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   Process Step — individually animated timeline item
   ═══════════════════════════════════════════════════════ */
function ProcessStep({ item, index, total }: { item: { step: string; title: string; desc: string }; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inv = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' })
  useEffect(() => {
    if (inv) {
      const pct = ((index + 1) / total) * 100
      document.documentElement.style.setProperty('--process-line-h', `${pct}%`)
    }
  }, [inv, index, total])
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6">
      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
        inv ? 'bg-accent/10 border-2 border-accent shadow-[0_0_12px_rgba(0,229,255,0.3)]' : 'bg-surface-0 border-2 border-white/[0.08]'
      }`}>
        <span className={`text-xs font-bold font-mono transition-colors duration-500 ${inv ? 'text-accent' : 'text-text-tertiary'}`}>{item.step}</span>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   Client Marquee
   ═══════════════════════════════════════════════════════ */
function ClientMarquee({ clients }: { clients: string[] }) {
  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#000] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#000] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        {[...clients, ...clients, ...clients, ...clients].map((name, i) => (
          <span key={i}
            className="text-sm text-text-secondary font-medium py-3 px-5 card-solid rounded-lg border-white/[0.04] inline-block">
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const { data } = usePortfolioData()
  const { personalInfo, services, workflowSteps, clients, faqItems, projectGroups, allProjects } = data
  const { scrollYProgress } = useScroll()
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80])

  // ═══ DataTorrent — always play ═══
  const [showTorrent, setShowTorrent] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)

  const handleTorrentComplete = useCallback(() => {
    setHeroVisible(true)
    setTimeout(() => setShowTorrent(false), 800)
  }, [])

  return (
    <PageTransition>
      <ScrollProgress />
      <SectionIndicator />

      {/* ═══════ GLOBAL PARTICLE FIELD ═══════ */}
      <ParticleField />

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {showTorrent && <DataTorrent onComplete={handleTorrentComplete} skipAnimation={false} />}
        {(!showTorrent || heroVisible) && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
              }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.05]"
              style={{ background: 'radial-gradient(ellipse at center, #00E5FF 0%, transparent 70%)', filter: 'blur(80px)' }} />
          </div>
        )}
        <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8" style={{ y: heroParallax }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.22, 0.1, 0.2, 1] }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-mono text-text-secondary tracking-widest">AVAILABLE FOR WORK</span>
              </div>
              <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] text-text-primary mb-6">
                {heroVisible ? <WordReveal text={personalInfo.name} visible={heroVisible} /> : personalInfo.name}
                <motion.span className="text-shimmer"
                  animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: personalInfo.name.length * 0.025 + 0.2 }}>.</motion.span>
              </h1>
              <motion.div className="text-xl sm:text-2xl lg:text-3xl text-text-secondary mb-10 leading-snug max-w-lg"
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.3 }}>
                <TypewriterText text={personalInfo.heroTitle} speed={35} delay={heroVisible ? 0.5 : 99} />
              </motion.div>
              <motion.div className="flex flex-wrap gap-3 mb-12"
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.7 }}>
                <a href="#portfolio"
                  className="btn-glow group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-black text-sm font-bold rounded-lg hover:bg-accent-bright active:scale-[0.98] transition-all duration-200">
                  查看案例 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-text-primary text-sm font-medium rounded-lg border border-white/[0.15] hover:bg-white/[0.04] hover:border-white/[0.25] transition-all duration-200">
                  联系合作
                </a>
              </motion.div>
              <motion.p className="text-xs text-text-tertiary font-mono"
                animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}>
                {personalInfo.heroCredibility}
              </motion.p>
            </motion.div>
            {/* Right: 3D Data Torus */}
            <motion.div className="hidden lg:block"
              animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 0.1, 0.2, 1] }}>
              <Hero3D />
            </motion.div>
          </div>

          {/* ═══════ Metrics with Counter ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: 47, suffix: '', label: '交付项目', decimals: 0 },
              { v: 240, suffix: '万', label: '日处理数据', decimals: 0 },
              { v: 99.7, suffix: '%', label: '系统可用率', decimals: 1 },
              { v: 12, suffix: 'ms', label: '平均响应', decimals: 0 },
            ].map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}
                className="card-solid rounded-xl p-5 text-center border-white/[0.06] group hover:border-accent/15 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-black font-mono text-accent tabular-nums">
                  <Counter to={m.v} suffix={m.suffix} decimals={m.decimals} />
                </div>
                <div className="text-[11px] text-text-tertiary mt-1">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll-down hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }} animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center pt-2">
            <ChevronDown size={12} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="relative py-28 border-t border-white/[0.06]">
        {/* Floating tech keywords */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025]" aria-hidden="true">
          {['React', 'Vue', 'SpringBoot', 'Three.js', 'ECharts', 'Docker', 'PostgreSQL', 'Redis', 'TypeScript', 'Node.js',
            'FastAPI', 'WebSocket', 'K8s', 'Prisma', 'GSAP', 'R3F'].map((kw, i) => (
            <span key={kw} className="absolute text-[11px] font-mono text-accent whitespace-nowrap"
              style={{
                left: `${10 + ((i * 37) % 80)}%`,
                top: `${5 + ((i * 23) % 90)}%`,
                animation: `float ${6 + (i % 4)}s ease-in-out ${i * 0.7}s infinite`,
              }}>{`<${kw} />`}</span>
          ))}</div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Capabilities</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">专注领域</h2>
            <div className="section-divider mb-14" />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} Icon={serviceIcons[s.title] || BarChart3} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CREDIBILITY ═══════ */}
      <Credibility />

      {/* ═══════ PROJECTS ═══════ */}
      <section id="portfolio" className="py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Case Studies</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">项目案例</h2>
            <div className="section-divider mb-14" />
          </ScrollReveal>
          <div className="space-y-20">
            {projectGroups.map((group) => {
              const items = group.items.map(id => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <ScrollReveal>
                    <h3 className="text-sm font-bold text-text-primary mb-8 flex items-center gap-3">
                      <span className="w-1.5 h-5 bg-accent rounded-full" />{group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((p, i) => (
                      <motion.div key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}>
                        <TiltCard3D tiltMax={6}>
                          <Link to={p.link}
                            className="project-card card-glass rounded-2xl border-white/[0.06] hover:border-accent/20 transition-all duration-300 overflow-hidden h-full flex flex-col group block">
                            {p.images?.[0] && (
                              <div className="project-image relative aspect-[16/10] overflow-hidden bg-surface-2">
                                <img src={p.images[0]} alt={p.title} loading="lazy" decoding="async"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                                  <div className="flex flex-wrap gap-1.5">
                                    {p.tech.slice(0, 5).map(t => (
                                      <span key={t} className="text-[10px] text-white/80 bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] px-2 py-0.5 rounded-md">{t}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                              <p className="text-xs font-medium text-text-tertiary mb-2 font-mono">{p.category}</p>
                              <h4 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{p.title}</h4>
                              <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-2">{p.overview || p.description}</p>
                              <div className="flex flex-wrap gap-1.5 mt-4">
                                {p.tech.slice(0, 4).map(t => (
                                  <span key={t} className="text-[11px] text-text-secondary bg-surface-2 border border-white/[0.06] px-2.5 py-1 rounded group-hover:border-accent/15 transition-all">{t}</span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </TiltCard3D>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section id="process" className="py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Process</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6 tracking-tight">合作流程</h2>
            <div className="section-divider mb-16" />
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.04]" />
            {/* Animated fill line — grows as you scroll */}
            <div className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-accent/60 to-accent/20"
              style={{ height: 'var(--process-line-h, 0%)' }} />
            <div className="space-y-16">
              {workflowSteps.map((item, i) => (
                <ProcessStep key={item.step} item={item} index={i} total={workflowSteps.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CLIENTS ═══════ */}
      <section id="clients" className="py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-8 text-center">Trusted By</p>
          <ClientMarquee clients={clients} />
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section id="faq" className="py-28 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6 tracking-tight">常见问题</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-3">
            {faqItems.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section id="cta" className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative card-glass rounded-3xl p-14 sm:p-20 text-center overflow-hidden border-white/[0.06] group">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 bg-accent/5 blur-[140px] pointer-events-none" />
            <div className="max-w-xl mx-auto relative z-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
                准备好<span className="text-accent">启动</span>项目？
              </h2>
              <p className="text-text-secondary mb-10 leading-relaxed text-lg">
                从需求沟通到开发交付，全链路直接和我对接。
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-black text-sm font-bold rounded-lg hover:bg-accent-bright active:scale-[0.98] transition-all duration-200">
                  预约咨询 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="tel:18389118642"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-text-primary text-sm font-medium rounded-lg border border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200">
                  📞 18389118642
                </a>
              </div>
              <div className="flex justify-center gap-8 text-xs text-text-tertiary">
                <a href="mailto:554295000@qq.com" className="hover:text-accent transition-colors">554295000@qq.com</a>
                <span className="text-text-disabled">|</span>
                <a href="https://github.com/Leon-LY" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
