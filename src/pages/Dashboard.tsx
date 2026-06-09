import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Activity, Server, Users, AlertTriangle, Wifi, Cpu, HardDrive, Globe, ChevronRight, Bell, Shield } from 'lucide-react'
import PageTransition from '../components/PageTransition'

/* ── Simulated live metric ── */
function LiveMetric({ label, value, unit, icon: Icon, color, trend }: any) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setInterval(() => setV((p: number) => p + (Math.random()-0.5)*0.8), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-5 hover:border-white/[0.08] transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
        <Icon size={16} className={color} />
      </div>
      <div className="text-2xl font-bold text-white font-mono">{v.toFixed(1)}<span className="text-sm text-slate-500 ml-1">{unit}</span></div>
      <div className={`text-[10px] mt-1 ${trend>0?'text-emerald-400':'text-red-400'}`}>{trend>0?'↑':'↓'} {Math.abs(trend)}%</div>
    </div>
  )
}

/* ── Simple chart bar ── */
function MiniChart({ data, color, height=120 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(h/max)*100}%` }}
          transition={{ delay: i*0.03, duration: 0.5, ease: 'easeOut' }}
          className="flex-1 rounded-t-sm" style={{ backgroundColor: color, opacity: 0.6 + (h/max)*0.4 }} />
      ))}
    </div>
  )
}

/* ── Alert row ── */
const alerts = [
  { level: 'critical', text: 'CPU 使用率超过 90% — 节点 us-east-1', time: '2 分钟前' },
  { level: 'warning', text: '磁盘使用率达到 75% — /data 分区', time: '8 分钟前' },
  { level: 'info', text: '自动扩容完成 — 新增 2 个实例', time: '15 分钟前' },
  { level: 'warning', text: 'API 响应时间升高至 320ms', time: '22 分钟前' },
  { level: 'info', text: '备份任务完成 — database-snapshot-042', time: '35 分钟前' },
]

export default function Dashboard() {
  const chart1 = useRef([42, 58, 45, 72, 55, 68, 78, 62, 85, 70, 90, 82])
  const chart2 = useRef([120, 135, 128, 145, 138, 155, 142, 160, 148, 172, 155, 168])

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — 实时数据监控、图表可视化、WebSocket 模拟、大屏布局。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">系统监控中心</h1>
            <p className="text-xs text-slate-500 mt-1">实时数据 · 自动刷新 · {new Date().toLocaleTimeString('zh-CN')}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 在线</span>
            <button className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-400 hover:text-white transition-all">导出报表</button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <LiveMetric label="CPU 使用率" value={67.3} unit="%" icon={Cpu} color="text-blue-400" trend={2.1} />
          <LiveMetric label="内存使用" value={54.8} unit="%" icon={HardDrive} color="text-violet-400" trend={-1.3} />
          <LiveMetric label="请求/秒" value={1247} unit="" icon={Activity} color="text-emerald-400" trend={5.7} />
          <LiveMetric label="活跃用户" value={3842} unit="" icon={Users} color="text-amber-400" trend={3.2} />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">请求量趋势</h3>
              <span className="text-[10px] text-slate-500">过去 12 小时</span>
            </div>
            <MiniChart data={chart1.current} color="#3b82f6" height={160} />
            <div className="flex justify-between mt-3 text-[10px] text-slate-600">
              {['00:00','02:00','04:00','06:00','08:00','10:00'].map(t=><span key={t}>{t}</span>)}
            </div>
          </div>
          <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">带宽使用 (Mbps)</h3>
              <span className="text-[10px] text-slate-500">过去 12 小时</span>
            </div>
            <MiniChart data={chart2.current} color="#8b5cf6" height={160} />
            <div className="flex justify-between mt-3 text-[10px] text-slate-600">
              {['00:00','02:00','04:00','06:00','08:00','10:00'].map(t=><span key={t}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* Alerts + status */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Bell size={14} className="text-amber-400" /> 告警事件</h3>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.level==='critical'?'bg-red-400':a.level==='warning'?'bg-amber-400':'bg-blue-400'}`} />
                  <span className="text-sm text-slate-300 flex-1">{a.text}</span>
                  <span className="text-[10px] text-slate-600">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">服务状态</h3>
            <div className="space-y-3">
              {[
                { name: 'API Gateway', status: 'ok' },
                { name: 'Database', status: 'ok' },
                { name: 'Redis Cache', status: 'ok' },
                { name: 'File Storage', status: 'degraded' },
                { name: 'Message Queue', status: 'ok' },
                { name: 'CDN', status: 'ok' },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{s.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.status==='ok'?'text-emerald-400 bg-emerald-400/10':'text-amber-400 bg-amber-400/10'}`}>{s.status==='ok'?'正常':'降级'}</span>
                </div>
              ))}
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
            <a href="/api-docs" className="hover:text-white transition-colors">API 文档</a>
            <a href="/admin-demo" className="hover:text-white transition-colors">后台管理</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：React · ECharts · WebSocket · 实时数据 · 大屏布局</p>
        </div>
      </div>
    </PageTransition>
  )
}
