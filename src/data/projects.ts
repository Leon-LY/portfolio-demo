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
 * 放截图到 public/projects/ 目录后执行 npm run build
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
    id: 'invest-learn',
    title: '远见 FarSight',
    category: '全栈 · AI 金融',
    description: '基金投资智能分析平台，集成实时行情、AI 智能分析、K 线图表、基金知识库。采用 Vue 3 + FastAPI 全栈架构，DeepSeek + 通义千问双 AI 引擎驱动。',
    tech: ['Vue 3', 'TypeScript', 'FastAPI', 'PostgreSQL', 'DeepSeek'],
    images: ['/projects/invest-learn.svg'],
    longDescription: '远见（FarSight）是一站式基金投资智能分析平台，由 Leon 独立完成全栈开发。项目定位为"洞察趋势，智选未来"，旨在通过 AI 技术帮助投资者更科学地分析基金市场。\n\n前端采用 Vue 3 + TypeScript + Tailwind CSS v4 构建，使用 ECharts 实现 K 线图和趋势分析图表，Naive UI 组件库保证界面一致性。后端基于 Python FastAPI 异步框架，配合 SQLAlchemy 2.0 操作 PostgreSQL 数据库，Redis 用作缓存层加速数据查询。\n\n平台集成双 AI 引擎：DeepSeek 用于文字分析和市场解读，通义千问 VL 用于截图识别和多模态分析。数据源涵盖 AKShare、天天基金、新浪财经等主流金融数据平台。Docker Compose 一键部署，已上线运行。',
    highlights: [
      'Vue 3 + FastAPI 全栈架构',
      'DeepSeek + 通义千问双 AI 引擎',
      '实时 K 线图与趋势分析',
      '金融消息实时抓取与推送',
      'Docker Compose 一键部署',
      'PostgreSQL + Redis 数据层',
    ],
    link: '/project/invest-learn',
    featured: true,
    real: true,
  },
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
    id: 'building',
    title: '方外设计',
    category: '企业官网 · Nuxt',
    description: '建筑设计工作室作品集官网，含前台展示 + 后台管理系统。Nuxt 4 + Express 全栈，支持项目发布、图片管理、在线留言等 15 个管理模块。',
    tech: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Express', 'PostgreSQL'],
    images: ['/projects/building.svg'],
    longDescription: '方外设计是山东威海一家建筑设计工作室的品牌官网，由 Leon 独立完成全栈开发。项目采用 Nuxt 4 + Vue 3 构建前端，Express + PostgreSQL 构建后端 API，Docker + Nginx 部署。\n\n前台采用 SSG（静态站点生成）+ 客户端动态数据混合渲染策略，支持项目作品展示、图片画廊（PhotoSwipe）、关于我们、在线联系等功能，访问速度快、SEO 友好。\n\n后台管理系统包含 15 个管理模块：项目管理、分类管理、联系人管理、支付管理、文件管理、样式配置、用户管理等。内置 Tiptyap 富文本编辑器，支持图文混排的项目案例发布。JWT + 角色权限控制，多管理员协作。',
    highlights: [
      'Nuxt 4 SSG 高性能渲染',
      '15 个管理模块完整后台',
      'PhotoSwipe 作品图片画廊',
      'Tiptyap 富文本项目编辑器',
      'JWT + 角色权限管理',
      'Docker + Nginx 部署',
      '响应式设计，适配移动端',
    ],
    link: '/project/building',
    featured: true,
    real: true,
  },
  {
    id: 'bigscreen',
    title: '荣成市城市大脑',
    category: '数据可视化 · 大屏',
    description: '城市运行数据实时监控大屏，涵盖经济、民生、交通、环境等 20+ 数据维度，支持实时刷新和多屏联动，部署于城市指挥中心。',
    tech: ['Vue.js', 'ECharts', 'WebSocket', 'DataV', 'Node.js'],
    images: ['/projects/bigscreen.svg'],
    longDescription: '荣成市城市运行数据大屏是市政府指挥中心的核心展示系统，通过 ECharts 和 DataV 技术实现 20+ 数据维度的实时可视化监控。\n\n系统涵盖经济运行、民生服务、交通态势、环境监测等核心板块，支持 WebSocket 实时数据推送和多屏幕联动展示。大屏直接服务于市领导的日常决策和应急指挥调度。',
    highlights: ['20+ 数据维度实时监控', 'WebSocket 秒级数据刷新', '多屏幕联动展示', '部署于城市指挥中心', '支持应急指挥模式'],
    link: '/project/bigscreen',
    featured: false,
    real: true,
  },
  {
    id: 'economy-platform',
    title: '经济综合运行平台',
    category: '政务 · 管理后台',
    description: '基于 SpringBoot + Bootdo 框架开发的荣成市经济数据综合管理平台，集成 TCP 异步数据接收、Redis 缓存、第三方授权登录、代码自动生成等功能，支撑全市经济运行监测与决策。',
    tech: ['SpringBoot', 'MyBatis', 'Redis', 'MySQL', 'Hutool'],
    images: ['/projects/economy-platform.svg'],
    longDescription: '荣成市经济综合运行平台是基于 SpringBoot 2.0 + Bootdo 快速开发框架构建的经济数据管理后台。平台为市经济发展部门提供从数据采集、处理到分析展示的全链路支撑。\n\n平台集成了 Voovan 框架实现 TCP 异步数据报文接收，将各经济指标数据实时存入数据库。采用 Redis 缓存热点数据，显著提升查询性能。集成 JustAuth 第三方授权登录（支持 Gitee、百度、钉钉等平台），配合 JWT 实现多系统单点登录。\n\n内置代码自动生成器，可根据数据库表结构一键生成 CRUD 页面，大幅提升开发效率。使用 Hutool 工具包和 FreeMarker 模板引擎实现自定义报表导出。平台已支撑荣成市多个经济管理业务模块的运行。',
    highlights: [
      'SpringBoot 2.0 企业级架构',
      'TCP 异步数据实时接收',
      'Redis 缓存性能优化',
      'JustAuth 多平台统一登录',
      '代码自动生成器（CRUD）',
      '自定义报表导出引擎',
      'MyBatis 灵活数据访问',
    ],
    link: '/project/economy-platform',
    real: true,
  },
  {
    id: 'river-chief',
    title: '河湖湾长制管理平台',
    category: '移动端 · 政务',
    description: '针对荣成市河长、湖长、湾长日常巡查管理需求开发的移动办公系统，支持巡查打卡、问题上报、整改追踪、数据统计等功能。',
    tech: ['Uni-app', 'Vue.js', 'Node.js', 'GIS', 'PostgreSQL'],
    images: ['/projects/river-chief.svg'],
    longDescription: '河湖湾长制管理平台是为荣成市水务和环保部门定制开发的移动巡查管理系统。平台服务于全市各级河长、湖长、湾长的日常巡查工作，实现了从"发现问题"到"整改闭环"的全流程数字化管理。\n\n巡查人员通过移动端进行 GPS 定位打卡、现场拍照取证、问题描述上报。后台管理系统自动生成巡查轨迹、问题分布热力图和统计分析报表，支持一键导出和向上级汇报。平台覆盖荣成市全境河流、湖泊和海湾水体，显著提升了水环境巡查效率和问题处置速度。',
    highlights: [
      'GPS 巡查轨迹记录',
      '现场拍照 + 问题描述上报',
      '整改流程闭环追踪',
      '问题分布热力图',
      '统计分析报表一键导出',
      '覆盖全市河流、湖泊、海湾',
    ],
    link: '/project/river-chief',
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
