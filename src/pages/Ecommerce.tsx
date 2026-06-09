import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { product, productImages, variants, reviews, relatedProducts } from '../data/ecommerce'

export default function Ecommerce() {
  const [img, setImg] = useState(0); const [color, setColor] = useState(variants[0].color)
  const [size, setSize] = useState('M'); const [qty, setQty] = useState(1)
  const [notify, setNotify] = useState(false); const [heart, setHeart] = useState(false)
  const variant = variants.find(v => v.color === color)!
  const imgs = productImages.filter(i => i.color === color)

  return (
    <PageTransition>
      <AnimatePresence>
        {notify && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
          <Check size={16} /> 已添加到购物车</motion.div>}
      </AnimatePresence>

      <div className="pt-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="relative bg-[#0b1120] rounded-3xl overflow-hidden aspect-square border border-white/[0.04]">
              <AnimatePresence mode="wait">
                <motion.img key={img} src={imgs[img]?.url || productImages[0].url} alt={product.name}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="w-full h-full object-cover" />
              </AnimatePresence>
              {imgs.length > 1 && <>
                <button onClick={() => setImg(s => (s-1+imgs.length)%imgs.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"><ChevronLeft size={18} /></button>
                <button onClick={() => setImg(s => (s+1)%imgs.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"><ChevronRight size={18} /></button>
              </>}
              <span className="absolute top-4 left-4 text-[11px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-lg">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </motion.div>
            <div className="flex gap-2 mt-4">
              {imgs.map((i, idx) => (
                <button key={i.id} onClick={() => setImg(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all ${idx===img?'border-white/30 opacity-100':'border-transparent opacity-40 hover:opacity-70'}`}>
                  <img src={i.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="text-[10px] font-medium text-blue-400 uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className={i<Math.floor(product.rating)?'text-amber-400 fill-amber-400':'text-white/[0.08] fill-white/[0.08]'} />)}</div>
              <span className="text-sm font-semibold text-white">{product.rating}</span>
              <span className="text-xs text-slate-600">({product.reviewCount.toLocaleString()} 条评价)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-extrabold text-white">¥{product.price}</span>
              <span className="text-lg text-slate-600 line-through">¥{product.originalPrice}</span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">省 ¥{product.originalPrice-product.price}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-7">{product.description}</p>

            <div className="mb-5">
              <p className="text-xs font-medium text-slate-400 mb-3">颜色 — <span className="text-white">{color}</span></p>
              <div className="flex gap-2.5">{variants.map(v => (
                <button key={v.color} onClick={()=>{setColor(v.color);setImg(0)}} style={{backgroundColor:v.colorCode}}
                  className={`w-9 h-9 rounded-full transition-all ${color===v.color?'ring-2 ring-offset-2 ring-white ring-offset-[#070b18]':'hover:scale-110'}`} />
              ))}</div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-medium text-slate-400 mb-3">尺码 — <span className="text-white">{size}</span></p>
              <div className="flex gap-2">{variant.sizes.map(s => (
                <button key={s} onClick={()=>setSize(s)}
                  className={`w-11 h-10 rounded-lg text-sm font-medium transition-all ${size===s?'bg-white text-black':'bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:border-white/[0.15]'}`}>{s}</button>
              ))}</div>
              <p className="text-[11px] text-slate-600 mt-2">库存 {variant.stock} 件</p>
            </div>

            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center border border-white/[0.08] rounded-xl">
                <button onClick={()=>setQty(Math.max(1,qty-1))} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white"><Minus size={14} /></button>
                <span className="w-10 text-center text-sm font-medium text-white">{qty}</span>
                <button onClick={()=>setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white"><Plus size={14} /></button>
              </div>
              <button onClick={()=>{setNotify(true);setTimeout(()=>setNotify(false),2000)}}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={16} /> 加入购物车</button>
              <button onClick={()=>setHeart(!heart)}
                className={`w-11 h-11 rounded-xl border transition-all flex items-center justify-center ${heart?'bg-red-500/10 border-red-500/30 text-red-400':'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'}`}>
                <Heart size={18} fill={heart?'currentColor':'none'} /></button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/[0.04]">
              {[{icon:Truck,t:'免费配送',s:'满 ¥299 包邮'},{icon:RotateCcw,t:'30天退换',s:'无忧保障'},{icon:ShieldCheck,t:'正品保证',s:'品质承诺'}].map(i=>(
                <div key={i.t} className="text-center"><i.icon size={16} className="text-slate-600 mx-auto mb-1" /><p className="text-[10px] font-medium text-slate-400">{i.t}</p><p className="text-[10px] text-slate-600">{i.s}</p></div>
              ))}</div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-24">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6">用户评价</p>
          <div className="grid md:grid-cols-2 gap-3">
            {reviews.map(r => (
              <div key={r.id} className="bg-[#0b1120] border border-white/[0.04] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3"><img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div><p className="text-sm font-semibold text-white">{r.user}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">{Array.from({length:5}).map((_,j)=><Star key={j} size={10} className={j<r.rating?'text-amber-400 fill-amber-400':'text-white/[0.06] fill-white/[0.06]'} />)}</div>
                      <span className="text-[11px] text-slate-600">{r.date}</span>
                    </div>
                  </div>
                  {r.verified && <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">已购买</span>}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{r.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-20 pb-24">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-6">相关推荐</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedProducts.map(rp => (
              <div key={rp.id} className="group bg-[#0b1120] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-all cursor-pointer">
                <div className="aspect-square overflow-hidden"><img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" /></div>
                <div className="p-4"><h4 className="text-sm font-medium text-white mb-1">{rp.name}</h4>
                  <div className="flex items-center gap-1 mb-2"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="text-[11px] text-slate-600">{rp.rating}</span></div>
                  <div className="flex items-baseline gap-2"><span className="text-sm font-bold text-white">¥{rp.price}</span>{rp.originalPrice&&<span className="text-[11px] text-slate-600 line-through">¥{rp.originalPrice}</span>}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04] px-6 py-4 text-center"><p className="text-[11px] text-slate-600">此页面为 Demo 模板。所有商品、价格和评价为虚构，仅供技术展示。</p></div>
    </PageTransition>
  )
}
