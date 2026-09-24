'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { RevealObserver } from './RevealObserver'

const OFFSET = -72

/** Distance from the target to its resting position under the sticky header. */
const drift = (el: HTMLElement) => el.getBoundingClientRect().top + OFFSET

/**
 * Same-page anchor links scroll smoothly, then correct once: sections that skip off-screen
 * layout (content-visibility) only report their real height after they render during the scroll.
 */
function AnchorScroll({ reduce }: { reduce: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!link) return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash || url.hash === '#main') return
      const target = document.querySelector<HTMLElement>(decodeURIComponent(url.hash))
      if (!target) return
      e.preventDefault()
      history.pushState(null, '', url.hash)
      lenis.scrollTo(target, {
        offset: OFFSET,
        immediate: reduce,
        onComplete: () => {
          if (Math.abs(drift(target)) > 2) lenis.scrollTo(target, { offset: OFFSET, duration: 0.5 })
        },
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [lenis, reduce])

  return null
}

/** After a route change, land at the top, or at the hash target (re-checked once late sections render). */
function ScrollReset() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    if (!lenis) return
    const target = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null
    if (!target) {
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }
    lenis.scrollTo(target, { immediate: true, force: true, offset: OFFSET })
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (Math.abs(drift(target)) > 2) lenis.scrollTo(target, { immediate: true, force: true, offset: OFFSET })
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [lenis, pathname])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Lenis stays mounted either way; reduced motion just turns smoothing off.
  const reduceMotion = useReducedMotion()

  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: !reduceMotion }}>
      <RevealObserver />
      <AnchorScroll reduce={reduceMotion} />
      <ScrollReset />
      {children}
    </ReactLenis>
  )
}
