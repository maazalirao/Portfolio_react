import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
  },
  experimental: {
    // Tailwind output is small; inlining removes the render-blocking stylesheet request for first-time visitors.
    inlineCss: true,
  },
}

export default nextConfig
