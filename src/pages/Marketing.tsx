import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { services, caseStudies, testimonials, stats } from '../data/marketing'

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let anim: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const count = 60

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)'
        ctx.fill()
      })
      anim = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

export default function Marketing() {
  const [activeCase, setActiveCase] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [testimonials.length])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
        <ParticleField />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[11px] font-medium text-[#8b5cf6] uppercase tracking-widest mb-6 block">
                  数字营销解决方案
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
                  让品牌实现
                  <br />
                  <span className="text-[#8b5cf6]">指数级</span>
                  <br />
                  增长
                </h1>
                <p className="text-base text-[#6b6b6b] leading-relaxed max-w-lg mb-8">
                  数据驱动的全链路营销方案，从品牌策略到效果转化，已帮助 150+ 企业实现可量化的业务突破。
                </p>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2">
                    免费诊断
                    <ArrowUpRight size={16} />
                  </button>
                  <button className="px-5 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                    查看案例
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-4 gap-3 mt-14"
              >
                {stats.map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[10px] text-[#525252] mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ROI Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-[#0d0d0d] border border-white/[0.04] rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-semibold text-white">营销 ROI 趋势</p>
                    <p className="text-xs text-[#525252]">过去 12 个月</p>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">↑ 168%</span>
                </div>
                <div className="flex items-end gap-2 h-48">
                  {[35, 52, 48, 78, 65, 92, 85, 120, 105, 145, 130, 168].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(h / 168) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.6, ease: 'easeOut' }}
                      className="flex-1 bg-gradient-to-t from-[#8b5cf6]/40 to-[#8b5cf6] rounded-t-md"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-[#525252]">
                  {['1月', '3月', '5月', '7月', '9月', '11月'].map((m) => (<span key={m}>{m}</span>))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">服务项目</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">全链路营销服务</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.05}>
                <div className="group bg-[#0d0d0d] p-7 lg:p-8 hover:bg-[#141414] transition-colors duration-300 h-full flex flex-col">
                  <div className="text-2xl mb-5 opacity-80">{service.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed flex-1">{service.description}</p>
                  <div className="mt-6 pt-5 border-t border-white/[0.04] flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{service.stats.value}</span>
                    <span className="text-xs text-[#6b6b6b]">{service.stats.label}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">成功案例</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">可量化的成果</h2>
            <p className="text-sm text-[#525252] mb-12">数据驱动的营销策略，为客户创造真实商业价值。</p>
          </ScrollReveal>

          <div className="flex gap-2 mb-8 flex-wrap">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.client}
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCase === i
                    ? 'bg-white text-black'
                    : 'bg-white/[0.02] text-[#a1a1a1] border border-white/[0.04] hover:text-white hover:border-white/[0.08]'
                }`}
              >
                {cs.client}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="bg-[#0d0d0d] border border-white/[0.04] rounded-3xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <span className="text-[10px] font-medium text-[#8b5cf6] uppercase tracking-wider">
                    {caseStudies[activeCase].industry}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-6">{caseStudies[activeCase].client}</h3>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-[#a1a1a1] uppercase tracking-wider mb-1">挑战</p>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{caseStudies[activeCase].challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#a1a1a1] uppercase tracking-wider mb-1">方案</p>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{caseStudies[activeCase].solution}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    {caseStudies[activeCase].results.map((r) => (
                      <div key={r.metric} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                        <span className="text-xs font-medium text-[#a1a1a1]">{r.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#525252] line-through">{r.before}</span>
                          <span className="text-sm font-semibold text-white">→ {r.after}</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md">
                            ↑ {r.improvement}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="min-h-[300px] lg:min-h-full">
                  <img
                    src={caseStudies[activeCase].image}
                    alt={caseStudies[activeCase].client}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">客户评价</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">他们怎么说</h2>
          </ScrollReveal>

          <div className="relative max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
                className="bg-[#0d0d0d] border border-white/[0.04] rounded-3xl p-8 lg:p-12"
              >
                <p className="text-lg lg:text-xl text-white leading-relaxed mb-8">
                  &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-[#6b6b6b]">
                      {testimonials[activeTestimonial].role}，{testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#a1a1a1] hover:text-white hover:border-white/[0.12] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)}
                className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#a1a1a1] hover:text-white hover:border-white/[0.12] transition-all"
              >
                <ChevronRight size={16} />
              </button>
              <div className="flex items-center gap-1.5 ml-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === activeTestimonial ? 'bg-white w-4' : 'bg-white/[0.12]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="bg-[#0d0d0d] border border-white/[0.04] rounded-3xl p-12 lg:p-16 text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">准备好加速增长？</h2>
              <p className="text-[#6b6b6b] mb-8 max-w-md mx-auto">
                预约免费营销诊断，48 小时内获取定制化增长策略。
              </p>
              <button className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2">
                预约免费咨询
                <ArrowUpRight size={16} />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-[#525252]">
          此页面为 Demo 模板。所有数据、服务和评价均为虚构，仅供技术展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
