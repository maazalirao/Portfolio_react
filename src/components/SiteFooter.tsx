import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="container-x flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label">Built with Next.js, Tailwind CSS and Motion</p>
        <a href="#top" className="label link-line self-start text-ink sm:self-auto">
          Back to top ↑
        </a>
      </div>
      <div className="container-x fit-name mt-10">
        <a
          href={`mailto:${site.email}`}
          className="group fit-cta -ml-[0.06em] flex translate-y-[9%] select-none items-baseline justify-between whitespace-nowrap font-medium leading-[0.8] tracking-[-0.06em]"
          aria-label={`Let’s talk: email ${site.email}`}
        >
          <span>
            Let’s <span className="serif-accent pr-[0.04em]">talk</span>
          </span>
          <span aria-hidden className="arrow arrow-up text-accent">
            ↗
          </span>
        </a>
      </div>
    </footer>
  )
}
