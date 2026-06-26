import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

/**
 * 3D perspective tilt card — rotates toward mouse position.
 * DRAMATIC effect: up to 12deg rotation, visible on all cards.
 * Uses Framer Motion motion values — 60fps smooth.
 */
interface TiltCard3DProps {
  children: ReactNode
  className?: string
  tiltMax?: number
}

export default function TiltCard3D({
  children,
  className = '',
  tiltMax = 12,
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useTransform(mouseY, [0, 1], [tiltMax, -tiltMax])
  const rotateY = useTransform(mouseX, [0, 1], [-tiltMax, tiltMax])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
