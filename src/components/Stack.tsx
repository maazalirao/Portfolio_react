import { stack } from '@/content/site'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Stack() {
  return (
    <section aria-labelledby="stack" className="cv container-x pt-32 md:pt-44" style={{ '--cis': '1100px' } as React.CSSProperties}>
      <SectionHeading id="stack" index="03" title="Stack" note="What I reach for, grouped by layer." />

      <dl className="mt-12 border-b border-line md:mt-16">
        {stack.map((group) => (
          <Reveal key={group.group} className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-7 md:py-9">
            <dt className="label col-span-12 pt-2 md:col-span-3">{group.group}</dt>
            <dd className="col-span-12 text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.03em] md:col-span-9">
              {group.items.map((item, i) => (
                <span key={item}>
                  <span className="whitespace-nowrap">{item}</span>
                  {i < group.items.length - 1 && (
                    <span aria-hidden className="serif-accent px-[0.3em] text-dim">
                      /
                    </span>
                  )}
                  {i < group.items.length - 1 && <span className="sr-only">,</span>}{' '}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
