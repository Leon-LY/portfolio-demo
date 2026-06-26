import { useState, useEffect } from 'react'

/**
 * Visible typewriter effect — characters appear one by one with a blinking cursor.
 * Starts after delay, runs ONCE. Fast enough to see but not wait forever.
 */
interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  showCursor?: boolean
}

export default function TypewriterText({
  text,
  className = '',
  delay = 0.5,
  speed = 40,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(start)
  }, [text, delay, speed])

  // Blink cursor
  useEffect(() => {
    if (!done) return
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [done])

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && (
        <span className="inline-block w-[2px] h-[0.9em] bg-accent ml-0.5 align-middle animate-pulse" />
      )}
      {showCursor && done && (
        <span
          className="inline-block w-[2px] h-[0.9em] bg-accent ml-0.5 align-middle transition-opacity"
          style={{ opacity: cursor ? 1 : 0 }}
        />
      )}
    </span>
  )
}
