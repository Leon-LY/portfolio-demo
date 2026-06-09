import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Zap } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { saasFeatures, pricingPlans, faqs, dashboardStats } from '../data/saas'

export default function SaaS() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [annual, setAnnual] = useState(false)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/3 rounded-full blur-[180px]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-[11px] font-medium text-[#8b5cf6] uppercase tracking-widest mb-6 block">
                CloudFlow 数据分析平台
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
                用数据
                <br />
                <span className="text-[#8b5cf6]">驱动决策</span>
              </h1>
              <p className="text-base text-[#6b6b6b] leading-relaxed mb-8 max-w-lg mx-auto">
                AI 驱动的智能分析引擎，集成自动化工作流与团队协作，帮助企业从海量数据中获得真正的竞争优势。日活用户 10 万+，查询响应低于 100ms。
              </p>
              <div className="flex justify-center gap-3">
                <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2">
                  免费试用 <ArrowUpRight size={16} />
                </button>
                <button className="px-5 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                  观看演示
                </button>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden"
            >
              {dashboardStats.map((s) => (
                <div key={s.label} className="bg-[#0d0d0d] p-5 text-left">
                  <p className="text-[10px] text-[#525252] uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-white">
                    <Counter to={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 2 : 0} />
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">{s.change}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">产品功能</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">一站式数据解决方案</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {saasFeatures.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.05}>
                <div className="bg-[#0d0d0d] p-7 hover:bg-[#141414] transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center mb-5">
                    <Zap size={18} className="text-[#8b5cf6]" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{f.description}</p>
                  <ul className="space-y-1.5">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-[#525252]">
                        <Check size={12} className="text-[#8b5cf6] flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">定价方案</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">简单透明</h2>
            <p className="text-sm text-[#525252] mb-10">无隐藏费用，随时升级或降级。</p>
          </ScrollReveal>

          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.02] rounded-xl p-1 border border-white/[0.04] inline-flex">
              {['月付', '年付'].map((label) => {
                const active = (label === '年付') === annual
                return (
                  <button
                    key={label}
                    onClick={() => setAnnual(label === '年付')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                      active ? 'bg-white text-black' : 'text-[#6b6b6b] hover:text-white'
                    }`}
                  >
                    {label}
                    {label === '年付' && <span className="ml-1 text-[10px] text-emerald-400">省20%</span>}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.08}>
                <div className={`bg-[#0d0d0d] p-8 h-full flex flex-col ${
                  plan.highlighted ? 'ring-1 ring-[#8b5cf6]/30 relative z-10 rounded-2xl' : ''
                }`}>
                  {plan.highlighted && (
                    <span className="text-[10px] font-semibold text-[#8b5cf6] mb-3 block">最受欢迎</span>
                  )}
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-[#525252] mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white">
                      ¥{annual ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-xs text-[#525252]">{annual ? '/月（年付）' : plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#a1a1a1]">
                        <Check size={13} className="text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-white text-black hover:bg-[#e5e5e5]'
                        : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">常见问题</p>
            <h2 className="text-3xl font-bold text-white mb-12">快速了解</h2>
          </ScrollReveal>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="bg-[#0d0d0d] border border-white/[0.04] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} className="text-[#525252]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-[#6b6b6b] leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-[#525252]">
          此页面为 Demo 模板。所有功能、定价和数据均为虚构，仅供技术展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
