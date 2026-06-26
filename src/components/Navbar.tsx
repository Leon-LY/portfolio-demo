import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/config'

const links = [
  { to: '/', label: '案例' },
  { to: '/#services', label: '服务' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' },
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
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-0/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]'
          : ''
      }`}
      role="navigation"
      aria-label="主导航"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-1">
          <span className="text-lg font-extrabold tracking-tight text-white transition-colors group-hover:text-accent">
            {personalInfo.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = isHome && (l.to === '/' || (l.to.startsWith('/#') && hash === l.to.replace('/', '')))
            return (
              <a
                key={l.to}
                href={l.to}
                className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                  active ? 'text-white' : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-accent rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-white/[0.04] transition-all"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
        >
          <motion.div animate={open ? 'open' : 'closed'} className="flex flex-col gap-1.5">
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5.5 } }}
              className="block w-5 h-[1.5px] bg-current rounded-full"
            />
            <motion.span
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              className="block w-5 h-[1.5px] bg-current rounded-full"
            />
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5.5 } }}
              className="block w-5 h-[1.5px] bg-current rounded-full"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-surface-0/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <a
                    href={l.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      l.to === '/' && isHome
                        ? 'bg-accent/10 text-white border border-accent/20'
                        : 'text-text-secondary hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
