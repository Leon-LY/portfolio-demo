import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Building2, Users, Globe, TrendingUp, ChevronRight, Calendar } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'

import { companyInfo, timeline, teamMembers, partners, newsArticles, values } from '../data/corporate'

export default function Corporate() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <PageTransition>
      {/* Hero with parallax */}
      <section ref={parallaxRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
            alt={companyInfo.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
                {companyInfo.name}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-light mb-4">{companyInfo.tagline}</p>
              <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-lg">
                {companyInfo.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { label: '成立年份', value: companyInfo.founded, icon: Calendar },
                  { label: '全球员工', value: companyInfo.employees, icon: Users },
                  { label: '年营收', value: companyInfo.revenue, icon: TrendingUp },
                  { label: '覆盖国家', value: companyInfo.offices, icon: Globe },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <stat.icon size={16} className="text-indigo-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                了解更多
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              核心价值观
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              驱动我们前行的信念
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-8 rounded-3xl bg-slate-50 hover:bg-gradient-to-b hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100"
                >
                  <div className="text-5xl mb-5">{value.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              发展历程
            </h2>
            <p className="text-slate-500 text-center mb-16">从 12 人团队到跨国集团的发展之路</p>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-purple-300 to-indigo-300 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((event, i) => (
                <ScrollReveal key={event.year} delay={i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full -translate-x-1/2 mt-7 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-50" />

                    <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="inline-block text-3xl font-extrabold gradient-text mb-2">{event.year}</span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              管理团队
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              经验丰富的领导团队，引领集团持续发展
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group text-center"
                >
                  <div className="relative w-40 h-40 mx-auto mb-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-indigo-600 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">{member.bio}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="text-lg font-semibold text-slate-700 text-center mb-10">合作伙伴</h3>
          </ScrollReveal>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center">
            {partners.map((partner) => (
              <ScrollReveal key={partner.name}>
                <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors cursor-default">
                  <span className="text-3xl">{partner.logo}</span>
                  <span className="text-xs">{partner.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">新闻中心</h2>
            </ScrollReveal>
            <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              查看全部 <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <ScrollReveal key={article.id} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar size={12} />
                      {article.date}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              与我们合作
            </h2>
            <p className="text-slate-400 mb-8">我们始终期待与志同道合的伙伴合作共赢</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                <Building2 size={18} />
                联系我们
              </button>
              <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                <Globe size={18} />
                全球办公室
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ 本页面为 Demo 模板，所有企业信息、人物和新闻均为虚构内容，仅供展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
