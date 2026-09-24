'use client'

import { useRef, useState, ViewTransition } from 'react'
import Link from 'next/link'
import type { Project } from '@/content/site'
import { showcaseImages } from '@/content/site'
import { textOn } from '@/lib/color'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useInView, useSlideshow } from '@/lib/useSlideshow'
import { BrowserFrame } from './BrowserFrame'
import { SlideBars, Slides } from './Slides'

const pad = (n: number) => String(n).padStart(2, '0')

function usePlayback(ref: React.RefObject<HTMLElement | null>, count: number, interval: number, offset: number) {
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  // null = follow the reduced-motion preference until the visitor presses play or pause.
  const [pausedChoice, setPaused] = useState<boolean | null>(null)
  const paused = pausedChoice ?? reduce
  const running = count > 1 && !paused && inView
  const show = useSlideshow({ count, interval, offset, active: running })
  return { show, running, paused, toggle: () => setPaused(!paused) }
}

function PauseButton({ paused, onClick, title, className }: { paused: boolean; onClick: () => void; title: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label absolute z-[4] rounded-full px-3 py-1.5 transition-colors ${className ?? ''}`}
      aria-label={paused ? `Play ${title} screens` : `Pause ${title} screens`}
    >
      {paused ? 'Play' : 'Pause'}
    </button>
  )
}

/**
 * Featured project: a brand stage (or a custom stage colour) with the product running in a browser
 * window and the title set on the stage. Text colour adapts to the stage.
 */
export function FeaturedStage({ project, number, offset = 0 }: { project: Project; number: number; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const interval = 4200
  const images = showcaseImages(project)
  const { show, running, paused, toggle } = usePlayback(ref, images.length, interval, offset)
  const eyebrow = [project.category, project.region, project.year].filter(Boolean).join(' · ')
  // A custom stage colour is used as-is; otherwise the brand colour is deepened in CSS.
  const on = project.stage ? textOn(project.stage) : '#f7f5f0'
  const stageStyle = {
    '--brand': project.color,
    ...(project.stage ? { '--stage': project.stage } : {}),
    '--on': on,
    '--chip': on === '#141412' ? 'rgb(11 11 10 / 0.07)' : 'rgb(11 11 10 / 0.3)',
  } as React.CSSProperties

  return (
    <div ref={ref} className="relative">
      <Link href={`/work/${project.slug}`} transitionTypes={['nav-forward']} className="group block">
        <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
          <div className="cinema" style={stageStyle}>
            <div className="cinema-copy">
              <p className="label cinema-chip">
                <span className="tabular-nums">{pad(number)}</span> — <span className="sm:hidden">{project.category}</span>
                <span className="hidden sm:inline">{eyebrow}</span>
              </p>
              <div className="cinema-text">
                <h3 className="display text-[clamp(2.1rem,4.4vw,4.4rem)]">
                  <span className="link-line">{project.name}</span>
                </h3>
                <p className="mt-4 text-[clamp(1rem,1.3vw,1.2rem)] leading-snug opacity-80">{project.tagline}</p>
                <span className="mt-7 hidden items-center gap-2 rounded-full border border-current/35 px-4 py-2 text-sm font-medium sm:inline-flex">
                  Case study <span aria-hidden className="arrow">→</span>
                </span>
              </div>
            </div>

            <div className="cinema-front">
              <BrowserFrame>
                <Slides images={images} show={show} running={running} interval={interval} sizes="(min-width: 1024px) 64vw, 100vw" />
              </BrowserFrame>
              <SlideBars count={images.length} show={show} running={running} className="mt-3" />
            </div>
          </div>
        </ViewTransition>
      </Link>
      {images.length > 1 && (
        <PauseButton
          paused={paused}
          onClick={toggle}
          title={project.name}
          className={`right-4 top-4 md:right-6 md:top-6 ${on === '#141412' ? 'bg-[#0b0b0a]/8 text-[#141412]! hover:bg-[#0b0b0a]/15' : 'bg-[#0b0b0a]/35 text-[#f7f5f0]! hover:bg-[#0b0b0a]/60'}`}
        />
      )}
    </div>
  )
}

/** Secondary project: a calm paper stage with the product rising from the bottom edge in a browser window. */
export function PaperCard({ project, number, offset = 0 }: { project: Project; number: number; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const interval = 3600
  const images = showcaseImages(project)
  const { show, running, paused, toggle } = usePlayback(ref, images.length, interval, offset)

  return (
    <div ref={ref} className="relative">
      <Link href={`/work/${project.slug}`} transitionTypes={['nav-forward']} className="group block">
        <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
          <div className="paper-stage" style={{ '--brand': project.color } as React.CSSProperties}>
            <BrowserFrame className="paper-browser">
              <Slides images={images} show={show} running={running} interval={interval} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 80vw" />
            </BrowserFrame>
          </div>
        </ViewTransition>
        <div className="mt-6 flex items-baseline gap-3">
          <span aria-hidden className="serif-accent text-2xl leading-none text-muted tabular-nums">
            {pad(number)}
          </span>
          <h3 className="text-[clamp(1.4rem,2vw,1.85rem)] font-medium leading-none tracking-[-0.03em]">
            <span className="link-line">{project.name}</span>
          </h3>
          <span className="label ml-auto tabular-nums">{project.year}</span>
        </div>
        <p className="mt-3 leading-snug text-muted">{project.tagline}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          <p className="label truncate">{project.stack.slice(0, 4).join(' · ')}</p>
          <SlideBars count={images.length} show={show} running={running} className="w-24 shrink-0 text-ink" />
        </div>
      </Link>
      {images.length > 1 && (
        <PauseButton paused={paused} onClick={toggle} title={project.name} className="right-3 top-3 bg-paper/80 text-ink! hover:bg-paper" />
      )}
    </div>
  )
}
