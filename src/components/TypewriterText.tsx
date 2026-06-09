import { useState, useEffect } from 'react'

interface Props {
  texts: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypewriterText({
  texts,
  className = '',
  speed = 70,
  deleteSpeed = 35,
  pauseTime = 3000,
}: Props) {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentText = texts[textIndex]
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            setIsDeleting(false)
            setTextIndex((textIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    )
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-px h-[0.85em] bg-[#8b5cf6] ml-0.5 align-middle animate-pulse" />
    </span>
  )
}
