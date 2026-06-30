import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TERMINAL_LINES = [
  'INITIALIZING COMMAND CENTER...',
  'AUTHENTICATING COMMANDER...',
  'LOADING MISSION ARCHIVE...',
]

export default function SplashScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('splash-seen')
  })
  const [terminalIndex, setTerminalIndex] = useState(0)

  useEffect(() => {
    if (show) {
      // Stagger terminal lines
      const t1 = setTimeout(() => setTerminalIndex(1), 350)
      const t2 = setTimeout(() => setTerminalIndex(2), 700)
      // Dismiss after 1800ms
      const t3 = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('splash-seen', '1')
      }, 1800)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{
            zIndex: 10000,
            background: `
              radial-gradient(circle at 50% 40%, rgba(53,221,242,0.10), transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(244,91,168,0.08), transparent 35%),
              radial-gradient(circle at 30% 80%, rgba(232,184,93,0.06), transparent 38%),
              #02030A
            `,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* Top-left terminal log */}
          <div className="absolute top-5 left-5 font-vt323 text-sm text-text-tertiary space-y-1">
            {TERMINAL_LINES.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={terminalIndex >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
              >
                <span className="text-text-disabled">&gt;</span>{' '}
                <span className={terminalIndex >= i ? 'text-[#35DDF2]' : ''}>
                  {line}
                </span>
                {terminalIndex === i && (
                  <span className="inline-block w-2 h-3.5 bg-[#35DDF2] ml-0.5 animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Center: LEON.exe */}
          <motion.div
            className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.95] }}
            transition={{ duration: 1.6, delay: 0.5, times: [0, 0.1, 0.6, 1] }}
          >
            <h1 className="font-vt323 text-7xl text-white tracking-widest text-glow-cyan">
              LEON<span style={{ color: '#F45BA8' }}>.exe</span>
            </h1>
            {/* Cyan pulsing dot */}
            <motion.div
              className="mx-auto mt-4 w-2.5 h-2.5 rounded-full"
              style={{ background: '#35DDF2' }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.6, 1, 0.6],
                boxShadow: [
                  '0 0 4px rgba(53,221,242,0.4)',
                  '0 0 18px rgba(53,221,242,0.9)',
                  '0 0 4px rgba(53,221,242,0.4)',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Bottom scanline decoration */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(53,221,242,0.5), rgba(244,91,168,0.3), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
