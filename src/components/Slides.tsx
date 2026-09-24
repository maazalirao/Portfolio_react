'use client'

import Image from 'next/image'
import type { Screenshot } from '@/content/site'
import type { SlideState } from '@/lib/useSlideshow'

type SlidesProps = {
  images: Screenshot[]
  show: SlideState & { wait: number }
  sizes: string
  running: boolean
  interval: number
}

/** Current and previous slide, crossfading with a slow zoom (CSS). Preloads the next one while running. */
export function Slides({ images, show, sizes, running, interval }: SlidesProps) {
  const { index, prev, curAnimated, prevAnimated } = show
  const layers = prev >= 0 && prev !== index ? [prev, index] : [index]
  const next = (index + 1) % images.length
  const zoom = { '--zoom': `${interval + 1200}ms` } as React.CSSProperties

  return (
    <>
      {layers.map((i) => {
        const current = i === index
        const animated = current ? curAnimated : prevAnimated
        return (
          <div key={i} className={`absolute inset-0 origin-top-left ${current ? 'z-[1]' : 'z-0'} ${animated ? 'slide-in' : ''}`} style={zoom}>
            <Image
              src={images[i].src}
              alt={current ? images[i].alt : ''}
              fill
              sizes={sizes}
              quality={85}
              className="object-cover"
              style={{
                objectPosition: images[i].focus ?? 'left top',
                transform: images[i].zoom ? `scale(${images[i].zoom})` : undefined,
                transformOrigin: images[i].focus ?? 'left top',
              }}
            />
          </div>
        )
      })}
      {running && next !== index && (
        <Image src={images[next].src} alt="" fill sizes={sizes} quality={85} className="pointer-events-none opacity-0" aria-hidden />
      )}
    </>
  )
}

/** Thin progress segments, one per slide. Animates transform only. */
export function SlideBars({ count, show, running, className }: { count: number; show: SlideState & { wait: number }; running: boolean; className?: string }) {
  const { index, advances, wait } = show
  return (
    <div aria-hidden className={`flex gap-1.5 ${className ?? ''}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-current/25">
          <span
            key={i === index ? `run-${advances}` : 'idle'}
            className={`bar bg-current! ${i < index || (i === index && !running) ? 'bar-done' : i === index ? 'bar-run' : ''}`}
            style={i === index && running ? { animationDuration: `${wait}ms` } : undefined}
          />
        </span>
      ))}
    </div>
  )
}
