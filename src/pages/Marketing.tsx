import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, TrendingUp, Target, Zap, Globe, Mail, Check } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import Counter from '../components/Counter'

// ── Mock data ──
const kpiData = [
  { label: '自然流量增长', value: 186, suffix: '%', icon: TrendingUp, color: 'text-emerald-400' },
  { label: '转化率提升', value: 42, suffix: '%', icon: Target, color: 'text-blue-400' },
  { label: '客户满意度', value: 98, suffix: '%', icon: Zap, color: 'text-amber-400' },
  { label: '服务企业', value: 150, suffix: '+', icon: Globe, color: 'text-violet-400' },
]

const activeTags = ['品牌官网', '电商平台', 'SaaS 产品', '小程序', '数据大屏', '管理后台']

const timelineData = [
  { step: '01', title: '需求诊断', desc: '深度了解业务目标、用户画像与竞争环境，明确技术路径' },
  { step: '02', title: '策略规划', desc: '输出技术方案、信息架构与交互原型，对齐交付标准' },
  { step: '03', title: '设计开发', desc: 'UI 视觉设计 + 前后端开发并行推进，每周交付迭代' },
  { step: '04', title: '上线优化', desc: '性能调优、SEO 配置、数据埋点，持续迭代优化' },
]

const testimonials = [
  { name: '张明华', role: 'CEO · EcoLiving 家居', quote: '合作是我们品牌数字化转型的转折点。Leon 深入理解我们的业务需求，6 个月内帮助实现了 5 倍线上增长。', avatar: '👤' },
  { name: '李思雨', role: '市场总监 · TechVantage', quote: '从项目规划到落地执行，每一步都有清晰的时间线和交付标准。获客成本降低了 65%，超出预期。', avatar: '👤' },
  { name: '王建国', role: '创始人 · FreshBite', quote: '帮我们搭建了自有小程序和会员系统，彻底改变了对第三方平台的依赖。专业、高效、值得信赖。', avatar: '👤' },
]

export default function Marketing() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [chartHovered, setChartHovered] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])

  const chartData = [35, 52, 48, 78, 65, 92, 85, 120, 105, 145, 130, 168]
  const maxVal = Math.max(...chartData)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setTimeout(() => setSubscribed(false), 3000) }
  }

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · 此页面为 Demo 模板，展示营销科技（MarTech）产品设计和技术实现能力——复杂业务逻辑的前端呈现、数据可视化图表、高性能响应式布局。</p>
        </div>
      </div>

      {/* ═══ Hero ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[140px]" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <span className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6 block">Digital Marketing Solutions</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-6">
                让品牌实现<br /><span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">指数级增长</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg mb-8">
                数据驱动的全链路营销方案。从品牌策略到技术落地，为 150+ 企业交付可量化的增长成果。
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all inline-flex items-center gap-2">项目诊断 <ArrowUpRight size={16} /></button>
                <button className="px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">查看案例</button>
              </div>
            </motion.div>

            {/* Animated chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:block">
              <div className="bg-[#111827] border border-white/[0.05] rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div><p className="text-sm font-semibold text-white">营销 ROI 趋势</p><p className="text-xs text-slate-500">过去 12 个月</p></div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">↑ 168%</span>
                </div>
                <div className="flex items-end gap-2 h-48" onMouseLeave={() => setChartHovered(null)}>
                  {chartData.map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(h/maxVal)*100}%` }}
                      transition={{ delay: 0.5+i*0.04, duration: 0.6, ease: 'easeOut' }}
                      onMouseEnter={() => setChartHovered(i)}
                      className={`flex-1 rounded-t-md cursor-pointer transition-all relative ${chartHovered === i ? 'bg-gradient-to-t from-blue-400 to-violet-400' : 'bg-gradient-to-t from-blue-500/40 to-blue-500'}`}
                    >
                      {chartHovered === i && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">ROI {h}%</div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-600">{['1月','3月','5月','7月','9月','11月'].map(m=><span key={m}>{m}</span>)}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ KPI ═══ */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiData.map((k, i) => (
              <ScrollReveal key={k.label} delay={i*0.08}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6 text-center hover:border-white/[0.08] transition-all group">
                  <k.icon size={22} className={`mx-auto mb-3 ${k.color}`} />
                  <div className="text-3xl font-extrabold text-white"><Counter to={k.value} suffix={k.suffix} /></div>
                  <div className="text-xs text-slate-500 mt-1">{k.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 服务流程 ═══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">服务流程</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">从策略到交付</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-4">
            {timelineData.map((t, i) => (
              <ScrollReveal key={t.step} delay={i*0.1}>
                <div className="relative bg-[#111827] border border-white/[0.04] rounded-2xl p-6 h-full hover:border-white/[0.08] transition-all group">
                  <span className="text-5xl font-black text-white/[0.04] absolute top-4 right-5">{t.step}</span>
                  <h3 className="text-base font-bold text-white mb-2 relative z-10">{t.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 案例一览 ═══ */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">案例一览</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">服务过的行业</h2>
            <p className="text-sm text-slate-500 mb-10">覆盖多行业的数字化解决方案</p>
          </ScrollReveal>

          <div className="flex gap-2 mb-8 flex-wrap">
            {activeTags.map((tag, i) => (
              <button key={tag} onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab===i ? 'bg-blue-600 text-white' : 'bg-white/[0.02] text-slate-400 border border-white/[0.04] hover:text-white'}`}>{tag}</button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['🏗️ 建筑','🛒 零售','🏥 医疗','💻 科技','🍽️ 餐饮','🏭 制造'].map((item, i) => (
              <ScrollReveal key={item} delay={i*0.05}>
                <motion.div whileHover={{ y: -3 }} className="bg-[#111827] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-white/[0.08] transition-all cursor-pointer">
                  <div className="text-2xl mb-2">{item.split(' ')[0]}</div>
                  <div className="text-xs text-slate-400 font-medium">{item.split(' ')[1]}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 客户评价 ═══ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3 text-center">客户评价</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12 text-center">他们怎么说</h2>
          </ScrollReveal>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote key={activeTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                className="bg-[#111827] border border-white/[0.05] rounded-3xl p-8 lg:p-12 text-center">
                <div className="text-4xl mb-4">{testimonials[activeTestimonial].avatar}</div>
                <p className="text-lg lg:text-xl text-white leading-relaxed mb-6">&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</p>
                <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                <p className="text-xs text-slate-500">{testimonials[activeTestimonial].role}</p>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              <button onClick={() => setActiveTestimonial(p=>(p-1+testimonials.length)%testimonials.length)} className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronLeft size={16} /></button>
              <div className="flex gap-1.5 items-center mx-3">
                {testimonials.map((_,i)=><button key={i} onClick={()=>setActiveTestimonial(i)} className={`rounded-full transition-all ${i===activeTestimonial?'bg-white w-5 h-1.5':'bg-white/[0.12] w-1.5 h-1.5'}`} />)}
              </div>
              <button onClick={() => setActiveTestimonial(p=>(p+1)%testimonials.length)} className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Newsletter ═══ */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-[#111827] border border-white/[0.05] rounded-3xl p-10 sm:p-12">
            <ScrollReveal>
              <Mail size={28} className="text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">获取营销洞察</h3>
              <p className="text-sm text-slate-400 mb-6">不定期分享数字营销趋势和技术方案。</p>
              {subscribed ? (
                <p className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-2"><Check size={16} /> 已订阅</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
                  <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all">订阅</button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a>
            <span className="text-slate-700">|</span>
            <span>探索其他：</span>
            <a href="/saas" className="hover:text-white transition-colors">SaaS 平台</a>
            <a href="/ecommerce" className="hover:text-white transition-colors">电商</a>
            <a href="/mobile-app" className="hover:text-white transition-colors">移动 App</a>
            <a href="/corporate" className="hover:text-white transition-colors">企业官网</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：Next.js · TypeScript · Tailwind CSS · Framer Motion · 响应式设计</p>
        </div>
      </div>
    </PageTransition>
  )
}
