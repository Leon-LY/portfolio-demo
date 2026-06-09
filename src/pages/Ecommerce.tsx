import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { product, productImages, variants, reviews, relatedProducts } from '../data/ecommerce'

export default function Ecommerce() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(variants[0].color)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [, setCartCount] = useState(0)
  const [showCartNotification, setShowCartNotification] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const activeVariant = variants.find((v) => v.color === selectedColor)!
  const filteredImages = productImages.filter((img) => img.color === selectedColor)

  const addToCart = () => {
    setCartCount((c) => c + quantity)
    setShowCartNotification(true)
    setTimeout(() => setShowCartNotification(false), 2500)
  }

  return (
    <PageTransition>
      {/* Cart notification */}
      <AnimatePresence>
        {showCartNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl font-medium flex items-center gap-2"
          >
            <Check size={18} /> 已添加到购物车
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-slate-50 rounded-3xl overflow-hidden mb-4 aspect-square group"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={filteredImages[selectedImage]?.url || productImages[0].url}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Image nav */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((s) => (s - 1 + filteredImages.length) % filteredImages.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((s) => (s + 1) % filteredImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Sale badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {filteredImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                {product.brand}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-800">{product.rating}</span>
                <span className="text-sm text-slate-400">({product.reviewCount.toLocaleString()} 条评价)</span>
                <span className="text-sm text-slate-400">|</span>
                <span className="text-sm text-slate-400">已售 {product.sales.toLocaleString()}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">¥{product.price}</span>
                <span className="text-lg text-slate-400 line-through">¥{product.originalPrice}</span>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  省 ¥{product.originalPrice - product.price}
                </span>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">{product.description}</p>

              {/* Color picker */}
              <div className="mb-5">
                <div className="text-sm font-semibold text-slate-700 mb-3">
                  颜色：<span className="text-slate-500 font-normal">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => {
                        setSelectedColor(v.color)
                        setSelectedImage(0)
                      }}
                      className={`relative w-10 h-10 rounded-full transition-all ${
                        selectedColor === v.color ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: v.colorCode }}
                      title={v.color}
                    >
                      {selectedColor === v.color && (
                        <Check size={14} className="text-white absolute inset-0 m-auto drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size picker */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-slate-700 mb-3">
                  尺码：<span className="text-slate-500 font-normal">{selectedSize}</span>
                </div>
                <div className="flex gap-2">
                  {activeVariant.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white shadow-lg'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-emerald-600 mt-2">
                  库存充足（{activeVariant.stock} 件）
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  加入购物车
                </button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-12 h-12 rounded-xl border transition-all flex items-center justify-center ${
                    wishlisted
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-white border-slate-200 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Shipping info */}
              <div className="grid grid-cols-3 gap-3 py-5 border-t border-slate-100">
                {[
                  { icon: Truck, text: '免费配送', sub: '订单满 ¥299' },
                  { icon: RotateCcw, text: '30天退换', sub: '无忧保障' },
                  { icon: ShieldCheck, text: '正品保证', sub: '品质承诺' },
                ].map((item) => (
                  <div key={item.text} className="text-center">
                    <item.icon size={18} className="text-slate-400 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-slate-700">{item.text}</div>
                    <div className="text-xs text-slate-400">{item.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features list */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">产品特性</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {product.features.map((f, i) => (
              <ScrollReveal key={f} delay={i * 0.05}>
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{f}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">用户评价</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold text-slate-900">{product.rating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">({product.reviewCount.toLocaleString()})</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.1}>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{review.user}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              size={12}
                              className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                        已购买
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">{review.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{review.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">相关推荐</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rp, i) => (
              <ScrollReveal key={rp.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {rp.originalPrice && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        -{Math.round((1 - rp.price / rp.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-1">{rp.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-500">{rp.rating} ({rp.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-slate-900">¥{rp.price}</span>
                      {rp.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">¥{rp.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ 本页面为 Demo 模板，所有商品信息、价格和评价均为展示用途，不代表真实商品销售。
        </p>
      </div>
    </PageTransition>
  )
}
