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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-teal-200/30 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6">
                  🏆 {appInfo.awards[0]}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
                  {appInfo.name}
                </h1>
                <p className="text-xl text-slate-500 font-light mb-3">{appInfo.tagline}</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-md">
                  {appInfo.description}
                </p>

                {/* Rating & downloads */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{appInfo.rating}</div>
                      <div className="text-xs text-slate-400">{appInfo.ratingCount} 评价</div>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">{appInfo.downloads}</div>
                    <div className="text-xs text-slate-400">下载量</div>
                  </div>
                </div>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
                    <Apple size={20} />
                    <div className="text-left">
                      <div className="text-[10px] leading-tight opacity-70">Download on the</div>
                      <div className="text-sm font-semibold leading-tight">App Store</div>
                    </div>
                  </button>
                  <button className="px-5 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
                    <Smartphone size={20} />
                    <div className="text-left">
                      <div className="text-[10px] leading-tight opacity-70">Get it on</div>
                      <div className="text-sm font-semibold leading-tight">Google Play</div>
                    </div>
                  </button>
                </div>

                {/* Awards */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {appInfo.awards.map((award) => (
                    <span
                      key={award}
                      className="text-xs text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Phone frame */}
                <div className="w-72 h-[560px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-slate-900/20 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10" />
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeScreen}
                        src={screenshots[activeScreen].url}
                        alt={screenshots[activeScreen].alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* Screen nav dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreen(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeScreen ? 'bg-emerald-500 w-6' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {userStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              核心功能
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              强大的功能，简洁的体验
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Feature list */}
            <div className="space-y-4">
              {appFeatures.map((feature, i) => (
                <ScrollReveal key={feature.title} delay={i * 0.1} direction="left">
                  <motion.button
                    onClick={() => setActiveFeature(i)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                      activeFeature === i
                        ? 'bg-white shadow-lg border border-emerald-100 ring-1 ring-emerald-500/20'
                        : 'bg-transparent border border-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        activeFeature === i ? 'bg-emerald-500 text-white' : 'bg-white text-slate-700'
                      }`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 mb-1">{feature.title}</h3>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.button>
                </ScrollReveal>
              ))}
            </div>

            {/* Feature preview */}
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-64 h-[480px] bg-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-slate-900/15"
                >
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
              用户的真实反馈
            </h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
              全球数百万用户的信赖之选
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              立即下载，开启健康之旅
            </h2>
            <p className="text-emerald-100 mb-8">免费下载，14 天高级功能试用</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Apple size={20} />
                App Store
              </button>
              <button className="px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                <Smartphone size={20} />
                Google Play
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ 本页面为 Demo 模板，所有功能、数据和截图均为展示用途，不代表真实 App 产品。
        </p>
      </div>
    </PageTransition>
  )
}
