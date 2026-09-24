import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/site'
import { featuredProjects, indexProjects, liveUrl, selectedProjects, showcaseImages } from '@/content/site'
import { textOn } from '@/lib/color'
import { FeaturedStage, PaperCard } from './ProjectShowcase'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, '')

function LiveLink({ url, className }: { url: string; className?: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1.5 text-sm ${className ?? ''}`}>
      <span className="link-line">{hostname(url)}</span>
      <span aria-hidden className="arrow arrow-up">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function Meta({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <dl className={className}>
      <dt className="label">{label}</dt>
      <dd className="mt-2 text-[0.95rem] leading-relaxed">{children}</dd>
    </dl>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`
  return (
    <article className="cv" style={{ '--cis': '1150px' } as React.CSSProperties}>
      <Reveal>
        <FeaturedStage project={project} number={index + 1} offset={index * 600} />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-7 md:mt-10">
          <div className="col-span-12 md:col-span-5">
            <Meta label="Problem">{project.problem}</Meta>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href={href} transitionTypes={['nav-forward']} className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="link-line link-line-static">Read case study</span>
                <span aria-hidden className="arrow">→</span>
              </Link>
              {liveUrl(project) && <LiveLink url={liveUrl(project)!} className="text-muted hover:text-ink" />}
            </div>
          </div>
          <Meta label="Role" className="col-span-6 md:col-span-2">
            {project.role}
            {project.company && <span className="block text-muted">{project.company}</span>}
          </Meta>
          <Meta label="Stack" className="col-span-6 md:col-span-2">
            {project.stack.join(', ')}
          </Meta>
          <Meta label="Key features" className="col-span-12 md:col-span-3">
            <ul className="space-y-1.5">
              {project.features.slice(0, 4).map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Meta>
        </div>
      </Reveal>
    </article>
  )
}

/** Screenshot tile; hovering slides up a panel in the project's colour with the details. */
function MoreWorkTile({ project, index }: { project: Project; index: number }) {
  const internal = project.caseStudy
  const href = internal ? `/work/${project.slug}` : project.live!
  const ink = textOn(project.color)
  const cover = showcaseImages(project)[0]
  const inner = (
    <>
      <div className="tile">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 94vw"
          quality={85}
          className="tile-img"
        />
        <div aria-hidden className="tile-panel" style={{ background: project.color, color: ink }}>
          <p className="label text-current! opacity-80">
            {project.category} · {project.year}
          </p>
          <p className="mt-3 text-lg leading-snug">{project.tagline}</p>
          <p className="mt-auto flex items-center justify-between gap-4 pt-4 text-sm font-medium">
            <span className="label truncate text-current! opacity-80">{project.stack.join(' · ')}</span>
            <span className={`arrow shrink-0 ${internal ? '' : 'arrow-up'}`}>{internal ? 'Case study →' : `${hostname(project.live!)} ↗`}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h4 className="text-lg font-medium tracking-tight">
          <span className="link-line">{project.name}</span>
        </h4>
        <span className="label shrink-0">{project.category}</span>
      </div>
      <p className="sr-only">{project.tagline}</p>
    </>
  )

  return (
    <Reveal as="article" delay={(index % 3) * 0.05}>
      {internal ? (
        <Link href={href} transitionTypes={['nav-forward']} className="group block">
          {inner}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
          {inner}
          <span className="sr-only">(opens {hostname(href)} in a new tab)</span>
        </a>
      )}
    </Reveal>
  )
}

export function Work() {
  return (
    <section aria-labelledby="work" className="container-x pt-32 md:pt-44">
      <SectionHeading
        id="work"
        index="01"
        title="Selected work"
        note={`${featuredProjects.length + selectedProjects.length} case studies, client products first.`}
      />

      <div className="mt-16 space-y-28 md:mt-24 md:space-y-40">
        {featuredProjects.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="cv mt-28 md:mt-40" style={{ '--cis': '760px' } as React.CSSProperties}>
        <Reveal className="label mb-8 flex items-baseline justify-between border-t border-line pt-5">
          <span>Also built</span>
          <span className="hidden sm:inline">Learning, e-learning and commerce platforms</span>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {selectedProjects.map((project, i) => (
            <Reveal as="article" key={project.slug} delay={i * 0.06}>
              <PaperCard project={project} number={featuredProjects.length + i + 1} offset={i * 900} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="cv mt-28 md:mt-44" style={{ '--cis': '1300px' } as React.CSSProperties}>
        <Reveal className="flex items-end justify-between gap-6 border-t border-line pt-5">
          <h3 className="display text-[clamp(1.75rem,3.4vw,3rem)]">More work</h3>
          <p className="label pb-1.5">{indexProjects.length} projects</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {indexProjects.map((project, i) => (
            <MoreWorkTile key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
