import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { personalInfo, teamMembers } from '../data/config'
import { Mail, Phone, Clock } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="text-sm font-mono text-accent mb-3">关于我们</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            我们是谁
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mb-4">
            我们是一个精干的技术团队，不是外包工厂。每个项目由核心成员直接负责，不做层层转包。
            你可以直接和写代码的人沟通，减少信息损耗。
          </p>
          <div className="section-divider mb-16" />
        </ScrollReveal>

        {/* Team Members */}
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">核心成员</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
            >
              <div className="card-solid rounded-2xl p-6 h-full border-white/[0.05] hover:border-accent/20 transition-all duration-300">
                {/* Avatar placeholder — geometric shape */}
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-gradient">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
                <p className="text-xs text-text-tertiary">{member.specialty}</p>
                <p className="text-xs text-text-tertiary mt-2">经验：{member.experience}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">我们的理念</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: '直接沟通',
              desc: '你直接和技术负责人沟通需求，没有中间层的信息损耗。我们相信最好的软件来自开发者和用户的直接对话。',
            },
            {
              title: '按需定制',
              desc: '不卖模板，不做千篇一律的系统。每个项目从需求出发选择最合适的技术方案，而非从技术栈出发限制需求。',
            },
            {
              title: '长期陪伴',
              desc: '交付不是结束。我们提供持续的维护和技术支持，已有多套系统持续维护超过 2 年。',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.1, 0.2, 1] }}
            >
              <div className="card-solid rounded-2xl p-6 h-full border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-accent">{['01', '02', '03'][i]}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick contact info */}
        <ScrollReveal>
          <div className="card-solid rounded-2xl p-8 border-white/[0.05]">
            <h2 className="text-xl font-bold text-white mb-6">快速联系</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-0.5">电话</p>
                  <p className="text-sm text-white font-medium">{personalInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-0.5">邮箱</p>
                  <p className="text-sm text-white font-medium">{personalInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Clock size={18} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-0.5">响应时间</p>
                  <p className="text-sm text-white font-medium">工作日 24 小时内</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
