import { Link } from 'react-router-dom'

const demoPages = [
  { path: '/marketing', label: '营销网站 Demo' },
  { path: '/saas', label: 'SaaS 产品 Demo' },
  { path: '/ecommerce', label: '电商平台 Demo' },
  { path: '/mobile-app', label: '移动应用 Demo' },
  { path: '/corporate', label: '企业官网 Demo' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <Link to="/" className="text-base font-bold tracking-tight text-white">
              Leon<span className="text-[#8b5cf6]">.</span>
            </Link>
            <p className="text-sm text-[#6b6b6b] mt-4 leading-relaxed max-w-xs">
              全栈软件工程师，专注于性能优化、交互体验与技术实现。
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#6b6b6b] mb-5">Demo 模板</p>
            <ul className="space-y-2.5">
              {demoPages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path} className="text-sm text-[#a1a1a1] hover:text-white transition-colors">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-[#6b6b6b] mb-5">声明</p>
            <p className="text-sm text-[#6b6b6b] leading-relaxed">
              本网站所有模板页面均为 Demo 作品，仅供展示技术能力。所有数据、案例、人物均为虚构，不代表真实业务。
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#525252]">
            © 2025 Leon. Demo 作品集 — 仅供技术展示。
          </p>
          <p className="text-xs text-[#525252]">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
