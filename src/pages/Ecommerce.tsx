import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, ShieldCheck, RotateCcw, Eye } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { ImgPlaceholder } from '../components/PlaceholderImage'

const product = {
  name: '极简都市双肩包', brand: 'URBAN EASE', price: 899, originalPrice: 1299,
  rating: 4.8, reviews: 2536, desc: '环保防水面料 · YKK 金属拉链 · RFID 防盗内层 · 15.6" 笔记本专用隔层 · USB 充电接口',
}

const allImages = [
  { id: '1', color: '深空灰', idx: 0 },
  { id: '2', color: '深空灰', idx: 1 },
  { id: '3', color: '墨蓝色', idx: 2 },
  { id: '4', color: '墨蓝色', idx: 3 },
]

const colors = [
  { name: '深空灰', code: '#4a4a4a', sizes: ['S','M','L'] },
  { name: '墨蓝色', code: '#1e3a5f', sizes: ['M','L'] },
  { name: '卡其棕', code: '#8b7355', sizes: ['S','M','L','XL'] },
]

const reviewList = [
  { user: '陈晓明', rating: 5, date: '2024-12-15', title: '质感超出预期，通勤必备', content: '背了一个月，越用越喜欢。面料手感很好，防水效果实测靠谱，笔记本隔层加厚设计很安心。', verified: true },
  { user: '林雨晴', rating: 5, date: '2024-12-10', title: '送给男朋友的礼物，他很喜欢', content: '包装精致，深空灰百搭。RFID 层设计贴心，日常上班和短途出差都够用。', verified: true },
  { user: '张伟', rating: 4, date: '2024-12-05', title: '整体不错，做工精良', content: '拉链顺滑，内部收纳分区合理。希望后续能出更多配色选择。', verified: true },
  { user: '王思然', rating: 5, date: '2024-11-28', title: '三天短途旅行完全够用', content: '设计巧妙，看着不大但超能装。背带透气性好，夏天也不会闷汗。', verified: true },
]

const relatedItems = [
  { name: '都市机能腰包', price: 299, rating: 4.7 },
  { name: '商务真皮手拿包', price: 459, originalPrice: 599, rating: 4.9 },
  { name: '旅行收纳六件套', price: 189, rating: 4.6 },
  { name: '轻量运动腰包', price: 159, originalPrice: 229, rating: 4.5 },
]

export default function Ecommerce() {
  const [img, setImg] = useState(0)
  const [color, setColor] = useState(colors[0].name)
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  const [notify, setNotify] = useState(false)
  const [heart, setHeart] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [tab, setTab] = useState<'details'|'reviews'|'shipping'>('details')

  const variant = colors.find(c=>c.name===color)!
  const imgs = allImages.filter(i=>i.color===color)

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · 此页面为 Demo 模板，展示品牌电商的产品设计与前端实现——商品画廊、SKU 选择系统、购物车流程、评价系统。</p>
        </div>
      </div>

      <AnimatePresence>{notify&&<motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"><Check size={16}/>已添加到购物车</motion.div>}</AnimatePresence>

      {/* Zoom overlay */}
      <AnimatePresence>{zoom&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setZoom(false)} className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-zoom-out">
        <img src={imgs[img]?.url||allImages[0].url} alt="" className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl" />
      </motion.div>}</AnimatePresence>

      <div className="pt-8 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="relative bg-[#111827] rounded-3xl overflow-hidden aspect-square border border-white/[0.04] group cursor-zoom-in" onClick={()=>setZoom(true)}>
              <AnimatePresence mode="wait"><motion.div key={img} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full h-full"><ImgPlaceholder aspect="1/1" idx={imgs[img]?.idx||0} className="w-full h-full" /></motion.div></AnimatePresence>
              {imgs.length>1&&<>
                <button onClick={e=>{e.stopPropagation();setImg(s=>(s-1+imgs.length)%imgs.length)}} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"><ChevronLeft size={18}/></button>
                <button onClick={e=>{e.stopPropagation();setImg(s=>(s+1)%imgs.length)}} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"><ChevronRight size={18}/></button>
              </>}
              <span className="absolute top-4 left-4 text-[11px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-lg">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
              <button onClick={e=>{e.stopPropagation()}} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-all"><Eye size={16}/></button>
            </motion.div>
            <div className="flex gap-2 mt-4">{imgs.map((i,idx)=><button key={i.id} onClick={()=>setImg(idx)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${idx===img?'border-white/30':'border-transparent opacity-40 hover:opacity-70'}`}><ImgPlaceholder aspect="1/1" idx={i.idx} className="w-full h-full" /></button>)}</div>
          </div>

          {/* Info */}
          <motion.div initial={{opacity:0,x:15}} animate={{opacity:1,x:0}}>
            <span className="text-[10px] font-medium text-blue-400 uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5"><div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className={i<Math.floor(product.rating)?'text-amber-400 fill-amber-400':'text-white/[0.08] fill-white/[0.08]'}/>)}</div><span className="text-sm font-semibold text-white">{product.rating}</span><span className="text-xs text-slate-500">({product.reviews.toLocaleString()} 条)</span></div>
            <div className="flex items-baseline gap-3 mb-5"><span className="text-3xl font-extrabold text-white">¥{product.price}</span><span className="text-lg text-slate-600 line-through">¥{product.originalPrice}</span><span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">省 ¥{product.originalPrice-product.price}</span></div>

            <div className="mb-5"><p className="text-xs font-medium text-slate-400 mb-3">颜色 — <span className="text-white">{color}</span></p><div className="flex gap-2.5">{colors.map(c=><button key={c.name} onClick={()=>{setColor(c.name);setImg(0)}} style={{backgroundColor:c.code}} className={`w-9 h-9 rounded-full transition-all ${color===c.name?'ring-2 ring-offset-2 ring-white ring-offset-[#0a0e1a]':'hover:scale-110'}`}/>)}</div></div>
            <div className="mb-5"><p className="text-xs font-medium text-slate-400 mb-3">尺码 — <span className="text-white">{size}</span></p><div className="flex gap-2">{variant.sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={`w-11 h-10 rounded-lg text-sm font-medium transition-all ${size===s?'bg-white text-black':'bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:border-white/[0.15]'}`}>{s}</button>)}</div></div>

            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center border border-white/[0.08] rounded-xl"><button onClick={()=>setQty(Math.max(1,qty-1))} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white"><Minus size={14}/></button><span className="w-10 text-center text-sm font-medium text-white">{qty}</span><button onClick={()=>setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white"><Plus size={14}/></button></div>
              <button onClick={()=>{setNotify(true);setTimeout(()=>setNotify(false),2000)}} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"><ShoppingCart size={16}/>加入购物车</button>
              <button onClick={()=>setHeart(!heart)} className={`w-11 h-11 rounded-xl border transition-all flex items-center justify-center ${heart?'bg-red-500/10 border-red-500/30 text-red-400':'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'}`}><Heart size={18} fill={heart?'currentColor':'none'}/></button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/[0.04] mb-7">
              {[{icon:Truck,t:'配送',s:'满¥299包邮'},{icon:RotateCcw,t:'退换',s:'30天无忧'},{icon:ShieldCheck,t:'正品',s:'品质保证'}].map(i=>(<div key={i.t} className="text-center"><i.icon size={16} className="text-slate-500 mx-auto mb-1"/><p className="text-[10px] font-medium text-slate-400">{i.t}</p><p className="text-[10px] text-slate-600">{i.s}</p></div>))}
            </div>

            {/* Tabs */}
            <div className="border-t border-white/[0.04] pt-5">
              <div className="flex gap-4 mb-4">
                {[{k:'details',l:'产品详情'},{k:'reviews',l:'用户评价'},{k:'shipping',l:'配送说明'}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k as any)} className={`text-sm font-medium transition-colors ${tab===t.k?'text-white':'text-slate-500 hover:text-slate-300'}`}>{t.l}</button>))}
              </div>
              {tab==='details'&&<p className="text-sm text-slate-500 leading-relaxed">{product.desc}</p>}
              {tab==='reviews'&&<div className="space-y-3 max-h-[300px] overflow-y-auto">{reviewList.map(r=>(<div key={r.user} className="bg-white/[0.02] rounded-xl p-4"><div className="flex items-center gap-2 mb-1"><span className="text-sm font-semibold text-white">{r.user}</span><div className="flex">{Array.from({length:5}).map((_,j)=><Star key={j} size={10} className={j<r.rating?'text-amber-400 fill-amber-400':'text-white/[0.06] fill-white/[0.06]'}/>)}</div>{r.verified&&<span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">已购</span>}</div><p className="text-xs text-slate-400">{r.content}</p></div>))}</div>}
              {tab==='shipping'&&<div className="text-sm text-slate-500 leading-relaxed space-y-2"><p>• 全国包邮（偏远地区除外），下单后 24 小时内发货</p><p>• 支持 7 天无理由退换，30 天内质量问题免费换新</p><p>• 顺丰 / 京东快递配送，大部分地区 1-3 天送达</p></div>}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        <div className="mt-20 pb-24">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6">相关推荐</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedItems.map(rp=>(<div key={rp.name} className="group bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-all cursor-pointer"><div className="aspect-square bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center text-4xl opacity-30">{['🎒','👜','📦','🏃'][relatedItems.indexOf(rp)]}</div><div className="p-4"><h4 className="text-sm font-medium text-white mb-1">{rp.name}</h4><div className="flex items-center gap-1 mb-2"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] text-slate-500">{rp.rating}</span></div><div className="flex items-baseline gap-2"><span className="text-sm font-bold text-white">¥{rp.price}</span>{rp.originalPrice&&<span className="text-[11px] text-slate-600 line-through">¥{rp.originalPrice}</span>}</div></div></div>))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a>
            <span className="text-slate-700">|</span>
            <span>探索其他：</span>
            <a href="/marketing" className="hover:text-white transition-colors">营销网站</a>
            <a href="/saas" className="hover:text-white transition-colors">SaaS 平台</a>
            <a href="/mobile-app" className="hover:text-white transition-colors">移动 App</a>
            <a href="/corporate" className="hover:text-white transition-colors">企业官网</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：Vue 3 · Pinia 状态管理 · 响应式设计 · 购物车与支付流程模拟</p>
        </div>
      </div>
    </PageTransition>
  )
}
