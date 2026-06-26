/**
 * Hero background — subtle tech grid + radial glow.
 * Pure CSS, zero JS runtime cost. Creates "command center" feel.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 70%)',
        }}
      />
      {/* Cyan glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse at center, #00E5FF 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
  )
}
