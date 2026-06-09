export interface ProductImage {
  id: string
  url: string
  alt: string
  color: string
}

export interface ProductVariant {
  color: string
  colorCode: string
  sizes: string[]
  stock: number
}

export interface ProductReview {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
}

export interface RelatedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
}

export const product = {
  name: '极简都市双肩包',
  brand: 'URBAN EASE',
  price: 899,
  originalPrice: 1299,
  description: '采用环保防水面料与 YKK 金属拉链，内嵌 RFID 防盗层，支持 15.6 寸笔记本。极简设计，适合商务通勤与周末出行。',
  features: [
    '环保防水涂层面料',
    'YKK 金属拉链',
    'RFID 防盗内层',
    '15.6" 笔记本专用隔层',
    '人体工学肩带',
    'USB 充电接口',
  ],
  rating: 4.8,
  reviewCount: 2536,
  sales: 15820,
}

export const productImages: ProductImage[] = [
  {
    id: 'img1',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    alt: '深灰配色 - 正面',
    color: '深空灰',
  },
  {
    id: 'img2',
    url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop',
    alt: '深灰配色 - 侧面',
    color: '深空灰',
  },
  {
    id: 'img3',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    alt: '墨蓝配色 - 正面',
    color: '墨蓝色',
  },
  {
    id: 'img4',
    url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=600&fit=crop',
    alt: '墨蓝配色 - 侧面',
    color: '墨蓝色',
  },
]

export const variants: ProductVariant[] = [
  { color: '深空灰', colorCode: '#4a4a4a', sizes: ['S', 'M', 'L'], stock: 128 },
  { color: '墨蓝色', colorCode: '#1e3a5f', sizes: ['M', 'L'], stock: 85 },
  { color: '卡其棕', colorCode: '#8b7355', sizes: ['S', 'M', 'L', 'XL'], stock: 56 },
]

export const reviews: ProductReview[] = [
  {
    id: 'r1',
    user: '陈晓明',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    date: '2024-12-15',
    title: '质感超出预期，通勤必备',
    content: '背了一个月了，越用越喜欢。面料手感很好，防水效果实测靠谱（上周大雨完全没湿）。笔记本隔层加厚设计很安心，肩带也很舒服，背一天不累。',
    verified: true,
  },
  {
    id: 'r2',
    user: '林雨晴',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    date: '2024-12-10',
    title: '送给男朋友的礼物，他很喜欢',
    content: '包装很精致，深空灰颜色很百搭。男朋友说这是他收到过最实用的礼物，日常上班和短途出差都够用。RFID 层设计很贴心。',
    verified: true,
  },
  {
    id: 'r3',
    user: '张伟',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    rating: 4,
    date: '2024-12-05',
    title: '整体不错，希望增加更多配色',
    content: '做工精良，拉链顺滑，内部收纳分区合理。少一星是因为个人希望能有更多亮色选择（比如军绿色），现有三个颜色都偏商务。',
    verified: true,
  },
  {
    id: 'r4',
    user: '王思然',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    date: '2024-11-28',
    title: '三天短途旅行完全够用',
    content: '短途出差三天两夜的衣物+电脑+洗漱包全部装下。设计很巧妙，看着不大但超能装。背带透气性好，夏天也不会闷汗。',
    verified: true,
  },
]

export const relatedProducts: RelatedProduct[] = [
  {
    id: 'rp1',
    name: '都市机能腰包',
    price: 299,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 1823,
  },
  {
    id: 'rp2',
    name: '商务真皮手拿包',
    price: 459,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 956,
  },
  {
    id: 'rp3',
    name: '旅行收纳六件套',
    price: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 3201,
  },
  {
    id: 'rp4',
    name: '轻量运动腰包',
    price: 159,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=300&h=300&fit=crop',
    rating: 4.5,
    reviews: 2156,
  },
]
