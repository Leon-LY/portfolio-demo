import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronRight, Key, Shield, Zap, Globe } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const endpoints = [
  { method: 'GET', path: '/api/v1/projects', desc: '获取项目列表', group: '项目' },
  { method: 'POST', path: '/api/v1/projects', desc: '创建新项目', group: '项目' },
  { method: 'GET', path: '/api/v1/projects/:id', desc: '获取项目详情', group: '项目' },
  { method: 'PUT', path: '/api/v1/projects/:id', desc: '更新项目信息', group: '项目' },
  { method: 'DELETE', path: '/api/v1/projects/:id', desc: '删除项目', group: '项目' },
  { method: 'GET', path: '/api/v1/analytics/events', desc: '查询事件数据', group: '分析' },
  { method: 'GET', path: '/api/v1/analytics/report', desc: '生成分析报告', group: '分析' },
  { method: 'POST', path: '/api/v1/auth/login', desc: '用户登录', group: '认证' },
  { method: 'POST', path: '/api/v1/auth/refresh', desc: '刷新令牌', group: '认证' },
]

const methodColors: Record<string, string> = { GET: 'text-emerald-400 bg-emerald-400/10', POST: 'text-blue-400 bg-blue-400/10', PUT: 'text-amber-400 bg-amber-400/10', DELETE: 'text-red-400 bg-red-400/10' }

const sampleCode = `// JavaScript 示例
const response = await fetch('/api/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
const data = await response.json()
console.log(data.items)`

const pythonCode = `# Python 示例
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
r = requests.get('https://api.example.com/v1/projects', headers=headers)
print(r.json())`

const curlCode = `# cURL 示例
curl -X GET https://api.example.com/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState(0)
  const [activeLang, setActiveLang] = useState<'js'|'python'|'curl'>('js')
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    const code = activeLang === 'js' ? sampleCode : activeLang === 'python' ? pythonCode : curlCode
    navigator.clipboard.writeText(code)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const endpoint = endpoints[activeEndpoint]

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — API 参考文档设计、多语言代码示例、交互式接口测试、深色代码主题。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">API 参考文档</h1>
          <p className="text-xs text-slate-500 mt-1">REST API v1.0 · Base URL: https://api.example.com</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="lg:col-span-1 space-y-6">
            {['项目', '分析', '认证'].map(group => (
              <div key={group}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{group}</p>
                <div className="space-y-0.5">
                  {endpoints.filter(e=>e.group===group).map((ep, i) => {
                    const globalIdx = endpoints.indexOf(ep)
                    return (
                      <button key={ep.path} onClick={()=>setActiveEndpoint(globalIdx)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${globalIdx===activeEndpoint?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300'}`}>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${methodColors[ep.method]}`}>{ep.method}</span>
                        <span className="truncate">{ep.path.split('/').pop()}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Auth quick links */}
            <div className="pt-4 border-t border-white/[0.04]">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">快速开始</p>
              <div className="space-y-2">
                {[
                  { icon: Key, label: '获取 API Key', desc: '在控制台生成访问密钥' },
                  { icon: Shield, label: '认证方式', desc: 'Bearer Token (JWT)' },
                  { icon: Zap, label: '速率限制', desc: '1000 次/分钟' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 p-2 rounded-lg">
                    <item.icon size={14} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-300">{item.label}</p>
                      <p className="text-[10px] text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-5">
            {/* Endpoint detail */}
            <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${methodColors[endpoint.method]}`}>{endpoint.method}</span>
                <code className="text-sm text-white font-mono">{endpoint.path}</code>
                <span className="text-xs text-slate-500">{endpoint.desc}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">请求头</p>
                  <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-xs space-y-1">
                    <div><span className="text-blue-400">Authorization</span><span className="text-slate-600">: </span><span className="text-emerald-400">Bearer YOUR_API_KEY</span></div>
                    <div><span className="text-blue-400">Content-Type</span><span className="text-slate-600">: </span><span className="text-emerald-400">application/json</span></div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">响应示例</p>
                  <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-xs leading-relaxed">
                    <div><span className="text-slate-600">{'{'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">"items"</span><span className="text-slate-600">: </span><span className="text-slate-600">[...],</span></div>
                    <div className="pl-4"><span className="text-blue-400">"total"</span><span className="text-slate-600">: </span><span className="text-amber-400">42</span><span className="text-slate-600">,</span></div>
                    <div className="pl-4"><span className="text-blue-400">"page"</span><span className="text-slate-600">: </span><span className="text-amber-400">1</span></div>
                    <div><span className="text-slate-600">{'}'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code examples */}
            <div className="bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex gap-1">
                  {[
                    { k: 'js' as const, l: 'JavaScript' },
                    { k: 'python' as const, l: 'Python' },
                    { k: 'curl' as const, l: 'cURL' },
                  ].map(lang => (
                    <button key={lang.k} onClick={()=>setActiveLang(lang.k)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeLang===lang.k?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300'}`}>{lang.l}</button>
                  ))}
                </div>
                <button onClick={copyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
                  {copied?<><Check size={12} className="text-emerald-400"/> 已复制</>:<><Copy size={12}/> 复制</>}
                </button>
              </div>
              <div className="p-6 bg-[#0d1117]">
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{activeLang === 'js' ? sampleCode : activeLang === 'python' ? pythonCode : curlCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a>
            <span className="text-slate-700">|</span>
            <span>探索其他：</span>
            <a href="/dashboard" className="hover:text-white transition-colors">监控大屏</a>
            <a href="/admin-demo" className="hover:text-white transition-colors">后台管理</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：API 文档设计 · 代码高亮 · 多语言示例 · 交互式导航</p>
        </div>
      </div>
    </PageTransition>
  )
}
