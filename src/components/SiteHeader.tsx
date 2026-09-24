'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '@/content/site'
import { LocalTime } from './LocalTime'

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false })

const nav = [
  { href: '/#work', label: 'Work', index: '01' },
  { href: '/#experience', label: 'Experience', index: '02' },
  { href: '/#stack', label: 'Stack', index: '03' },
  { href: '/#contact', label: 'Contact', index: '04' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [menuLoaded, setMenuLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const back = pathname === '/' ? undefined : ['nav-back']

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`sticky top-0 z-40 bg-paper transition-[border-color] duration-300 ${
        scrolled && !open ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" transitionTypes={back} className="group inline-flex items-center gap-2.5 text-[0.95rem] font-medium tracking-tight">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} transitionTypes={back} className="group inline-flex items-baseline gap-1.5 text-sm">
              <span className="label text-[0.65rem] transition-colors group-hover:text-accent">{item.index}</span>
              <span className="link-line">{item.label}</span>
            </Link>
          ))}
          <LocalTime className="label hidden tabular-nums lg:inline" />
        </nav>

        <button
          type="button"
          className="label -mr-2 px-2 py-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => {
            setMenuLoaded(true)
            setOpen((v) => !v)
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {scrolled && !open && <div aria-hidden className="scroll-progress" />}

      {menuLoaded && <MobileMenu open={open} items={nav} transitionTypes={back} onNavigate={() => setOpen(false)} />}
    </header>
  )
}
