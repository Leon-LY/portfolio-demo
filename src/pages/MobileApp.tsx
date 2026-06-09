import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Apple, Smartphone } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { appInfo, appFeatures, screenshots, userStats, testimonials } from '../data/mobileApp'

export default function MobileApp() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[120px]" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-widest mb-6 block">
                  {appInfo.awards[0]}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-4">
                  {appInfo.name}
                </h1>
                <p className="text-xl text-[#a1a1a1] mb-3">{appInfo.tagline}</p>
                <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-md mb-8">
                  {appInfo.description}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">{appInfo.rating}</span>
                    <span className="text-xs text-[#525252]">({appInfo.ratingCount} 评价)</span>
                  </div>
                  <div className="w-px h-5 bg-white/[0.06]" />
                  <span className="text-sm text-[#a1a1a1]">{appInfo.downloads} 下载</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2.5">
                    <Apple size={18} />
                    <div className="text-left">
                      <p className="text-[9px] leading-tight opacity-60">Download on the</p>
                      <p className="text-xs font-bold leading-tight">App Store</p>
                    </div>
                  </button>
                  <button className="px-5 py-3 bg-white/[0.04] text-white rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] transition-all inline-flex items-center gap-2.5">
                    <Smartphone size={18} />
                    <div className="text-left">
                      <p className="text-[9px] leading-tight opacity-60">Get it on</p>
                      <p className="text-xs font-bold leading-tight">Google Play</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-[560px] bg-[#1a1a1a] rounded-[2.5rem] p-3 border border-white/[0.06] shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a1a] rounded-b-2xl z-10" />
                  <div className="w-full h-full bg-[#0d0d0d] rounded-[2.2rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeScreen}
                        src={screenshots[activeScreen].url}
                        alt={screenshots[activeScreen].alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex justify-center gap-1.5 mt-5">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreen(i)}
                      className={`h-1 rounded-full transition-all ${
                        i === activeScreen ? 'bg-white w-5' : 'bg-white/[0.15] w-1'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {userStats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="bg-[#0d0d0d] p-6 text-center">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#525252] mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">核心功能</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">为效果而设计</h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-2">
              {appFeatures.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.06}>
                  <button
                    onClick={() => setActiveFeature(i)}
                    className={`w-full text-left p-5 rounded-2xl transition-all ${
                      activeFeature === i
                        ? 'bg-white/[0.04] border border-white/[0.08]'
                        : 'border border-transparent hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                        activeFeature === i ? 'bg-emerald-500/10' : 'bg-white/[0.02]'
                      }`}>
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-0.5">{f.title}</h3>
                        <p className="text-xs text-[#6b6b6b] leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-64 h-[480px] bg-[#1a1a1a] rounded-[2.5rem] p-2.5 border border-white/[0.06] shadow-xl"
                >
                  <div className="w-full h-full bg-[#0d0d0d] rounded-[2rem] overflow-hidden">
                    <img
                      src={appFeatures[activeFeature].image}
                      alt={appFeatures[activeFeature].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-3">用户反馈</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">数百万用户的信赖</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.06}>
                <div className="bg-[#0d0d0d] p-7 hover:bg-[#141414] transition-colors duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#a1a1a1] leading-relaxed mb-5 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-white">{t.name}</p>
                      <p className="text-[11px] text-[#525252]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="bg-[#0d0d0d] border border-white/[0.04] rounded-3xl p-12 lg:p-16 text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">开启健康之旅</h2>
              <p className="text-[#6b6b6b] mb-8 max-w-md mx-auto">免费下载，含 14 天高级功能试用。</p>
              <div className="flex justify-center gap-3">
                <button className="px-5 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-[#e5e5e5] transition-all inline-flex items-center gap-2">
                  <Apple size={18} /> App Store
                </button>
                <button className="px-5 py-3 bg-white/[0.04] text-white rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] transition-all inline-flex items-center gap-2">
                  <Smartphone size={18} /> Google Play
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-[#525252]">
          此页面为 Demo 模板。所有截图、功能及数据均为虚构，仅供技术展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
