import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import TypewriterText from '../components/TypewriterText'
import { personalInfo, skills, projects } from '../data/projects'

function MouseGlow() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          left: `${pos.x * 100}%`,
          top: `${pos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <MouseGlow />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-32 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2 mb-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-[#a1a1a1] tracking-wide">
                  开放合作机会
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight leading-[0.95]">
                {personalInfo.name}
                <span className="text-[#8b5cf6]">.</span>
              </h1>

              <div className="mt-6 h-10 sm:h-14">
                <TypewriterText
                  texts={[
                    '全栈软件工程师',
                    'React / Node.js 专家',
                    '性能优化偏执狂',
                    '开源爱好者',
                  ]}
                  className="text-xl sm:text-2xl lg:text-3xl text-[#a1a1a1] font-medium"
                  speed={65}
                  pauseTime={3000}
                />
              </div>

              <p className="mt-8 text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-xl">
                {personalInfo.bio}
              </p>

              <div className="flex flex-wrap gap-3 mt-10">
                <Link
                  to="/marketing"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all"
                >
                  查看作品 Demo
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                >
                  联系我
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-12">
              技术栈
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={i * 0.04}>
                <div className="group bg-[#0d0d0d] p-6 lg:p-8 hover:bg-[#141414] transition-colors duration-300">
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span className="text-xs text-[#525252]">{skill.level}%</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.04, ease: 'easeOut' }}
                      className="h-full bg-[#8b5cf6] rounded-full"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">
              项目作品
            </p>
            <p className="text-sm text-[#525252] mb-12">
              以下为不同领域的技术 Demo，展示多场景开发能力。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.06}>
                <Link to={project.link}>
                  <div className="group bg-[#0d0d0d] h-full flex flex-col hover:bg-[#141414] transition-colors duration-300">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.featured && (
                        <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                          精选
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-[#6b6b6b] uppercase tracking-wider">
                          {project.category}
                        </span>
                        <ArrowUpRight size={14} className="text-[#525252] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed flex-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-[11px] text-[#525252] bg-white/[0.03] px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[11px] text-[#525252]">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
