'use client'

import Link from 'next/link'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'motion/react'
import { site } from '@/content/site'
import { LocalTime } from './LocalTime'

const ease = [0.22, 1, 0.36, 1] as const

type MobileMenuProps = {
  open: boolean
  items: { href: string; label: string; index: string }[]
  transitionTypes?: string[]
  onNavigate: () => void
}

/** Full-screen mobile menu. Loaded on first open, so Motion never weighs on the initial page. */
export default function MobileMenu({ open, items, transitionTypes, onNavigate }: MobileMenuProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <ul className="container-x mt-6 border-t border-line">
              {items.map((item, i) => (
                <m.li
                  key={item.href}
                  className="overflow-hidden border-b border-line"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.05, ease }}
                >
                  <Link href={item.href} transitionTypes={transitionTypes} onClick={onNavigate} className="flex items-baseline justify-between py-5">
                    <span className="display text-5xl">{item.label}</span>
                    <span className="label">{item.index}</span>
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="container-x mt-auto grid gap-2 pb-10">
              <a href={`mailto:${site.email}`} className="text-lg font-medium">
                {site.email}
              </a>
              <LocalTime className="label tabular-nums" />
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
