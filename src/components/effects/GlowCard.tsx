import { useRef, type ReactNode } from 'react'

/**
 * Card with a mouse-reactive radial glow.
 * As the user moves the cursor over the card, a subtle
 * amber gradient glow follows the mouse position.
 * No external dependencies — pure CSS custom properties + JS.
 */

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(245,158,11,0.08)',
  glowSize = 300,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--glow-x', `${x}%`)
    el.style.setProperty('--glow-y', `${y}%`)
    el.style.setProperty('--glow-opacity', '1')
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--glow-opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
        '--glow-color': glowColor,
        '--glow-size': `${glowSize}px`,
      } as React.CSSProperties}
    >
      {/* Glow layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: 'var(--glow-opacity)',
          background: `radial-gradient(circle var(--glow-size) at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
