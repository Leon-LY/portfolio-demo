import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

export default function Counter({ to, suffix = '', decimals = 0, className = '' }: {
  to: number; suffix?: string; decimals?: number; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inv = useInView(ref, { once: true, margin: '-80px' })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const disp = useTransform(spring, v => `${v.toFixed(decimals)}${suffix}`)
  useEffect(() => { if (inv) spring.set(to) }, [inv, spring, to])
  return <motion.span ref={ref} className={className}>{disp}</motion.span>
}
