import { site } from '@/content/site'

const { portrait } = site
const srcSet = portrait.widths.map((w) => `${portrait.src}-${w}.webp ${w}w`).join(', ')

/* Rendered width of the cutout (see .portrait in globals.css): 115% of a 4.5rem circle on phones, up to a 6.5rem one from md. */
const SIZES = '(min-width: 768px) 7.5rem, 5.2rem'

/**
 * The portrait in a small circle on a studio backdrop, beside the intro. Rises in on load
 * (CSS, so it starts before hydration), then never transforms again, so the photo stays pin-sharp.
 */
export function HeroPortrait({ className }: { className?: string }) {
  return (
    <figure className={`portrait ${className ?? ''}`}>
      <div className="portrait-frame">
        <div aria-hidden className="portrait-stage" />
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
      </div>
    </figure>
  )
}
