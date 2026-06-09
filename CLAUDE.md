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
| **动画** | Framer Motion |
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
├── App.tsx                    # 路由配置
├── main.tsx                   # 入口
├── index.css                  # Tailwind + 全局样式 + 动画网格背景
├── components/
│   ├── Layout.tsx             # 全局布局（导航 + 页脚 + ScrollToTop）
│   ├── Navbar.tsx             # 响应式导航栏
│   ├── Footer.tsx             # 页脚
│   ├── ScrollReveal.tsx       # 滚动入场动画
│   ├── PageTransition.tsx     # 页面切换过渡
│   ├── Counter.tsx            # 数字滚动计数器
│   ├── TypewriterText.tsx     # 打字机效果
│   ├── PlaceholderImage.tsx   # Demo 页占位图组件
│   └── ...
├── pages/
│   ├── Home.tsx               # 首页（Hero + 服务 + 项目 + 流程 + FAQ + CTA）
│   ├── ProjectDetail.tsx      # 项目详情页（轮播 + 概述 + 能力 + 技术方案）
│   ├── Admin.tsx              # 后台管理 CMS（/admin）
│   ├── NotFound.tsx           # 404 页面
│   ├── Dashboard.tsx          # Demo: 监控大屏
│   ├── ApiDocs.tsx            # Demo: API 文档
│   ├── AdminDemo.tsx          # Demo: 后台管理系统
│   ├── Marketing.tsx          # Demo: 营销网站
│   ├── SaaS.tsx               # Demo: SaaS 产品
│   ├── Ecommerce.tsx          # Demo: 电商平台
│   ├── MobileApp.tsx          # Demo: 移动 App
│   └── Corporate.tsx          # Demo: 企业官网
├── data/
│   ├── config.ts              # 个人信息、服务、统计、流程、FAQ（可编辑）
│   ├── projects.ts            # 项目数据（真实项目 + Demo 模板）
│   └── adminStore.ts          # 后台管理数据层（localStorage 持久化）
└── ...
public/projects/               # 项目截图（SVG 占位图 + 用户上传的实际截图）
```

---

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
| `/project/:id` | ProjectDetail | 项目详情（图片轮播 + 概述 + 能力） |
| `/admin` | Admin | 后台管理 CMS |
| `/marketing` | Demo | 营销网站 |
| `/saas` | Demo | SaaS 产品 |
| `/ecommerce` | Demo | 电商平台 |
| `/mobile-app` | Demo | 移动 App |
| `/corporate` | Demo | 企业官网 |
| `/dashboard` | Demo | 实时监控大屏 |
| `/api-docs` | Demo | API 开发者门户 |
| `/admin-demo` | Demo | 后台管理系统 |
| `*` | 404 | 页面未找到 |

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
| 粒子网络 | Canvas + requestAnimationFrame | Hero 背景 |
| 光标辉光 | rAF + DOM 直接操作 | Hero 背景 |
| 终端打字 | 逐字符输出 + 随机延迟 | Hero 右栏 |
| 图片视差 | `useScroll` + `useTransform` | 项目卡片 |
| 3D 倾斜 | `useMotionValue` + spring | 项目卡片 |
| 数字滚动 | `useSpring` + `useTransform` | 统计数字 |
| 网格渐变背景 | CSS `background-position` 动画 | 全站 body |
| 交错入场 | Framer Motion stagger | 卡片列表 |

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
