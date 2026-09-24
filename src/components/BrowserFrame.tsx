type BrowserFrameProps = {
  className?: string
  children: React.ReactNode
}

/** Minimal browser window: three quiet dots and no address, so screenshots read as real products. */
export function BrowserFrame({ className, children }: BrowserFrameProps) {
  return (
    <div className={`browser ${className ?? ''}`}>
      <div className="browser-bar" aria-hidden>
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="browser-view">{children}</div>
    </div>
  )
}
