import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { realProjects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = realProjects.find(p => p.id === id)

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">项目未找到</h1>
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">← 返回首页</Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8">
              <ArrowLeft size={16} /> 返回首页
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold rounded-full">真实项目</span>
              <span className="text-xs text-slate-500">{project.category}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-6">
              {project.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 bg-white/[0.04] text-sm text-slate-300 rounded-lg border border-white/[0.06]">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid gap-4">
              {project.images.map((img, i) => (
                <ScrollReveal key={img} delay={i * 0.1}>
                  <div className="bg-[#111827] rounded-2xl border border-white/[0.05] overflow-hidden">
                    <img
                      src={img}
                      alt={`${project.title} 截图 ${i + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Description */}
      {project.longDescription && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-white mb-6">项目详情</h2>
                  <div className="prose prose-invert max-w-none">
                    {project.longDescription.split('\n\n').map((p, i) => (
                      <p key={i} className="text-slate-400 leading-relaxed mb-4">{p}</p>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Highlights sidebar */}
              {project.highlights && (
                <div>
                  <ScrollReveal delay={0.1}>
                    <h3 className="text-lg font-bold text-white mb-5">项目亮点</h3>
                    <div className="bg-[#111827] border border-white/[0.05] rounded-2xl p-6 space-y-3">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-400">{h}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-blue-500/10 rounded-3xl p-10 sm:p-14 text-center">
            <ScrollReveal>
              <h3 className="text-2xl font-bold text-white mb-3">需要类似的技术方案？</h3>
              <p className="text-slate-400 mb-6">我在智慧城市和政务数字化领域有丰富经验，欢迎交流。</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:18389118642" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all">📞 18389118642</a>
                <a href="mailto:554295000@qq.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">📧 554295000@qq.com</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
