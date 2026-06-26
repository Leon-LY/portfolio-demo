import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { personalInfo } from '../data/config'
import { Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react'

const projectTypes = [
  '政务数字化系统',
  '数据可视化大屏',
  '企业级全栈平台',
  '移动端/H5 应用',
  'AI 应用集成',
  '技术咨询/架构设计',
  '其他',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    organization: '',
    projectType: '',
    description: '',
    contact: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, organization, projectType, description, contact } = form
    const subject = `[项目咨询] ${projectType} — ${name}${organization ? ` (${organization})` : ''}`
    const body = `项目类型：${projectType}%0D%0A%0D%0A项目描述：%0D%0A${description}%0D%0A%0D%0A联系方式：${contact}`
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${body}`
    setSubmitted(true)
  }

  const update = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="text-sm font-mono text-accent mb-3">联系我们</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            开始合作
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mb-4">
            告诉我们你的项目需求，我们会在 24 小时内给出初步评估。
            所有信息仅用于项目沟通，不会用于其他用途。
          </p>
          <div className="section-divider mb-16" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-solid rounded-2xl p-12 border-white/[0.05] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-success" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">提交成功</h2>
                <p className="text-text-secondary mb-6">
                  我们会在工作日 24 小时内通过你留下的联系方式回复。
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', organization: '', projectType: '', description: '', contact: '' }) }}
                  className="text-sm text-accent hover:text-accent-bright transition-colors"
                >
                  提交另一个需求 →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-xs text-text-tertiary mb-1.5 block">你的名字 *</span>
                    <input
                      required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="怎么称呼你"
                      className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-text-tertiary mb-1.5 block">单位/公司</span>
                    <input
                      value={form.organization}
                      onChange={e => update('organization', e.target.value)}
                      placeholder="你的单位或公司名称"
                      className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs text-text-tertiary mb-1.5 block">项目类型 *</span>
                  <select
                    required
                    value={form.projectType}
                    onChange={e => update('projectType', e.target.value)}
                    className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>选择项目类型</option>
                    {projectTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs text-text-tertiary mb-1.5 block">项目描述 *</span>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                    placeholder="简单描述你的需求：目标用户、核心功能、预算范围、时间要求等"
                    className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-all resize-none"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-text-tertiary mb-1.5 block">联系方式 *（微信/手机/邮箱）</span>
                  <input
                    required
                    value={form.contact}
                    onChange={e => update('contact', e.target.value)}
                    placeholder="方便我们联系你的方式"
                    className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/50 transition-all"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-surface-0 text-sm font-semibold rounded-xl hover:bg-accent-bright hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
                >
                  <Send size={16} /> 提交需求
                </button>
              </form>
            )}
          </div>

          {/* Sidebar — contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-solid rounded-2xl p-6 border-white/[0.05]">
              <h3 className="text-base font-bold text-white mb-4">联系方式</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">电话</p>
                    <p className="text-sm font-medium">{personalInfo.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">邮箱</p>
                    <p className="text-sm font-medium">{personalInfo.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <MessageCircle size={18} className="text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">微信</p>
                    <p className="text-sm font-medium text-text-primary">扫码添加技术负责人</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-solid rounded-2xl p-6 border-white/[0.05]">
              <h3 className="text-base font-bold text-white mb-3">合作流程</h3>
              <ol className="space-y-3">
                {[
                  '提交需求 → 我们 24h 内初步回复',
                  '免费需求评估 → 技术方案 + 报价',
                  '签署协议 → 按里程碑分期交付',
                  '验收上线 → 3 个月免费维护',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-text-secondary">
                    <span className="text-accent font-mono font-bold text-xs mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
