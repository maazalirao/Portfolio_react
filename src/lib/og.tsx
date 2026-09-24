import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/content/site'

export const ogSize = { width: 1200, height: 630 }

const fontDir = join(process.cwd(), 'node_modules/@fontsource')

/** Shared Open Graph card: paper background, eyebrow, big title, optional serif-italic line. */
export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const [sans, serif] = await Promise.all([
    readFile(join(fontDir, 'geist/files/geist-latin-500-normal.woff')),
    readFile(join(fontDir, 'instrument-serif/files/instrument-serif-latin-400-italic.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f3f1ec',
          color: '#141412',
          padding: '64px 72px',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#5e5c57', letterSpacing: 1 }}>
          <span>{eyebrow.toUpperCase()}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: '#d9461e' }} />
            {site.name.toUpperCase()}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: title.length > 40 ? 76 : 104, lineHeight: 1, letterSpacing: -4 }}>{title}</div>
          {subtitle && (
            <div style={{ marginTop: 28, fontFamily: 'Instrument Serif', fontSize: 44, lineHeight: 1.15, color: '#5e5c57', maxWidth: 1000 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', borderTop: '1px solid #d8d4cb', paddingTop: 24, fontSize: 22, color: '#5e5c57' }}>
          {site.role} · {site.availability} · {site.timezoneLabel}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: sans, style: 'normal', weight: 500 },
        { name: 'Instrument Serif', data: serif, style: 'italic', weight: 400 },
      ],
    },
  )
}
