import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle, BarChart3, Globe } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import ParticleBg from '../components/ParticleBg'
import { services, caseStudies, testimonials, stats } from '../data/marketing'

export default function Marketing() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeCase, setActiveCase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () =>
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <ParticleBg />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
                  <TrendingUp size={14} />
                  数字营销解决方案
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                  让您的品牌
                  <br />
                  <span className="gradient-text">指数级增长</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                  数据驱动的全链路营销方案，从品牌策略到效果转化，帮助 150+ 企业实现可量化的业务增长。
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                    获取免费咨询
                    <ArrowRight size={18} />
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                    查看案例
                  </button>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      <Counter from={0} to={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-[60px] opacity-30" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  {/* Mock chart */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-white font-semibold text-lg">营销 ROI 趋势</div>
                      <div className="text-slate-400 text-sm">过去 12 个月</div>
                    </div>
                    <BarChart3 className="text-indigo-400" size={24} />
                  </div>
                  <div className="flex items-end gap-3 h-48">
                    {[35, 52, 48, 78, 65, 92, 85, 120, 105, 145, 130, 168].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${(h / 168) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                        className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-slate-500">
                    {['1月', '3月', '5月', '7月', '9月', '11月'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              全方位营销服务
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              覆盖数字营销全链路的专业服务，驱动可衡量的业务成果
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-slate-50 rounded-2xl p-7 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                    <span className="text-2xl font-bold gradient-text">{service.stats.value}</span>
                    <span className="text-xs text-slate-400">{service.stats.label}</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              成功案例
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              真实数据驱动的营销策略，为客户创造可量化的商业价值
            </p>
          </ScrollReveal>

          {/* Case navigation */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.client}
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCase === i
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {cs.logo} {cs.client}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12">
                    <div className="text-3xl mb-3">{caseStudies[activeCase].logo}</div>
                    <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-2">
                      {caseStudies[activeCase].industry}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      {caseStudies[activeCase].client}
                    </h3>

                    <div className="space-y-5">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">📋 挑战</div>
                        <p className="text-sm text-slate-500">{caseStudies[activeCase].challenge}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">💡 方案</div>
                        <p className="text-sm text-slate-500">{caseStudies[activeCase].solution}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-3">
                      {caseStudies[activeCase].results.map((r) => (
                        <div
                          key={r.metric}
                          className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100"
                        >
                          <span className="text-sm font-medium text-slate-700">{r.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400 line-through">{r.before}</span>
                            <span className="text-sm font-bold text-emerald-600">→ {r.after}</span>
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-2 py-0.5 rounded-full">
                              ↑ {r.improvement}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[300px] lg:min-h-full">
                    <img
                      src={caseStudies[activeCase].image}
                      alt={caseStudies[activeCase].client}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">客户评价</h2>
            <p className="text-indigo-200 mb-12">听听客户怎么说</p>
          </ScrollReveal>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl text-white leading-relaxed mb-8 italic">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                    />
                    <div className="text-left">
                      <div className="text-white font-semibold">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-indigo-200 text-sm">
                        {testimonials[activeTestimonial].role}，{testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeTestimonial ? 'bg-white scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              准备好加速增长了？
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              预约免费营销诊断，获取定制化的增长策略建议
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Globe size={20} />
                免费预约咨询
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              {['免费诊断', '无绑定要求', '48小时内出报告'].map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {f}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ 本页面为 Demo 模板，所有数据和服务均为展示用途，不代表真实业务。
        </p>
      </div>
    </PageTransition>
  )
}
