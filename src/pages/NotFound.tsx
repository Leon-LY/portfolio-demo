import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
      <div className="text-center">
        <p className="text-8xl font-black text-white/5 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">页面未找到</h1>
        <p className="text-slate-500 mb-8">你访问的页面不存在或已被移除。</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all">
          <ArrowLeft size={16} /> 返回首页
        </Link>
      </div>
    </div>
  )
}
