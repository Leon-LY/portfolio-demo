import { useState, useRef, useEffect } from 'react'

/**
 * Interactive Before/After comparison slider.
 * Drag the divider to reveal more of the "after" state.
 * Perfect for showing project impact metrics.
 */

interface BeforeAfterProps {
  before: React.ReactNode
  after: React.ReactNode
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = '改造前',
  afterLabel = '改造后',
  className = '',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateFromEvent = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(x)
  }

  const handleMouseDown = () => setDragging(true)

  useEffect(() => {
    if (!dragging) return
    const handleMove = (e: MouseEvent) => updateFromEvent(e.clientX)
    const handleUp = () => setDragging(false)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [dragging])

  const handleTouchMove = (e: React.TouchEvent) => {
    updateFromEvent(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none ${className}`}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      style={{ cursor: dragging ? 'grabbing' : 'col-resize' }}
    >
      {/* After (full width, behind) */}
      <div className="relative">{after}</div>

      {/* Before (clipped on the right) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {before}
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)] pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none"
        style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex gap-0.5">
          <div className="w-0.5 h-3 bg-text-tertiary rounded-full" />
          <div className="w-0.5 h-3 bg-text-tertiary rounded-full" />
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-medium pointer-events-none"
        style={{ opacity: position > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-medium pointer-events-none"
        style={{ opacity: position < 85 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        {afterLabel}
      </div>
    </div>
  )
}
