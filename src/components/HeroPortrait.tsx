import { site } from '@/content/site'

const { portrait } = site
const srcSet = portrait.widths.map((w) => `${portrait.src}-${w}.webp ${w}w`).join(', ')

/* Rendered width of the cutout at each layout (see .portrait in globals.css). From md it is 115% of a 6.5rem circle. */
const SIZES = '(min-width: 768px) 7.5rem, (min-width: 600px) 24rem, 74vw'

/**
 * The portrait on a studio backdrop. Phones: a bust, the top of the head breaking out over the backdrop.
 * From md: a small circle beside the intro. Rises in on load (CSS, so it starts before hydration),
 * then never transforms again, so the photo stays pin-sharp.
 */
export function HeroPortrait({ className }: { className?: string }) {
  return (
    <figure className={`portrait ${className ?? ''}`}>
      <div className="portrait-frame">
        <div aria-hidden className="portrait-glow" />
        <div aria-hidden className="portrait-stage" />
        <picture className="portrait-media">
          <img
            src={`${portrait.src}-720.webp`}
            srcSet={srcSet}
            sizes={SIZES}
            width={1254}
            height={1254}
            alt={portrait.alt}
            fetchPriority="high"
            decoding="async"
            className="portrait-img"
          />
        </picture>
        {/* Short labels: they sit either side of the head, which fills the middle of the backdrop. */}
        <figcaption className="portrait-caption label">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.name}
          </span>
          <span>{site.city}</span>
        </figcaption>
      </div>
    </figure>
  )
}
