type BrowserFrameProps = {
  url?: string
  className?: string
  children: React.ReactNode
}

/** Minimal browser window: three quiet dots and the site's address, so screenshots read as real products. */
export function BrowserFrame({ url, className, children }: BrowserFrameProps) {
  const host = url ? new URL(url).hostname.replace(/^www\./, '') : undefined
  return (
    <div className={`browser ${className ?? ''}`}>
      <div className="browser-bar" aria-hidden>
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        {host && <span className="browser-url">{host}</span>}
      </div>
      <div className="browser-view">{children}</div>
    </div>
  )
}
