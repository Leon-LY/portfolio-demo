import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="text-lg font-bold text-white">Leon<span className="text-blue-500">.</span></Link>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-xs">全栈软件工程师，专注高性能 Web 产品开发。</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-4">Demo 模板</p>
          <div className="space-y-2">
            {['营销网站','SaaS 产品','电商平台','移动应用','企业官网'].map((n,i) => (
              <Link key={n} to={['/marketing','/saas','/ecommerce','/mobile-app','/corporate'][i]}
                className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">{n} Demo</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-4">声明</p>
          <p className="text-sm text-slate-600 leading-relaxed">所有 Demo 页面均为技术展示，数据与人物均为虚构。</p>
        </div>
      </div>
      <div className="border-t border-white/[0.04] px-6 py-5 text-center">
        <p className="text-xs text-slate-600">© 2025 Leon. Demo Portfolio — 仅供技术展示。</p>
      </div>
    </footer>
  )
}
