import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import SplashScreen from './components/effects/SplashScreen'
import MagneticCursor from './components/effects/MagneticCursor'
import TerminalEasterEgg from './components/effects/TerminalEasterEgg'

// Lazy-loaded: non-critical pages
const Admin = lazy(() => import('./pages/Admin'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <SplashScreen />
      <MagneticCursor />
      <TerminalEasterEgg />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
