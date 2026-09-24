import type { MetadataRoute } from 'next'
import { caseStudies, site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: 'yearly' as const,
      priority: p.tier === 'featured' ? 0.8 : 0.6,
    })),
  ]
}
