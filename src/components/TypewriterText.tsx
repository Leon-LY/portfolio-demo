import { useState, useEffect } from 'react'

export default function TypewriterText({ texts, className = '' }: {
  texts: string[]; className?: string
}) {
  const [ti, setTi] = useState(0); const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false); const [txt, setTxt] = useState('')

  useEffect(() => {
    const cur = texts[ti]
    const t = setTimeout(() => {
      if (!del) {
        if (ci < cur.length) { setTxt(cur.slice(0, ci+1)); setCi(ci+1) }
        else setTimeout(() => setDel(true), 2500)
      } else {
        if (ci > 0) { setTxt(cur.slice(0, ci-1)); setCi(ci-1) }
        else { setDel(false); setTi((ti+1)%texts.length) }
      }
    }, del ? 35 : 70)
    return () => clearTimeout(t)
  }, [ci, del, ti, texts])

  return <span className={className}>{txt}<span className="inline-block w-px h-[0.85em] bg-blue-400 ml-1 animate-pulse align-middle" /></span>
}
