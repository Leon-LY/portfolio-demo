import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: '作品' },
  { to: '/#services', label: '服务能力' },
  { to: '/#contact', label: '技术合作' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname, hash])

  const isHome = pathname === '/'

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0a0e1a]/85 backdrop-blur-2xl border-b border-white/[0.05]' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-extrabold tracking-tight text-white">
          Leon<span className="text-blue-500">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = isHome && (l.to === '/' || (l.to.startsWith('/#') && hash === l.to.replace('/', '')))
            return (
              <a key={l.to} href={l.to}
                className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                  active ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {l.label}
                {active && <motion.span layoutId="nav" className="absolute inset-0 bg-white/[0.05] rounded-lg"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }} />}
              </a>
            )
          })}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-slate-400 hover:text-white text-lg">
          {open ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#0b1120]/95 backdrop-blur-xl border-b border-white/[0.05]">
            <div className="px-4 py-3 space-y-1">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <a href={l.to} className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    (l.to === '/' && isHome) ? 'bg-white/[0.05] text-white' : 'text-slate-500'
                  }`}>{l.label}</a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
