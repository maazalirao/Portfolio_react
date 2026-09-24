import { site } from '@/content/site'
import { ogSize, renderOg } from '@/lib/og'

export const alt = `${site.name}, ${site.role}`
export const size = ogSize
export const contentType = 'image/png'

export default async function Image() {
  const { emphasis, tail } = site.headline
  return renderOg({
    eyebrow: 'Portfolio',
    title: site.name,
    subtitle: `Full-stack engineer building ${emphasis} ${tail}`,
  })
}
