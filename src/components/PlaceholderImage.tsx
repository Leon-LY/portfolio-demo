/** Demo 页占位图 — 替代被墙的 Unsplash 外链 */

const gradients = [
  'from-blue-500/30 via-violet-500/20 to-purple-500/30',
  'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
  'from-amber-500/30 via-orange-500/20 to-rose-500/30',
  'from-sky-500/30 via-indigo-500/20 to-blue-500/30',
  'from-rose-500/30 via-pink-500/20 to-fuchsia-500/30',
  'from-lime-500/30 via-green-500/20 to-emerald-500/30',
]

export function ImgPlaceholder({ aspect = '16/9', text = '', idx = 0, className = '' }: { aspect?: string; text?: string; idx?: number; className?: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center ${className}`}
      style={{ aspectRatio: aspect }}>
      {text && <span className="text-white/30 text-lg font-medium">{text}</span>}
    </div>
  )
}

export function AvatarPlaceholder({ initial = '?', size = 40, idx = 0 }: { initial?: string; size?: number; idx?: number }) {
  return (
    <div className={`rounded-full bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center flex-shrink-0`}
      style={{ width: size, height: size }}>
      <span className="text-white/50 text-sm font-bold">{initial}</span>
    </div>
  )
}
