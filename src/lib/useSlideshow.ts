'use client'

import { useEffect, useState } from 'react'

export type SlideState = {
  index: number
  prev: number
  curAnimated: boolean
  prevAnimated: boolean
  advances: number
}

/** Advances through `count` slides every `interval` ms while `active`. The first wait adds `offset`. */
export function useSlideshow({ count, interval, offset = 0, active }: { count: number; interval: number; offset?: number; active: boolean }) {
  const [state, setState] = useState<SlideState>({ index: 0, prev: -1, curAnimated: false, prevAnimated: false, advances: 0 })
  const wait = interval + (state.advances === 0 ? offset : 0)

  useEffect(() => {
    if (!active || count < 2) return
    const id = setTimeout(() => {
      setState((s) => ({
        index: (s.index + 1) % count,
        prev: s.index,
        curAnimated: true,
        prevAnimated: s.curAnimated,
        advances: s.advances + 1,
      }))
    }, wait)
    return () => clearTimeout(id)
  }, [active, state.index, wait, count])

  return { ...state, wait }
}

/** True while the element is at least 30% on screen. */
export function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}
