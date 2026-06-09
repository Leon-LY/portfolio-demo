import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Shield, Cloud, BarChart3, Layers, RefreshCw, Server } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'


const features = [
  { icon: BarChart3, title: '智能数据分析', desc: 'AI 驱动的分析引擎，自动发现趋势、异常和增长机会。', details: ['实时数据可视化','自定义报表生成器','多维度交叉分析','智能预警系统'] },
  { icon: Layers, title: '自动化工作流', desc: '可视化工作流编辑器，让复杂业务流程自动化运行。', details: ['拖拽式流程设计','条件触发规则','多步骤编排','第三方集成'] },
  { icon: Shield, title: '企业级安全', desc: 'SOC 2 认证，端到端加密，确保数据安全无忧。', details: ['SSO 单点登录','AES-256 加密','审计日志','GDPR 合规'] },
  { icon: Cloud, title: '开放 API', desc: '丰富的 RESTful API 和 Webhook，无缝集成现有技术栈。', details: ['REST & GraphQL','Webhook 推送','SDK 多语言','API 密钥管理'] },
  { icon: RefreshCw, title: '实时数据同步', desc: '毫秒级数据同步，多端实时协作，离线自动恢复。', details: ['WebSocket 长连接','冲突自动解决','离线模式','操作历史回溯'] },
  { icon: Server, title: '弹性部署', desc: '支持公有云、私有云、混合部署，满足不同合规需求。', details: ['Docker/K8s','自动扩缩容','多区域部署','SLA 99.9%'] },
]

const pricingPlans = [
  { name: '入门版', price: 99, desc: '适合小型团队快速启动', features: ['5 名成员','10GB 存储','基础分析','邮件支持','API 1000次/天'], cta: '开始试用' },
  { name: '专业版', price: 299, desc: '成长型企业完整方案', features: ['50 名成员','100GB 存储','AI 高级分析','优先支持','API 10000次/天','自动化工作流','自定义品牌'], cta: '开始试用', highlight: true },
  { name: '企业版', price: 999, desc: '大型组织定制方案', features: ['无限成员','1TB 存储','全部 AI 功能','专属客户经理','无限 API','白标方案','SLA 99.9%','私有部署'], cta: '联系销售' },
]

const faqs = [
  { q: 'CloudFlow 如何保障数据安全？', a: '采用 AES-256 加密存储、TLS 1.3 传输加密、SOC 2 Type II 认证的数据中心，以及定期的第三方安全审计。所有客户数据均经过多层安全防护。' },
  { q: '是否支持数据迁移？', a: '支持从 Excel、Google Sheets、Salesforce、HubSpot 等主流平台一键导入。复杂迁移需求由技术支持团队全程协助。' },
  { q: '可以定制功能吗？', a: '企业版支持深度定制，包括自定义字段、工作流、报表和品牌。提供 API 和 Webhook 与现有系统集成。' },
  { q: '有试用期吗？', a: '所有方案均提供 14 天完整功能试用，无需绑定信用卡。到期后可选择升级或导出数据。' },
]

const liveMetrics = [
  { label: '处理中请求', value: '1,284/s', color: 'text-emerald-400' },
  { label: '平均延迟', value: '42ms', color: 'text-blue-400' },
  { label: '正常运行', value: '99.99%', color: 'text-amber-400' },
  { label: '节点数', value: '12', color: 'text-violet-400' },
]

export default function SaaS() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [annual, setAnnual] = useState(false)
  const [metricTick, setMetricTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setMetricTick(p => p + 1), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · 此页面为 Demo 模板，展示 SaaS 产品官网的技术实现——实时数据看板、定价系统、功能网格、FAQ 交互组件。</p>
        </div>
      </div>

      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-[140px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6 block">CloudFlow Platform</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.92] mb-6">
              用数据<br /><span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">驱动决策</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed max-w-lg mx-auto mb-8">
              AI 驱动的智能分析引擎。实时处理海量数据，日活 10 万+，查询响应低于 100ms。
            </p>
            <div className="flex justify-center gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all inline-flex items-center gap-2">开始试用 <ArrowUpRight size={16} /></button>
              <button className="px-6 py-3 bg-white/[0.04] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">预约演示</button>
            </div>
          </motion.div>

          {/* Live metrics bar */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-0.5 bg-white/[0.03] rounded-2xl overflow-hidden max-w-4xl mx-auto">
            {liveMetrics.map(m => (
              <div key={m.label} className="bg-[#111827] p-5 text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-xl font-bold font-mono ${m.color}`} key={metricTick}>{m.value}</p>
                <div className="flex items-center gap-1 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-[10px] text-slate-600">实时</span></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Features ═══ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">产品功能</p><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">一站式数据平台</h2></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i*0.05}>
                <motion.div whileHover={{ y: -3 }} className="bg-[#111827] border border-white/[0.04] rounded-2xl p-7 hover:border-white/[0.08] transition-all h-full group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                    <f.icon size={18} className="text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{f.desc}</p>
                  <ul className="space-y-1.5">{f.details.map(d=><li key={d} className="flex items-center gap-2 text-xs text-slate-500"><Check size={12} className="text-blue-400 flex-shrink-0" />{d}</li>)}</ul>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">定价方案</p><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">灵活选择</h2><p className="text-sm text-slate-500 mb-10">按需付费，随时调整。</p></ScrollReveal>

          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.02] rounded-xl p-1 border border-white/[0.04] inline-flex">
              {['月付','年付'].map(l=>{const act=(l==='年付')===annual;return(
                <button key={l} onClick={()=>setAnnual(l==='年付')} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${act?'bg-blue-600 text-white':'text-slate-500 hover:text-white'}`}>{l}{l==='年付'&&<span className="ml-1 text-[10px] text-emerald-400">省20%</span>}</button>)})}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pricingPlans.map((p, i) => (
              <ScrollReveal key={p.name} delay={i*0.08}>
                <motion.div whileHover={{ y: -5 }} className={`bg-[#111827] border rounded-2xl p-8 h-full flex flex-col transition-all ${p.highlight?'border-blue-500/30 ring-1 ring-blue-500/20':'border-white/[0.04]'}`}>
                  {p.highlight && <span className="text-[10px] font-semibold text-blue-400 mb-3 block">最受欢迎</span>}
                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-600 mb-6">{p.desc}</p>
                  <div className="mb-6"><span className="text-4xl font-extrabold text-white">¥{annual?Math.round(p.price*0.8):p.price}</span><span className="text-xs text-slate-600">/月</span></div>
                  <p className="text-[10px] text-slate-600 -mt-4 mb-5">模拟数据</p>
                  <ul className="space-y-2.5 mb-8 flex-1">{p.features.map(f=><li key={f} className="flex items-center gap-2 text-xs text-slate-400"><Check size={13} className="text-emerald-500 flex-shrink-0" />{f}</li>)}</ul>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'}`}>{p.cta}</button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto px-6">
          <ScrollReveal><p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">常见问题</p><h2 className="text-3xl font-extrabold text-white mb-12">快速了解</h2></ScrollReveal>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i*0.04}>
                <div className="bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden">
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors">
                    <span className="text-sm font-medium text-white pr-4">{f.q}</span>
                    <motion.div animate={{rotate:openFaq===i?180:0}} transition={{duration:0.25}}><ChevronDown size={16} className="text-slate-500" /></motion.div>
                  </button>
                  <AnimatePresence>{openFaq===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{f.a}</p></motion.div>}</AnimatePresence>
                </div>
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
            <a href="/ecommerce" className="hover:text-white transition-colors">电商</a>
            <a href="/mobile-app" className="hover:text-white transition-colors">移动 App</a>
            <a href="/corporate" className="hover:text-white transition-colors">企业官网</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：Vue 3 · TypeScript · Node.js · 响应式设计</p>
        </div>
      </div>
    </PageTransition>
  )
}
