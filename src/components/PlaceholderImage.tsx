/** Placeholder images — warm amber/monochrome gradients */

const gradients = [
  'from-amber-500/25 via-yellow-500/15 to-accent/25',
  'from-emerald-500/25 via-teal-500/15 to-cyan-500/25',
  'from-amber-500/25 via-orange-500/15 to-rose-500/25',
  'from-accent/25 via-yellow-500/15 to-amber-500/25',
  'from-rose-500/25 via-pink-500/15 to-fuchsia-500/25',
  'from-lime-500/25 via-green-500/15 to-emerald-500/25',
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
