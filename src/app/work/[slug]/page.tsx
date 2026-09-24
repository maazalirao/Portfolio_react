import { ViewTransition } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getNextProject, getProject, liveUrl, showcaseImages } from '@/content/site'
import { PageTransition } from '@/components/PageTransition'
import { Reveal } from '@/components/Reveal'
import { Screen } from '@/components/Screen'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const description = `${project.tagline} ${project.role}${project.company ? `, ${project.company}` : ''}.`
  return {
    title: project.name,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: 'article', url: `/work/${project.slug}`, title: project.name, description },
    twitter: { card: 'summary_large_image', title: project.name, description },
  }
}

type Vars = React.CSSProperties & Record<`--${string}`, string | number>
const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, '')

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line pt-6">
      <h2 className="label col-span-12 self-start md:sticky md:top-24 md:col-span-3">{label}</h2>
      <div className="col-span-12 md:col-span-9 lg:col-span-7">{children}</div>
    </Reveal>
  )
}

export default async function CaseStudy({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(project.slug)
  const [cover, ...gallery] = showcaseImages(project)
  const meta = [
    { label: 'Role', value: project.role },
    project.company && { label: 'Company', value: project.company },
    { label: 'Timeline', value: project.period ?? project.year },
    project.region && { label: 'Region', value: project.region },
  ].filter(Boolean) as { label: string; value: string }[]
  const titleWords = project.name.split(' ')
  const live = liveUrl(project)

  return (
    <PageTransition>
      <main id="main">
        <article className="container-x pt-8 md:pt-12">
          <Link href="/#work" transitionTypes={['nav-back']} className="group label inline-flex items-center gap-2 text-ink">
            <span aria-hidden className="arrow arrow-back">←</span>
            <span className="link-line">All work</span>
          </Link>

          <header className="mt-16 md:mt-24">
            <p className="label fade-in" style={{ '--d': '0ms' } as Vars}>
              Case study — {project.category} — {project.year}
            </p>
            <h1 className="display mt-6 text-[clamp(3.25rem,10vw,9.5rem)]">
              {titleWords.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="rise">
                    <span style={{ '--i': i, '--step': '70ms', '--base': '40ms' } as Vars}>{word}</span>
                  </span>
                  {i < titleWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-10">
              <p
                className="fade-in col-span-12 text-[clamp(1.3rem,2.3vw,1.9rem)] leading-[1.2] tracking-[-0.02em] text-muted md:col-span-8 lg:col-span-7"
                style={{ '--d': '220ms' } as Vars}
              >
                {project.tagline}
              </p>
              {live && (
                <div className="fade-in col-span-12 md:col-span-4 md:justify-self-end lg:col-span-5" style={{ '--d': '320ms' } as Vars}>
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Visit {hostname(live)} <span aria-hidden className="arrow arrow-up">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              )}
            </div>

            <dl className="fade-in mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:grid-cols-4" style={{ '--d': '380ms' } as Vars}>
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-2 text-[0.95rem]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="fade-in mt-10 md:mt-14" style={{ '--d': '160ms' } as Vars}>
            <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
              <div className="cover-stage" style={{ '--brand': project.color, ...(project.stage ? { '--stage': project.stage } : {}) } as Vars}>
                <Screen image={cover} sizes="(min-width: 1408px) 1100px, 84vw" priority />
              </div>
            </ViewTransition>
          </div>

          {project.stats && (
            <Reveal className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 md:grid-cols-4">
              {project.stats.map((s) => (
                <div key={s.label} className="border-t border-ink pt-4">
                  <p className="display text-[clamp(3rem,7vw,6rem)] tabular-nums">{s.value}</p>
                  <p className="label mt-3">{s.label}</p>
                </div>
              ))}
            </Reveal>
          )}

          <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
            <Section label="The problem">
              <p className="text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.03em]">{project.problem}</p>
            </Section>

            {project.overview && (
              <Section label="Overview">
                <div className="space-y-5 text-lg leading-relaxed text-muted">
                  {project.overview.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Section>
            )}

            {project.features.length > 0 && (
              <Section label="Key features">
                <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <li key={f} className="flex gap-4 border-t border-line py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                      <span className="serif-accent text-xl leading-none text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            <Section label="Stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Section>

            {project.outcomes && (
              <Section label="Outcome">
                <ul className="space-y-3 text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.03em]">
                  {project.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          {gallery.length > 0 && (
            <section aria-label="Screens" className="mt-28 space-y-10 md:mt-40 md:space-y-14">
              {gallery.map((image, i) => (
                <Reveal as="article" key={image.src} className="cv" delay={0}>
                  <figure>
                    <div className={`screen-stage ${i % 2 ? 'screen-stage-right' : 'screen-stage-left'}`} style={{ '--brand': project.color } as Vars}>
                      <Screen image={image} sizes="(min-width: 1408px) 1000px, 86vw" />
                    </div>
                    <figcaption className="label mt-4 flex gap-4">
                      <span className="tabular-nums text-ink">{String(i + 2).padStart(2, '0')}</span>
                      {image.alt}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </section>
          )}

          <nav aria-label="Next project" className="mt-32 border-t border-line pb-24 pt-6 md:mt-44 md:pb-32">
            <p className="label">Next project</p>
            <Link href={`/work/${next.slug}`} transitionTypes={['nav-forward']} className="group mt-6 grid grid-cols-12 items-end gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-5">
                <span className="display link-line text-[clamp(2.75rem,7vw,6.5rem)]">{next.name}</span>
                <p className="mt-4 max-w-md text-muted">{next.tagline}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  Read case study <span aria-hidden className="arrow">→</span>
                </span>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <ViewTransition name={`shot-${next.slug}`} share="morph" default="none">
                  <div className="cover-stage cover-stage-sm" style={{ '--brand': next.color, ...(next.stage ? { '--stage': next.stage } : {}) } as Vars}>
                    <Screen image={showcaseImages(next)[0]} sizes="(min-width: 1024px) 50vw, 84vw" />
                  </div>
                </ViewTransition>
              </div>
            </Link>
          </nav>
        </article>
      </main>
    </PageTransition>
  )
}
