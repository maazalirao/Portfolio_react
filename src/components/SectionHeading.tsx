import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: string
  index: string
  title: string
  note?: string
}

export function SectionHeading({ id, index, title, note }: SectionHeadingProps) {
  return (
    <Reveal className="grid grid-cols-12 items-end gap-x-6 gap-y-4 border-t border-line pt-6">
      <p className="label col-span-12 md:col-span-3">({index})</p>
      <h2 id={id} className="display col-span-12 text-[clamp(2.25rem,5vw,4.5rem)] md:col-span-6">
        {title}
      </h2>
      {note && <p className="col-span-12 max-w-sm text-sm text-muted md:col-span-3 md:justify-self-end md:text-right">{note}</p>}
    </Reveal>
  )
}
