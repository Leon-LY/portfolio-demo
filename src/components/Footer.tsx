export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-white">Leon<span className="text-blue-500">.</span></p>
            <p className="text-xs text-slate-500 mt-1">独立全栈开发者 · Web 全栈 / 数据可视化 / 系统架构</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="tel:18389118642" className="hover:text-slate-300 transition-colors">18389118642</a>
            <a href="mailto:554295000@qq.com" className="hover:text-slate-300 transition-colors">554295000@qq.com</a>
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-white/[0.04] text-center">
          <p className="text-[11px] text-slate-600">© 2025 Leon. 本网站所有 Demo 页面均为技术展示，数据与人物均为虚构。</p>
        </div>
      </div>
    </footer>
  )
}
