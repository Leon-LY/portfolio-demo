interface Props {
  className?: string
  lines?: number
}

export default function Skeleton({ className = '', lines = 3 }: Props) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer rounded-lg"
          style={{
            height: i === 0 ? '24px' : '16px',
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  )
}
