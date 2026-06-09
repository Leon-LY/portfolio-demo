import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { services, caseStudies, testimonials, stats } from '../data/marketing'

/* ── Animated bg blobs ── */
function BgBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/6 blur-[140px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.2s' }} />
    </div>
  )
}

export default function Marketing() {
  const [activeCase, setActiveCase] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [testimonials.length])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <BgBlobs />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <span className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6 block">数字营销解决方案</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-6">
                让品牌<br /><span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">指数级增长</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg mb-8">
                数据驱动的全链路营销方案，已帮助 150+ 企业实现可量化的业务突破。
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all inline-flex items-center gap-2">免费诊断 <ArrowUpRight size={16} /></button>
                <button className="px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">查看案例</button>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-14">
                {stats.map(s => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xl sm:text-2xl font-bold text-white"><Counter to={s.value} suffix={s.suffix} /></div>
                    <div className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Chart mock */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:block">
              <div className="bg-[#0b1120] border border-white/[0.05] rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div><p className="text-sm font-semibold text-white">营销 ROI 趋势</p><p className="text-xs text-slate-600">过去 12 个月</p></div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">↑ 168%</span>
                </div>
                <div className="flex items-end gap-2 h-48">
                  {[35,52,48,78,65,92,85,120,105,145,130,168].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(h/168)*100}%` }}
                      transition={{ delay: 0.5+i*0.04, duration: 0.6, ease: 'easeOut' }}
                      className="flex-1 bg-gradient-to-t from-blue-500/40 to-blue-500 rounded-t-md" />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-600">
                  {['1月','3月','5月','7月','9月','11月'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">服务项目</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">全链路营销服务</h2></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <div className="bg-[#0b1120] border border-white/[0.04] rounded-2xl p-7 hover:border-white/[0.08] hover:bg-[#0f1830] transition-all duration-300 group h-full flex flex-col">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{s.description}</p>
                  <div className="mt-5 pt-5 border-t border-white/[0.04] flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">{s.stats.value}</span>
                    <span className="text-xs text-slate-500">{s.stats.label}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">成功案例</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">可量化的成果</h2>
            <p className="text-sm text-slate-500 mb-12">数据驱动，为真实业务创造价值。</p></ScrollReveal>

          <div className="flex gap-2 mb-8 flex-wrap">
            {caseStudies.map((cs, i) => (
              <button key={cs.client} onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCase === i ? 'bg-blue-600 text-white' : 'bg-white/[0.02] text-slate-400 border border-white/[0.04] hover:text-white'}`}>
                {cs.client}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }} className="bg-[#0b1120] border border-white/[0.05] rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <span className="text-[10px] font-medium text-blue-400 uppercase tracking-wider">{caseStudies[activeCase].industry}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-6">{caseStudies[activeCase].client}</h3>
                  <div className="space-y-5">
                    <div><p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">挑战</p><p className="text-sm text-slate-500">{caseStudies[activeCase].challenge}</p></div>
                    <div><p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">方案</p><p className="text-sm text-slate-500">{caseStudies[activeCase].solution}</p></div>
                  </div>
                  <div className="mt-8 space-y-2">
                    {caseStudies[activeCase].results.map(r => (
                      <div key={r.metric} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                        <span className="text-xs text-slate-400">{r.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600 line-through">{r.before}</span>
                          <span className="text-sm font-semibold text-white">→ {r.after}</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md">↑ {r.improvement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="min-h-[300px] lg:min-h-full">
                  <img src={caseStudies[activeCase].image} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">客户评价</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">他们怎么说</h2></ScrollReveal>
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.blockquote key={activeTestimonial} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }} className="bg-[#0b1120] border border-white/[0.05] rounded-3xl p-8 lg:p-12">
                <p className="text-lg lg:text-xl text-white leading-relaxed mb-8">&ldquo;{testimonials[activeTestimonial].content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <img src={testimonials[activeTestimonial].avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-slate-500">{testimonials[activeTestimonial].role}，{testimonials[activeTestimonial].company}</p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setActiveTestimonial(p => (p-1+testimonials.length)%testimonials.length)}
                className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronLeft size={16} /></button>
              <button onClick={() => setActiveTestimonial(p => (p+1)%testimonials.length)}
                className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronRight size={16} /></button>
              <div className="flex gap-1.5 ml-3 items-center">
                {testimonials.map((_, i) => <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all ${i===activeTestimonial ? 'bg-white w-5 h-1.5' : 'bg-white/[0.12] w-1.5 h-1.5'}`} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-blue-500/10 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0b1120]/70 backdrop-blur-sm" />
            <div className="relative z-10">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">准备好加速增长？</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">48 小时内获取定制化增长策略。</p>
                <button className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all inline-flex items-center gap-2">预约免费咨询 <ArrowUpRight size={16} /></button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-slate-600">此页面为 Demo 模板。所有数据和服务为虚构，仅供技术展示。</p>
      </div>
    </PageTransition>
  )
}
