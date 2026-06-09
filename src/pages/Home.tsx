import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import TypewriterText from '../components/TypewriterText'
import { personalInfo, skills, realProjects, demoProjects } from '../data/projects'
import { heroStats, typewriterTexts } from '../data/config'

/* ── Cursor-tracking glow ── */
function HeroBg() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Big bright cursor glow */}
      <div className="absolute w-[700px] h-[700px] rounded-full transition-[left,top] duration-300 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.12) 35%, transparent 65%)', left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`, transform: 'translate(-50%, -50%)' }} />
      {/* Second smaller glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full transition-[left,top] duration-500 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)', left: `${mouse.x * 80}%`, top: `${mouse.y * 80}%`, transform: 'translate(-50%, -50%)' }} />
      {/* Static blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[120px]" />
      {/* Grid */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">可接项目</span>
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.92]">{personalInfo.name}<span className="text-blue-500">.</span></h1>
                <div className="mt-5 h-8 sm:h-12"><TypewriterText texts={typewriterTexts} className="text-xl sm:text-3xl text-slate-400 font-medium" /></div>
                <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">{personalInfo.bio}</p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link to="/marketing" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5">查看作品 <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                  <a href={`tel:${personalInfo.phone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">{personalInfo.phone}</a>
                  <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">{personalInfo.email}</a>
                </div>
                <div className="flex flex-wrap gap-8 mt-12">
                  {heroStats.map(s => (<div key={s.label}><div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div><div className="text-xs text-slate-500 mt-0.5">{s.label}</div></div>))}
                </div>
              </motion.div>
            </div>
            {/* Right: floating tech tags */}
            <div className="lg:col-span-2 hidden lg:block">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
                <div className="flex flex-wrap gap-2.5">
                  {['Vue.js', 'React', 'TypeScript', 'Node.js', 'ECharts', 'Uni-app', 'Docker', 'PostgreSQL', 'GraphQL', 'Redis'].map((tag, i) => (
                    <motion.span key={tag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                      className="px-3.5 py-2 bg-white/[0.03] border border-white/[0.05] rounded-xl text-sm text-slate-400 backdrop-blur-sm hover:bg-white/[0.06] hover:text-white hover:border-blue-500/20 transition-all cursor-default">{tag}</motion.span>
                  ))}
                </div>
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full border border-blue-500/15 animate-pulse-glow" />
                <div className="absolute -bottom-6 left-10 w-18 h-18 rounded-full border border-violet-500/10 animate-pulse-glow" style={{ animationDelay: '1s' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Tech Stack</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12">技术能力</h2></ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-white/[0.03] rounded-2xl overflow-hidden">
            {skills.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.04}>
                <div className="bg-[#111827] p-6 lg:p-7 hover:bg-[#1a2332] transition-colors duration-300">
                  <div className="flex items-end justify-between mb-4"><span className="text-sm font-semibold text-white">{s.name}</span><span className="text-xs text-slate-600">{s.level}%</span></div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.04, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" /></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REAL PROJECTS ═══════ */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">Real Projects</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">真实项目</h2><p className="text-sm text-slate-500 mb-12">智慧城市 · 政务数字化 · 数据可视化</p></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.07}>
                <Link to={p.link}>
                  <TiltCard className="group bg-[#111827] rounded-2xl border border-white/[0.05] hover:border-emerald-500/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {p.images?.[0] ? (
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                        <span className="absolute top-3 left-3 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">真实项目</span>
                      </div>
                    ) : <div className="aspect-[16/9] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 flex items-center justify-center"><span className="text-5xl opacity-30">{['🏘️','📊','📱','🏢','🧩','🔐'][i]}</span></div>}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">{p.category}</span><ArrowUpRight size={14} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" /></div>
                      <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">{p.tech.map(t => <span key={t} className="text-[11px] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-md">{t}</span>)}</div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEMO ═══════ */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Demo Templates</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Demo 作品</h2><p className="text-sm text-slate-500 mb-12">展示不同领域的技术实现能力</p></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.07}>
                <Link to={p.link}>
                  <TiltCard className="group bg-[#111827] rounded-2xl border border-white/[0.04] hover:border-blue-500/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/15 via-violet-500/8 to-slate-700/20 flex items-center justify-center relative">
                      <span className="text-3xl opacity-25">{['📈','📊','🛍️','🏢'][i]}</span>
                      <span className="absolute top-3 left-3 text-[10px] font-bold text-blue-400 bg-blue-400/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">Demo</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-1.5"><span className="text-[10px] font-medium text-blue-400 uppercase tracking-wider">{p.category}</span><ArrowUpRight size={12} className="text-slate-600 group-hover:text-blue-400 transition-all" /></div>
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">{p.tech.slice(0, 3).map(t => <span key={t} className="text-[10px] text-slate-500 bg-white/[0.03] px-1.5 py-0.5 rounded">{t}</span>)}</div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl border border-blue-500/10 overflow-hidden p-10 sm:p-14 text-center">
            <div className="absolute inset-0 bg-[#111827]/60 backdrop-blur-sm" />
            <div className="relative z-10">
              <ScrollReveal><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">有项目要聊？</h2><p className="text-slate-400 mb-8 max-w-md mx-auto">无论是政务系统还是商业产品，我都能帮你把想法落地。</p>
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all">开始合作 <ArrowUpRight size={18} /></a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
