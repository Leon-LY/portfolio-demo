# Leon · 独立全栈开发者 — 个人作品集

> 从数据大屏到企业级应用，交付可靠的技术方案。

**[在线预览](http://49.232.49.175)** · **[后台管理](http://49.232.49.175/admin)**

---

## 技术栈

React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide Icons · Vite 8

## 项目内容

### 真实项目（6个）
智慧社区平台 · 荣成市城市大脑 · 远见 FarSight · 方外设计 · 经济综合运行平台 · 河湖湾长制

### Demo 模板（8个）
营销网站 · SaaS 产品 · 电商平台 · 移动 App · 企业官网 · 监控大屏 · API 文档 · 后台管理

## 本地运行

```bash
npm install
npm run dev        # http://localhost:5173
```

## 构建部署

```bash
npm run build      # 输出到 dist/
```

部署到 Nginx 静态服务器，配置 SPA fallback：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 后台管理

访问 `/admin` 可编辑网站全部内容：个人信息、服务方向、项目详情、合作流程、FAQ 等。数据保存在浏览器 localStorage。

## 项目结构

```
src/
├── components/    # 通用组件（导航、页脚、动画、计数器等）
├── pages/         # 页面组件（首页、项目详情、8个Demo、后台管理、404）
├── data/          # 数据层（config.ts 配置 + projects.ts 项目 + adminStore.ts 管理）
└── index.css      # 全局样式 + 动画网格背景
```

## License

MIT · 仅供技术展示
