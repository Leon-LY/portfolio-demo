import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import TypewriterText from '../components/TypewriterText'
import { personalInfo, skills, projects } from '../data/projects'

/* ── Animated gradient mesh background ── */
function BgMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[150px] animate-pulse-glow" />
      <div className="absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] rounded-full bg-violet-500/8 blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse-glow" style={{ animationDelay: '0.7s' }} />
    </div>
  )
}

/* ── Tilt card ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0); const ry = useMotionValue(0)
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(y * -8); ry.set(x * 8)
  }
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { rx.set(0); ry.set(0) }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1200 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <PageTransition>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <BgMesh />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
              {/* Status dot */}
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">可接项目</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.92]">
                {personalInfo.name}<span className="text-blue-500">.</span>
              </h1>

              <div className="mt-6 sm:mt-8 h-8 sm:h-12">
                <TypewriterText
                  texts={['全栈软件工程师', 'React / Node.js 专家', '性能优化极客', '开源贡献者']}
                  className="text-xl sm:text-3xl text-slate-400 font-medium"
                />
              </div>

              <p className="mt-8 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                {personalInfo.bio}
              </p>

              <div className="flex flex-wrap gap-3 mt-10">
                <Link to="/marketing"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5">
                  查看作品 Demo <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <a href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">
                  联系我
                </a>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8 mt-16">
                {[{ v: '5+', l: '年经验' }, { v: '50+', l: '完成项目' }, { v: '99%', l: '客户满意度' }, { v: '10万+', l: '日活用户' }].map(s => (
                  <div key={s.l}>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.v}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Tech Stack</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">技术能力</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-white/[0.03] rounded-2xl overflow-hidden">
            {skills.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.04}>
                <div className="bg-[#0b1120] p-6 lg:p-7 hover:bg-[#0f1830] transition-colors duration-300 group">
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-sm font-semibold text-white">{s.name}</span>
                    <span className="text-xs text-slate-600">{s.level}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.04, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Demo Projects</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">项目作品</h2>
            <p className="text-sm text-slate-500 mb-14">多领域技术 Demo，展示不同场景下的工程能力。</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.07}>
                <Link to={p.link}>
                  <TiltCard className="group bg-[#0b1120] rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img src={p.image} alt={p.title} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {p.featured && <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-blue-600/80 backdrop-blur-sm px-2.5 py-1 rounded-lg">精选</span>}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium text-blue-400 uppercase tracking-wider">{p.category}</span>
                        <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tech.map(t => <span key={t} className="text-[11px] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-md">{t}</span>)}
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl border border-blue-500/10 overflow-hidden p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-[#0b1120]/60 backdrop-blur-sm" />
            <div className="relative z-10">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">有项目要聊？</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">无论是营销网站、SaaS 产品还是移动端应用，我都能帮你把想法变成现实。</p>
                <a href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-2xl hover:shadow-blue-500/25 transition-all">
                  开始合作 <ArrowUpRight size={18} />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
