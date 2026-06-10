/**
 * Generate unified project placeholder SVGs
 * Template: 800×500, dark gradient, centered icon, project name, subtags
 * Run: node server/generate-placeholders.js
 * Output: public/projects/*.svg
 */

// Color scheme per category
const categories = {
  '数据可视化': { bg: ['#0f172a', '#1e1b4b'], accent: '#6366f1', icon: '📊' },
  '全栈应用':     { bg: ['#0f172a', '#1e293b'], accent: '#8b5cf6', icon: '🖥️' },
  '移动端':       { bg: ['#064e3b', '#0f172a'], accent: '#10b981', icon: '📱' },
  'AI 应用':      { bg: ['#0c1929', '#1a365d'], accent: '#06b6d4', icon: '🤖' },
}

const projects = [
  {
    id: 'bigscreen',
    name: '城市大脑',
    en: 'City Brain Dashboard',
    icon: '🖥️',
    category: '数据可视化',
    tags: ['Vue.js', 'ECharts', 'WebSocket'],
  },
  {
    id: 'economy-platform',
    name: '经济运行平台',
    en: 'Economy Data Platform',
    icon: '📈',
    category: '数据可视化',
    tags: ['SpringBoot', 'Redis', 'MySQL'],
  },
  {
    id: 'building',
    name: '方外设计',
    en: 'Fangwai Design Studio',
    icon: '🏗️',
    category: '全栈应用',
    tags: ['Nuxt 4', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'booking',
    name: '预约平台',
    en: 'Booking Platform',
    icon: '📅',
    category: '全栈应用',
    tags: ['Next.js', 'Prisma', 'NextAuth'],
  },
  {
    id: 'smart-community',
    name: '智慧社区',
    en: 'Smart Community',
    icon: '🏘️',
    category: '移动端',
    tags: ['Vue 3', 'Vant UI', 'Pinia'],
  },
  {
    id: 'river-chief',
    name: '河湖湾长制',
    en: 'River Chief System',
    icon: '🌊',
    category: '移动端',
    tags: ['Uni-app', 'GIS', 'Node.js'],
  },
  {
    id: 'invest-learn',
    name: '远见 FarSight',
    en: 'AI Investment Analysis',
    icon: '🔮',
    category: 'AI 应用',
    tags: ['FastAPI', 'DeepSeek', 'Docker'],
  },
]

function generateSVG(project) {
  const cat = categories[project.category]
  const [bgTop, bgBottom] = cat.bg

  // Build tech tag SVG elements
  const tagElems = project.tags.map((tag, i) => {
    const x = 290 + i * 80 - (project.tags.length - 1) * 40
    return `<rect x="${x - 35}" y="400" width="70" height="22" rx="6" fill="rgba(255,255,255,0.05)" stroke="${cat.accent}" stroke-width="0.5" stroke-opacity="0.3"/>
    <text x="${x}" y="415" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="10" font-family="sans-serif">${tag}</text>`
  }).join('\n    ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgTop}"/>
      <stop offset="100%" style="stop-color:${bgBottom}"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg)"/>

  <!-- Dot grid pattern -->
  <g opacity="0.03">
    ${Array.from({length: 15}, (_, y) =>
      Array.from({length: 20}, (_, x) =>
        `<circle cx="${20 + x * 40}" cy="${20 + y * 32}" r="1" fill="white"/>`
      ).join('')
    ).join('\n    ')}
  </g>

  <!-- Accent line at top -->
  <rect x="0" y="0" width="800" height="3" fill="${cat.accent}" opacity="0.3"/>

  <!-- Central icon area with glow -->
  <circle cx="400" cy="200" r="80" fill="${cat.accent}" opacity="0.06"/>
  <circle cx="400" cy="200" r="60" fill="${cat.accent}" opacity="0.04"/>
  <text x="400" y="215" text-anchor="middle" font-size="48" font-family="sans-serif">${project.icon}</text>

  <!-- Project name -->
  <text x="400" y="300" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="sans-serif" letter-spacing="4">${project.name}</text>

  <!-- English subtitle -->
  <text x="400" y="328" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="13" font-family="sans-serif" letter-spacing="2">${project.en}</text>

  <!-- Separator line -->
  <line x1="340" y1="350" x2="460" y2="350" stroke="${cat.accent}" stroke-width="1" opacity="0.3"/>

  <!-- Tech tags -->
  ${tagElems}

  <!-- Bottom corner accent -->
  <path d="M 750 500 L 800 450 L 800 500 Z" fill="${cat.accent}" opacity="0.1"/>
  <path d="M 0 500 L 50 500 L 0 450 Z" fill="${cat.accent}" opacity="0.05"/>
</svg>`
}

// Write SVGs
import { writeFileSync, mkdirSync } from 'fs'
import { existsSync } from 'fs'

const outDir = 'public/projects'
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

for (const p of projects) {
  const svg = generateSVG(p)
  writeFileSync(`${outDir}/${p.id}.svg`, svg, 'utf-8')
  console.log(`Generated ${p.id}.svg`)
}
console.log('Done — 7 SVGs generated')
