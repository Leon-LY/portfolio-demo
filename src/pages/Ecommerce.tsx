import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { product, productImages, variants, reviews, relatedProducts } from '../data/ecommerce'

export default function Ecommerce() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(variants[0].color)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const activeVariant = variants.find((v) => v.color === selectedColor)!
  const filteredImages = productImages.filter((img) => img.color === selectedColor)

  const addToCart = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <PageTransition>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"
          >
            <Check size={16} /> 已添加到购物车
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative bg-[#0d0d0d] rounded-3xl overflow-hidden aspect-square border border-white/[0.04]"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={filteredImages[selectedImage]?.url || productImages[0].url}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((s) => (s - 1 + filteredImages.length) % filteredImages.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((s) => (s + 1) % filteredImages.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                <span className="absolute top-4 left-4 text-[11px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-lg">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </motion.div>

              <div className="flex gap-2 mt-4">
                {filteredImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                      i === selectedImage ? 'border-white/30 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[10px] font-medium text-[#8b5cf6] uppercase tracking-widest">{product.brand}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/[0.08] fill-white/[0.08]'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{product.rating}</span>
                <span className="text-xs text-[#525252]">({product.reviewCount.toLocaleString()} 条评价)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-white">¥{product.price}</span>
                <span className="text-lg text-[#525252] line-through">¥{product.originalPrice}</span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                  省 ¥{product.originalPrice - product.price}
                </span>
              </div>

              <p className="text-sm text-[#6b6b6b] leading-relaxed mb-8">{product.description}</p>

              <div className="mb-6">
                <p className="text-xs font-medium text-[#a1a1a1] mb-3">
                  颜色 — <span className="text-white">{selectedColor}</span>
                </p>
                <div className="flex gap-2.5">
                  {variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => { setSelectedColor(v.color); setSelectedImage(0) }}
                      className={`w-9 h-9 rounded-full transition-all ${
                        selectedColor === v.color ? 'ring-2 ring-offset-2 ring-white ring-offset-[#080808]' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: v.colorCode }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-medium text-[#a1a1a1] mb-3">
                  尺码 — <span className="text-white">{selectedSize}</span>
                </p>
                <div className="flex gap-2">
                  {activeVariant.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-10 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-white text-black'
                          : 'bg-white/[0.03] text-[#a1a1a1] border border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#525252] mt-2">库存 {activeVariant.stock} 件</p>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center border border-white/[0.08] rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-[#a1a1a1] hover:text-white hover:bg-white/[0.04] transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-[#a1a1a1] hover:text-white hover:bg-white/[0.04] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="flex-1 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-[#e5e5e5] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  加入购物车
                </button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-11 h-11 rounded-xl border transition-all flex items-center justify-center ${
                    wishlisted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/[0.02] border-white/[0.08] text-[#a1a1a1] hover:text-white'
                  }`}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.04]">
                {[
                  { icon: Truck, t: '免费配送', s: '满 ¥299 包邮' },
                  { icon: RotateCcw, t: '30天退换', s: '无忧保障' },
                  { icon: ShieldCheck, t: '正品保证', s: '品质承诺' },
                ].map((item) => (
                  <div key={item.t} className="text-center">
                    <item.icon size={16} className="text-[#525252] mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-[#a1a1a1]">{item.t}</p>
                    <p className="text-[10px] text-[#525252]">{item.s}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-24">
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-6">产品特性</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3">
                  <Check size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-xs text-[#a1a1a1]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">用户评价</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-[#525252]">({product.reviewCount.toLocaleString()} 条)</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#0d0d0d] border border-white/[0.04] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={review.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-white">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={10} className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/[0.06] fill-white/[0.06]'} />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#525252]">{review.date}</span>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium">已购买</span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{review.title}</h4>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">{review.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 pb-24">
            <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-6">相关推荐</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {relatedProducts.map((rp) => (
                <div key={rp.id} className="group bg-[#0d0d0d] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-all cursor-pointer">
                  <div className="aspect-square overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white mb-1">{rp.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-[11px] text-[#525252]">{rp.rating}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-white">¥{rp.price}</span>
                      {rp.originalPrice && <span className="text-[11px] text-[#525252] line-through">¥{rp.originalPrice}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04] px-6 py-4 text-center">
        <p className="text-[11px] text-[#525252]">
          此页面为 Demo 模板。所有商品、价格和评价均为虚构，仅供技术展示用途。
        </p>
      </div>
    </PageTransition>
  )
}
