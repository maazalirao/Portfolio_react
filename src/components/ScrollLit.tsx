'use client'

import { useEffect, useRef } from 'react'

/**
 * Publishes scroll progress through the element as the CSS variable --p (0 → 1):
 * 0 when its top reaches 85% of the viewport, 1 when its bottom reaches 50%.
 * Words inside read --p to light up in order (see .lit-word). Fully lit for reduced motion.
 */
export function ScrollLit({ className, words, children }: { className?: string; words: number; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.85 - top) / (vh * 0.35 + height)
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <p ref={ref} className={className} style={{ '--n': words } as React.CSSProperties}>
      {children}
    </p>
  )
}
