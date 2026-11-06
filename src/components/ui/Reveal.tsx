import type { ReactNode } from 'react'
import * as m from 'motion/react-m'

export const easeExpo = [0.16, 1, 0.3, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Animate on mount, for content already on screen when the page opens. */
  immediate?: boolean
}

/** Fade and rise as an element enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 22, immediate = false }: RevealProps) {
  const visible = { opacity: 1, y: 0 }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate ? { animate: visible } : { whileInView: visible, viewport: { once: true, margin: '0px 0px -8% 0px' } })}
      transition={{ duration: 0.9, delay, ease: easeExpo }}
    >
      {children}
    </m.div>
  )
}
