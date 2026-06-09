import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Apple, Smartphone, BarChart3, Users, Award } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'

const statsData = [
  { icon: Users, label: '全球用户', value: '500万+' },
  { icon: Star, label: 'App Store 评分', value: '4.9' },
  { icon: Award, label: '年度推荐', value: '2024' },
  { icon: BarChart3, label: '日均运动分钟', value: '42' },
]

const featureCards = [
  { icon: '🧠', title: 'AI 运动分析', desc: '通过摄像头实时分析运动姿态，精准计数并纠正动作', color: 'from-violet-500/20 to-purple-500/10' },
  { icon: '🍎', title: '智能营养追踪', desc: '拍照识别食物，自动计算卡路里和营养成分', color: 'from-emerald-500/20 to-teal-500/10' },
  { icon: '📊', title: '健康数据洞察', desc: '整合 Apple Health 等设备数据，生成全面健康报告', color: 'from-blue-500/20 to-cyan-500/10' },
  { icon: '🏆', title: '挑战与排行榜', desc: '参与全球运动挑战，用游戏化机制让坚持变得有趣', color: 'from-amber-500/20 to-orange-500/10' },
  { icon: '🔔', title: '智能提醒', desc: '根据运动习惯智能推送训练提醒，不错过每一次锻炼', color: 'from-rose-500/20 to-pink-500/10' },
  { icon: '👥', title: '社区互动', desc: '加入兴趣小组，分享运动成果，互相激励共同进步', color: 'from-cyan-500/20 to-blue-500/10' },
]

const screenshots = [
  { id: '1', label: '运动追踪', color: 'from-emerald-500/30 to-teal-500/10' },
  { id: '2', label: '营养分析', color: 'from-blue-500/30 to-cyan-500/10' },
  { id: '3', label: '数据统计', color: 'from-violet-500/30 to-purple-500/10' },
  { id: '4', label: '挑战排行', color: 'from-amber-500/30 to-orange-500/10' },
]

const plans = [
  { name: '基础版', price: '0', features: ['基础运动追踪','每日健康报告','社区互动','广告支持'], cta: '免费使用', popular: false },
  { name: '高级版', price: '28', features: ['AI 运动分析','智能营养追踪','高级数据洞察','无广告体验','专属训练计划','优先客服支持'], cta: '开始试用', popular: true },
]

export default function MobileApp() {
  const [scr, setScr] = useState(0)
  const [planAnnual, setPlanAnnual] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setScr(s=>(s+1)%screenshots.length), 4000)
    return () => clearInterval(t)
  }, [screenshots.length])

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · 此页面为 Demo 模板，展示移动端 App 落地页设计——H5 响应式设计、模拟 App 交互体验、适配 iOS / Android 设计规范。</p>
        </div>
      </div>

      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-6 block">🏆 2024 最佳健康 App</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-4">FitTrack Pro</h1>
              <p className="text-xl text-slate-400 mb-3">AI 驱动的私人健康管家</p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md mb-8">通过先进的 AI 算法和可穿戴设备集成，提供个性化的运动计划、营养建议和健康洞察。让每一次锻炼都更科学。</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5"><div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className="text-amber-400 fill-amber-400"/>)}</div><span className="text-sm font-bold text-white">4.9</span><span className="text-xs text-slate-500">(12.8万)</span></div>
                <div className="w-px h-5 bg-white/[0.06]"/><span className="text-sm text-slate-400">500万+ 下载</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all inline-flex items-center gap-2.5"><Apple size={18}/><div className="text-left"><p className="text-[9px] leading-tight opacity-60">Download on the</p><p className="text-xs font-bold">App Store</p></div></button>
                <button className="px-5 py-3 bg-white/[0.04] text-white rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] transition-all inline-flex items-center gap-2.5"><Smartphone size={18}/><div className="text-left"><p className="text-[9px] leading-tight opacity-60">Get it on</p><p className="text-xs font-bold">Google Play</p></div></button>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}} className="flex justify-center">
              <div className="w-72 h-[560px] bg-[#1a1a2e] rounded-[2.5rem] p-3 border border-white/[0.06] shadow-2xl shadow-emerald-500/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-2xl z-10"/>
                <div className="w-full h-full bg-[#0a0e1a] rounded-[2.2rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={scr} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`w-full h-full bg-gradient-to-br ${screenshots[scr].color} flex flex-col items-center justify-center p-6 text-center`}>
                      <div className="text-5xl mb-4">{featureCards[scr].icon}</div>
                      <p className="text-sm font-bold text-white mb-1">{featureCards[scr].title}</p>
                      <p className="text-xs text-white/60">{screenshots[scr].label}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((s,i)=>(<ScrollReveal key={s.label} delay={i*0.06}><div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6 text-center hover:border-white/[0.08] transition-all"><s.icon size={22} className="text-emerald-400 mx-auto mb-3"/><p className="text-2xl font-extrabold text-white">{s.value}</p><p className="text-xs text-slate-500 mt-1">{s.label}</p></div></ScrollReveal>))}
          </div>
        </div>
      </section>

      {/* ═══ Features ═══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">核心功能</p><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">为效果而设计</h2></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((f,i)=>(
              <ScrollReveal key={f.title} delay={i*0.06}>
                <motion.div whileHover={{y:-3}} className={`bg-gradient-to-br ${f.color} border border-white/[0.04] rounded-2xl p-7 h-full hover:border-white/[0.08] transition-all group`}>
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section className="pb-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">定价方案</p><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">选择适合你的计划</h2></ScrollReveal>

          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.02] rounded-xl p-1 border border-white/[0.04] inline-flex">
              {['月付','年付'].map(l=>{const act=(l==='年付')===planAnnual;return(<button key={l} onClick={()=>setPlanAnnual(l==='年付')} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${act?'bg-emerald-600 text-white':'text-slate-500 hover:text-white'}`}>{l}{l==='年付'&&<span className="ml-1 text-[10px] text-emerald-400">省20%</span>}</button>)})}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {plans.map((p,i)=>(
              <ScrollReveal key={p.name} delay={i*0.08}>
                <motion.div whileHover={{y:-4}} className={`bg-[#111827] border rounded-2xl p-8 h-full flex flex-col transition-all ${p.popular?'border-emerald-500/30 ring-1 ring-emerald-500/20':'border-white/[0.04]'}`}>
                  {p.popular&&<span className="text-[10px] font-semibold text-emerald-400 mb-3 block">最受欢迎</span>}
                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <div className="mb-6"><span className="text-4xl font-extrabold text-white">{p.price==='0'?'免费':`¥${planAnnual?Math.round(parseInt(p.price)*0.8):p.price}`}</span><span className="text-xs text-slate-600">/月</span></div>
                  <ul className="space-y-2.5 mb-8 flex-1">{p.features.map(f=><li key={f} className="flex items-center gap-2 text-xs text-slate-400"><CheckIcon/> {f}</li>)}</ul>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${p.popular?'bg-gradient-to-r from-emerald-600 to-teal-600 text-white':'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'}`}>{p.cta}</button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a>
            <span className="text-slate-700">|</span>
            <span>探索其他：</span>
            <a href="/marketing" className="hover:text-white transition-colors">营销网站</a>
            <a href="/saas" className="hover:text-white transition-colors">SaaS 平台</a>
            <a href="/ecommerce" className="hover:text-white transition-colors">电商</a>
            <a href="/corporate" className="hover:text-white transition-colors">企业官网</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：H5 响应式 · 模拟 App 交互 · iOS / Android 适配 · Framer Motion</p>
        </div>
      </div>
    </PageTransition>
  )
}

function CheckIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5L5.5 9.5L10.5 3.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
