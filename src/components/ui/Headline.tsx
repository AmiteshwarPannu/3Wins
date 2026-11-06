import * as m from 'motion/react-m'
import type { HeadlineLine } from '../../content/copy'
import { easeExpo } from './Reveal'

type HeadlineProps = {
  lines: HeadlineLine[]
  as?: 'h1' | 'h2'
  className?: string
  immediate?: boolean
  delay?: number
}

const lineVariants = { hidden: { y: '125%' }, shown: { y: 0 } }

/**
 * Line-by-line masked reveal. Each line slides up from behind its own edge.
 * The trigger sits on the heading, not the lines: a line starts fully clipped by
 * its mask, so an in-view check on the line itself may never fire.
 */
export function Headline({ lines, as = 'h2', className = 'display display-lg', immediate = false, delay = 0 }: HeadlineProps) {
  const Tag = as === 'h1' ? m.h1 : m.h2
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -6% 0px' } })}
    >
      {lines.map((line, i) => (
        // Padding offset by negative margin gives italic swashes and descenders room inside the mask.
        <span key={line.text} className="-mx-[0.08em] -mb-[0.24em] block overflow-hidden px-[0.08em] pb-[0.24em]">
          <m.span
            className={line.em ? 'accent-serif' : 'inline-block'}
            variants={lineVariants}
            transition={{ duration: 1.05, delay: delay + i * 0.09, ease: easeExpo }}
          >
            {line.text}
          </m.span>
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
