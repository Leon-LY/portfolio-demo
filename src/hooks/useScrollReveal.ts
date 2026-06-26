import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Enhanced scroll reveal hook using GSAP ScrollTrigger.
 * Provides staggered, spring-like entrance animations
 * that go beyond Framer Motion's basic whileInView.
 */

interface UseScrollRevealOptions {
  /** Animation direction: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Distance in px, default 60 */
  distance?: number
  /** Duration in seconds, default 0.7 */
  duration?: number
  /** Delay between staggered items in seconds */
  stagger?: number
  /** When to start the animation (scroll position relative to viewport) */
  start?: string
  /** Ease function */
  ease?: string
  /** Whether to only play once */
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const {
    direction = 'up',
    distance = 60,
    duration = 0.7,
    ease = 'power3.out',
    once = true,
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      ease,
    }

    switch (direction) {
      case 'up':
        fromVars.y = distance
        break
      case 'down':
        fromVars.y = -distance
        break
      case 'left':
        fromVars.x = distance
        break
      case 'right':
        fromVars.x = -distance
        break
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top bottom-=80px',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * Staggered reveal for a list of elements.
 * Use with a container ref — animates all children.
 */
export function useStaggerReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const {
    distance = 50,
    duration = 0.6,
    stagger = 0.08,
    ease = 'power3.out',
    once = true,
    start = 'top bottom-=60px',
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        y: distance,
        opacity: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
