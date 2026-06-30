import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/config'

const links = [
  { to: '/#portfolio', label: '任务档案' },
  { to: '/#services', label: '任务类型' },
  { to: '/about', label: '指挥官' },
  { to: '/contact', label: '建立通讯' },
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

  return (
    <nav
      className="fixed top-4 inset-x-0 z-50 mx-auto w-[calc(100%-2rem)] max-w-[90rem] transition-all duration-300"
      role="navigation"
      aria-label="主导航"
    >
      <div
        className="flex items-center justify-between px-3 lg:px-4 py-2.5"
        style={{
          border: '1px solid rgba(248,243,255,0.10)',
          background: `
            linear-gradient(180deg, rgba(248,243,255,0.045), rgba(248,243,255,0.01)),
            repeating-linear-gradient(45deg, rgba(248,243,255,0.02) 0, rgba(248,243,255,0.02) 1px, transparent 1px, transparent 8px),
            rgba(5,0,16,0.84)
          `,
          backdropFilter: 'blur(28px)',
          boxShadow: scrolled
            ? '0 22px 70px rgba(0,0,0,0.42), inset 0 1px 0 rgba(248,243,255,0.05)'
            : '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(248,243,255,0.04)',
          clipPath: 'polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))',
        }}
      >
        {/* Logo — cut-corner box + VT323 + pink dot */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="relative flex items-center justify-center w-10 h-10"
            style={{
              border: '1px solid rgba(53,221,242,0.42)',
              background: 'linear-gradient(180deg, rgba(53,221,242,0.13), rgba(53,221,242,0.04))',
              color: '#35DDF2',
              boxShadow: '0 0 22px rgba(53,221,242,0.16), inset 0 0 18px rgba(53,221,242,0.05)',
              clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
              transition: '300ms ease',
            }}
          >
            <span className="font-vt323 text-xl leading-none">L</span>
            {/* Pink dot — top right */}
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{ background: '#F45BA8', boxShadow: '0 0 14px rgba(244,91,168,0.85)' }}
            />
          </div>
          <span className="font-vt323 text-2xl tracking-wider text-white group-hover:text-[#35DDF2] transition-colors">
            {personalInfo.name}
          </span>
        </Link>

        {/* Desktop nav links — uppercase, tiny font, pill style */}
        <div className="hidden md:flex items-center gap-1 px-1.5 py-1.5"
          style={{
            border: '1px solid rgba(248,243,255,0.08)',
            background: 'rgba(2,3,10,0.48)',
          }}
        >
          {links.map((l) => {
            const isPortfolio = l.to === '/#portfolio' && hash === '#portfolio'
            const isServices = l.to === '/#services' && hash === '#services'
            const isAbout = l.to === '/about' && pathname === '/about'
            const isContact = l.to === '/contact' && pathname === '/contact'
            const active = isPortfolio || isServices || isAbout || isContact
            return (
              <a
                key={l.to}
                href={l.to}
                className="inline-flex items-center justify-center px-3 py-2 font-vt323 uppercase tracking-[0.18em] transition-all duration-250"
                style={{
                  fontSize: '0.66rem',
                  letterSpacing: '0.18em',
                  lineHeight: 1,
                  color: active ? '#35DDF2' : 'rgba(248,243,255,0.48)',
                  border: active ? '1px solid rgba(53,221,242,0.26)' : '1px solid transparent',
                  background: active ? 'rgba(53,221,242,0.07)' : 'transparent',
                  boxShadow: active ? '0 0 16px rgba(53,221,242,0.10)' : 'none',
                }}
              >
                {l.label}
              </a>
            )
          })}
        </div>

        {/* Desktop CTA — gold border */}
        <div className="hidden sm:block">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 font-vt323 uppercase tracking-[0.20em] transition-all duration-280"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.20em',
              border: '1px solid rgba(232,184,93,0.46)',
              background: 'rgba(232,184,93,0.05)',
              color: '#E8B85D',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8B85D'
              e.currentTarget.style.color = '#02030A'
              e.currentTarget.style.boxShadow = '0 0 28px rgba(232,184,93,0.26)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(232,184,93,0.05)'
              e.currentTarget.style.color = '#E8B85D'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            发起任务
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ color: 'rgba(248,243,255,0.5)' }}
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
            className="md:hidden mt-2 mx-2 overflow-hidden"
            style={{
              background: 'rgba(5,0,16,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(248,243,255,0.08)',
            }}
          >
            <div className="px-3 py-3 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <a
                    href={l.to}
                    className="block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded transition-all"
                    style={{ color: 'rgba(248,243,255,0.5)' }}
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.2 }}
              >
                <a
                  href="/contact"
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded border mt-2 text-center transition-all"
                  style={{ color: '#E8B85D', borderColor: 'rgba(232,184,93,0.4)' }}
                >
                  发起任务
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
