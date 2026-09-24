import { caseStudies, getProject } from '@/content/site'
import { ogSize, renderOg } from '@/lib/og'

export const alt = 'Case study'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)!
  return renderOg({ eyebrow: `Case study — ${project.category}`, title: project.name, subtitle: project.tagline })
}
