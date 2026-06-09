import { useLocation } from 'react-router-dom'

export default function DemoBadge() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
      <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg border border-slate-700/50 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        {isHome ? '个人作品集' : 'Demo 模板展示'}
      </div>
    </div>
  )
}
