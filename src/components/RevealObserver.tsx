'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** One IntersectionObserver for every [data-reveal] element on the page. Re-scans after each navigation. */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    })
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [pathname])

  return null
}
