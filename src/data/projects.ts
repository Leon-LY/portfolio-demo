/**
 * ═══════════════════════════════════════
 *  项目数据配置 —— 直接修改这里
 * ═══════════════════════════════════════
 *
 * 修改指南：
 * - title:       项目名称
 * - category:    项目分类
 * - description: 简短描述（显示在卡片上）
 * - tech:        技术栈标签
 * - images:      截图路径，放在 public/projects/ 下
 * - longDescription: 项目详情页的完整介绍
 * - highlights:  项目亮点列表
 *
 * 改完后放截图到 public/projects/ 目录
 * 然后执行 npm run build 重新构建
 */

import { personalInfo, skills } from './config'

export { personalInfo, skills }

export interface Project {
  id: string; title: string; category: string; description: string
  tech: string[]; link: string; featured?: boolean; real?: boolean
  images?: string[]; longDescription?: string; highlights?: string[]
}

export const realProjects: Project[] = [
  {
    id: 'smart-community',
    title: '智慧社区平台',
    category: '爱山东 · 移动端',
    description: '爱山东 App 内嵌 H5 应用，为居民提供社区公告、报修投诉、便民服务等功能。日均活跃用户 2 万+，覆盖荣成市全部社区。',
    tech: ['Vue 3', 'Vite', 'Pinia', 'Vant UI', 'Axios'],
    images: ['/projects/smart-community.svg'],
    longDescription: '荣成市智慧社区平台是"爱山东"App 的核心功能模块，面向全市社区居民提供一站式数字化服务。项目采用 Vue 3 + Vite 技术栈，配合 Pinia 状态管理和 Vant UI 移动端组件库，实现了高性能的 H5 内嵌体验。\n\n平台涵盖社区公告、报修投诉、便民服务、活动报名、问卷调查等核心功能模块，月均处理报修工单 5000+ 条，居民满意度达 96%。',
    highlights: ['覆盖荣成市全部 30+ 社区', '日均活跃用户 2 万+', '月均处理报修工单 5000+', '适配 iOS / Android 双端', '接入省统一身份认证'],
    link: '/project/smart-community',
    featured: true,
    real: true,
  },
  {
    id: 'bigscreen',
    title: '城市运行数据大屏',
    category: '数据可视化',
    description: '城市运行数据实时监控大屏，涵盖经济、民生、交通、环境等 20+ 数据维度，支持实时刷新和多屏联动，部署于城市指挥中心。',
    tech: ['Vue.js', 'ECharts', 'WebSocket', 'DataV', 'Node.js'],
    images: ['/projects/bigscreen.svg'],
    longDescription: '荣成市城市运行数据大屏是市政府指挥中心的核心展示系统，通过 ECharts 和 DataV 技术实现 20+ 数据维度的实时可视化监控。\n\n系统涵盖经济运行、民生服务、交通态势、环境监测等核心板块，支持 WebSocket 实时数据推送和多屏幕联动展示。大屏直接服务于市领导的日常决策和应急指挥调度。',
    highlights: ['20+ 数据维度实时监控', 'WebSocket 秒级数据刷新', '多屏幕联动展示', '部署于城市指挥中心', '支持应急指挥模式'],
    link: '/project/bigscreen',
    featured: true,
    real: true,
  },
  {
    id: 'government-app',
    title: '政务服务移动平台',
    category: '移动端 · Uni-app',
    description: '基于 Uni-app 的跨平台政务应用，集成行政审批、办事指南、进度查询、电子证照等功能，对接省统一身份认证实现单点登录。',
    tech: ['Uni-app', 'Vue 2', 'Vant', 'SM-Crypto', 'OAuth 2.0'],
    images: ['/projects/government-app.svg'],
    longDescription: '荣成市政务服务移动平台是基于 Uni-app 框架开发的跨平台应用，同时支持 iOS、Android 和 H5 三端运行。平台深度对接了山东省统一身份认证系统，实现了市民"一次认证、全网通办"的便捷体验。\n\n功能涵盖行政审批在线办理、办事指南查询、办理进度实时追踪、电子证照查看等核心政务服务场景。采用国密 SM2/SM4 算法保障数据传输安全。',
    highlights: ['Uni-app 三端统一发布', '对接省统一身份认证', '行政审批在线办理', '国密算法安全保障', '已上架应用商店'],
    link: '/project/government-app',
    featured: true,
    real: true,
  },
  {
    id: 'economy-platform',
    title: '智慧经济管理平台',
    category: '管理后台',
    description: '面向政府和企业的经济数据管理平台，涵盖企业画像、经济指标、产业链分析、招商管理等模块，支持多维度筛选和自定义报表。',
    tech: ['Vue.js', 'Element UI', 'ECharts', 'Axios', 'Python'],
    images: ['/projects/economy-platform.svg'],
    longDescription: '智慧经济管理平台是为荣成市经济发展部门打造的综合管理后台，集成了企业信息管理、经济指标监测、产业链分析和招商项目管理等核心功能。\n\n平台采用 Vue.js + Element UI 构建前端，ECharts 实现数据可视化，后端基于 Python 提供数据分析和报表生成服务。支持自定义报表导出和多维度的数据筛选分析。',
    highlights: ['企业画像与档案管理', '经济指标体系', '产业链上下游分析', '招商项目全生命周期', '自定义报表生成'],
    link: '/project/economy-platform',
    real: true,
  },
  {
    id: 'cloud-ui-lib',
    title: 'Cloud UI 组件库',
    category: '基础设施',
    description: '基于 Vue.js 2.x 的企业级 UI 组件库，封装表格、表单、图表、地图等 50+ 业务组件，服务荣成市 10+ 内部系统。',
    tech: ['Vue 2', 'TypeScript', 'Webpack', 'SCSS', 'Karma'],
    images: ['/projects/cloud-ui.svg'],
    longDescription: 'Cloud UI 是基于 Vue.js 2.x 和 TypeScript 构建的企业级 UI 组件库，专为荣成市政务系统定制。库中包含 50+ 个精心设计的业务组件，涵盖数据表格、动态表单、统计图表、地图定位等常见政务场景。\n\n组件库统一了 10+ 个内部系统的技术标准和交互规范，显著提升了团队开发效率。支持按需加载和主题定制，配套完整的开发文档和单元测试。',
    highlights: ['50+ 业务组件', 'TypeScript 严格模式', '配套开发文档', '服务 10+ 内部系统', '统一技术标准'],
    link: '/project/cloud-ui-lib',
    real: true,
  },
  {
    id: 'identity-auth',
    title: '省统一身份认证对接',
    category: '安全 · 基础设施',
    description: '对接山东省统一身份认证平台，实现 OAuth 2.0 / OIDC 协议集成，为多个应用提供统一认证授权服务，日认证请求 5 万+。',
    tech: ['Node.js', 'OAuth 2.0', 'OIDC', 'SM2/SM4', 'Redis'],
    images: ['/projects/identity-auth.svg'],
    longDescription: '省统一身份认证对接项目完成了荣成市多个政务应用与山东省统一身份认证平台的深度集成。基于 OAuth 2.0 和 OIDC 标准协议，结合国密 SM2/SM4 加密算法，构建了安全可靠的统一认证网关。\n\n项目服务于智慧社区、政务服务、行政审批等多个业务系统，日均处理认证请求 5 万+。通过 Redis 缓存优化，认证响应时间控制在 200ms 以内。',
    highlights: ['OAuth 2.0 / OIDC 标准', '国密 SM2/SM4 加密', '日均认证 5 万+', '响应时间 < 200ms', '多系统统一接入'],
    link: '/project/identity-auth',
    real: true,
  },
]

export const demoProjects: Project[] = [
  {
    id: 'demo-marketing',
    title: 'GrowthPulse 营销平台',
    category: 'Demo · 营销网站',
    description: '数字营销机构高转化品牌官网，集成案例展示、实时数据看板与在线预约系统。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    link: '/marketing',
    featured: true,
  },
  {
    id: 'demo-saas',
    title: 'CloudFlow 数据分析',
    category: 'Demo · SaaS 产品',
    description: 'AI 驱动的企业级数据分析平台 Demo，展示实时可视化与团队协作。',
    tech: ['React', 'D3.js', 'WebSocket', 'Redis'],
    link: '/saas',
  },
  {
    id: 'demo-ecommerce',
    title: 'LuxeCart 精品电商',
    category: 'Demo · 电商平台',
    description: '高端时尚电商 Demo，展示 3D 预览、AI 推荐、购物车等核心功能。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia'],
    link: '/ecommerce',
  },
  {
    id: 'demo-corporate',
    title: 'Meridian 企业门户',
    category: 'Demo · 企业官网',
    description: '跨国集团企业官网 Demo，多语言、投资者关系、新闻中心。',
    tech: ['Vue.js', 'Nuxt', 'GraphQL', 'i18n'],
    link: '/corporate',
  },
]
