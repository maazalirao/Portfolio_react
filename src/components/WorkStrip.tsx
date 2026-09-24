'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { stripProjects } from '@/content/site'
import { textOn } from '@/lib/color'

/**
 * Full-bleed strip of project "stages": the project's brand colour, its name, and the product
 * peeking in from the corner. Drifts slowly sideways; pauses on hover, focus or the pause button,
 * and stays still for reduced motion.
 */
export function WorkStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="relative">
      <div className="marquee" data-paused={paused}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 || undefined}>
              {stripProjects.map((project, i) => (
                <li key={project.slug} className="shrink-0">
                  <Link
                    href={`/work/${project.slug}`}
                    transitionTypes={['nav-forward']}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group block w-[clamp(15.5rem,25vw,23rem)]"
                  >
                    <div className="stage aspect-[5/4]" style={{ background: project.color, color: textOn(project.color) }}>
                      <div className="relative z-[2] flex items-start justify-between gap-4 p-4 md:p-5">
                        <div className="min-w-0">
                          <p className="truncate text-[clamp(1.15rem,1.6vw,1.45rem)] font-medium leading-none tracking-[-0.03em]">{project.name}</p>
                          <p className="label mt-2 truncate text-current! opacity-85">{project.category}</p>
                        </div>
                        <span aria-hidden className="arrow shrink-0 text-lg leading-none">
                          →
                        </span>
                      </div>
                      <div className="stage-shot">
                        <Image
                          src={project.images[0].src}
                          alt={copy === 1 ? '' : project.images[0].alt}
                          fill
                          sizes="(min-width: 1024px) 23rem, 70vw"
                          quality={85}
                          className="object-left-top"
                          // Low priority: the headline is the LCP; tiles fill in right after without competing with it.
                          loading={copy === 0 && i < 4 ? 'eager' : 'lazy'}
                          fetchPriority="low"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container-x mt-4 flex items-center justify-between">
        <p className="label">{stripProjects.length} case studies</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="label text-ink transition-colors hover:text-accent motion-reduce:hidden"
          aria-label={paused ? 'Play project strip' : 'Pause project strip'}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  )
}
