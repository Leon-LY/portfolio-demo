import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Full-screen image lightbox gallery.
 * Keyboard navigation (← →), click outside to close.
 */

interface LightboxProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onClose: () => void
}

export default function Lightbox({ images, initialIndex = 0, open, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => {
        const next = prev + dir
        if (next < 0) return images.length - 1
        if (next >= images.length) return 0
        return next
      })
    },
    [images.length]
  )

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, goTo])

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  if (!images.length) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.12] transition-all z-10"
            aria-label="关闭"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-text-tertiary font-mono">
            {index + 1} / {images.length}
          </div>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={`图片 ${index + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              draggable={false}
            />
          </motion.div>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(-1)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.1] transition-all"
                aria-label="上一张"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(1)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.1] transition-all"
                aria-label="下一张"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all ${
                    i === index
                      ? 'border-accent opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
