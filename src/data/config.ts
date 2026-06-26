/**
 * 站点配置 — 直接修改这里，npm run build 重新构建
 */

export const personalInfo = {
  name: 'Leon',
  tagline: '全栈架构师 · 数据可视化 · 企业级平台',
  subtitle: '城市大脑 · 经济监测 · 智慧社区 · AI 集成',
  heroTitle: '不只是写代码。是让你的想法，比想象中更酷。',
  heroBio: '',
  heroCredibility: '已服务 20+ 政府部门 · 交付 47 个项目 · 系统日均处理 240 万条数据 · 核心可用率 99.7%',
  email: '554295000@qq.com',
  phone: '18389118642',
}

export const teamMembers = [
  { name: 'Leon', role: '全栈架构师 · 技术负责人', specialty: '系统架构 · 数据可视化 · AI 集成 · 性能优化', experience: '12 年' },
  { name: '前端工程师', role: '高级前端开发', specialty: 'React / Vue / TypeScript / 微前端 / 移动端', experience: '7 年' },
  { name: '后端工程师', role: '高级后端开发', specialty: 'SpringBoot / Node.js / Python / 分布式 / 数据库', experience: '6 年' },
]

export const services: Array<{ title: string; desc: string; projectRef?: string }> = [
  {
    title: '全栈应用开发',
    desc: '企业官网、SaaS 后台、API 服务。Vue / React / SpringBoot / Node.js —— 从零到上线，一个人就是一支团队。',
    projectRef: 'building',
  },
  {
    title: '数据可视化',
    desc: '大屏指挥中心、实时监控面板、数据仪表盘。ECharts / WebSocket 秒级刷新，让你的数据"活"起来。',
    projectRef: 'bigscreen',
  },
  {
    title: '移动端 & 小程序',
    desc: 'H5 应用、微信小程序、Uni-App 跨平台。已覆盖 30+ 社区、日均 2 万+ 用户。',
    projectRef: 'smart-community',
  },
  {
    title: 'AI 集成 & 架构',
    desc: '接入大模型 API、搭建知识库、设计系统架构。DeepSeek + 通义千问双引擎落地经验。',
    projectRef: 'invest-learn',
  },
]

export const heroStats: Array<{ value: string; label: string }> = []

export const workflowSteps = [
  {
    step: '01',
    title: '聊聊你的想法',
    desc: '告诉我你想做什么、给谁用、大概预算。我会给出技术可行性分析和初步建议。不用有压力，前期沟通不收费。',
  },
  {
    step: '02',
    title: '出方案 & 报价',
    desc: '你确认方向后，我输出技术方案、时间计划和透明报价。确定要做再启动，每个环节都清晰可见。',
  },
  {
    step: '03',
    title: '开发 & 每周同步',
    desc: '按周交付可用功能。Git 管理代码随时看进度。你全程参与，不会出现"做完了才发现不对"。',
  },
  {
    step: '04',
    title: '上线 & 持续支持',
    desc: '部署上线 + 操作文档。源码完整交付。交付后保留免费维护窗口，后续可签长期支持协议。',
  },
]

export const clients = [
  '山东省大数据局', '荣成市大数据中心', '荣成市交通运输局',
  '中国广电山东', '荣成市水务局', '荣成市行政审批局',
]

export const faqItems = [
  {
    q: '项目由谁负责？',
    a: '每个项目由 Leon 亲自架构和核心模块开发。根据规模配置 2-3 名精干工程师。你直接和写代码的人沟通，没有中间层。',
  },
  {
    q: '合作方式是什么样的？',
    a: '按项目整体报价或按阶段分期。先沟通需求 → 我出方案和报价 → 双方确认后启动。小型项目可以不签合同，复杂项目建议签订技术服务协议。',
  },
  {
    q: '技术栈是什么？',
    a: '前端 React / Vue，后端 SpringBoot / Node.js，数据可视化 ECharts / DataV，数据库 PostgreSQL / MySQL / Redis，部署 Docker / K8s。不绑定单一技术栈，根据项目需求选最优方案。',
  },
  {
    q: '项目周期一般多长？',
    a: '企业官网 2-4 周，后台管理系统 4-8 周，数据大屏 3-6 周，大型系统 2-6 个月。确定需求后我会给出精确的工时估算。按里程碑分期付款。',
  },
  {
    q: '能只做前端或后端吗？',
    a: '可以。如果你已有团队，我可以只负责某一层的开发。也可以做技术咨询、代码审查或性能优化。签署正式协议，明确工作边界和接口规范。',
  },
  {
    q: '交付后还有维护吗？',
    a: '交付后保留免费维护窗口（修复 Bug 和小调整）。之后可签长期维护协议。城市大脑、智慧社区等核心系统持续维护超过 3 年。',
  },
  {
    q: '和其他外包公司有什么区别？',
    a: '你直接和架构师沟通，没有销售-项目经理-外包工人的多层转包。源码交付，技术栈透明，长期维护而非交付就跑。',
  },
]
