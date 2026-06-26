import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('splash-seen')
  })

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('splash-seen', '1')
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [show])

  const particles = Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * Math.PI * 2,
    distance: 70 + Math.random() * 100,
    delay: 0.4 + i * 0.02,
  }))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center"
          style={{ zIndex: 10000 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Central pulse */}
          <motion.div
            className="absolute w-4 h-4 rounded-full"
            style={{ background: '#00E5FF' }}
            animate={{
              scale: [0, 3, 0.5, 6],
              opacity: [1, 0.8, 1, 0],
              boxShadow: [
                '0 0 0px rgba(0,229,255,0)',
                '0 0 40px rgba(0,229,255,0.8)',
                '0 0 20px rgba(0,229,255,0.5)',
                '0 0 80px rgba(0,229,255,0)',
              ],
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          {/* Explosion particles */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#00B8D4' : '#FFFFFF' }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos(p.angle) * p.distance,
                y: Math.sin(p.angle) * p.distance,
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' }}
            />
          ))}
          {/* Logo text */}
          <motion.h1
            className="text-4xl font-black text-white relative"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9] }}
            transition={{ duration: 1.6, delay: 0.3, times: [0, 0.12, 0.65, 1] }}
          >
            Leon<span style={{ color: '#00E5FF' }}>.</span>
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
