export interface AppFeature {
  icon: string
  title: string
  description: string
  image: string
}

export interface AppScreenshot {
  id: string
  url: string
  alt: string
}

export interface UserStat {
  label: string
  value: string
  icon: string
}

export const appInfo = {
  name: 'FitTrack Pro',
  tagline: 'AI 驱动的私人健康管家',
  description: '通过先进的 AI 算法和可穿戴设备集成，FitTrack Pro 为您提供个性化的运动计划、营养建议和健康洞察。让每一次锻炼都更科学，每一天都更健康。',
  downloads: '500万+',
  rating: 4.9,
  ratingCount: '12.8万',
  awards: ['🏆 2024 最佳健康 App', '🥇 App Store 年度推荐', '⭐ Google Play 编辑精选'],
}

export const appFeatures: AppFeature[] = [
  {
    icon: '🧠',
    title: 'AI 运动分析',
    description: '通过手机摄像头实时分析运动姿态，精准计数并纠正动作，避免运动损伤，提升锻炼效果。',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=700&fit=crop',
  },
  {
    icon: '🍎',
    title: '智能营养追踪',
    description: '拍照识别食物，自动计算卡路里和营养成分。AI 根据你的目标推荐个性化饮食方案。',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=700&fit=crop',
  },
  {
    icon: '📊',
    title: '健康数据洞察',
    description: '整合 Apple Health、Google Fit 等设备数据，生成全面的健康报告和趋势分析。',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=700&fit=crop',
  },
  {
    icon: '🏆',
    title: '挑战与排行榜',
    description: '参与全球运动挑战，与好友竞赛。用游戏化机制让坚持运动变得有趣。',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=700&fit=crop',
  },
]

export const screenshots: AppScreenshot[] = [
  { id: 'ss1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=600&fit=crop', alt: '运动追踪首页' },
  { id: 'ss2', url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=600&fit=crop', alt: '营养分析页面' },
  { id: 'ss3', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=600&fit=crop', alt: '数据统计页面' },
  { id: 'ss4', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&h=600&fit=crop', alt: '挑战排行榜' },
  { id: 'ss5', url: 'https://images.unsplash.com/photo-1571019613455-1cb2f99b2d8b?w=300&h=600&fit=crop', alt: '训练计划页' },
]

export const userStats: UserStat[] = [
  { label: '全球下载量', value: '500万+', icon: '📥' },
  { label: '月活用户', value: '180万', icon: '👥' },
  { label: 'App Store 评分', value: '4.9 ★', icon: '⭐' },
  { label: '日均运动分钟', value: '42分钟', icon: '⏱️' },
]

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: '健身爱好者',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    content: '用 FitTrack 三个月，体脂率从 28% 降到了 22%。AI 动作分析太厉害了，纠正了我很多错误姿势！',
  },
  {
    name: 'Michael Chen',
    role: '马拉松跑者',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    content: '训练计划非常科学，帮我从零基础到完成全马，只用了 5 个月。营养追踪也让我吃得更健康。',
  },
  {
    name: 'Emma Williams',
    role: '瑜伽教练',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    content: '作为教练，我推荐所有学员使用 FitTrack。数据追踪精准，社区氛围很好，让人更容易坚持下去。',
  },
]
