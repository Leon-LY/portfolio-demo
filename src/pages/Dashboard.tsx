import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Server, Users, AlertTriangle, Cpu, HardDrive, Globe, Bell, Shield, Zap, Clock, MapPin } from 'lucide-react'
import PageTransition from '../components/PageTransition'

function LiveCounter({ label, value, unit, icon: Icon, color }: any) {
  const [v, setV] = useState(value)
  useEffect(() => { const t = setInterval(() => setV((p: number) => +(p + (Math.random()-0.5)*0.6).toFixed(1)), 1500); return () => clearInterval(t) }, [])
  return (
    <div className="bg-[#0d1117] border border-white/[0.04] rounded-xl p-4 hover:border-white/[0.08] transition-all">
      <div className="flex items-center justify-between mb-2"><span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span><Icon size={14} className={color}/></div>
      <div className="text-xl font-bold text-white font-mono">{v}<span className="text-xs text-slate-500 ml-1">{unit}</span></div>
    </div>
  )
}

function BarChart({ data, color, height=120, labels }: { data: number[]; color: string; height?: number; labels?: string[] }) {
  const max = Math.max(...data)
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((h,i)=>(<motion.div key={i} initial={{height:0}} animate={{height:`${(h/max)*100}%`}} transition={{delay:i*0.04,duration:0.5,ease:'easeOut'}} className="flex-1 rounded-t-sm hover:opacity-80 transition-opacity cursor-pointer relative group" style={{backgroundColor:color,opacity:0.5+(h/max)*0.5}}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-white opacity-0 group-hover:opacity-100 whitespace-nowrap">{h}</div>
        </motion.div>))}
      </div>
      {labels && <div className="flex justify-between text-[9px] text-slate-600">{labels.map((l,i)=><span key={i}>{l}</span>)}</div>}
    </div>
  )
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s,seg)=>s+seg.value,0)
  let cum = 0
  return (
    <div className="flex items-center gap-4">
      <svg width="90" height="90" viewBox="0 0 36 36" className="flex-shrink-0">
        {segments.map(seg=>{const start=cum;cum+=seg.value;const dash=(seg.value/total)*100;const offset=-(start/total)*100;return<circle key={seg.label} r="14" cx="18" cy="18" fill="none" stroke={seg.color} strokeWidth="6" strokeDasharray={`${dash} ${100-dash}`} strokeDashoffset={25+offset} className="transition-all duration-500"/>})}
      </svg>
      <div className="space-y-1.5">
        {segments.map(s=>(<div key={s.label} className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full" style={{backgroundColor:s.color}}/><span className="text-slate-400">{s.label}</span><span className="text-white font-medium">{s.value}%</span></div>))}
      </div>
    </div>
  )
}

const regionData = [
  { name: '华东', status:'ok', load:72, users:1240 },
  { name: '华南', status:'ok', load:65, users:980 },
  { name: '华北', status:'degraded', load:88, users:1560 },
  { name: '西南', status:'ok', load:45, users:620 },
  { name: '西北', status:'ok', load:38, users:410 },
  { name: '东北', status:'ok', load:52, users:730 },
]

const events = [
  { time:'14:32:15', text:'自动扩容完成 — 新增 2 个实例', level:'info' },
  { time:'14:28:03', text:'API 响应延迟升至 320ms，触发告警', level:'warning' },
  { time:'14:15:40', text:'数据库备份任务完成', level:'info' },
  { time:'13:52:11', text:'节点 us-east-1 CPU 超过 90%', level:'critical' },
  { time:'13:30:00', text:'CDN 缓存刷新完成，命中率恢复至 98%', level:'info' },
]

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — 实时监控大屏：多图表类型、地理区域状态、事件时间线、实时指标。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-white">系统监控中心</h1><p className="text-xs text-slate-500">实时数据 · 自动刷新 · v3.2.1</p></div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>在线</span>
            <span className="text-[10px] text-slate-500">UTC+8 {new Date().toLocaleTimeString('zh-CN')}</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <LiveCounter label="CPU" value={67.3} unit="%" icon={Cpu} color="text-blue-400"/>
          <LiveCounter label="内存" value={54.8} unit="%" icon={HardDrive} color="text-violet-400"/>
          <LiveCounter label="请求/s" value={1247} unit="" icon={Activity} color="text-emerald-400"/>
          <LiveCounter label="用户" value={3842} unit="" icon={Users} color="text-amber-400"/>
          <LiveCounter label="延迟" value={42} unit="ms" icon={Clock} color="text-cyan-400"/>
          <LiveCounter label="带宽" value={168} unit="Mbps" icon={Zap} color="text-rose-400"/>
          <LiveCounter label="错误率" value={0.12} unit="%" icon={AlertTriangle} color="text-red-400"/>
          <LiveCounter label="节点" value={12} unit="" icon={Server} color="text-emerald-400"/>
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">请求量趋势</h3>
              <div className="flex gap-2">
                {['1h','6h','12h','24h'].map(t=><button key={t} className="px-2 py-0.5 text-[10px] rounded-md text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all">{t}</button>)}
              </div>
            </div>
            <BarChart data={[42,58,45,72,55,68,78,62,85,70,90,82]} color="#3b82f6" height={150} labels={['00','02','04','06','08','10','12','14','16','18','20','22']}/>
          </div>
          <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">带宽使用 (Mbps)</h3>
              <span className="text-[10px] text-emerald-400">↑ 12.5%</span>
            </div>
            <BarChart data={[120,135,128,145,138,155,142,160,148,172,155,168]} color="#8b5cf6" height={150} labels={['00','02','04','06','08','10','12','14','16','18','20','22']}/>
          </div>
        </div>

        {/* Bottom row: donut + regions + events */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Traffic sources */}
          <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">流量来源</h3>
            <DonutChart segments={[
              { label:'API', value:42, color:'#3b82f6' },
              { label:'Web', value:28, color:'#8b5cf6' },
              { label:'Mobile', value:18, color:'#06b6d4' },
              { label:'Other', value:12, color:'#64748b' },
            ]}/>
          </div>

          {/* Regions */}
          <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Globe size={14} className="text-blue-400"/> 区域状态</h3>
            <div className="space-y-2">
              {regionData.map(r=>(
                <div key={r.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full ${r.status==='ok'?'bg-emerald-400':r.status==='degraded'?'bg-amber-400':'bg-red-400'}`}/>
                  <span className="text-xs text-slate-300 w-10">{r.name}</span>
                  <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500/60" style={{width:`${r.load}%`}}/>
                  </div>
                  <span className="text-[10px] text-slate-500 w-14 text-right">{r.users.toLocaleString()} 人</span>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Bell size={14} className="text-amber-400"/> 事件时间线</h3>
            <div className="space-y-1">
              {events.map((e,i)=>(
                <div key={i} className="flex items-start gap-3 py-1.5">
                  <div className="relative mt-1">
                    <span className={`block w-1.5 h-1.5 rounded-full ${e.level==='critical'?'bg-red-400':e.level==='warning'?'bg-amber-400':'bg-blue-400'}`}/>
                    {i<events.length-1&&<div className="absolute top-3 left-0.5 w-px h-5 bg-white/[0.04]"/>}
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">{e.text}</p>
                    <p className="text-[10px] text-slate-600">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a><span className="text-slate-700">|</span>
            <a href="/api-docs" className="hover:text-white transition-colors">API 文档</a>
            <a href="/admin-demo" className="hover:text-white transition-colors">后台管理</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：React · SVG Chart · 实时模拟 · 多图表类型 · 区域监控 · 事件时间线</p>
        </div>
      </div>
    </PageTransition>
  )
}
