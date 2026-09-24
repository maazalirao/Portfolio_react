import Link from 'next/link'
import { site } from '@/content/site'
import { HeroPortrait } from './HeroPortrait'
import { WorkStrip } from './WorkStrip'

type Vars = React.CSSProperties & Record<`--${string}`, string | number>

/** Words that rise in on load. Spaces sit outside the animated spans so they never collapse. */
function RisingWords({ text, start, className }: { text: string; start: number; className?: string }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span key={`${word}-${i}`}>
      <span className={`rise ${className ?? ''}`}>
        <span style={{ '--i': start + i, '--step': '32ms', '--base': '40ms' } as Vars}>{word}</span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

export function Hero() {
  const { lead, emphasis, tail } = site.headline
  const leadCount = lead.split(' ').length
  const emphasisCount = emphasis.split(' ').length

  return (
    <section aria-labelledby="hero-title" className="flex min-h-[calc(100svh-4rem)] flex-col pb-6 pt-6 md:pt-8">
      <div className="container-x">
        <div className="label fade-in grid grid-cols-2 gap-6 md:grid-cols-3" style={{ '--d': '0ms' } as Vars}>
          <span className="max-[419px]:hidden">{site.role}</span>
          <span className="hidden text-center md:block">Portfolio — {new Date().getFullYear()}</span>
          <span className="col-span-2 flex items-center gap-2.5 whitespace-nowrap text-ink min-[420px]:col-span-1 min-[420px]:justify-self-end md:col-span-1">
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </span>
        </div>

        <div className="hero-grid mt-[7vh] md:mt-[8vh]">
          <h1
            id="hero-title"
            className="hero-title display max-w-[13.5em] text-[clamp(2.6rem,6.3vw,6.4rem)] text-balance lg:text-[clamp(3.25rem,5.4vw,5.75rem)]"
          >
            <RisingWords text={lead} start={0} /> <RisingWords text={emphasis} start={leadCount} className="serif-accent" />{' '}
            <RisingWords text={tail} start={leadCount + emphasisCount} />
          </h1>

          <HeroPortrait className="hero-portrait" />

          <div
            className="hero-foot fade-in flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
            style={{ '--d': '650ms' } as Vars}
          >
            <p className="max-w-md text-lg leading-snug text-muted">{site.intro}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform duration-300 hover:scale-[1.03]"
              >
                View work <span aria-hidden className="arrow">↓</span>
              </Link>
              <Link href="/#contact" className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="link-line link-line-static">Get in touch</span>
                <span aria-hidden className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-14 md:pt-16">
        <WorkStrip />
      </div>
    </section>
  )
}
