import { education, experience } from '@/content/site'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section aria-labelledby="experience" className="cv container-x pt-32 md:pt-44" style={{ '--cis': '1500px' } as React.CSSProperties}>
      <SectionHeading id="experience" index="02" title="Experience" />

      <ol className="role-list mt-12 border-b border-line md:mt-16">
        {experience.map((role) => (
          <Reveal as="li" key={`${role.company}-${role.start}`}>
            <div className="role-row grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-8 transition-opacity duration-300">
              <p className="label col-span-12 pt-1 tabular-nums md:col-span-3">
                {role.start} — {role.end}
              </p>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-xl font-medium tracking-tight">{role.company}</h3>
                <p className="mt-1 text-muted">
                  {role.title}
                  {role.type && <> · {role.type}</>}
                  {role.location && <> · {role.location}</>}
                </p>
              </div>
              <ul className="col-span-12 space-y-2.5 leading-relaxed md:col-span-5">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-16 grid grid-cols-12 gap-x-6 gap-y-4">
        <h3 className="label col-span-12 md:col-span-3">Education</h3>
        <ul className="col-span-12 space-y-3 md:col-span-9">
          {education.map((e) => (
            <li key={e.school} className="grid grid-cols-9 gap-x-6">
              <span className="col-span-9 font-medium sm:col-span-4">{e.school}</span>
              <span className="col-span-6 text-muted sm:col-span-3">{e.detail}</span>
              <span className="label col-span-3 pt-1 text-right tabular-nums sm:col-span-2">
                {e.start} — {e.end}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
