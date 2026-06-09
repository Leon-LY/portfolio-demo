export interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  link: string
  featured?: boolean
}

export interface Skill {
  name: string
  level: number
}

export const personalInfo = {
  name: 'Leon',
  title: '全栈软件工程师',
  tagline: '专注于构建高性能、用户体验优秀的 Web 产品。',
  bio: '5 年全栈开发经验，精通 React、Node.js 及云原生架构。善于将复杂的业务需求转化为快速、精致、可扩展的技术方案。曾主导多个高流量营销网站、SaaS 产品及移动端应用的架构设计与开发。',
  email: '554295000@qq.com',
  location: '中国',
}

export const skills: Skill[] = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Vue.js / Nuxt', level: 85 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'PostgreSQL / MongoDB', level: 82 },
  { name: 'Docker / Kubernetes', level: 78 },
  { name: 'React Native / Flutter', level: 80 },
]

export const projects: Project[] = [
  {
    id: 'marketing-pro',
    title: 'GrowthPulse 营销平台',
    category: '营销网站',
    description: '为数字营销机构打造的高转化品牌官网，集成案例展示、实时数据看板、在线预约系统。上线后客户转化率提升 40%，自然流量增长 180%。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
    link: '/marketing',
    featured: true,
  },
  {
    id: 'saas-dash',
    title: 'CloudFlow 数据平台',
    category: 'SaaS 产品',
    description: '企业级数据分析平台，支持实时可视化、团队协作与细粒度权限管理。日活用户 10 万+，查询响应低于 100ms。',
    tech: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
    link: '/saas',
    featured: true,
  },
  {
    id: 'ecommerce-lux',
    title: 'LuxeCart 精品电商',
    category: '电商平台',
    description: '高端时尚品牌电商网站，支持 3D 商品预览、AI 智能推荐、一键结账。移动端转化率行业领先，月销售额突破 280 万。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia', 'AWS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&q=80',
    link: '/ecommerce',
    featured: true,
  },
  {
    id: 'app-fitness',
    title: 'FitTrack 健康 App',
    category: '移动应用',
    description: 'AI 驱动的健康追踪应用，支持实时运动姿态分析、智能营养识别与游戏化挑战。App Store 年度推荐，全球下载量 500 万+。',
    tech: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&h=500&fit=crop&q=80',
    link: '/mobile-app',
    featured: false,
  },
  {
    id: 'corp-portal',
    title: 'Meridian 企业门户',
    category: '企业官网',
    description: '跨国企业集团官网，多语言支持、投资者关系、新闻中心。覆盖全球 30+ 国家用户，日均访问量 50 万+。',
    tech: ['Vue.js', 'Nuxt', 'GraphQL', 'i18n', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&q=80',
    link: '/corporate',
    featured: false,
  },
]
