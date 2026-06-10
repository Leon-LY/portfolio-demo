import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          {/* Glitch 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 0.1, 0.2, 1] }}
            className="mb-6"
          >
            <span
              className="glitch text-[10rem] sm:text-[14rem] font-black text-white/5 leading-none select-none"
              data-text="404"
            >
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              页面未找到
            </h1>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
              你访问的页面不存在或已被移除。请检查 URL 或返回首页。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/"
              className="btn-glow group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-violet-500 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              返回首页
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
