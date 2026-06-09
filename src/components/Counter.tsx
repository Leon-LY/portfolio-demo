import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

interface Props {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function Counter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const spring = useSpring(from, {
    stiffness: 80,
    damping: 30,
    duration: duration * 1000,
  })

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
