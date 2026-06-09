import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#070b18] text-[#e2e8f0]">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
