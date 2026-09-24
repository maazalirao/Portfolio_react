import { ViewTransition } from 'react'

/**
 * Directional slide between pages. Links tag navigations with "nav-forward" or "nav-back";
 * untyped navigations (browser back, first load) don't animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
