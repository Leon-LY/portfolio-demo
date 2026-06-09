import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Apple, Smartphone } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { appInfo, appFeatures, screenshots, userStats, testimonials } from '../data/mobileApp'

export default function MobileApp() {
  const [scr, setScr] = useState(0)
  const [feat, setFeat] = useState(0)

  return (
    <PageTransition>
      <div className="pt-20 bg-[#0a0e1a] border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="text-slate-400 font-medium">Demo 项目 · 仅供技术展示</span>
            <span>展示能力：</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">App 落地页设计</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">手机框架模拟</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">功能轮播展示</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">下载转化布局</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">用户评价卡片</span>
            <span className="px-2 py-0.5 bg-white/[0.03] rounded-md">数据统计展示</span>
          </div>
        </div>
      </div>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-6 block">{appInfo.awards[0]}</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-4">{appInfo.name}</h1>
              <p className="text-xl text-slate-400 mb-3">{appInfo.tagline}</p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md mb-8">{appInfo.description}</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}</div>
                  <span className="text-sm font-bold text-white">{appInfo.rating}</span>
                  <span className="text-xs text-slate-600">({appInfo.ratingCount})</span>
                </div>
                <div className="w-px h-5 bg-white/[0.06]" />
                <span className="text-sm text-slate-400">{appInfo.downloads} 下载</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all inline-flex items-center gap-2.5">
                  <Apple size={18} /><div className="text-left"><p className="text-[9px] leading-tight opacity-60">Download on the</p><p className="text-xs font-bold">App Store</p></div></button>
                <button className="px-5 py-3 bg-white/[0.04] text-white rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] transition-all inline-flex items-center gap-2.5">
                  <Smartphone size={18} /><div className="text-left"><p className="text-[9px] leading-tight opacity-60">Get it on</p><p className="text-xs font-bold">Google Play</p></div></button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-[560px] bg-[#0f172a] rounded-[2.5rem] p-3 border border-white/[0.06] shadow-2xl shadow-blue-500/5">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0f172a] rounded-b-2xl z-10" />
                  <div className="w-full h-full bg-[#0a0e1a] rounded-[2.2rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img key={scr} src={screenshots[scr].url} alt={screenshots[scr].alt}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover" />
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex justify-center gap-1.5 mt-5">{screenshots.map((_,i)=><button key={i} onClick={()=>setScr(i)} className={`rounded-full transition-all ${i===scr?'bg-white h-1.5 w-5':'bg-white/[0.15] h-1.5 w-1.5'}`} />)}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-white/[0.03] rounded-2xl overflow-hidden">
            {userStats.map((s,i)=>(<ScrollReveal key={s.label} delay={i*0.06}><div className="bg-[#111827] p-6 text-center"><div className="text-2xl mb-2">{s.icon}</div><p className="text-xl font-bold text-white">{s.value}</p><p className="text-[11px] text-slate-600 mt-1 uppercase tracking-wider">{s.label}</p></div></ScrollReveal>))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">核心功能</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">为效果而设计</h2></ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-2">
              {appFeatures.map((f,i)=>(
                <ScrollReveal key={f.title} delay={i*0.06}>
                  <button onClick={()=>setFeat(i)} className={`w-full text-left p-5 rounded-2xl transition-all ${feat===i?'bg-white/[0.04] border border-white/[0.08]':'border border-transparent hover:bg-white/[0.01]'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${feat===i?'bg-emerald-500/10':'bg-white/[0.02]'}`}>{f.icon}</div>
                      <div><h3 className="text-sm font-semibold text-white mb-0.5">{f.title}</h3><p className="text-xs text-slate-500 leading-relaxed">{f.description}</p></div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={feat} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}
                  className="w-64 h-[480px] bg-[#0f172a] rounded-[2.5rem] p-2.5 border border-white/[0.06] shadow-xl">
                  <div className="w-full h-full bg-[#0a0e1a] rounded-[2rem] overflow-hidden"><img src={appFeatures[feat].image} alt="" className="w-full h-full object-cover" /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">用户反馈</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">数百万用户的信赖</h2></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t,i)=>(
              <ScrollReveal key={t.name} delay={i*0.06}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-7 hover:border-white/[0.08] transition-all">
                  <div className="flex gap-1 mb-4">{Array.from({length:5}).map((_,j)=><Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 italic">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3"><img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover" /><div><p className="text-xs font-semibold text-white">{t.name}</p><p className="text-[11px] text-slate-600">{t.role}</p></div></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border border-emerald-500/10 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#111827]/70 backdrop-blur-sm" />
            <div className="relative z-10">
              <ScrollReveal><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">开启健康之旅</h2><p className="text-slate-400 mb-8 max-w-md mx-auto">下载体验，含完整功能试用。</p>
                <div className="flex justify-center gap-3">
                  <button className="px-5 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all inline-flex items-center gap-2"><Apple size={18} /> App Store</button>
                  <button className="px-5 py-3 bg-white/[0.04] text-white rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] transition-all inline-flex items-center gap-2"><Smartphone size={18} /> Google Play</button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-white/[0.04] px-6 py-4 text-center"><p className="text-[11px] text-slate-600">此页面为 Demo 模板。所有截图、功能及数据为虚构，仅供技术展示。</p></div>
    </PageTransition>
  )
}
