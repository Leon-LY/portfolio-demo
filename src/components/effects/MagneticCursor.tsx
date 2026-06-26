import { useEffect, useRef, useState, useCallback } from 'react'

type CursorState = 'default' | 'link' | 'text' | 'hidden'

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [state, setState] = useState<CursorState>('default')

  const isMobile = typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  const move = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const checkTarget = (target: Element | null): CursorState => {
      if (!target) return 'default'
      const el = target as HTMLElement
      const cursor = el.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (cursor === 'text') return 'text'
      if (el.closest('a, button') || cursor === 'link') return 'link'
      return 'default'
    }

    const onOver = (e: Event) => setState(checkTarget(e.target as Element))
    const onOut = (e: MouseEvent) => {
      if (!checkTarget(e.relatedTarget as Element | null)) setState('default')
    }
    const onWinLeave = () => setState('hidden')
    const onWinEnter = () => setState('default')

    document.addEventListener('mouseover', onOver, true)
    document.addEventListener('mouseout', onOut, true)
    document.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', onWinLeave)
    document.documentElement.addEventListener('mouseenter', onWinEnter)

    let anim: number
    const tick = () => {
      const c = currentRef.current, t = targetRef.current
      // Tighter follow — lerp 0.35 feels fast and responsive
      c.x += (t.x - c.x) * 0.35
      c.y += (t.y - c.y) * 0.35
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`
      }
      anim = requestAnimationFrame(tick)
    }
    anim = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(anim)
      document.removeEventListener('mouseover', onOver, true)
      document.removeEventListener('mouseout', onOut, true)
      document.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', onWinLeave)
      document.documentElement.removeEventListener('mouseenter', onWinEnter)
    }
  }, [isMobile, move])

  if (isMobile) return null

  const baseSize = state === 'link' ? 48 : state === 'text' ? 3 : 6
  const baseHeight = state === 'text' ? 20 : baseSize

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none will-change-transform rounded-full flex items-center justify-center"
      style={{
        zIndex: 9999,
        width: baseSize,
        height: baseHeight,
        marginLeft: -baseSize / 2,
        marginTop: -baseHeight / 2,
        background: state === 'link'
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(0, 229, 255, 0.85)',
        boxShadow: state === 'link'
          ? '0 0 24px rgba(0, 229, 255, 0.4)'
          : '0 0 6px rgba(0, 229, 255, 0.5)',
        borderRadius: state === 'text' ? '1.5px' : '50%',
        opacity: state === 'hidden' ? 0 : 1,
        mixBlendMode: state === 'link' ? 'difference' : 'normal',
        transition: 'width 0.25s, height 0.25s, margin 0.25s, border-radius 0.25s, background 0.25s, box-shadow 0.25s',
      }}
    >
      {state === 'link' && (
        <span className="text-[10px] font-bold text-black whitespace-nowrap font-sans leading-none">
          查看
        </span>
      )}
    </div>
  )
}
