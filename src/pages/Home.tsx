import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { usePortfolioData } from '../data/usePortfolioData'
import Credibility from '../components/sections/Credibility'
import TypewriterText from '../components/effects/TypewriterText'
import TiltCard3D from '../components/effects/TiltCard3D'

const PhysicsHero = lazy(() => import('../components/effects/PhysicsHero'))

/* ═══════ Service meter meta ═══════ */
const serviceMeters = [
  { label: '交付效率', pct: 94 },
  { label: '数据吞吐', pct: 88 },
  { label: '跨平台覆盖', pct: 82 },
  { label: 'AI 集成度', pct: 76 },
]

/* ═══════ Scroll Progress ═══════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
      style={{ scaleX, background: 'linear-gradient(90deg, #35DDF2, #F45BA8, #E8B85D)' }}
    />
  )
}

/* ═══════ Meter bar ═══════ */
function MeterBar({ label, pct, color, delay = 0 }: { label: string; pct: number; color: string; delay?: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[0.6rem] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(248,243,255,0.44)' }}>
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="meter-track" style={{ borderColor: `${color}30` }}>
        <motion.div
          className="meter-fill"
          style={{ color, width: `${pct}%` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/* ═══════ Status chip ═══════ */
function StatusChip({ label, color, className = '' }: { label: string; color: string; className?: string }) {
  return (
    <span
      className={`status-chip ${className}`}
      style={{ color, borderColor: `${color}40`, textShadow: `0 0 12px ${color}50` }}
    >
      {label}
    </span>
  )
}

function getProjectStatus(p: { real?: boolean; featured?: boolean }): { label: string; color: string } {
  if (p.real && p.featured) return { label: '已验收', color: '#10B981' }
  if (p.real) return { label: '维护中', color: '#E8B85D' }
  return { label: '进行中', color: '#35DDF2' }
}

/* ═══════ Process step ═══════ */
const processColors = ['#35DDF2', '#F45BA8', '#E8B85D', '#A477FF']

function ProcessStep({
  item,
  index,
  total,
}: {
  item: { step: string; title: string; desc: string }
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inv = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' })
  const color = processColors[index]
  useEffect(() => {
    if (inv) document.documentElement.style.setProperty('--process-line-h', `${((index + 1) / total) * 100}%`)
  }, [inv, index, total])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      <div
        className={`relative z-10 w-11 h-11 flex items-center justify-center shrink-0 transition-all duration-500`}
        style={{
          border: inv ? `2px solid ${color}` : '2px solid rgba(248,243,255,0.08)',
          background: inv ? `${color}15` : 'transparent',
          boxShadow: inv ? `0 0 16px ${color}30` : 'none',
        }}
      >
        <span
          className="font-vt323 text-xl transition-colors duration-500"
          style={{ color: inv ? color : 'var(--text-tertiary)' }}
        >
          {item.step}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="font-display text-base font-extrabold text-text-primary mb-2 uppercase tracking-tight">{item.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed" style={{ fontFamily: 'Space Mono, monospace' }}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* ═══════ Tech tags ═══════ */
const TECH_TAGS = [
  'React', 'Vue', 'TypeScript', 'Node.js', 'SpringBoot',
  'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Nginx',
  'ECharts', 'WebSocket', 'Uni-App', 'Next.js', 'Nuxt',
  'DeepSeek', '通义千问', 'Python', 'GraphQL', 'K8s',
]
const tagColors = ['#35DDF2', '#5E8CFF', '#10B981', '#F45BA8', '#A477FF', '#E8B85D']

/* ═══════ FAQ Scroll-Reveal Grid ═══════ */


function FaqRevealItem({ item, index, total, scrollProgress }: {
  item: { q: string; a: string }
  index: number
  total: number
  scrollProgress: MotionValue<number>
}) {
  const start = (index / total) * 0.86
  const end = Math.min(((index + 1.8) / total) * 0.86, 0.99)
  const opacity = useTransform(scrollProgress, [start, end], [0, 1])
  const y = useTransform(scrollProgress, [start, end], [48, 0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      style={{ opacity, y }}
      className="card-premium rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-text-primary pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-text-secondary text-sm font-vt323"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 0.1, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FaqRevealGrid({ items }: { items: { q: string; a: string }[] }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 92%', 'start 15%'],
  })

  return (
    <div ref={gridRef} className="grid md:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <FaqRevealItem
          key={i}
          item={item}
          index={i}
          total={items.length}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

/* ═══════ HOME PAGE ═══════ */
export default function Home() {
  const { data } = usePortfolioData()
  const { services, workflowSteps, clients, faqItems, projectGroups, allProjects } = data

  return (
    <PageTransition>
      <ScrollProgress />

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section id="hero" data-section-physics className="relative min-h-screen flex items-center overflow-hidden">
        {/* Physics canvas */}
        <Suspense fallback={null}>
          <PhysicsHero />
        </Suspense>

        {/* Overlays */}
        <div className="vignette absolute inset-0 z-[1]" aria-hidden="true" />

        {/* Hero grid background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248,243,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248,243,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '42px 42px',
            maskImage: 'radial-gradient(circle at 70% 46%, black 0%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(circle at 70% 46%, black 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 py-32 lg:py-44">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* ── Left: Text content ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 0.1, 0.2, 1] }}
            >
              {/* Kicker badge */}
              <div
                className="inline-flex items-center gap-2.5 mb-7 px-3 py-2 clip-notch"
                style={{
                  border: '1px solid rgba(53,221,242,0.20)',
                  background: 'rgba(53,221,242,0.04)',
                  color: '#35DDF2',
                  boxShadow: '0 0 18px rgba(53,221,242,0.06)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#35DDF2', boxShadow: '0 0 10px rgba(53,221,242,0.7)' }}
                />
                <span className="font-vt323 text-base tracking-[0.2em] uppercase">Available for Missions</span>
              </div>

              {/* Hero title — VT323, massive, text-glow */}
              <h1
                className="font-vt323 uppercase tracking-[-0.035em] mb-6"
                style={{
                  fontSize: 'clamp(4.5rem, 9vw, 8.4rem)',
                  lineHeight: 0.86,
                  color: '#F8F3FF',
                  textShadow: '0 0 12px rgba(255,255,255,0.16), 0 0 38px rgba(53,221,242,0.08)',
                }}
                data-physics-collider
              >
                <span className="text-glow-cyan" style={{ color: '#35DDF2' }}>全栈</span>
                <br />
                架构
                <span className="text-glow-pink" style={{ color: '#F45BA8' }}>.</span>
              </h1>

              {/* Subtitle — Space Mono body */}
              <p
                className="max-w-[38rem] mb-10 leading-relaxed"
                style={{
                  color: 'rgba(248,243,255,0.68)',
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.08rem)',
                  lineHeight: 1.9,
                }}
              >
                <TypewriterText
                  text="不只是写代码。是让你的想法，比想象中更酷。"
                  speed={35}
                  delay={0.5}
                />
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#portfolio" className="btn-primary">
                  查看任务档案 <ArrowUpRight size={16} />
                </a>
                <a href="/contact" className="btn-secondary">
                  建立通讯
                </a>
              </div>

              {/* Stats row — 3 columns, glass */}
              <div
                className="grid grid-cols-3 max-w-[34rem]"
                style={{
                  border: '1px solid rgba(248,243,255,0.08)',
                  background: 'linear-gradient(180deg, rgba(248,243,255,0.034), rgba(248,243,255,0.008)), rgba(7,0,20,0.48)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                {[
                  { v: 47, l: '交付项目', c: '#10B981' },
                  { v: 240, l: '万日处理数据', c: '#35DDF2' },
                  { v: 99.7, l: '% 系统可用率', c: '#F45BA8' },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="p-4 text-center"
                    style={{ borderRight: i < 2 ? '1px solid rgba(248,243,255,0.07)' : 'none' }}
                  >
                    <div className="font-vt323 text-3xl leading-none" style={{ color: s.c, textShadow: `0 0 18px ${s.c}50` }}>
                      <Counter to={s.v} suffix={i === 1 ? '万' : i === 2 ? '%' : ''} decimals={i === 2 ? 1 : 0} />
                    </div>
                    <div className="mt-1 text-[0.6rem] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(248,243,255,0.42)' }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Cosmic Stage — 3D cube + orbit rings + chips + particles ── */}
            <div className="hidden lg:flex items-center justify-center">
              <div
                className="relative w-full max-w-[35rem] min-h-[35rem] flex items-center justify-center overflow-hidden"
                style={{
                  border: '1px solid rgba(248,243,255,0.08)',
                  background: `
                    linear-gradient(180deg, rgba(248,243,255,0.04), rgba(248,243,255,0.01)),
                    radial-gradient(circle at 50% 42%, rgba(53,221,242,0.10), transparent 44%),
                    radial-gradient(circle at 70% 62%, rgba(244,91,168,0.08), transparent 44%),
                    radial-gradient(circle at 28% 72%, rgba(232,184,93,0.06), transparent 42%),
                    rgba(16,10,36,0.38)
                  `,
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 80px rgba(0,0,0,0.28), inset 0 0 70px rgba(53,221,242,0.03)',
                }}
              >
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(248,243,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(248,243,255,0.024) 1px, transparent 1px)
                    `,
                    backgroundSize: '34px 34px',
                  }}
                />

                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(2,3,10,0.6), transparent 24%, transparent 76%, rgba(2,3,10,0.6)), linear-gradient(180deg, transparent, rgba(2,3,10,0.5))',
                  }}
                />

                {/* Central glow */}
                <div
                  className="absolute w-[25rem] h-[25rem] rounded-full opacity-90"
                  style={{
                    background: 'radial-gradient(circle, rgba(53,221,242,0.16), transparent 58%), radial-gradient(circle at 68% 42%, rgba(244,91,168,0.12), transparent 48%), radial-gradient(circle at 34% 70%, rgba(232,184,93,0.10), transparent 44%)',
                    filter: 'blur(5px)',
                  }}
                />

                {/* Orbit rings */}
                <div className="orbit-ring w-[27rem] h-[27rem]" style={{ color: '#E8B85D' }} />
                <div className="orbit-ring w-[20rem] h-[20rem]" style={{ color: '#35DDF2', animationDirection: 'reverse', animationDuration: '12s' }} />
                <div className="orbit-ring w-[13.5rem] h-[13.5rem]" style={{ color: '#F45BA8', animationDuration: '9s' }} />

                {/* CSS 3D Cube */}
                <div className="cube-scene relative z-10">
                  <div className="cube">
                    <div className="cube-face front" />
                    <div className="cube-face back" />
                    <div className="cube-face right" />
                    <div className="cube-face left" />
                    <div className="cube-face top" />
                    <div className="cube-face bottom" />
                  </div>
                </div>

                {/* Status chips — four corners */}
                <StatusChip label="需求输入" color="#35DDF2" className="absolute left-5 top-28" />
                <StatusChip label="架构设计" color="#F45BA8" className="absolute right-5 top-44" />
                <StatusChip label="系统开发" color="#E8B85D" className="absolute left-5 bottom-32" />
                <StatusChip label="部署交付" color="#5E8CFF" className="absolute right-6 bottom-40" />

                {/* Mini particles */}
                <div className="mini-particle" style={{ top: '18%', right: '22%', color: '#35DDF2', animationDelay: '0s' }} />
                <div className="mini-particle" style={{ top: '25%', right: '15%', color: '#F45BA8', animationDelay: '-1.2s' }} />
                <div className="mini-particle" style={{ top: '17%', right: '34%', color: '#E8B85D', animationDelay: '-2.1s' }} />
                <div className="mini-particle" style={{ top: '62%', right: '22%', color: '#5E8CFF', animationDelay: '-2.8s' }} />
                <div className="mini-particle" style={{ top: '56%', left: '18%', color: '#A477FF', animationDelay: '-3.3s' }} />

                {/* Bottom console panel */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{
                    borderTop: '1px solid rgba(248,243,255,0.08)',
                    background: 'rgba(2,3,10,0.82)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2 text-[0.6rem] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(248,243,255,0.46)' }}>
                    <span>系统运行状态</span>
                    <span style={{ color: '#10B981' }}>NOMINAL</span>
                  </div>
                  <div className="meter-track" style={{ borderColor: 'rgba(53,221,242,0.2)' }}>
                    <motion.div
                      className="meter-fill"
                      style={{
                        width: '87%',
                        color: '#35DDF2',
                        background: 'linear-gradient(90deg, #35DDF2, #F45BA8, #E8B85D)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES — 3-col rail + info cards
          ═══════════════════════════════════════════════════ */}
      <section id="services" data-section-physics className="section-bg-pink relative py-28 border-t" style={{ borderColor: 'rgba(244,91,168,0.12)' }}>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(244,91,168,0.24)', background: 'rgba(244,91,168,0.05)', color: '#F45BA8', boxShadow: '0 0 14px rgba(244,91,168,0.06)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#F45BA8', boxShadow: '0 0 10px rgba(244,91,168,0.6)' }} />
              <span className="font-vt323 text-base tracking-[0.2em] uppercase">Mission Types</span>
            </div>
            <h2 data-physics-collider className="font-display font-extrabold uppercase tracking-[-0.06em] mb-16"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92 }}>
              <span className="block" style={{ color: '#F8F3FF', textShadow: '0 0 20px rgba(248,243,255,0.12)' }}>任务</span>
              <span className="block" style={{ color: '#F45BA8', textShadow: '0 0 28px rgba(244,91,168,0.28)' }}>类型</span>
            </h2>
          </ScrollReveal>

          {/* ── Service cards ── */}
          <div className="space-y-6">
            {/* Service 1 — Featured (full-width, horizontal on desktop) */}
            <motion.div
              key={services[0].title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="card-glow rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start group cursor-default"
              style={{ borderColor: 'rgba(53,221,242,0.18)' }}
            >
              <div className="relative z-10 shrink-0">
                <span className="font-vt323 text-8xl leading-none" style={{ color: '#35DDF2', textShadow: '0 0 32px rgba(53,221,242,0.5), 0 0 64px rgba(53,221,242,0.15)' }}>01</span>
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="font-display font-extrabold text-2xl uppercase tracking-[-0.04em]" style={{ color: '#F8F3FF' }}>
                    {services[0].title}
                  </h3>
                  <StatusChip label="核心能力" color="#35DDF2" />
                </div>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(248,243,255,0.55)', fontFamily: 'Space Mono, monospace' }}>
                  {services[0].desc}
                </p>
              </div>
              <div className="relative z-10 w-full lg:w-56 space-y-3 shrink-0">
                <MeterBar label={serviceMeters[0].label} pct={serviceMeters[0].pct} color="#35DDF2" />
                <MeterBar label="全栈覆盖度" pct={92} color="#35DDF2" delay={1} />
              </div>
            </motion.div>

            {/* Services 2–4 — 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {services.slice(1).map((svc, i) => {
                const colors = ['#F45BA8', '#A477FF', '#5E8CFF']
                const color = colors[i]
                const meter = serviceMeters[i + 1]
                const nums = ['02', '03', '04']
                return (
                  <motion.div
                    key={svc.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
                    className="card-solid rounded-xl p-5 group cursor-default flex flex-col"
                    style={{ borderColor: `${color}20` }}
                  >
                    <div className="relative z-10 flex-1">
                      <span className="font-vt323 text-5xl leading-none" style={{ color, textShadow: `0 0 24px ${color}50` }}>{nums[i]}</span>
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-[-0.03em] mt-3 mb-2" style={{ color: '#F8F3FF' }}>
                        {svc.title}
                      </h3>
                      <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(248,243,255,0.48)', fontFamily: 'Space Mono, monospace' }}>
                        {svc.desc}
                      </p>
                    </div>
                    <div className="relative z-10">
                      <MeterBar label={meter.label} pct={meter.pct} color={color} />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Client testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t pt-6 mt-2"
              style={{ borderColor: 'rgba(248,243,255,0.05)' }}
            >
              <p className="text-sm italic text-center max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(248,243,255,0.42)', fontFamily: 'Space Mono, monospace' }}>
                "Leon 一个人就是一支精干团队。从需求对接到交付，全程零转包，源码完整交付。"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CREDIBILITY
          ═══════════════════════════════════════════════════ */}
      <Credibility />

      {/* ═══════════════════════════════════════════════════
          PROJECTS — 4-col cards
          ═══════════════════════════════════════════════════ */}
      <section id="portfolio" data-section-physics className="section-bg-cyan relative py-28 border-t" style={{ borderColor: 'rgba(53,221,242,0.12)' }}>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(53,221,242,0.22)', background: 'rgba(53,221,242,0.05)', color: '#35DDF2', boxShadow: '0 0 14px rgba(53,221,242,0.06)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#35DDF2', boxShadow: '0 0 10px rgba(53,221,242,0.6)' }} />
              <span className="font-vt323 text-base tracking-[0.2em] uppercase">Mission Archive</span>
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.06em] mb-16"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92 }}>
              <span data-physics-collider className="block" style={{ color: '#F8F3FF', textShadow: '0 0 20px rgba(248,243,255,0.12)' }}>任务</span>
              <span className="block" style={{ color: '#35DDF2', textShadow: '0 0 28px rgba(53,221,242,0.28)' }}>档案</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-20">
            {projectGroups.map((group) => {
              const items = group.items.map((id) => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <ScrollReveal>
                    <h3 className="text-sm font-bold text-text-primary mb-8 flex items-center gap-3 font-display uppercase tracking-tight">
                      <span className="w-1.5 h-5 rounded-full" style={{ background: '#35DDF2' }} />
                      {group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((p, i) => {
                      const status = getProjectStatus(p)
                      const colors = ['#35DDF2', '#F45BA8', '#A477FF', '#5E8CFF']
                      const cardColor = colors[i % 4]
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                          <TiltCard3D tiltMax={5}>
                            <Link
                              to={p.link}
                              className="card-solid rounded-xl overflow-hidden flex flex-col group h-full"
                            >
                              {/* Image with status overlay */}
                              {p.images?.[0] ? (
                                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                                  <img
                                    src={p.images[0]}
                                    alt={p.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute top-3 right-3">
                                    <StatusChip label={status.label} color={status.color} />
                                  </div>
                                </div>
                              ) : (
                                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 flex items-center justify-center">
                                  <span className="font-vt323 text-6xl leading-none opacity-15" style={{ color: cardColor }}>
                                    {(i + 1).toString().padStart(2, '0')}
                                  </span>
                                  <div className="absolute top-3 right-3">
                                    <StatusChip label={status.label} color={status.color} />
                                  </div>
                                </div>
                              )}
                              {/* Content */}
                              <div className="relative z-10 p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2.5 mb-2.5">
                                  <span className="font-vt323 text-3xl leading-none shrink-0" style={{ color: cardColor, textShadow: `0 0 16px ${cardColor}50` }}>
                                    {(i + 1).toString().padStart(2, '0')}
                                  </span>
                                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded" style={{ color: cardColor, border: `1px solid ${cardColor}30`, background: `${cardColor}08` }}>
                                    {p.category?.split('·')[0]?.trim()}
                                  </span>
                                </div>
                                <h4 className="font-display font-extrabold text-sm uppercase tracking-[-0.03em] mb-2" style={{ color: '#F8F3FF' }}>
                                  {p.title}
                                </h4>
                                <p className="text-xs leading-relaxed flex-1 line-clamp-2 mb-3" style={{ color: 'rgba(248,243,255,0.48)', fontFamily: 'Space Mono, monospace' }}>
                                  {p.overview || p.description}
                                </p>
                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                  {p.tech.slice(0, 3).map((t) => (
                                    <span key={t} className="text-[0.6rem] px-2 py-0.5 rounded font-mono" style={{ color: 'rgba(248,243,255,0.4)', background: 'rgba(248,243,255,0.04)' }}>
                                      {t}
                                    </span>
                                  ))}
                                  {p.tech.length > 3 && (
                                    <span className="text-[0.6rem] px-2 py-0.5 rounded font-mono" style={{ color: 'rgba(248,243,255,0.25)' }}>
                                      +{p.tech.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </TiltCard3D>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROCESS — alternating color cards
          ═══════════════════════════════════════════════════ */}
      <section data-section-physics className="section-bg-gold relative py-28 border-t" style={{ borderColor: 'rgba(232,184,93,0.12)' }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(232,184,93,0.22)', background: 'rgba(232,184,93,0.05)', color: '#E8B85D', boxShadow: '0 0 14px rgba(232,184,93,0.06)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#E8B85D', boxShadow: '0 0 10px rgba(232,184,93,0.6)' }} />
              <span className="font-vt323 text-base tracking-[0.2em] uppercase">Protocol</span>
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.06em] mb-16"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92 }}>
              <span data-physics-collider className="block" style={{ color: '#F8F3FF', textShadow: '0 0 20px rgba(248,243,255,0.12)' }}>合作</span>
              <span className="block" style={{ color: '#E8B85D', textShadow: '0 0 28px rgba(232,184,93,0.28)' }}>流程</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-[21px] top-2 bottom-2 w-px" style={{ background: 'rgba(248,243,255,0.05)' }} />
            <div
              className="absolute left-[21px] top-2 w-px transition-all duration-700"
              style={{
                height: 'var(--process-line-h, 0%)',
                background: 'linear-gradient(to bottom, #35DDF2, #F45BA8, #E8B85D, #A477FF)',
                boxShadow: '0 0 8px rgba(53,221,242,0.25)',
              }}
            />
            <div className="space-y-8">
              {workflowSteps.map((item, i) => (
                <ProcessStep key={item.step} item={item} index={i} total={workflowSteps.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CLIENTS
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(248,243,255,0.06)' }}>
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(248,243,255,0.08)', background: 'rgba(248,243,255,0.02)', color: 'rgba(248,243,255,0.45)', boxShadow: '0 0 14px rgba(248,243,255,0.03)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#E8B85D', boxShadow: '0 0 8px rgba(232,184,93,0.5)' }} />
              <span className="font-vt323 text-sm tracking-[0.2em] uppercase">Trusted By</span>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="card-solid rounded-lg p-5 text-center"
              >
                <p className="text-sm font-medium" style={{ color: 'rgba(248,243,255,0.55)' }}>{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TECH ARMORY
          ═══════════════════════════════════════════════════ */}
      <section data-section-physics className="section-bg-pink relative py-28 border-t" style={{ borderColor: 'rgba(244,91,168,0.10)' }}>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(164,119,255,0.22)', background: 'rgba(164,119,255,0.05)', color: '#A477FF', boxShadow: '0 0 14px rgba(164,119,255,0.06)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#A477FF', boxShadow: '0 0 10px rgba(164,119,255,0.6)' }} />
              <span className="font-vt323 text-base tracking-[0.2em] uppercase">Tech Armory</span>
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.06em] mb-16"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92 }}>
              <span data-physics-collider className="block" style={{ color: '#F8F3FF', textShadow: '0 0 20px rgba(248,243,255,0.12)' }}>技术</span>
              <span className="block" style={{ color: '#A477FF', textShadow: '0 0 28px rgba(164,119,255,0.28)' }}>装备</span>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="flex flex-wrap gap-2">
                {TECH_TAGS.map((tag, i) => {
                  const color = tagColors[i % tagColors.length]
                  return (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: i * 0.02 }}
                      className="card-solid rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-default transition-all duration-250"
                      style={{ color, borderColor: `${color}35` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = color
                        e.currentTarget.style.boxShadow = `0 0 18px ${color}45`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${color}35`
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      {tag}
                    </motion.span>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div
                className="card-premium rounded-xl p-5 cursor-pointer group h-full"
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E8B85D' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
                    <span className="text-[0.6rem] font-bold tracking-wider uppercase ml-2" style={{ color: 'rgba(248,243,255,0.4)' }}>terminal — zsh</span>
                  </div>
                  <div className="space-y-1.5" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem' }}>
                    <p style={{ color: '#10B981' }}>
                      <span style={{ color: 'rgba(248,243,255,0.4)' }}>$</span> whoami
                    </p>
                    <p style={{ color: 'rgba(248,243,255,0.6)' }}>Leon — Full Stack Architect</p>
                    <p className="mt-2" style={{ color: '#35DDF2' }}>
                      <span style={{ color: 'rgba(248,243,255,0.4)' }}>$</span> projects --list
                    </p>
                    <p style={{ color: 'rgba(248,243,255,0.6)' }}>7 mission archives on record</p>
                    <p className="mt-2" style={{ color: '#A477FF' }}>
                      <span style={{ color: 'rgba(248,243,255,0.4)' }}>$</span> <span className="cursor-blink">_</span>
                    </p>
                  </div>
                  <p className="text-[0.6rem] font-bold tracking-wider uppercase text-right mt-4 group-hover:text-[#35DDF2] transition-colors" style={{ color: 'rgba(248,243,255,0.35)' }}>
                    Ctrl+K 打开完整终端 →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════ */}
      <section id="faq" data-section-physics className="py-28 border-t" style={{ borderColor: 'rgba(248,243,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
              style={{ border: '1px solid rgba(94,140,255,0.22)', background: 'rgba(94,140,255,0.05)', color: '#5E8CFF', boxShadow: '0 0 14px rgba(94,140,255,0.06)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#5E8CFF', boxShadow: '0 0 10px rgba(94,140,255,0.6)' }} />
              <span className="font-vt323 text-base tracking-[0.2em] uppercase">FAQ</span>
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.06em] mb-12"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92, color: '#F8F3FF', textShadow: '0 0 20px rgba(248,243,255,0.12)' }}>
              常见问题
            </h2>
          </ScrollReveal>
          <FaqRevealGrid items={faqItems} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════ */}
      <section data-section-physics className="pb-28">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glass rounded-3xl p-14 sm:p-20 text-center overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" style={{ background: 'rgba(53,221,242,0.04)' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 blur-[140px] pointer-events-none" style={{ background: 'rgba(53,221,242,0.04)' }} />
            <div className="max-w-xl mx-auto relative z-10">
              <h2 data-physics-collider className="font-display text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
                准备好启动<span style={{ color: '#35DDF2' }}>任务</span>？
              </h2>
              <p className="mb-10 leading-relaxed text-lg" style={{ color: 'rgba(248,243,255,0.6)', fontFamily: 'Space Mono, monospace' }}>
                从需求沟通到开发交付，全链路直接和我对接。
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a href="/contact" className="btn-primary" style={{ borderColor: '#10B981', color: '#10B981', boxShadow: '0 0 20px rgba(16,185,129,0.14)' }}>
                  建立通讯 <ArrowUpRight size={16} />
                </a>
                <a href="tel:18389118642" className="btn-secondary">
                  18389118642
                </a>
              </div>
              <div className="flex justify-center gap-8 text-xs" style={{ color: 'rgba(248,243,255,0.35)', fontFamily: 'Space Mono, monospace' }}>
                <a href="mailto:554295000@qq.com" className="hover:text-[#35DDF2] transition-colors">554295000@qq.com</a>
                <span style={{ color: 'rgba(248,243,255,0.2)' }}>|</span>
                <a href="https://github.com/Leon-LY" target="_blank" rel="noopener noreferrer" className="hover:text-[#35DDF2] transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
