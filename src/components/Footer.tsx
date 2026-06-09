import { Link } from 'react-router-dom'
import { Briefcase, Mail, ExternalLink, Code } from 'lucide-react'

const demoPages = [
  { path: '/marketing', label: '营销网站 Demo' },
  { path: '/saas', label: 'SaaS 产品 Demo' },
  { path: '/ecommerce', label: '电商平台 Demo' },
  { path: '/mobile-app', label: '移动 App Demo' },
  { path: '/corporate', label: '企业官网 Demo' },
]

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
                AC
              </div>
              <div>
                <h3 className="text-white font-semibold">Alex Chen</h3>
                <p className="text-xs text-slate-400">全栈软件工程师</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">
              专注于构建高性能、用户友好的 Web 与移动端产品。
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
              >
                <Code size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
              >
                <Briefcase size={18} />
              </a>
              <a
                href="mailto:alex.chen@example.com"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Demo pages */}
          <div>
            <h4 className="text-white font-medium mb-4">Demo 模板展示</h4>
            <ul className="space-y-2">
              {demoPages.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">联系方式</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-slate-400">
                <Mail size={14} />
                alex.chen@example.com
              </p>
              <p className="text-slate-400">📍 中国，上海</p>
              <p className="text-xs text-slate-500 mt-4">
                本网站所有模板页面均为 Demo 作品，仅供技术能力展示使用。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2025 Alex Chen. Demo Portfolio — 仅供技术展示。
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <ExternalLink size={12} />
            在 GitHub 上查看源码
          </a>
        </div>
      </div>
    </footer>
  )
}
