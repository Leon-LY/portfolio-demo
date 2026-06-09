import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ArrowRight, Play, Zap, Shield, BarChart3, Cloud } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'
import { saasFeatures, pricingPlans, faqs, dashboardStats } from '../data/saas'

export default function SaaS() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/8 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-6">
                <Cloud size={14} />
                CloudFlow Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                智能数据分析
                <br />
                <span className="gradient-text">一站式的决策引擎</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
                CloudFlow 将 AI 分析、自动化工作流和团队协作融为一体，帮助企业从数据中获得真正的竞争优势。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  <Play size={18} /> 观看演示
                </button>
                <button className="px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  免费试用 14 天
                </button>
              </div>
            </motion.div>

            {/* Stats dashboard preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-semibold text-slate-800 text-left">实时数据看板</div>
                  <div className="text-xs text-slate-400 text-left">更新时间：2 分钟前</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {dashboardStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-50 rounded-2xl p-4 text-left"
                  >
                    <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900">
                      <Counter from={0} to={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 2 : 0} duration={2} />
                    </div>
                    <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              强大功能，简单易用
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              从数据接入到智能洞察，CloudFlow 提供一站式解决方案
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saasFeatures.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-slate-50 rounded-2xl p-7 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 border border-transparent hover:border-slate-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-blue-500/20">
                    <span className="text-white text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check size={14} className="text-blue-500 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              简单透明的定价
            </h2>
            <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
              选择适合您团队的方案，随时升级或降级
            </p>
          </ScrollReveal>

          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-1 border border-slate-200 shadow-sm inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                月付
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                年付
                <span className="ml-1 text-xs text-emerald-500">省 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: plan.highlighted ? 1.03 : 1.01 }}
                  className={`relative rounded-3xl p-8 ${
                    plan.highlighted
                      ? 'bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-500/25 ring-4 ring-indigo-500/20'
                      : 'bg-white text-slate-900 shadow-lg border border-slate-100'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-xs font-bold rounded-full shadow-lg">
                      最受欢迎
                    </div>
                  )}
                  <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      ¥{billingCycle === 'yearly' ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {billingCycle === 'yearly' ? '/月（年付）' : plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check
                          size={16}
                          className={`flex-shrink-0 ${
                            plan.highlighted ? 'text-indigo-200' : 'text-emerald-500'
                          }`}
                        />
                        <span className={plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan.highlighted
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} className="inline ml-1" />
                  </button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              常见问题
            </h2>
            <p className="text-slate-500 text-center mb-12">快速了解 CloudFlow</p>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
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

      {/* Trust badges */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: 'SOC 2 认证' },
              { icon: Zap, label: '99.99% 可用性' },
              { icon: BarChart3, label: '10万+ 日活用户' },
              { icon: Cloud, label: '全球 12 个节点' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon size={28} className="text-slate-400" />
                <span className="text-sm text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ 本页面为 Demo 模板，所有功能、定价和数据均为展示用途，不代表真实产品或服务。
        </p>
      </div>
    </PageTransition>
  )
}
