export interface SaaSFeature {
  icon: string
  title: string
  description: string
  details: string[]
}

export interface PricingPlan {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface FAQ {
  question: string
  answer: string
}

export const saasFeatures: SaaSFeature[] = [
  {
    icon: '📊',
    title: '智能数据分析',
    description: 'AI 驱动的数据分析引擎，自动发现趋势、异常和增长机会。',
    details: ['实时数据可视化', '自定义报表生成器', '多维度交叉分析', '智能预警系统'],
  },
  {
    icon: '🤖',
    title: '自动化工作流',
    description: '可视化的工作流编辑器，让复杂业务流程自动化运行。',
    details: ['拖拽式流程设计', '条件触发规则', '多步骤编排', '第三方集成'],
  },
  {
    icon: '👥',
    title: '团队协作',
    description: '内置即时通讯、文档协作和项目管理，让团队高效协同。',
    details: ['实时协同编辑', '权限精细管理', '活动日志追踪', '@提及通知'],
  },
  {
    icon: '🔒',
    title: '企业级安全',
    description: 'SOC 2 Type II 认证，端到端加密，确保数据安全无忧。',
    details: ['SSO 单点登录', '数据加密存储', '审计日志', 'GDPR 合规'],
  },
  {
    icon: '🔗',
    title: '开放 API',
    description: '丰富的 RESTful API 和 Webhook，无缝集成现有技术栈。',
    details: ['REST & GraphQL', 'Webhook 推送', 'SDK 多语言支持', 'API 密钥管理'],
  },
  {
    icon: '📱',
    title: '跨平台支持',
    description: 'Web、iOS、Android 全平台覆盖，随时随地访问。',
    details: ['响应式 Web 端', '原生移动 App', '离线模式', '多设备同步'],
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    name: '入门版',
    price: 99,
    period: '/月',
    description: '适合小型团队快速启动',
    features: [
      '最多 5 名团队成员',
      '10GB 存储空间',
      '基础数据分析',
      '邮件支持',
      'API 访问（1000次/天）',
      '标准安全功能',
    ],
    cta: '免费试用',
  },
  {
    name: '专业版',
    price: 299,
    period: '/月',
    description: '适合成长型企业的完整方案',
    features: [
      '最多 50 名团队成员',
      '100GB 存储空间',
      '高级 AI 分析',
      '优先客服支持',
      'API 访问（10000次/天）',
      '自动化工作流',
      '自定义品牌',
      '高级安全功能',
    ],
    highlighted: true,
    cta: '开始试用',
  },
  {
    name: '企业版',
    price: 999,
    period: '/月',
    description: '适合大型组织的定制方案',
    features: [
      '无限团队成员',
      '1TB 存储空间',
      '全部 AI 功能',
      '专属客户经理',
      '无限 API 访问',
      '高级自动化',
      '白标解决方案',
      'SLA 99.9% 保障',
      '私有部署选项',
      '定制集成开发',
    ],
    cta: '联系销售',
  },
]

export const faqs: FAQ[] = [
  {
    question: 'CloudFlow 如何保障数据安全？',
    answer: '我们采用 AES-256 加密存储、TLS 1.3 传输加密、SOC 2 Type II 认证的数据中心，以及定期的第三方安全审计。所有客户数据均经过多层安全防护，确保万无一失。',
  },
  {
    question: '是否支持数据迁移？',
    answer: '是的，我们提供免费的数据迁移服务。支持从 Excel、Google Sheets、Salesforce、HubSpot 等主流平台一键导入。对于复杂迁移需求，我们的技术支持团队会全程协助。',
  },
  {
    question: '可以定制功能吗？',
    answer: '企业版支持深度定制，包括自定义字段、工作流、报表和品牌。我们也提供 API 和 Webhook，方便与您的现有系统集成。专业版支持部分自定义功能。',
  },
  {
    question: '提供哪些支付方式？',
    answer: '支持信用卡（Visa、Mastercard、AmEx）、PayPal、银行转账（企业版）。所有方案均支持月付和年付，年付可享受 20% 折扣。',
  },
  {
    question: '有免费试用期吗？',
    answer: '所有方案均提供 14 天免费试用，无需绑定信用卡。试用期间可体验全部功能，到期后可选择升级到付费方案或导出数据。',
  },
]

export const dashboardStats = [
  { label: '总用户数', value: 128456, suffix: '人', change: '+12.5%' },
  { label: '月活用户', value: 45280, suffix: '人', change: '+8.3%' },
  { label: '日处理数据', value: 3.2, suffix: 'TB', change: '+22.1%' },
  { label: '系统正常运行', value: 99.99, suffix: '%', change: '稳定' },
]
