'use client'

import { useEffect, useState } from 'react'
import { site } from '@/content/site'

const format = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: site.timezone,
})

/** Current time in Maaz's timezone. Renders after mount to avoid a hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className}>
      <time suppressHydrationWarning>{now ?? '--:--'}</time> {site.timezoneLabel}
    </span>
  )
}
