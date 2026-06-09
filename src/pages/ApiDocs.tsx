import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Key, Shield, Zap, Play, ChevronDown, ChevronRight, Server } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const groups = [
  { name:'项目', endpoints:[
    { method:'GET', path:'/v1/projects', desc:'获取项目列表', params:'?page=1&limit=20&status=active', resp:'{ "items": [...], "total": 42, "page": 1 }' },
    { method:'POST', path:'/v1/projects', desc:'创建新项目', params:'Body: { "name": "...", "type": "web" }', resp:'{ "id": "proj_abc123", "name": "...", "createdAt": "2024-..." }' },
    { method:'GET', path:'/v1/projects/:id', desc:'获取项目详情', params:'Path: project ID', resp:'{ "id": "...", "name": "...", "settings": {...} }' },
  ]},
  { name:'分析', endpoints:[
    { method:'GET', path:'/v1/analytics/events', desc:'查询事件数据', params:'?from=2024-01-01&to=2024-01-31&event=page_view', resp:'{ "events": [...], "aggregations": {...} }' },
    { method:'POST', path:'/v1/analytics/report', desc:'生成分析报告', params:'Body: { "type": "weekly", "metrics": ["visitors","conversion"] }', resp:'{ "reportId": "rpt_xyz", "status": "generating" }' },
  ]},
  { name:'认证', endpoints:[
    { method:'POST', path:'/v1/auth/login', desc:'用户登录', params:'Body: { "email": "...", "password": "..." }', resp:'{ "token": "eyJ...", "expiresIn": 3600 }' },
    { method:'POST', path:'/v1/auth/refresh', desc:'刷新令牌', params:'Header: Authorization: Bearer <refresh_token>', resp:'{ "token": "eyJ...", "expiresIn": 3600 }' },
  ]},
]

const methodColors: Record<string,string> = { GET:'text-emerald-400 bg-emerald-400/10', POST:'text-blue-400 bg-blue-400/10', PUT:'text-amber-400 bg-amber-400/10', DELETE:'text-red-400 bg-red-400/10' }

const codeTemplates: Record<string, Record<string,string>> = {
  'GET /v1/projects': {
    curl: 'curl -X GET "https://api.example.com/v1/projects?page=1&limit=20" \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    js: 'const res = await fetch("/v1/projects?page=1&limit=20", {\n  headers: { Authorization: "Bearer YOUR_API_KEY" }\n})\nconst data = await res.json()',
    python: 'import requests\nr = requests.get(\n  "https://api.example.com/v1/projects",\n  headers={"Authorization": "Bearer YOUR_API_KEY"},\n  params={"page": 1, "limit": 20}\n)\ndata = r.json()',
  },
  'POST /v1/projects': {
    curl: 'curl -X POST "https://api.example.com/v1/projects" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"My Project","type":"web"}\'',
    js: 'const res = await fetch("/v1/projects", {\n  method: "POST",\n  headers: { Authorization: "Bearer YOUR_API_KEY", "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "My Project", type: "web" })\n})',
    python: 'r = requests.post(\n  "https://api.example.com/v1/projects",\n  headers={"Authorization": "Bearer YOUR_API_KEY"},\n  json={"name": "My Project", "type": "web"}\n)',
  },
}

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState('GET /v1/projects')
  const [activeLang, setActiveLang] = useState<'curl'|'js'|'python'>('curl')
  const [copied, setCopied] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['项目'])
  const [consoleInput, setConsoleInput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState('')

  const toggleGroup = (g:string) => setExpandedGroups(s=>s.includes(g)?s.filter(x=>x!==g):[...s,g])
  const copyCode = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  const ep = groups.flatMap(g=>g.endpoints).find(e=>`${e.method} ${e.path}`===activeEndpoint)!
  const code = codeTemplates[activeEndpoint]?.[activeLang] || `// ${activeEndpoint} 代码示例`

  const tryApi = () => {
    setConsoleOutput(JSON.stringify({ status:200, data:{ id:'proj_demo', name:'示例项目', createdAt:new Date().toISOString() } },null,2))
  }

  return (
    <PageTransition>
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — API 参考文档：多语言代码示例、可展开分组导航、交互式控制台、Schema 定义。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">API 参考文档</h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
            <span className="px-1.5 py-0.5 bg-emerald-400/10 text-emerald-400 rounded text-[10px] font-medium">v1.0</span>
            Base URL: https://api.example.com
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {groups.map(group=>(
              <div key={group.name}>
                <button onClick={()=>toggleGroup(group.name)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 hover:text-white transition-colors w-full text-left">
                  {expandedGroups.includes(group.name)?<ChevronDown size={12}/>:<ChevronRight size={12}/>}{group.name}
                </button>
                <AnimatePresence>
                  {expandedGroups.includes(group.name)&&(
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden space-y-0.5">
                      {group.endpoints.map(ep=>{
                        const key=`${ep.method} ${ep.path}`;const active=key===activeEndpoint
                        return (
                          <button key={key} onClick={()=>setActiveEndpoint(key)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${active?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300'}`}>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${methodColors[ep.method]}`}>{ep.method}</span>
                            <span className="truncate">{ep.path.split('/').pop()}</span>
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.04] space-y-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">快速开始</p>
              {[{icon:Key,label:'获取 API Key',desc:'控制台生成'},{icon:Shield,label:'认证',desc:'Bearer JWT'},{icon:Zap,label:'速率限制',desc:'1000次/分钟'}].map(i=>(
                <div key={i.label} className="flex items-start gap-3"><i.icon size={14} className="text-slate-500 mt-0.5"/><div><p className="text-xs text-slate-300">{i.label}</p><p className="text-[10px] text-slate-600">{i.desc}</p></div></div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-5">
            {/* Endpoint detail */}
            <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${methodColors[ep.method]}`}>{ep.method}</span>
                <code className="text-sm text-white font-mono">{ep.path}</code>
                <span className="text-xs text-slate-500">{ep.desc}</span>
              </div>

              {/* Parameters */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">参数</p>
                <div className="bg-[#161b22] rounded-xl p-4 font-mono text-xs text-slate-300">{ep.params}</div>
              </div>

              {/* Response */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">响应</p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">200 OK</span>
                </div>
                <div className="bg-[#161b22] rounded-xl p-4 font-mono text-xs">
                  <pre className="text-slate-300 whitespace-pre-wrap">{ep.resp}</pre>
                </div>
              </div>
            </div>

            {/* Code examples */}
            <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
                <div className="flex gap-1">
                  {[{k:'curl' as const,l:'cURL'},{k:'js' as const,l:'JavaScript'},{k:'python' as const,l:'Python'}].map(lang=>(
                    <button key={lang.k} onClick={()=>setActiveLang(lang.k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeLang===lang.k?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300'}`}>{lang.l}</button>
                  ))}
                </div>
                <button onClick={copyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
                  {copied?<><Check size={12} className="text-emerald-400"/> 已复制</>:<><Copy size={12}/> 复制</>}
                </button>
              </div>
              <div className="p-5 bg-[#161b22]">
                <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">{code}</pre>
              </div>
            </div>

            {/* Interactive console */}
            <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
                <Play size={14} className="text-emerald-400"/>
                <span className="text-sm font-semibold text-white">交互式测试</span>
                <span className="text-[10px] text-slate-500">模拟 API 调用</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex gap-2">
                  <input value={consoleInput} onChange={e=>setConsoleInput(e.target.value)} placeholder='输入请求参数，如: { "name": "test" }'
                    className="flex-1 px-3 py-2 bg-[#161b22] border border-white/[0.08] rounded-lg text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"/>
                  <button onClick={tryApi} className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-all flex items-center gap-1.5"><Play size={12}/> 发送</button>
                </div>
                {consoleOutput&&(
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} className="bg-[#161b22] rounded-xl p-4 font-mono text-xs">
                    <pre className="text-emerald-400 whitespace-pre-wrap">{consoleOutput}</pre>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a><span className="text-slate-700">|</span>
            <a href="/dashboard" className="hover:text-white transition-colors">监控大屏</a>
            <a href="/admin-demo" className="hover:text-white transition-colors">后台管理</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：可折叠导航 · 多语言代码示例 · 交互式API控制台 · Schema定义</p>
        </div>
      </div>
    </PageTransition>
  )
}
