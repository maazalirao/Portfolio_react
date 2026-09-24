import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-[70svh] flex-col justify-center py-24">
      <p className="label">404</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,7vw,6rem)]">
        This page <span className="serif-accent">isn’t here.</span>
      </h1>
      <Link href="/" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium">
        <span className="link-line link-line-static">Back to the homepage</span>
        <span aria-hidden className="arrow">→</span>
      </Link>
    </main>
  )
}
