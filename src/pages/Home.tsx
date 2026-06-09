import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { personalInfo, services, heroStats } from '../data/config'
import { projectGroups, allProjects } from '../data/projects'

function HeroBg() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.12) 35%, transparent 65%)', left: `${pos.x*100}%`, top: `${pos.y*100}%`, transform: 'translate(-50%,-50%)', transition: 'left 0.3s ease-out, top 0.3s ease-out' }} />
      <div className="absolute w-[350px] h-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)', left: `${pos.x*80}%`, top: `${pos.y*80}%`, transform: 'translate(-50%,-50%)', transition: 'left 0.5s ease-out, top 0.5s ease-out' }} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
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
      <section className="relative pt-40 pb-24 overflow-hidden">
        <HeroBg />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">{personalInfo.tagline}</span>
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
              {heroStats.map(s => (<div key={s.label}><span className="text-2xl font-extrabold text-white">{s.value}</span><span className="text-xs text-slate-500 ml-1.5">{s.label}</span></div>))}
            </div>

            <p className="mt-8 text-xs text-slate-600">{personalInfo.heroCredibility}</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">服务方向</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">专注领域</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6 h-full hover:border-white/[0.08] transition-all">
                  <h3 className="text-base font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PORTFOLIO ═══════ */}
      <section id="portfolio" className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">作品</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">项目案例</h2>
            <p className="text-sm text-slate-500 mb-14">每个项目都代表一类可交付的技术方案。</p>
          </ScrollReveal>

          <div className="space-y-20">
            {projectGroups.map((group) => {
              const items = group.items.map(id => allProjects[id]).filter(Boolean)
              if (!items.length) return null
              return (
                <div key={group.label}>
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                      <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full" />
                      {group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((p, i) => (
                      <ScrollReveal key={p.id} delay={i * 0.06}>
                        <Link to={p.link}>
                          <TiltCard className="group bg-[#111827] rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all overflow-hidden h-full flex flex-col">
                            {p.images?.[0] && (
                              <div className="aspect-[16/9] overflow-hidden">
                                <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                              </div>
                            )}
                            <div className="p-5 flex-1 flex flex-col">
                              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">{p.category}</p>
                              <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                              {p.overview ? (
                                <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-2">{p.overview}</p>
                              ) : (
                                <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                              )}
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {p.tech.slice(0, 4).map(t => <span key={t} className="text-[10px] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-md">{t}</span>)}
                              </div>
                            </div>
                          </TiltCard>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#111827] border border-white/[0.05] rounded-3xl p-10 sm:p-14">
            <div className="max-w-2xl mx-auto text-center">
              <ScrollReveal>
                <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">技术合作</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">有项目需要落地？</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  提供从需求评估、技术方案到开发交付的全流程服务。<br />
                  初步沟通不收费，可根据需求复杂度提供评估建议。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:18389118642" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                    18389118642
                  </a>
                  <a href="mailto:554295000@qq.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                    554295000@qq.com
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
