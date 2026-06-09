export interface Project {
  id: string; title: string; category: string; description: string
  tech: string[]; link: string; featured?: boolean; real?: boolean
}
export interface Skill { name: string; level: number }

export const personalInfo = {
  name: 'Leon',
  title: '全栈软件工程师',
  bio: '8 年全栈开发经验，深耕智慧城市、政务数字化领域。主导过荣成市多个核心系统建设——从大数据可视化大屏到智慧社区移动端，从省统一身份认证到政务服务平台。熟悉 Vue.js / React 生态，擅长将复杂的政府业务需求转化为稳定、高效的技术方案。',
  email: '554295000@qq.com',
}

export const skills: Skill[] = [
  { name: 'Vue.js / Nuxt', level: 96 },
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'Uni-app 跨平台', level: 92 },
  { name: 'ECharts / 可视化', level: 95 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'PostgreSQL / MySQL', level: 82 },
  { name: 'Docker / Nginx', level: 80 },
]

// 真实项目
export const realProjects: Project[] = [
  {
    id: 'smart-community',
    title: '智慧社区平台',
    category: '爱山东 · 移动端',
    description: '爱山东 App 内嵌 H5 应用，为居民提供社区公告、报修投诉、便民服务等功能。日均活跃用户 2 万+，覆盖荣成市全部社区。',
    tech: ['Vue 3', 'Vite', 'Pinia', 'Vant UI', 'Axios'],
    link: '/mobile-app',
    featured: true,
    real: true,
  },
  {
    id: 'bigscreen',
    title: '城市运行数据大屏',
    category: '数据可视化',
    description: '荣成市城市运行数据实时监控大屏，涵盖经济、民生、交通、环境等 20+ 数据维度，支持实时刷新和多屏联动，部署于城市指挥中心。',
    tech: ['Vue.js', 'ECharts', 'WebSocket', 'DataV', 'Node.js'],
    link: '/saas',
    featured: true,
    real: true,
  },
  {
    id: 'government-app',
    title: '政务服务移动平台',
    category: '移动端 · Uni-app',
    description: '基于 Uni-app 的跨平台政务应用，集成行政审批、办事指南、进度查询、电子证照等功能，对接省统一身份认证实现单点登录。',
    tech: ['Uni-app', 'Vue 2', 'Vant', 'SM-Crypto', 'OAuth 2.0'],
    link: '/mobile-app',
    featured: true,
    real: true,
  },
  {
    id: 'economy-platform',
    title: '智慧经济管理平台',
    category: '管理后台',
    description: '面向政府和企业的经济数据管理平台，涵盖企业画像、经济指标、产业链分析、招商管理等模块，支持多维度筛选和自定义报表。',
    tech: ['Vue.js', 'Element UI', 'ECharts', 'Axios', 'Python'],
    link: '/corporate',
    real: true,
  },
  {
    id: 'cloud-ui-lib',
    title: 'Cloud UI 组件库',
    category: '基础设施',
    description: '基于 Vue.js 2.x 的企业级 UI 组件库，封装表格、表单、图表、地图等 50+ 业务组件，服务荣成市 10+ 内部系统。',
    tech: ['Vue 2', 'TypeScript', 'Webpack', 'SCSS', 'Karma'],
    link: '/saas',
    real: true,
  },
  {
    id: 'identity-auth',
    title: '省统一身份认证对接',
    category: '安全 · 基础设施',
    description: '对接山东省统一身份认证平台，实现 OAuth 2.0 / OIDC 协议集成，为多个应用提供统一认证授权服务，日认证请求 5 万+。',
    tech: ['Node.js', 'OAuth 2.0', 'OIDC', 'SM2/SM4', 'Redis'],
    link: '/corporate',
    real: true,
  },
]

// Demo 模板项目
export const demoProjects: Project[] = [
  {
    id: 'demo-marketing',
    title: 'GrowthPulse 营销平台',
    category: 'Demo · 营销网站',
    description: '数字营销机构高转化品牌官网，集成案例展示、实时数据看板与在线预约系统，展示现代营销网站的技术实现。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    link: '/marketing',
    featured: true,
  },
  {
    id: 'demo-saas',
    title: 'CloudFlow 数据分析',
    category: 'Demo · SaaS 产品',
    description: 'AI 驱动的企业级数据分析平台 Demo，展示实时可视化、团队协作与权限管理系统。',
    tech: ['React', 'D3.js', 'WebSocket', 'Redis'],
    link: '/saas',
  },
  {
    id: 'demo-ecommerce',
    title: 'LuxeCart 精品电商',
    category: 'Demo · 电商平台',
    description: '高端时尚电商 Demo，展示 3D 商品预览、AI 推荐、购物车等电商核心功能。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia'],
    link: '/ecommerce',
  },
  {
    id: 'demo-corporate',
    title: 'Meridian 企业门户',
    category: 'Demo · 企业官网',
    description: '跨国集团企业官网 Demo，展示多语言、投资者关系、新闻中心等企业站典型模块。',
    tech: ['Vue.js', 'Nuxt', 'GraphQL', 'i18n'],
    link: '/corporate',
  },
]
