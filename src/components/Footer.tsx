import { Code2, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-[#0a0e1a]">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-base font-extrabold text-white mb-2">
              Leon<span className="text-blue-500">.</span>
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              独立全栈开发者 · Web 全栈 / 数据可视化 / 系统架构
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">导航</p>
            <div className="space-y-2">
              <a href="/" className="block text-xs text-slate-500 hover:text-white transition-colors duration-200">作品</a>
              <a href="/#services" className="block text-xs text-slate-500 hover:text-white transition-colors duration-200">服务能力</a>
              <a href="/#contact" className="block text-xs text-slate-500 hover:text-white transition-colors duration-200">技术合作</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">联系方式</p>
            <div className="space-y-2">
              <a href="tel:18389118642" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors duration-200">
                <Phone size={12} className="text-slate-600" /> 18389118642
              </a>
              <a href="mailto:554295000@qq.com" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors duration-200">
                <Mail size={12} className="text-slate-600" /> 554295000@qq.com
              </a>
              <a href="https://github.com/Leon-LY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors duration-200">
                <Code2 size={12} className="text-slate-600" /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-600">
            © 2025 Leon. 本网站所有 Demo 页面均为技术展示，数据与人物均为虚构。
          </p>
          <p className="text-[11px] text-slate-700">
            Built with React · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
