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
  level: number // 0-100
  icon: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export const personalInfo = {
  name: 'Alex Chen',
  title: '全栈软件工程师',
  tagline: '构建高性能、用户友好的数字产品',
  bio: '5年+全栈开发经验，专注于 React、Node.js 和云原生架构。曾为多家企业打造高转化率的营销网站和 SaaS 产品，擅长将复杂业务需求转化为简洁优雅的技术方案。',
  email: 'alex.chen@example.com',
  location: '上海，中国',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
}

export const skills: Skill[] = [
  { name: 'React / Next.js', level: 95, icon: '⚛️' },
  { name: 'TypeScript', level: 92, icon: '🔷' },
  { name: 'Node.js / Express', level: 88, icon: '🟢' },
  { name: 'Vue.js / Nuxt', level: 85, icon: '💚' },
  { name: 'Tailwind CSS', level: 95, icon: '🎨' },
  { name: 'PostgreSQL / MongoDB', level: 82, icon: '🗄️' },
  { name: 'Docker / Kubernetes', level: 78, icon: '🐳' },
  { name: 'React Native / Flutter', level: 80, icon: '📱' },
  { name: 'AWS / Cloudflare', level: 75, icon: '☁️' },
  { name: 'Figma / UI Design', level: 72, icon: '🎯' },
]

export const projects: Project[] = [
  {
    id: 'marketing-pro',
    title: 'GrowthPulse 营销平台',
    category: '营销网站',
    description: '为数字营销机构打造的品牌官网，集成案例展示、在线预约、实时数据看板，上线后客户转化率提升 40%。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    link: '/marketing',
    featured: true,
  },
  {
    id: 'saas-dash',
    title: 'CloudFlow SaaS 控制台',
    category: 'SaaS 产品',
    description: '企业级 SaaS 管理后台，包含数据可视化仪表盘、团队协作、权限管理，支持 10万+ 日活用户。',
    tech: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    link: '/saas',
    featured: true,
  },
  {
    id: 'ecommerce-lux',
    title: 'LuxeCart 精品电商',
    category: '电商平台',
    description: '高端时尚品牌电商网站，支持 3D 商品预览、AI 推荐、一键结账，移动端转化率行业领先。',
    tech: ['React', 'Node.js', 'Stripe', 'Algolia', 'AWS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    link: '/ecommerce',
    featured: true,
  },
  {
    id: 'app-fitness',
    title: 'FitTrack 健康 App',
    category: '移动应用',
    description: '移动健康追踪应用落地页，展示 AI 运动分析、饮食追踪、社区挑战等核心功能。',
    tech: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&h=400&fit=crop',
    link: '/mobile-app',
    featured: false,
  },
  {
    id: 'corp-portal',
    title: 'Meridian 企业门户',
    category: '企业官网',
    description: '跨国企业集团官网，多语言支持、投资者关系、新闻中心，服务全球 30+ 国家用户。',
    tech: ['Vue.js', 'Nuxt', 'GraphQL', 'i18n', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    link: '/corporate',
    featured: false,
  },
  {
    id: 'analytics-tool',
    title: 'MetricVision 数据分析',
    category: '数据产品',
    description: '实时业务数据分析工具，自定义报表生成器，支持团队协作和数据导出。',
    tech: ['React', 'Python', 'FastAPI', 'ClickHouse', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    link: '/saas',
    featured: false,
  },
]
