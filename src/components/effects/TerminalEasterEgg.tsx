import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RESPONSES: Record<string, string[]> = {
  whoami: [
    'Leon · 全栈架构师',
    '数据可视化 · 政务数字化 · 企业级平台 · AI 集成',
    '12 年开发经验 · 交付 47 个项目 · 覆盖 10 万+ 用户',
  ],
  projects: [
    '🏛️  城市大脑 — 市政府指挥中心 20+ 维度实时监控',
    '📊 经济运行平台 — 全链路数据管理 + 自定义报表引擎',
    '🏗️  方外设计 — Nuxt 4 全栈品牌官网 + 15 个管理模块',
    '🏘️  智慧社区 — 覆盖 30+ 社区 月均工单 5000+',
    '🌊 河湖湾长制 — GIS 移动巡查 覆盖全市水体',
    '🤖 远见 FarSight — DeepSeek+通义千问 双 AI 投资分析',
  ],
  stack: [
    '前端: React · Vue 3 · TypeScript · Three.js · ECharts',
    '后端: SpringBoot · FastAPI · Express · Node.js',
    '数据库: PostgreSQL · MySQL · Redis · MongoDB',
    '部署: Docker · Nginx · K8s · Linux',
  ],
  contact: [
    '📞 18389118642',
    '✉️  554295000@qq.com',
    '🐙 github.com/Leon-LY',
  ],
  secret: [
    '🎉 恭喜发现彩蛋！',
    'Leon 的第一行代码写于 2014 年，是一个 VB 计算器。',
    '这个网站本身也是 Leon 的技术作品之一。',
    'Powered by React 19 + Three.js + Framer Motion.',
  ],
  help: [
    '── 可用命令 ──',
    'whoami    个人信息',
    'projects  项目列表',
    'stack     技术栈',
    'contact   联系方式',
    'secret    彩蛋',
    'clear     清屏',
    'exit      退出',
  ],
  clear: [],
}

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Array<{ type: 'system' | 'input' | 'output'; text: string }>>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const clickCountRef = useRef(0)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // 3 rapid double-clicks or Ctrl+K
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, input, textarea, [role="button"]')) return
      if (open) return
      clickCountRef.current++
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
      clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0 }, 500)
      if (clickCountRef.current >= 3) {
        clickCountRef.current = 0
        setOpen(true)
      }
    }
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('dblclick', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('dblclick', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setLines([{
        type: 'system',
        text: '╔══════════════════════════════════╗',
      }, {
        type: 'system',
        text: '║  Leon Terminal v1.0  ·  help 查看命令  ║',
      }, {
        type: 'system',
        text: '╚══════════════════════════════════╝',
      }])
      setInput('')
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open])

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [lines])

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    setLines(prev => [...prev, { type: 'input', text: `❯ ${cmd}` }])

    if (trimmed === 'exit') { setTimeout(() => setOpen(false), 300); return }
    if (trimmed === 'clear') { setLines([]); return }

    const resp = RESPONSES[trimmed] || [`命令未识别: ${trimmed}。输入 help 查看可用命令。`]
    let delay = 0
    resp.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'output', text: line }])
      }, delay)
      delay += line.length * 6 + 40
    })
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input)
      setHistory(prev => [...prev, input])
      setHistoryIdx(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx
      setHistoryIdx(newIdx)
      if (newIdx >= 0) setInput(history[history.length - 1 - newIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = historyIdx > 0 ? historyIdx - 1 : -1
      setHistoryIdx(newIdx)
      setInput(newIdx >= 0 ? history[history.length - 1 - newIdx] || '' : '')
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] text-text-tertiary font-mono">terminal — leon@dev</span>
              </div>
              <button onClick={() => setOpen(false)}
                className="text-text-tertiary hover:text-white transition-colors text-sm px-2">✕</button>
            </div>
            {/* Body */}
            <div ref={containerRef}
              className="p-5 font-mono text-xs sm:text-sm h-80 overflow-y-auto space-y-1"
            >
              <div className="text-text-tertiary mb-3">
                输入 help 查看命令 · exit 或 Esc 退出 · ↑↓ 历史
              </div>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === 'input' ? 'text-accent' :
                    line.type === 'system' ? 'text-text-tertiary' :
                    'text-text-secondary pl-4'
                  }
                >
                  {line.text}
                </div>
              ))}
              {/* Input line */}
              <div className="flex items-center gap-2 text-accent">
                <span>❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-accent placeholder-text-tertiary"
                  placeholder="输入命令..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="inline-block w-2 h-4 bg-accent animate-pulse rounded-sm" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
