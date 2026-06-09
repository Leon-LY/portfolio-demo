import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

interface Props {
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function Counter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  )

  useEffect(() => {
    if (isInView) spring.set(to)
  }, [isInView, spring, to])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
