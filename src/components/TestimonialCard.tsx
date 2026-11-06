import type { Testimonial } from '../content/testimonials'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export function TestimonialCard({ testimonial, className = '', compact = false }: { testimonial: Testimonial; className?: string; compact?: boolean }) {
  const { quote, name, role, avatar, sample } = testimonial
  return (
    <figure className={`relative flex flex-col rounded-[1.25rem] ${compact ? 'p-4.5' : 'p-6 md:p-7'} ${className}`}>
      {sample ? <span className="setup-tag mb-3 self-start">Sample</span> : null}
      <blockquote className={`tracking-[-0.012em] text-pretty text-fg ${compact ? 'text-[0.92rem] leading-[1.42]' : 'text-[1.05rem] leading-[1.5] md:text-[1.12rem]'}`}>
        {sample ? quote : `“${quote}”`}
      </blockquote>
      <figcaption className={`flex items-center gap-3 ${compact ? 'mt-3.5' : 'mt-6'}`}>
        {avatar ? (
          <img src={avatar} alt="" loading="lazy" width={36} height={36} className="size-9 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-white/8 font-mono text-[0.68rem] font-medium text-fg-muted">
            {initials(name)}
          </span>
        )}
        <span className="min-w-0 text-[0.83rem] leading-tight">
          <span className="block font-medium text-fg">{name}</span>
          {role ? <span className="mt-0.5 block text-fg-dim">{role}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
