import { Code2, Mail, Phone } from 'lucide-react'
import { personalInfo } from '../data/config'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-surface-0">
      {/* Top gradient transition */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(53,221,242,0.18), rgba(244,91,168,0.12), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-vt323 text-2xl tracking-wider text-white mb-2">
              {personalInfo.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full ml-1.5 align-middle" style={{ background: '#F45BA8', boxShadow: '0 0 10px rgba(244,91,168,0.7)' }} />
            </p>
            <p className="text-xs text-text-tertiary leading-relaxed max-w-xs">
              {personalInfo.tagline} · {personalInfo.subtitle}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">导航</p>
            <div className="space-y-2">
              <a href="/#portfolio" className="block text-xs text-text-tertiary hover:text-white transition-colors duration-200">任务档案</a>
              <a href="/about" className="block text-xs text-text-tertiary hover:text-white transition-colors duration-200">指挥官档案</a>
              <a href="/contact" className="block text-xs text-text-tertiary hover:text-white transition-colors duration-200">建立通讯</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">联系方式</p>
            <div className="space-y-2">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-xs text-text-tertiary hover:text-white transition-colors duration-200">
                <Phone size={12} className="text-text-tertiary" aria-hidden="true" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-xs text-text-tertiary hover:text-white transition-colors duration-200">
                <Mail size={12} className="text-text-tertiary" aria-hidden="true" />
                <span>{personalInfo.email}</span>
              </a>
              <a href="https://github.com/Leon-LY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-text-tertiary hover:text-white transition-colors duration-200">
                <Code2 size={12} className="text-text-tertiary" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-tertiary">
            © 2025 {personalInfo.name}. 全栈架构师 · 远程任务执行中。
          </p>
          <p className="text-[11px] text-text-tertiary">
            Built with React · TypeScript · Tailwind CSS · Framer Motion · Matter.js
          </p>
        </div>
      </div>
    </footer>
  )
}
