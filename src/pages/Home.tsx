import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, BarChart3, Building2, Layers, Brain } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { usePortfolioData } from '../data/usePortfolioData'
import Credibility from '../components/sections/Credibility'
import TypewriterText from '../components/effects/TypewriterText'
import TiltCard3D from '../components/effects/TiltCard3D'
import DataTorrent from '../components/effects/DataTorrent'

/* ═══════════════════════════════════════════════════════
   Service icons
   ═══════════════════════════════════════════════════════ */
const serviceIcons: Record<string, typeof BarChart3> = {
  '全栈应用开发': Layers,
  '数据可视化': BarChart3,
  '移动端 & 小程序': Building2,
  'AI 集成 & 架构': Brain,
}

/* ═══════════════════════════════════════════════════════
   WordReveal — 逐字符渐现
   ═══════════════════════════════════════════════════════ */
function WordReveal({ text, visible, className = '' }: { text: string; visible: boolean; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 0.1, 0.2, 1] }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════
   Animated Geometric Core — CSS 3D nested rings
   ═══════════════════════════════════════════════════════ */
function GeometricCore() {
  return (
    <div className="relative w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] flex items-center justify-center"
      style={{ perspective: 800 }}>
      <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-spin-slow" />
      <div className="absolute inset-[15%] rounded-full border border-accent/10 animate-spin-reverse"
        style={{ transform: 'rotateX(60deg)' }} />
      <div className="absolute inset-[30%] rounded-full border-2 border-accent/20 animate-spin-slow"
        style={{ transform: 'rotateY(45deg)' }} />
      <div className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_rgba(0,229,255,0.5),0_0_60px_rgba(0,229,255,0.2)] animate-pulse-slow" />
      <div className="absolute w-2 h-2 rounded-full bg-accent/60"
        style={{ animation: 'spin-slow 8s linear infinite', transform: 'translateX(160px)' }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/40 lg:hidden"
        style={{ animation: 'spin-reverse 6s linear infinite', transform: 'translateX(120px) rotateY(60deg)' }} />
      <div className="absolute inset-x-0 top-[45%] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent animate-pulse-slow" />
      <div className="absolute inset-x-[10%] top-[55%] h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-pulse-slow"
        style={{ animationDelay: '1s' }} />
    </div>
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
      className="card-premium rounded-xl overflow-hidden"
    >
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
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const { data } = usePortfolioData()
  const { personalInfo, services, workflowSteps, clients, faqItems, projectGroups, allProjects } = data

  // ═══ DataTorrent state ═══
  const torrentSeen = typeof window !== 'undefined' ? sessionStorage.getItem('torrent-seen') : null
  const [showTorrent, setShowTorrent] = useState(!torrentSeen)
  const [heroVisible, setHeroVisible] = useState(!!torrentSeen)

  const handleTorrentComplete = useCallback(() => {
    sessionStorage.setItem('torrent-seen', '1')
    setHeroVisible(true)
    setTimeout(() => setShowTorrent(false), 800)
  }, [])

  return (
    <PageTransition>
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
        {/* Background layers */}
        {showTorrent && <DataTorrent onComplete={handleTorrentComplete} skipAnimation={false} />}
        {(!showTorrent || heroVisible) && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
              }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
              style={{ background: 'radial-gradient(ellipse at center, #00E5FF 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
        )}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.22, 0.1, 0.2, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-mono text-text-secondary tracking-widest">AVAILABLE FOR WORK</span>
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] text-text-primary mb-6">
                {heroVisible ? (
                  <WordReveal text={personalInfo.name} visible={heroVisible} />
                ) : (
                  personalInfo.name
                )}
                <motion.span
                  className="text-shimmer"
                  animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: personalInfo.name.length * 0.025 + 0.2 }}
                >.</motion.span>
              </h1>

              <motion.div
                className="text-xl sm:text-2xl lg:text-3xl text-text-secondary mb-10 leading-snug max-w-lg"
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <TypewriterText text={personalInfo.heroTitle} speed={35} delay={heroVisible ? 0.5 : 99} />
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3 mb-12"
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <a href="#portfolio"
                  className="btn-glow group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-black text-sm font-bold rounded-lg hover:bg-accent-bright active:scale-[0.98] transition-all duration-200"
                >
                  查看案例 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-text-primary text-sm font-medium rounded-lg border border-white/[0.15] hover:bg-white/[0.04] hover:border-white/[0.25] transition-all duration-200"
                >
                  联系合作
                </a>
              </motion.div>

              <motion.p
                className="text-xs text-text-tertiary font-mono"
                animate={heroVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {personalInfo.heroCredibility}
              </motion.p>
            </motion.div>

            {/* Right: Geometric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 0.1, 0.2, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <GeometricCore />
            </motion.div>
          </div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { v: '47', l: '交付项目' },
              { v: '2.4M', l: '日处理数据' },
              { v: '99.7%', l: '系统可用率' },
              { v: '12ms', l: '平均响应' },
            ].map(m => (
              <div key={m.l} className="card-solid rounded-xl p-4 text-center border-white/[0.06]">
                <div className="text-2xl lg:text-3xl font-black font-mono text-accent">{m.v}</div>
                <div className="text-[11px] text-text-tertiary mt-1">{m.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="relative py-28 border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-accent/[0.015]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Capabilities</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">
              专注领域
            </h2>
            <div className="section-divider mb-14" />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.title] || BarChart3
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <TiltCard3D tiltMax={4} className="h-full">
                    <div className="card-premium corner-accent rounded-2xl p-7 hover:border-accent/25 transition-all duration-300 group h-full">
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                          <Icon size={22} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                          <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CREDIBILITY (GSAP scrub) ═══════ */}
      <Credibility />

      {/* ═══════ PROJECTS ═══════ */}
      <section id="portfolio" className="py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Case Studies</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">
              项目案例
            </h2>
            <div className="section-divider mb-14" />
          </ScrollReveal>

          <div className="space-y-20">
            {projectGroups.map((group) => {
              const items = group.items.map(id => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <h3 className="text-sm font-bold text-text-primary mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-5 bg-accent rounded-full" />
                    {group.label}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((p, i) => (
                      <motion.div key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}>
                        <TiltCard3D tiltMax={5} className="h-full">
                          <Link to={p.link}
                            className="project-card card-glass rounded-2xl border-white/[0.06] hover:border-accent/20 transition-all duration-300 overflow-hidden h-full flex flex-col group block">
                            {p.images?.[0] && (
                              <div className="project-image relative aspect-[16/10] overflow-hidden bg-surface-2">
                                <img src={p.images[0]} alt={p.title} loading="lazy" decoding="async"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {/* Hover tech overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
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

      {/* ═══════ PROCESS — vertical timeline ═══════ */}
      <section className="py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">Process</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6 tracking-tight">合作流程</h2>
            <div className="section-divider mb-16" />
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.06]" />
            <div className="space-y-14">
              {workflowSteps.map((item, i) => (
                <motion.div key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex gap-6">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-surface-0 border-2 border-accent/40 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold font-mono text-accent">{item.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CLIENTS ═══════ */}
      <section className="py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-8 text-center">Trusted By</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((name, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="card-premium rounded-xl p-5 text-center">
                <p className="text-sm text-text-secondary font-medium">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-28 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6 tracking-tight">常见问题</h2>
            <div className="section-divider mb-12" />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-3">
            {faqItems.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative card-glass rounded-3xl p-14 sm:p-20 text-center overflow-hidden border-white/[0.06]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 bg-accent/5 blur-[140px] pointer-events-none" />
            <div className="max-w-xl mx-auto relative z-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
                准备好<span className="text-accent">启动</span>项目？
              </h2>
              <p className="text-text-secondary mb-10 leading-relaxed text-lg">
                需求沟通到开发交付，全链路直接对接。
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-black text-sm font-bold rounded-lg hover:bg-accent-bright active:scale-[0.98] transition-all duration-200"
                >
                  预约咨询 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-text-primary text-sm font-medium rounded-lg border border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200"
                >
                  查看案例
                </a>
              </div>
              <div className="flex justify-center gap-8 text-xs text-text-tertiary">
                <a href="tel:18389118642" className="hover:text-accent transition-colors">18389118642</a>
                <a href="mailto:554295000@qq.com" className="hover:text-accent transition-colors">554295000@qq.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
