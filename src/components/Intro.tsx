import { site } from '@/content/site'
import { ScrollLit } from './ScrollLit'

/** A short statement whose words light up in reading order as it scrolls through the viewport. */
export function Intro() {
  const words = site.statement.split(' ')

  return (
    <section aria-label="About" className="container-x pt-28 md:pt-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <p className="label col-span-12 pt-3 md:col-span-3">(About)</p>
        <ScrollLit
          words={words.length}
          className="col-span-12 text-[clamp(1.75rem,3.6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] md:col-span-9"
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span className="lit-word" style={{ '--i': i } as React.CSSProperties}>
                {word}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </ScrollLit>
      </div>

      <dl className="mt-16 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-24">
        {[
          { label: 'Based in', value: site.location },
          { label: 'Working with', value: site.regions.join(', ') },
          { label: 'Timezone', value: site.timezoneLabel },
        ].map((item, i) => (
          <div key={item.label} className={`col-span-12 border-t border-line pt-4 sm:col-span-4 md:col-span-3 ${i === 0 ? 'md:col-start-4' : ''}`}>
            <dt className="label">{item.label}</dt>
            <dd className="mt-2">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
