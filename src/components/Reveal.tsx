type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Seconds. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Fades content up once as it scrolls into view. Server-rendered markup only:
 * a single observer (RevealObserver) toggles the class, CSS does the motion.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag data-reveal="" className={className} style={delay ? ({ '--delay': `${delay}s` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  )
}
