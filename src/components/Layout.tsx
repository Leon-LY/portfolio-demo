import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { ErrorBoundary } from './ErrorBoundary'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-screen text-[#e2e8f0]">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" role="main">
        <AnimatePresence mode="wait">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
