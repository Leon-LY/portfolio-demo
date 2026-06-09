import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { allProjects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = allProjects[id || '']

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

      {/* Image Carousel */}
      {project.images && project.images.length > 0 && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ImageCarousel images={project.images} title={project.title} />
          </div>
        </section>
      )}

      {/* Project Detail */}
      {(project.overview || project.capabilities || project.techNote) && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {project.overview && (
                  <ScrollReveal>
                    <h2 className="text-lg font-bold text-white mb-3">项目概述</h2>
                    <p className="text-slate-400 leading-relaxed">{project.overview}</p>
                  </ScrollReveal>
                )}
                {project.capabilities && (
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-3">核心能力体现</h3>
                    <div className="space-y-2">
                      {project.capabilities.map((c, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1.5">—</span>
                          <span className="text-slate-400 leading-relaxed">{c}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
                {project.techNote && (
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-3">技术方案</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{project.techNote}</p>
                  </ScrollReveal>
                )}
              </div>

              {/* Tech stack sidebar */}
              <div>
                <ScrollReveal delay={0.1}>
                  <h3 className="text-lg font-bold text-white mb-5">技术栈</h3>
                  <div className="bg-[#111827] border border-white/[0.05] rounded-2xl p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-white/[0.04] text-sm text-slate-300 rounded-lg border border-white/[0.06]">{t}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
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

/* ── Image Carousel ── */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => (a - 1 + images.length) % images.length)
  const next = () => setActive(a => (a + 1) % images.length)

  return (
    <div>
      {/* Main image */}
      <div className="relative bg-[#111827] rounded-2xl border border-white/[0.05] overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-h-[500px] object-contain bg-[#0a0e1a]"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all">
              <ChevronRight size={20} />
            </button>
            {/* Counter */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-lg text-xs text-white font-medium">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? 'border-blue-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
