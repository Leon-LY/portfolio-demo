import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Lightbox from '../components/ui/Lightbox'
import { usePortfolioData } from '../data/usePortfolioData'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { data } = usePortfolioData()
  const project = data.allProjects[id || '']

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">项目未找到</h1>
            <Link to="/" className="text-accent hover:text-accent-bright transition-colors">← 返回首页</Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-success/10 text-success text-[11px] font-semibold rounded-full border border-success/20">
                真实项目
              </span>
              <span className="text-xs text-text-tertiary">{project.category}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-3">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg text-accent-bright/80 font-medium mb-5">{project.subtitle}</p>
            )}
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 bg-white/[0.04] text-sm text-text-primary rounded-lg border border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.06] transition-all duration-200">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel */}
      {project.images && project.images.length > 0 && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <ImageCarousel images={project.images} title={project.title} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Project Detail */}
      {(project.overview || project.capabilities || project.techNote) && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {project.overview && (
                  <ScrollReveal>
                    <h2 className="text-lg font-bold text-white mb-4">项目概述</h2>
                    <p className="text-text-secondary leading-relaxed">{project.overview}</p>
                  </ScrollReveal>
                )}
                {project.capabilities && (
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-4">核心能力体现</h3>
                    <div className="space-y-3">
                      {project.capabilities.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2 shadow-accent/40 group-hover:bg-accent-bright transition-colors duration-300" />
                          <span className="text-text-secondary leading-relaxed">{c}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
                {project.techNote && (
                  <ScrollReveal>
                    <h3 className="text-lg font-bold text-white mb-4">技术方案</h3>
                    <p className="text-text-tertiary text-sm leading-relaxed">{project.techNote}</p>
                  </ScrollReveal>
                )}
              </div>

              {/* Tech stack sidebar */}
              <div>
                <ScrollReveal delay={0.1}>
                  <h3 className="text-lg font-bold text-white mb-5">技术栈</h3>
                  <div className="bg-surface-2/60 backdrop-blur-sm border border-white/[0.05] rounded-2xl p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-white/[0.04] text-sm text-text-primary rounded-lg border border-white/[0.06]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Result highlight */}
      {project.result && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="bg-gradient-to-r from-success/5 to-accent/5 border border-success/10 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">🏆</span>
                  <div>
                    <h3 className="text-sm font-bold text-success uppercase tracking-wider mb-2">项目成效</h3>
                    <p className="text-text-primary leading-relaxed">{project.result}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related projects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-lg font-bold text-white mb-6">探索其他项目</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(data.allProjects).filter((p: any) => p.id !== id && p.real).slice(0, 4).map((p: any) => (
              <Link key={p.id} to={p.link}
                className="group block bg-surface-2/60 backdrop-blur-sm border border-white/[0.04] rounded-xl p-5 hover:border-accent/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] transition-all duration-300">
                <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors duration-300">{p.title}</h4>
                <p className="text-xs text-text-tertiary mt-2 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-1 mt-3 text-[10px] text-text-tertiary group-hover:text-accent transition-colors duration-300">
                  <span>查看详情</span>
                  <ExternalLink size={10} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-accent/5 to-success/5 border border-accent/10 rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

            <ScrollReveal>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">需要类似的技术方案？</h3>
              <p className="text-text-secondary mb-6 relative z-10">有类似需求？可以直接联系我，沟通具体方案。</p>
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                <a href="tel:18389118642" className="btn-glow group inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface-0 font-semibold rounded-xl hover:bg-accent-bright hover:shadow-xl hover:shadow-accent/15 transition-all">
                  预约技术咨询
                  <ArrowLeft size={16} className="rotate-[135deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="/#portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                  查看作品
                </a>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

/* ── Enhanced Image Carousel ── */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = () => setActive(a => (a - 1 + images.length) % images.length)
  const next = () => setActive(a => (a + 1) % images.length)

  return (
    <div>
      {/* Main image */}
      <div className="relative bg-surface-2 rounded-2xl border border-white/[0.06] overflow-hidden mb-4 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} ${active + 1}`}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full max-h-[520px] object-contain bg-surface-0 cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
            {/* Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-xs text-white font-medium border border-white/10">
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
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === active
                  ? 'border-accent opacity-100 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'border-transparent opacity-50 hover:opacity-80 hover:border-white/10'
              }`}
            >
              <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={images}
        initialIndex={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
