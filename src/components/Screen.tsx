import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Image from 'next/image'
import { imageSize } from 'image-size'
import type { Screenshot } from '@/content/site'
import { BrowserFrame } from './BrowserFrame'

/** Reads a /public image's real dimensions at build time, so screens render uncropped with no layout shift. */
function sizeOf(src: string) {
  const { width = 1600, height = 1000 } = imageSize(readFileSync(join(process.cwd(), 'public', src)))
  return { width, height }
}

type ScreenProps = {
  image: Screenshot
  url?: string
  sizes: string
  priority?: boolean
  className?: string
}

/** A full, uncropped screenshot inside a browser window. */
export function Screen({ image, url, sizes, priority, className }: ScreenProps) {
  const { width, height } = sizeOf(image.src)
  return (
    <BrowserFrame url={url} className={`browser-natural ${className ?? ''}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={85}
        preload={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    </BrowserFrame>
  )
}
