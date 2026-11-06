import type { PointerEvent, ReactNode } from 'react'

/** Feature card with a soft light that follows the pointer. Writes CSS vars directly, so no re-renders. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <article onPointerMove={onPointerMove} className={`panel spotlight overflow-hidden transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 ${className}`}>
      {children}
    </article>
  )
}
