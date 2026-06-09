export interface ServiceItem {
  icon: string
  title: string
  description: string
  stats: { label: string; value: string }
}

export interface CaseStudy {
  client: string
  industry: string
  challenge: string
  solution: string
  results: { metric: string; before: string; after: string; improvement: string }[]
  image: string
  logo: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export const services: ServiceItem[] = [
  {
    icon: '📊',
    title: '数字营销策略',
    description: '数据驱动的全渠道营销方案，从品牌定位到转化优化，为客户制定可量化的增长路径。',
    stats: { label: '平均 ROI 提升', value: '320%' },
  },
  {
    icon: '🔍',
    title: 'SEO & SEM 优化',
    description: '深度关键词研究、技术 SEO 审计、高质量内容策略，让您的品牌在搜索引擎中脱颖而出。',
    stats: { label: '自然流量增长', value: '180%' },
  },
  {
    icon: '📱',
    title: '社交媒体运营',
    description: '跨平台社媒内容策划与投放，精准定向目标受众，打造有影响力的品牌社交形象。',
    stats: { label: '粉丝增长', value: '250%' },
  },
  {
    icon: '📝',
    title: '内容营销',
    description: '高质量原创内容创作，包括博客、视频、白皮书，建立行业权威地位并持续获取潜在客户。',
    stats: { label: '线索转化率', value: '4.8%' },
  },
  {
    icon: '📧',
    title: '邮件营销自动化',
    description: '智能邮件营销系统，基于用户行为自动触发个性化邮件序列，提升客户生命周期价值。',
    stats: { label: '邮件打开率', value: '35%' },
  },
  {
    icon: '📈',
    title: '转化率优化 (CRO)',
    description: 'A/B 测试、用户行为分析、着陆页优化，系统性地提升网站访客到付费客户的转化率。',
    stats: { label: '转化率提升', value: '65%' },
  },
]

export const caseStudies: CaseStudy[] = [
  {
    client: 'EcoLiving 家居品牌',
    industry: '家居装饰',
    challenge: '线上销售渠道薄弱，品牌知名度低，月销售额增长停滞在 ¥50万 左右。',
    solution: '重新设计品牌视觉体系，建立全渠道营销矩阵，结合 KOL 种草 + 直播带货 + 私域社群运营。',
    results: [
      { metric: '月销售额', before: '¥50万', after: '¥280万', improvement: '460%' },
      { metric: '官网流量', before: '3,000/月', after: '45,000/月', improvement: '1400%' },
      { metric: '客户复购率', before: '12%', after: '38%', improvement: '217%' },
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    logo: '🏡',
  },
  {
    client: 'TechVantage SaaS',
    industry: '科技/SaaS',
    challenge: '产品功能强大但市场认知度不足，获客成本高达 ¥800/用户，付费转化率仅 2.1%。',
    solution: '内容营销 + SEO 优化 + 精准 SEM 投放，建立行业垂直媒体矩阵，打造产品思想领导力。',
    results: [
      { metric: '获客成本', before: '¥800', after: '¥280', improvement: '-65%' },
      { metric: '付费转化率', before: '2.1%', after: '6.8%', improvement: '224%' },
      { metric: 'MRR', before: '¥15万', after: '¥78万', improvement: '420%' },
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    logo: '💻',
  },
  {
    client: 'FreshBite 餐饮连锁',
    industry: '餐饮服务',
    challenge: '线下门店客流量下降 30%，外卖平台抽佣高，品牌忠诚度低。',
    solution: '搭建自有小程序下单系统，LBS 精准投放 + 会员积分体系 + 社交媒体内容矩阵。',
    results: [
      { metric: '自有渠道订单', before: '0', after: '8,500单/月', improvement: '∞' },
      { metric: '会员数', before: '200', after: '15,000', improvement: '7400%' },
      { metric: '客户月度消费', before: '¥120', after: '¥380', improvement: '217%' },
    ],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    logo: '🍽️',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: '张明华',
    role: 'CEO',
    company: 'EcoLiving 家居',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: '与 Alex 合作是我们品牌数字化转型的转折点。他不仅提供了卓越的技术方案，更深入理解我们的业务需求，帮助我们在 6 个月内实现了 5 倍增长。',
    rating: 5,
  },
  {
    name: '李思雨',
    role: '市场总监',
    company: 'TechVantage',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: '非常专业的技术团队！从项目规划到落地执行，每一步都有清晰的时间线和交付标准。我们的获客成本降低了 65%，这是超出预期的成果。',
    rating: 5,
  },
  {
    name: '王建国',
    role: '创始人',
    company: 'FreshBite 餐饮',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'Alex 帮我们搭建了自有小程序和会员系统，彻底改变了我们对第三方平台的依赖。专业、高效、值得信赖。',
    rating: 5,
  },
]

export const stats = [
  { value: 150, suffix: '+', label: '服务客户' },
  { value: 480, suffix: '万', label: '总营收增长' },
  { value: 98, suffix: '%', label: '客户满意度' },
  { value: 12, suffix: '个', label: '覆盖行业' },
]
