export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
  avatar: string
  bio: string
}

export interface Partner {
  name: string
  logo: string
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

export const companyInfo = {
  name: 'Meridian Group',
  tagline: '连接世界，创造价值',
  description: 'Meridian Group 成立于 1998 年，是一家全球化的综合产业集团，业务涵盖科技、地产、金融和新能源四大板块，业务遍及全球 30 多个国家和地区。',
  founded: '1998',
  employees: '35,000+',
  revenue: '¥860亿',
  offices: '30+',
}

export const timeline: TimelineEvent[] = [
  {
    year: '1998',
    title: '扬帆起航',
    description: 'Meridian 在上海成立，初始团队 12 人，主营国际贸易咨询业务。',
  },
  {
    year: '2003',
    title: '业务拓展',
    description: '进军房地产领域，完成首个商业综合体项目，当年营收突破 ¥5 亿。',
  },
  {
    year: '2008',
    title: '科技转型',
    description: '成立科技事业部，投资建设首个数据中心，开启数字化转型之路。',
  },
  {
    year: '2012',
    title: '国际化布局',
    description: '在新加坡、伦敦、纽约设立海外总部，业务拓展至 15 个国家。',
  },
  {
    year: '2016',
    title: '新能源布局',
    description: '成立新能源子公司，投资光伏和储能技术，年发电量达 2GW。',
  },
  {
    year: '2020',
    title: '科技创新',
    description: '成立 AI 研究院，发布自研大语言模型，推动集团全面智能化升级。',
  },
  {
    year: '2024',
    title: '可持续发展',
    description: '发布碳中和路线图，承诺 2035 年实现全面碳中和，引领绿色转型。',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: '陈志远',
    role: '创始人 & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: '复旦大学经济学博士，25 年企业管理经验，曾获"中国年度经济人物"。',
  },
  {
    name: '林美华',
    role: '首席运营官',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: '哈佛商学院 MBA，前麦肯锡合伙人，擅长跨国企业战略规划与运营管理。',
  },
  {
    name: 'Robert Zhang',
    role: '首席技术官',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'MIT 计算机博士，前 Google AI 研究员，机器学习与分布式系统专家。',
  },
  {
    name: 'Sarah Liu',
    role: '首席财务官',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: '清华经管学院毕业，CPA/CFA 持证人，15 年跨国企业财务管理经验。',
  },
]

export const partners: Partner[] = [
  { name: 'TechGlobal', logo: '🔷' },
  { name: 'GreenEnergy', logo: '🌿' },
  { name: 'FinCore', logo: '💎' },
  { name: 'CloudBase', logo: '☁️' },
  { name: 'SafeGuard', logo: '🛡️' },
  { name: 'DataStream', logo: '📡' },
  { name: 'BuildRight', logo: '🏗️' },
  { name: 'InnovateLab', logo: '💡' },
]

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Meridian 发布 2024 年度可持续发展报告',
    excerpt: '报告显示，集团碳排放较 2020 年减少 28%，可再生能源使用占比达到 45%，获得 CDP 气候变化 A- 评级。',
    date: '2024-12-20',
    category: 'ESG',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=250&fit=crop',
  },
  {
    id: 'n2',
    title: '集团 AI 研究院在 NeurIPS 2024 发表 3 篇论文',
    excerpt: '三篇论文聚焦多模态理解、强化学习和高效推理，标志着 Meridian 在 AI 基础研究领域的持续突破。',
    date: '2024-12-15',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
  },
  {
    id: 'n3',
    title: 'Meridian 新能源签约东南亚最大光伏项目',
    excerpt: '项目总装机容量 500MW，预计年发电量 7.5 亿千瓦时，可为 50 万户家庭提供清洁能源。',
    date: '2024-11-28',
    category: '新能源',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
  },
]

export const values = [
  {
    title: '创新驱动',
    description: '持续投入研发，拥抱前沿技术，以创新引领行业发展。',
    icon: '💡',
  },
  {
    title: '诚信为本',
    description: '坚持透明经营，恪守商业道德，赢得客户与合作伙伴的信任。',
    icon: '🤝',
  },
  {
    title: '全球视野',
    description: '立足中国，放眼全球，构建跨文化、跨地域的协同优势。',
    icon: '🌍',
  },
  {
    title: '可持续发展',
    description: '践行 ESG 理念，推动绿色低碳转型，为社会创造长期价值。',
    icon: '🌱',
  },
]
