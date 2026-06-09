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
      <div className="pt-20 bg-[#0a0e1a] border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="text-slate-400 font-medium">Demo 项目 · 仅供技术展示</span>
            <span>展示能力：</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">SaaS 产品设计</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">定价方案系统</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">实时数据看板</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">FAQ 交互组件</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">功能列表布局</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">响应式设计</span>
          </div>
        </div>
      </div>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-[140px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6 block">CloudFlow Platform</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-6">
              用数据<br /><span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">驱动决策</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed max-w-lg mx-auto mb-8">
              AI 驱动的智能分析引擎。日活 10 万+，查询响应低于 100ms。
            </p>
            <div className="flex justify-center gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all inline-flex items-center gap-2">开始试用 <ArrowUpRight size={16} /></button>
              <button className="px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">观看演示</button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-0.5 bg-white/[0.03] rounded-2xl overflow-hidden max-w-4xl mx-auto">
            {dashboardStats.map(s => (
              <div key={s.label} className="bg-[#111827] p-5 text-left">
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-xl font-bold text-white"><Counter to={s.value} suffix={s.suffix} decimals={s.value%1!==0?2:0} /></p>
                <p className="text-[10px] text-emerald-400 mt-0.5">{s.change}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">产品功能</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">一站式数据解决方案</h2></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {saasFeatures.map((f, i) => (
              <ScrollReveal key={f.title} delay={i*0.05}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-7 hover:border-white/[0.08] hover:bg-[#0f1830] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                    <Zap size={18} className="text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{f.description}</p>
                  <ul className="space-y-1.5">{f.details.map(d => <li key={d} className="flex items-center gap-2 text-xs text-slate-500"><Check size={12} className="text-blue-400 flex-shrink-0" />{d}</li>)}</ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">定价方案</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">简单透明</h2>
            <p className="text-sm text-slate-500 mb-10">无隐藏费用，随时升级或降级。</p></ScrollReveal>

          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.02] rounded-xl p-1 border border-white/[0.04] inline-flex">
              {['月付','年付'].map(l => { const act = (l==='年付')===annual; return (
                <button key={l} onClick={() => setAnnual(l==='年付')}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${act ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
                  {l}{l==='年付'&&<span className="ml-1 text-[10px] text-emerald-400">省20%</span>}
                </button>)})}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pricingPlans.map((p, i) => (
              <ScrollReveal key={p.name} delay={i*0.08}>
                <div className={`bg-[#111827] border rounded-2xl p-8 h-full flex flex-col transition-all ${p.highlighted ? 'border-blue-500/30 ring-1 ring-blue-500/20' : 'border-white/[0.04]'}`}>
                  {p.highlighted && <span className="text-[10px] font-semibold text-blue-400 mb-3 block">最受欢迎</span>}
                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-600 mb-6">{p.description}</p>
                  <div className="mb-6"><span className="text-4xl font-extrabold text-white">¥{annual?Math.round(p.price*0.8):p.price}</span><span className="text-xs text-slate-600">{annual?'/月（年付）':p.period}</span></div>
                  <ul className="space-y-2.5 mb-8 flex-1">{p.features.map(f => <li key={f} className="flex items-center gap-2 text-xs text-slate-400"><Check size={13} className="text-emerald-500 flex-shrink-0" />{f}</li>)}</ul>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlighted ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'}`}>{p.cta}</button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-14">快速了解</h2></ScrollReveal>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i*0.04}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-medium text-white pr-4">{f.question}</span>
                    <motion.div animate={{ rotate: openFaq===i?180:0 }} transition={{ duration: 0.25 }}><ChevronDown size={16} className="text-slate-500" /></motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq===i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{f.answer}</p></motion.div>}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-slate-600">此页面为 Demo 模板。所有功能、定价和数据为虚构，仅供技术展示。</p>
      </div>
    </PageTransition>
  )
}
