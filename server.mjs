/**
 * 作品集后台 API 服务
 * 运行方式: node server.mjs
 * 端口: 3002
 * 数据文件: /var/www/portfolio/data.json
 */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const PORT = 3002
const DATA_FILE = path.join(import.meta.dirname, 'data.json')

// 确保数据文件存在
function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaults = {
      personalInfo: {
        name: 'Leon',
        tagline: '独立全栈开发者',
        subtitle: 'Web 全栈 / 数据可视化 / 系统架构',
        heroTitle: '从数据大屏到企业级应用，交付可靠的技术方案。',
        heroBio: '10 年全栈开发经验，主导过城市大脑、智慧社区等规模化项目。',
        heroCredibility: '曾服务：荣成市大数据中心 · 荣成市交通运输局 · 中国广电山东网络有限公司',
        email: '554295000@qq.com',
        phone: '18389118642',
      },
      services: [
        { title: '全栈应用开发', desc: '企业官网、后台管理系统、API 服务' },
        { title: '数据可视化', desc: 'ECharts / DataV / WebSocket 实时推送' },
        { title: '移动端与跨平台', desc: 'H5 应用、微信小程序' },
        { title: 'AI 集成与系统架构', desc: 'DeepSeek + 通义千问落地经验' },
      ],
      heroStats: [
        { value: '10+', label: '年经验' },
        { value: '30+', label: '交付项目' },
      ],
      workflowSteps: [
        { step: '01', title: '需求沟通', desc: '' },
        { step: '02', title: '方案设计', desc: '' },
      ],
      clients: ['示例单位'],
      faqItems: [{ q: '示例问题', a: '示例回答' }],
      projects: {},
      projectGroups: [],
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2), 'utf-8')
  }
}

ensureDataFile()

// CORS + JSON 响应
function sendJSON(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.method === 'GET' && req.url === '/api/admin-data') {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      sendJSON(res, JSON.parse(raw))
    } catch {
      sendJSON(res, { error: 'Failed to read data' }, 500)
    }
    return
  }

  if (req.method === 'PUT' && req.url === '/api/admin-data') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
        sendJSON(res, { ok: true })
      } catch (e) {
        sendJSON(res, { error: 'Invalid JSON' }, 400)
      }
    })
    return
  }

  sendJSON(res, { error: 'Not found' }, 404)
})

server.listen(PORT, () => {
  console.log(`Admin API running on port ${PORT}`)
})
