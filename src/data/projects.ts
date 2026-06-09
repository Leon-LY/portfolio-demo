import { personalInfo } from './config'

export { personalInfo }

export interface Project {
  id: string; title: string; category: string; description: string
  tech: string[]; link: string; featured?: boolean; real?: boolean
  images?: string[]; overview?: string; capabilities?: string[]; techNote?: string
}

/** 按能力类别分组 */
export const projectGroups = [
  {
    label: '数据可视化',
    items: ['bigscreen', 'economy-platform'] as string[],
  },
  {
    label: '企业官网与品牌站',
    items: ['building'] as string[],
  },
  {
    label: '移动端与 H5 应用',
    items: ['smart-community', 'river-chief'] as string[],
  },
  {
    label: 'AI 与数据应用',
    items: ['invest-learn'] as string[],
  },
  {
    label: 'Demo 模板',
    items: ['demo-marketing', 'demo-saas', 'demo-ecommerce', 'demo-mobile'] as string[],
    demo: true,
  },
]

export const allProjects: Record<string, Project> = {
  'bigscreen': {
    id: 'bigscreen',
    title: '荣成市城市大脑',
    category: '数据可视化 · ECharts / DataV / WebSocket',
    description: '城市运行数据实时监控大屏，20+ 数据维度，部署于市指挥中心。',
    tech: ['Vue.js', 'ECharts', 'DataV', 'WebSocket', 'Java'],
    images: ['/projects/bigscreen.svg', '/projects/bigscreen1.png', '/projects/bigscreen2.png'],
    overview: '荣成市城市大脑是市政府指挥中心的核心展示系统，为市领导决策和应急指挥提供实时数据支撑。',
    capabilities: [
      '20+ 数据维度实时监控，涵盖经济、民生、交通、环境等核心领域',
      'WebSocket 实时推送 + 多屏幕联动，秒级数据刷新',
      '直接服务于指挥中心日常决策与应急调度',
    ],
    techNote: '基于 ECharts 和 DataV 构建可视化层，后端 Java 支撑数据采集与推送。',
    link: '/project/bigscreen',
    real: true,
  },
  'economy-platform': {
    id: 'economy-platform',
    title: '经济综合运行平台',
    category: '数据可视化 · SpringBoot / MyBatis / Redis',
    description: '全链路经济数据管理平台，TCP 异步数据接收，自定义报表引擎。',
    tech: ['SpringBoot', 'MyBatis', 'Redis', 'MySQL', 'Hutool'],
    images: ['/projects/economy-platform.svg', '/projects/economy-platform1.png', '/projects/economy-platform2.png'],
    overview: '面向荣成市经济发展部门的经济数据综合管理平台，覆盖从数据采集、处理到分析展示的全链路。',
    capabilities: [
      'TCP 异步数据报文实时接收，各经济指标数据自动入库',
      '内置代码自动生成器，可根据数据库表结构一键生成 CRUD 页面',
      'JustAuth 多平台统一登录，自定义报表导出引擎',
    ],
    techNote: '基于 SpringBoot 2.0 + Bootdo 快速开发框架，Redis 缓存热点数据，FreeMarker 模板引擎驱动报表。',
    link: '/project/economy-platform',
    real: true,
  },
  'building': {
    id: 'building',
    title: '方外设计',
    category: '企业官网 · Nuxt 4 / Express / PostgreSQL',
    description: '建筑设计工作室全栈官网，含 15 个管理模块的完整后台系统。',
    tech: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Express', 'PostgreSQL'],
    images: ['/projects/building.svg', '/projects/building1.jpeg', '/projects/building2.jpeg', '/projects/building3.jpeg', '/projects/building4.jpeg', '/projects/building5.jpeg'],
    overview: '方外设计（山东威海）建筑设计工作室的品牌官网，集作品展示与后台管理于一体的全栈 Web 应用。',
    capabilities: [
      'Nuxt 4 SSG 高性能渲染，SEO 友好，首屏加载极快',
      '后台 15 个管理模块：项目管理、分类、联系人、支付、文件、样式、用户等',
      'Tiptyap 富文本编辑器 + PhotoSwipe 作品图片画廊',
    ],
    techNote: '前端 Nuxt 4 + Vue 3，后端 Express + PostgreSQL，JWT 角色权限，Docker + Nginx 部署。',
    link: '/project/building',
    real: true,
    featured: true,
  },
  'smart-community': {
    id: 'smart-community',
    title: '智慧社区平台',
    category: '移动端应用 · Vue 3 / Vite / Vant UI',
    description: '爱山东 App 内嵌 H5 应用，覆盖荣成市 30+ 社区，日均活跃用户 2 万+。',
    tech: ['Vue 3', 'Vite', 'Pinia', 'Vant UI', 'Axios'],
    images: ['/projects/smart-community.svg', '/projects/smart-community1.jpg', '/projects/smart-community2.jpg', '/projects/smart-community3.jpg', '/projects/smart-community4.jpg', '/projects/smart-community5.jpg'],
    overview: '面向荣成市全体社区居民的一站式数字化服务平台，内嵌于爱山东 App。',
    capabilities: [
      '覆盖荣成市全部 30+ 社区，月均处理报修工单 5000+ 条',
      '集成社区公告、报修投诉、便民服务、活动报名等核心功能模块',
      '居民满意度达 96%',
    ],
    techNote: '基于 Vue 3 + Vite 构建 H5 应用，配合 Pinia 状态管理和 Vant UI 组件库。',
    link: '/project/smart-community',
    real: true,
    featured: true,
  },
  'river-chief': {
    id: 'river-chief',
    title: '河湖湾长制管理平台',
    category: '移动端应用 · Uni-app / GIS',
    description: '移动巡查办公系统，GPS 定位打卡、现场取证、整改闭环追踪。',
    tech: ['Uni-app', 'Vue.js', 'Node.js', 'GIS', 'PostgreSQL'],
    images: ['/projects/river-chief.svg', '/projects/river-chief1.jpg', '/projects/river-chief2.jpg', '/projects/river-chief3.jpg', '/projects/river-chief4.jpg'],
    overview: '面向荣成市水务和环保部门的移动巡查管理系统，服务于全市各级河长、湖长、湾长的日常巡查工作。',
    capabilities: [
      'GPS 巡查轨迹记录，现场拍照取证，问题描述上报',
      '从"发现问题"到"整改闭环"的全流程数字化管理',
      '后台自动生成巡查轨迹、问题分布热力图和统计分析报表',
    ],
    techNote: '移动端基于 Uni-app 跨平台框架，后台 Node.js + PostgreSQL，GIS 地理信息模块支撑。',
    link: '/project/river-chief',
    real: true,
  },
  'invest-learn': {
    id: 'invest-learn',
    title: '远见 FarSight',
    category: 'AI 应用 · Vue 3 / FastAPI / DeepSeek',
    description: '基金投资智能分析平台，双 AI 引擎驱动，Docker 一键部署。',
    tech: ['Vue 3', 'TypeScript', 'FastAPI', 'PostgreSQL', 'DeepSeek'],
    images: ['/projects/invest-learn.svg', '/projects/invest-learn1.jpg', '/projects/invest-learn2.jpg', '/projects/invest-learn3.jpg', '/projects/invest-learn4.jpg'],
    overview: '一站式基金投资智能分析平台，通过 AI 技术帮助投资者更科学地分析基金市场。',
    capabilities: [
      'DeepSeek + 通义千问双 AI 引擎，覆盖文字分析和多模态识别',
      '实时 K 线图与趋势分析，金融消息实时抓取与推送',
      'Docker Compose 一键部署，已上线运行',
    ],
    techNote: '前端 Vue 3 + TypeScript，后端 Python FastAPI 异步框架，PostgreSQL + Redis 数据层。',
    link: '/project/invest-learn',
    real: true,
    featured: true,
  },
  // Demo 模板
  'demo-marketing': {
    id: 'demo-marketing', title: 'GrowthPulse 营销平台',
    category: 'Demo 项目 · 仅供技术展示',
    description: '数字营销机构高转化品牌官网，集成案例展示、实时数据看板与在线预约系统。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    link: '/marketing',
  },
  'demo-saas': {
    id: 'demo-saas', title: 'CloudFlow 数据分析',
    category: 'Demo 项目 · 仅供技术展示',
    description: 'AI 驱动的企业级数据分析平台 Demo，展示实时可视化与团队协作。',
    tech: ['React', 'D3.js', 'WebSocket', 'Redis'],
    link: '/saas',
  },
  'demo-ecommerce': {
    id: 'demo-ecommerce', title: 'LuxeCart 精品电商',
    category: 'Demo 项目 · 仅供技术展示',
    description: '高端时尚电商 Demo，展示 3D 预览、AI 推荐、购物车等核心功能。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia'],
    link: '/ecommerce',
  },
  'demo-mobile': {
    id: 'demo-mobile', title: 'FitTrack 健康 App',
    category: 'Demo 项目 · 仅供技术展示',
    description: '移动健康追踪应用落地页 Demo，展示 App 下载页面的技术与设计。',
    tech: ['React Native', 'TypeScript', 'Firebase'],
    link: '/mobile-app',
  },
}
