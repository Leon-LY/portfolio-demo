import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Calendar } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { companyInfo, timeline, teamMembers, partners, newsArticles, values } from '../data/corporate'

export default function Corporate() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={parallaxRef} className="relative h-screen min-h-[650px] flex items-center overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
                {companyInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl text-[#a1a1a1] font-light mb-4">{companyInfo.tagline}</p>
              <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-lg mb-10">
                {companyInfo.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { label: '成立', value: companyInfo.founded },
                  { label: '员工', value: companyInfo.employees },
                  { label: '年营收', value: companyInfo.revenue },
                  { label: '覆盖国家', value: companyInfo.offices },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.04]">
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-[#525252] uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2">
                了解更多 <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">核心价值观</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">驱动我们前行</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.06}>
                <div className="bg-[#0d0d0d] p-7 hover:bg-[#141414] transition-colors duration-300 text-center">
                  <div className="text-4xl mb-5 opacity-80">{v.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-3">{v.title}</h3>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-32 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">发展历程</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">我们的旅程</h2>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.04] md:-translate-x-px" />
            <div className="space-y-16">
              {timeline.map((event, i) => (
                <ScrollReveal key={event.year} delay={i * 0.05}>
                  <div className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-3 md:left-1/2 w-2 h-2 bg-[#8b5cf6] rounded-full -translate-x-1/2 mt-2 ring-4 ring-[#080808]" />
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-2xl font-extrabold text-white">{event.year}</span>
                      <h3 className="text-sm font-semibold text-white mt-1 mb-1">{event.title}</h3>
                      <p className="text-xs text-[#6b6b6b] leading-relaxed">{event.description}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">管理团队</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">核心成员</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {teamMembers.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.06}>
                <div className="bg-[#0d0d0d] p-7 text-center hover:bg-[#141414] transition-colors duration-300">
                  <img src={m.avatar} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/[0.04]" />
                  <h3 className="text-sm font-bold text-white mb-0.5">{m.name}</h3>
                  <p className="text-[11px] font-medium text-[#8b5cf6] mb-2">{m.role}</p>
                  <p className="text-[11px] text-[#525252] leading-relaxed">{m.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="pb-24 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-10 text-center">合作伙伴</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center">
            {partners.map((p) => (
              <span key={p.name} className="text-3xl opacity-30 hover:opacity-60 transition-opacity cursor-default">{p.logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12">
            <ScrollReveal>
              <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">新闻中心</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">最新动态</h2>
            </ScrollReveal>
            <button className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#a1a1a1] hover:text-white transition-colors">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {newsArticles.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.08}>
                <article className="group bg-[#0d0d0d] hover:bg-[#141414] transition-colors duration-300 cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-medium text-[#8b5cf6] uppercase">{a.category}</span>
                      <span className="text-[10px] text-[#525252] flex items-center gap-1">
                        <Calendar size={10} /> {a.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-[#a78bfa] transition-colors">{a.title}</h3>
                    <p className="text-xs text-[#6b6b6b] leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-[#525252]">
          此页面为 Demo 模板。所有企业信息、人物及新闻均为虚构，仅供技术展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
