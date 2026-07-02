# CLAUDE.md — Leon 个人作品集

> 独立全栈开发者 · 数据可视化 · 企业级应用 · 系统架构

---

## 项目概述

| 属性 | 值 |
|------|-----|
| **项目名称** | Leon Portfolio |
| **类型** | 静态 SPA（React + Vite） |
| **线上地址** | http://49.232.49.175 |
| **后台管理** | http://49.232.49.175/admin |
| **GitHub** | https://github.com/Leon-LY/portfolio-demo |
| **部署方式** | Nginx 静态托管，`scp dist/* → /var/www/portfolio/dist/` |

---

## 技术栈

| 层 | 技术 |
|------|------|
| **框架** | React 19 + TypeScript |
| **构建** | Vite 8 |
| **样式** | Tailwind CSS 3 (PostCSS) |
| **动画** | Framer Motion + GSAP ScrollTrigger |
| **物理** | Matter.js 0.20 (Hero 方块系统) |
| **图标** | Lucide React |
| **路由** | React Router v7 |
| **部署** | Nginx on Ubuntu (49.232.49.175) |

---

## 常用命令

```bash
npm run dev          # 本地开发 (localhost:5173)
npm run build        # 构建生产版本 → dist/
npx vite preview     # 预览生产构建
```

### 部署流程

```bash
# 1. 构建 + 部署 + 推送（一键）
npm run build && \
scp -r dist/* root@49.232.49.175:/var/www/portfolio/dist/ && \
git add -A && git commit -m "..." && git push
```

---

## 项目结构

```
src/
├── App.tsx                    # 路由配置 + 滚动置顶
├── main.tsx                   # 入口（scrollRestoration=manual）
├── index.css                  # Tailwind + CSS变量 + 卡片系统 + 动画
├── components/
│   ├── Layout.tsx             # 全局布局（导航 + 页脚）
│   ├── Navbar.tsx             # 响应式导航栏（毛玻璃 + VT323像素字）
│   ├── Footer.tsx             # 页脚
│   ├── ScrollReveal.tsx       # 滚动入场动画（y:60, 视口6%触发）
│   ├── PageTransition.tsx     # 页面切换过渡
│   ├── Counter.tsx            # 数字滚动计数器
│   ├── ErrorBoundary.tsx      # React 错误边界
│   ├── effects/
│   │   ├── PhysicsHero.tsx    # Matter.js物理方块Canvas（220桌面/100移动）
│   │   ├── SplashScreen.tsx   # 启动画面
│   │   ├── TerminalEasterEgg.tsx  # Ctrl+K 终端彩蛋
│   │   ├── TiltCard3D.tsx     # 3D倾斜卡片
│   │   ├── TypewriterText.tsx # 打字机效果
│   │   ├── GlowCard.tsx       # 发光卡片
│   │   ├── ParticleField.tsx  # 粒子场（备用）
│   │   └── NoiseOverlay.tsx   # 噪点覆盖层
│   ├── sections/
│   │   └── Credibility.tsx    # 关键指标（GSAP ScrollTrigger pin + 柱状图）
│   └── ui/
│       ├── Lightbox.tsx       # 图片灯箱
│       └── BeforeAfter.tsx    # 前后对比滑块
├── pages/
│   ├── Home.tsx               # 首页（9个section + 物理方块 + 滚动揭示）
│   ├── ProjectDetail.tsx      # 项目详情页
│   ├── Admin.tsx              # 后台管理 CMS（/admin）
│   ├── About.tsx              # 关于页
│   ├── Contact.tsx            # 联系页
│   ├── NotFound.tsx           # 404
│   └── [Demo].tsx             # Demo页面（Dashboard/ApiDocs/AdminDemo等）
├── data/
│   ├── config.ts              # 个人信息、服务、流程、FAQ、客户（可编辑）
│   ├── projects.ts            # 7个真实项目 + 项目分组
│   ├── usePortfolioData.ts    # 统一数据Hook（API→localStorage→默认）
│   ├── adminStore.ts          # 后台管理数据层
│   └── auth.ts                # 后台认证
└── ...
public/uploads/portfolio/       # 项目截图
```

---

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页（9个section：Hero→服务→指标→档案→流程→客户→技术→FAQ→CTA） |
| `/project/:id` | ProjectDetail | 项目详情（图片轮播 + 概述 + 能力 + 技术方案） |
| `/about` | About | 关于页 |
| `/contact` | Contact | 联系页 |
| `/admin` | Admin | 后台管理 CMS |
| `/dashboard` | Demo | 实时监控大屏 |
| `/api-docs` | Demo | API 开发者门户 |
| `/admin-demo` | Demo | 后台管理系统 |
| `/marketing` | Demo | 营销网站 |
| `/saas` | Demo | SaaS 产品 |
| `/ecommerce` | Demo | 电商平台 |
| `/mobile-app` | Demo | 移动 App |
| `/corporate` | Demo | 企业官网 |
| `*` | 404 | 页面未找到 |

## 设计系统

- **暗色科技主题**：底色 `#02030A`，五色强调（cyan/pink/purple/blue/gold）
- **像素字体**：VT323 用于导航、badge、编号、FAQ问题、流程标题
- **正文字体**：Space Mono 等宽，行高 1.78
- **标题统一**：所有section使用 badge + 两行大字（白+彩色），`max-w-[90rem]` 统一容器
- **标题光晕**：双层 textShadow，彩色行匹配badge颜色
- **圆角统一**：`var(--radius-lg)` = 16px 全局统一
- **暖色点缀**：body背景含金色径向光晕，卡片hover混入金色

---

## 后台管理（/admin）

在浏览器中直接编辑网站内容，数据保存在 `localStorage`。

| 标签页 | 可编辑内容 |
|--------|-----------|
| 个人信息 | 姓名、标签语、邮箱、电话、简介 |
| Hero 区域 | 主标题、简介、信任背书、统计数字、打字机文字 |
| 服务方向 | 4 个服务卡片（增删改） |
| 项目管理 | 项目详情 + 图片上传（增删改） |
| 合作流程 | 4 个步骤的编号、标题、描述 |
| 服务单位 | 单位名称列表（增删改） |
| FAQ | 问答对（增删改） |
| 联系方式 | 电话、邮箱 |

修改后点「保存」，导出备份可下载 JSON 文件。

---

## 动画系统

| 效果 | 实现 | 位置 |
|------|------|------|
| **物理方块** | Matter.js Engine + Canvas 2D渲染，动态section拦截体，独立闪烁 | PhysicsHero.tsx (portal to body, z-index:0) |
| **滚动入场** | Framer Motion `whileInView`，视口6%触发，y:60→0, dur:0.85s | ScrollReveal.tsx |
| **FAQ级联揭示** | `useScroll` + `useTransform`，逐项映射滚动进度→透明度 | Home.tsx → FaqRevealGrid |
| **关键指标** | GSAP ScrollTrigger pin + scrub 柱状图动画 | Credibility.tsx |
| **3D倾斜** | `useMotionValue` + spring | TiltCard3D.tsx |
| **数字滚动** | `useSpring` + `useTransform` | Counter.tsx |
| **打字机** | 逐字符输出 + 随机延迟 | TypewriterText.tsx |
| **标题光晕** | 双层textShadow（内光14-16px/0.40-0.50 + 外光48-56px/0.10-0.20） | 各section h2 |
| **Hero标题脉动** | CSS @keyframes text-glow-pulse (4s infinite) | index.css |
| **CRT扫描线** | Canvas fillRect 每6px一行 rgba(0,0,0,0.10) | PhysicsHero.tsx |
| **终端彩蛋** | Ctrl+K 触发全屏终端 | TerminalEasterEgg.tsx |
| **交错入场** | Framer Motion stagger delay | 卡片列表 |

## 卡片系统

5层卡片（`index.css`），统一毛玻璃质感：

| 层级 | 用途 | 特征 |
|------|------|------|
| `card-solid` | 常规卡片 | blur(20px), 内顶高光, hover上浮2px |
| `card-premium` | 重点卡片（FAQ等） | blur(32px), hover含金色暖光 |
| `card-glass` | 高透玻璃（CTA等） | blur(40px), 最通透 |
| `card-float` | 深度悬浮 | blur(48px), hover上浮4px |
| `card-glow` | 发光卡片（特色服务等） | blur(24px), hover青色光晕 |

## 物理方块系统

Matter.js 驱动的 Canvas 背景层（`PhysicsHero.tsx`）：

- **数量**：桌面220个 / 移动100个，上限320个
- **调色板**：cyan / pink / purple / blue / gold，各色不同maxAlpha
- **动态拦截体**：每个 `[data-section-physics]` section 创建2-5个随机薄片拦截体
- **FAQ特殊处理**：`isFaq` 检测 → 1-2个窄平台（14-24%宽度）
- **渐变蒙版**：Hero区域无蒙版 → 底部rgba(12,8,10,0.13) 微暖色调
- **自然沉降检测**：平均速度<0.05持续2秒后冻结，无硬性超时

---

## 数据编辑指南

### 更新个人信息/服务/流程/FAQ
编辑 `src/data/config.ts`，修改后 `npm run build`

### 更新项目数据
编辑 `src/data/projects.ts`，修改后 `npm run build`

### 添加项目截图
放到 `public/projects/` 目录，在 `projects.ts` 中配置 `images` 数组

### 通过后台管理编辑
访问 `/admin`，在浏览器中直接修改，点保存。数据在浏览器 localStorage 中，切换浏览器需重新配置或导入备份。
