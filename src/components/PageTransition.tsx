import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

/**
 * Directional page transition using clip-path wipe.
 * Forward navigation (deeper path): wipe from right
 * Back navigation (shallower path): wipe from left
 * Replaces the generic 300ms opacity fade.
 */

let prevPathname = ''

const forwardVariants = {
  initial: { clipPath: 'inset(0 0 0 100%)', scale: 0.97 },
  animate: {
    clipPath: 'inset(0 0 0 0%)',
    scale: 1,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    clipPath: 'inset(0 100% 0 0)',
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
}

const backVariants = {
  initial: { clipPath: 'inset(0 100% 0 0)', scale: 0.97 },
  animate: {
    clipPath: 'inset(0 0 0 0%)',
    scale: 1,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    clipPath: 'inset(0 0 0 100%)',
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const direction: 'forward' | 'back' =
    pathname.length >= prevPathname.length ? 'forward' : 'back'
  prevPathname = pathname

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={direction === 'forward' ? forwardVariants : backVariants}
    >
      {children}
    </motion.div>
  )
}
