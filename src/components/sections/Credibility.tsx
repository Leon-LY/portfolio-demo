import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../ScrollReveal'
import Counter from '../Counter'

gsap.registerPlugin(ScrollTrigger)

/**
 * Credibility section — GSAP ScrollTrigger scrub bar charts + trust metrics.
 */

interface ComparisonItem {
  label: string
  before: string
  after: string
  improvement: string
  barPercent: number
}

const comparisons: ComparisonItem[] = [
  { label: '数据上报效率', before: '人工汇总 3 天', after: '系统自动 5 分钟', improvement: '99%', barPercent: 98 },
  { label: '巡查覆盖率', before: '抽查 45%', after: '全面覆盖 83%', improvement: '+38%', barPercent: 83 },
  { label: '问题处理周期', before: '平均 7 天', after: '平均 2 天', improvement: '-71%', barPercent: 65 },
  { label: '报修响应时间', before: '2 小时', after: '5 分钟', improvement: '-94%', barPercent: 92 },
]

const trustMetrics = [
  { value: '12', suffix: '+ 年', label: '全栈经验' },
  { value: '47', suffix: '', label: '交付项目' },
  { value: '240', suffix: ' 万', label: '日处理数据' },
  { value: '99.7', suffix: '%', label: '系统可用率' },
  { value: '300', suffix: '+', label: '管理页面' },
]

function BarChart({ item, maxPercent }: { item: ComparisonItem; maxPercent: number }) {
  const beforeRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const beforePercent = Math.max(item.barPercent - 30, 10)

  useEffect(() => {
    const section = sectionRef.current
    const beforeBar = beforeRef.current
    const afterBar = afterRef.current
    if (!section || !beforeBar || !afterBar) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      })
      tl.to(beforeBar, { width: `${(beforePercent / maxPercent) * 100}%`, duration: 1, ease: 'power2.out' }, 0)
      tl.to(afterBar, { width: `${(item.barPercent / maxPercent) * 100}%`, duration: 1, ease: 'power2.out' }, 0.1)
    }, section)

    return () => ctx.revert()
  }, [item.barPercent, maxPercent, beforePercent])

  return (
    <div ref={sectionRef} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{item.label}</span>
        <span className="text-xs font-bold font-mono text-accent">{item.improvement}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-tertiary w-12 shrink-0">改造前</span>
          <div className="flex-1 h-5 bg-surface-2 rounded-full overflow-hidden">
            <div ref={beforeRef} className="h-full bg-white/[0.06] rounded-full" style={{ width: 0 }} />
          </div>
          <span className="text-[11px] text-text-tertiary w-20 shrink-0 text-right">{item.before}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-accent w-12 shrink-0">改造后</span>
          <div className="flex-1 h-5 bg-surface-2 rounded-full overflow-hidden">
            <div ref={afterRef} className="h-full bg-accent/25 rounded-full" style={{ width: 0 }} />
          </div>
          <span className="text-[11px] text-text-primary font-medium w-20 shrink-0 text-right">{item.after}</span>
        </div>
      </div>
    </div>
  )
}

export default function Credibility() {
  const maxPercent = Math.max(...comparisons.map(c => c.barPercent))
  const sectionRef = useRef<HTMLElement>(null)

  // Pin the section on scroll (desktop only) for dramatic scroll-driven reveal
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: true,
        })
      }, section)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="credibility" data-section-physics className="py-32 border-t border-white/[0.05]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 clip-notch"
            style={{ border: '1px solid rgba(16,185,129,0.22)', background: 'rgba(16,185,129,0.05)', color: '#10B981', boxShadow: '0 0 14px rgba(16,185,129,0.06)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#10B981', boxShadow: '0 0 10px rgba(16,185,129,0.6)' }} />
            <span className="font-vt323 text-base tracking-[0.2em] uppercase">Key Metrics</span>
          </div>
          <h2 className="font-display font-extrabold uppercase tracking-[-0.06em] mb-12"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 0.92 }}>
            <span className="block" style={{ color: '#F8F3FF', textShadow: '0 0 14px rgba(248,243,255,0.40), 0 0 56px rgba(248,243,255,0.10)' }}>关键</span>
            <span className="block" style={{ color: '#10B981', textShadow: '0 0 16px rgba(16,185,129,0.50), 0 0 48px rgba(16,185,129,0.20)' }}>指标</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Before/After bar charts with GSAP ScrollTrigger scrub */}
          <div className="lg:col-span-3">
            <div className="card-premium rounded-2xl p-6 lg:p-8 border-white/[0.06]">
              <h3 className="text-sm font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full" style={{ background: '#06B6D4' }} />
                改造前后对比
              </h3>
              <div className="space-y-5">
                {comparisons.map((item) => (
                  <BarChart key={item.label} item={item} maxPercent={maxPercent} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Trust metrics */}
          <div className="lg:col-span-2">
            <div className="card-premium rounded-2xl p-6 lg:p-8 border-white/[0.06] h-full">
              <h3 className="text-sm font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full" style={{ background: '#10B981' }} />
                交付数据
              </h3>
              <div className="space-y-1">
                {trustMetrics.map((item, i) => {
                  const colors = ['#10B981', '#06B6D4', '#10B981', '#8B5CF6', '#2563EB']
                  return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-sm text-text-secondary">{item.label}</span>
                    <span className="text-2xl font-black font-mono tabular-nums" style={{ color: colors[i] }}>
                      <Counter to={parseFloat(item.value) || 0} suffix={item.suffix} />
                    </span>
                  </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
