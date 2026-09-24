import { site } from '@/content/site'
import { CopyEmail } from './CopyEmail'
import { LocalTime } from './LocalTime'
import { Reveal } from './Reveal'

const channels = [
  { label: 'LinkedIn', value: 'in/maazalirao', href: site.links.linkedin },
  { label: 'GitHub', value: '@maazalirao', href: site.links.github },
]

export function Contact() {
  return (
    <section aria-labelledby="contact" className="container-x pb-24 pt-32 md:pb-32 md:pt-44">
      <Reveal className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line pt-6">
        <p className="label col-span-12 md:col-span-3">(04)</p>
        <h2 id="contact" className="display col-span-12 text-[clamp(2.5rem,7vw,6.5rem)] md:col-span-9">
          Have a product <span className="serif-accent">to build?</span>
        </h2>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-20">
        <p className="label col-span-12 pt-3 md:col-span-3">Email</p>
        <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-9">
          <a
            href={`mailto:${site.email}`}
            className="link-line link-line-static break-all text-[clamp(1.6rem,4.4vw,3.75rem)] font-medium tracking-[-0.035em]"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-12 gap-x-6">
        <dl className="col-span-12 grid grid-cols-1 border-b border-line sm:grid-cols-3 md:col-span-9 md:col-start-4">
          {channels.map((c) => (
            <div key={c.label} className="border-t border-line py-5 sm:pr-6">
              <dt className="label">{c.label}</dt>
              <dd className="mt-2">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5">
                  <span className="link-line">{c.value}</span>
                  <span aria-hidden className="arrow arrow-up">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
          ))}
          <div className="border-t border-line py-5">
            <dt className="label">Availability</dt>
            <dd className="mt-2">
              Remote · {site.location}
              <LocalTime className="block text-muted tabular-nums" />
            </dd>
          </div>
        </dl>
      </Reveal>
    </section>
  )
}
