export interface Project {
  id: string; title: string; category: string; description: string
  tech: string[]; image: string; link: string; featured?: boolean
}
export interface Skill { name: string; level: number }

export const personalInfo = {
  name: 'Leon',
  title: '全栈软件工程师',
  bio: '5 年全栈开发经验，专注 React / Node.js / 云原生架构。善于将复杂业务需求转化为快速、精致、可扩展的数字产品。主导过多个千万级流量项目，追求极致的性能与用户体验。',
  email: '554295000@qq.com',
}

export const skills: Skill[] = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Vue.js / Nuxt', level: 85 },
  { name: 'Tailwind CSS', level: 96 },
  { name: 'PostgreSQL / Redis', level: 84 },
  { name: 'Docker / K8s', level: 78 },
  { name: 'React Native / Flutter', level: 82 },
]

export const projects: Project[] = [
  {
    id: 'mkt', title: 'GrowthPulse 营销平台', category: '营销网站',
    description: '数字营销机构品牌官网，集成案例展示、实时数据看板与在线预约。上线后客户自然流量增长 180%，转化率提升 40%。',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
    link: '/marketing', featured: true,
  },
  {
    id: 'saas', title: 'CloudFlow 数据平台', category: 'SaaS 产品',
    description: '企业级实时数据分析平台，AI 驱动洞察，日活 10 万+，查询响应 < 100ms。',
    tech: ['React', 'D3.js', 'WebSocket', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
    link: '/saas', featured: true,
  },
  {
    id: 'ec', title: 'LuxeCart 精品电商', category: '电商平台',
    description: '高端时尚电商，3D 商品预览 + AI 推荐 + 一键结账，月销突破 280 万。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia', 'AWS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&q=80',
    link: '/ecommerce', featured: true,
  },
  {
    id: 'app', title: 'FitTrack 健康 App', category: '移动应用',
    description: 'AI 运动追踪应用，实时姿态分析 + 营养识别，App Store 年度推荐，500 万+ 下载。',
    tech: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&h=500&fit=crop&q=80',
    link: '/mobile-app',
  },
  {
    id: 'corp', title: 'Meridian 企业门户', category: '企业官网',
    description: '跨国集团官网，多语言 + 投资者关系 + 新闻中心，覆盖全球 30+ 国家。',
    tech: ['Vue.js', 'Nuxt', 'GraphQL', 'i18n', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&q=80',
    link: '/corporate',
  },
]
