import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Calendar } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { companyInfo, timeline, teamMembers, partners, newsArticles, values } from '../data/corporate'

export default function Corporate() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const py = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <PageTransition>
      <section ref={ref} className="relative h-screen min-h-[650px] flex items-center overflow-hidden">
        <motion.div style={{ y: py }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b18] via-[#070b18]/85 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-6">{companyInfo.name}</h1>
              <p className="text-xl sm:text-2xl text-slate-400 font-light mb-4">{companyInfo.tagline}</p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-10">{companyInfo.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[{l:'成立',v:companyInfo.founded},{l:'员工',v:companyInfo.employees},{l:'年营收',v:companyInfo.revenue},{l:'覆盖国家',v:companyInfo.offices}].map(s=>(
                  <div key={s.l} className="p-3 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.04]"><p className="text-lg font-bold text-white">{s.v}</p><p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.l}</p></div>
                ))}
              </div>
              <button className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all inline-flex items-center gap-2">了解更多 <ArrowUpRight size={16} /></button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">核心价值观</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">驱动我们前行</h2></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v,i)=>(<ScrollReveal key={v.title} delay={i*0.06}><div className="bg-[#0b1120] border border-white/[0.04] rounded-2xl p-7 text-center hover:border-white/[0.08] hover:bg-[#0f1830] transition-all"><div className="text-4xl mb-4">{v.icon}</div><h3 className="text-base font-bold text-white mb-2">{v.title}</h3><p className="text-xs text-slate-500 leading-relaxed">{v.description}</p></div></ScrollReveal>))}
          </div>
        </div>
      </section>

      <section className="pb-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">发展历程</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">我们的旅程</h2></ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.04] md:-translate-x-px" />
            <div className="space-y-16">
              {timeline.map((e,i)=>(
                <ScrollReveal key={e.year} delay={i*0.05}>
                  <div className={`relative flex gap-8 ${i%2===0?'md:flex-row':'md:flex-row-reverse'}`}>
                    <div className="absolute left-3 md:left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 mt-2 ring-4 ring-[#070b18]" />
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i%2===0?'md:pr-12 md:text-right':'md:pl-12'}`}>
                      <span className="text-2xl font-extrabold text-white">{e.year}</span>
                      <h3 className="text-sm font-semibold text-white mt-1 mb-1">{e.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{e.description}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">管理团队</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-14">核心成员</h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((m,i)=>(<ScrollReveal key={m.name} delay={i*0.06}><div className="bg-[#0b1120] border border-white/[0.04] rounded-2xl p-7 text-center hover:border-white/[0.08] transition-all"><img src={m.avatar} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/[0.04]" /><h3 className="text-sm font-bold text-white mb-0.5">{m.name}</h3><p className="text-[11px] font-medium text-blue-400 mb-2">{m.role}</p><p className="text-[11px] text-slate-500 leading-relaxed">{m.bio}</p></div></ScrollReveal>))}
          </div>
        </div>
      </section>

      <section className="pb-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-widest mb-10 text-center">合作伙伴</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center">
            {partners.map(p=><span key={p.name} className="text-3xl opacity-30 hover:opacity-60 transition-opacity cursor-default">{p.logo}</span>)}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-14">
            <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">新闻中心</p><h2 className="text-4xl sm:text-5xl font-extrabold text-white">最新动态</h2></ScrollReveal>
            <button className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-white transition-colors">查看全部 <ChevronRight size={14} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {newsArticles.map((a,i)=>(
              <ScrollReveal key={a.id} delay={i*0.08}>
                <article className="group bg-[#0b1120] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-all cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden"><img src={a.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" /></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3"><span className="text-[10px] font-medium text-blue-400 uppercase">{a.category}</span><span className="text-[10px] text-slate-600 flex items-center gap-1"><Calendar size={10} />{a.date}</span></div>
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{a.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center"><p className="text-[11px] text-slate-600">此页面为 Demo 模板。所有企业信息、人物及新闻为虚构，仅供技术展示。</p></div>
    </PageTransition>
  )
}
