import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import TypewriterText from '../components/TypewriterText'
import { personalInfo, skills, projects } from '../data/projects'

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Avatar */}
            <div className="mb-8 inline-block">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] mx-auto shadow-2xl shadow-indigo-500/25">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                  👨‍💻
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Available for Projects</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-4">
              {personalInfo.name}
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl text-slate-600 font-light mb-6 h-10 sm:h-12">
              <TypewriterText
                texts={[
                  '全栈软件工程师',
                  'React / Vue 开发者',
                  'Node.js 工程师',
                  'UI/UX 爱好者',
                ]}
                className="gradient-text font-medium"
                speed={80}
                pauseTime={2500}
              />
            </div>
            <p className="max-w-2xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
              {personalInfo.tagline} — {personalInfo.bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/marketing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
              >
                查看 Demo 作品
                <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:alex.chen@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
              >
                <Mail size={18} />
                联系我
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
            >
              <div className="w-1.5 h-2 rounded-full bg-slate-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              技术栈
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              持续学习前沿技术，保持技术栈的深度与广度
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={i * 0.05}>
                <div className="group relative bg-slate-50 rounded-2xl p-5 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 text-center">
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">{skill.name}</h3>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-slate-400 mt-2 block">{skill.level}%</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              项目作品集
            </h2>
            <p className="text-slate-500 text-center mb-4 max-w-xl mx-auto">
              以下为 Demo 模板项目，展示不同领域的技术能力
            </p>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-center mb-16 max-w-md mx-auto flex items-center justify-center gap-2">
              ⚠️ 本页面所有项目均为 Demo 模板，仅供技术展示
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link to={project.link}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 h-full"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">
                          精选
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-full">
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              需要高质量的 Web 产品？
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              无论是营销网站、SaaS 产品还是移动端应用，我都能为您交付优秀的技术方案
            </p>
            <a
              href="mailto:alex.chen@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-2xl hover:shadow-white/25 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={20} />
              联系我聊聊项目
              <ArrowRight size={20} />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
