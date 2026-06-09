import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.1, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
