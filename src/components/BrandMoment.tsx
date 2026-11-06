import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { brandMoment } from '../content/copy'
import { usePrefersReducedMotion } from '../lib/hooks'
import { ScrollWords } from './ui/ScrollWords'

const textClass = 'font-serif text-[clamp(2.9rem,8.4vw,8rem)] leading-[1] tracking-[-0.025em] text-balance text-fg italic'

/** The one moment on the page with nothing to look at but the words. */
export function BrandMoment() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // The first sentence lights up, recedes as the second arrives, then the coda lands.
  const firstOpacity = useTransform(scrollYProgress, [0.36, 0.5], [1, 0.5])

  if (reduced) {
    return (
      <section aria-label="Why every day matters" className="section bg-black">
        <div className="shell text-center">
          <p className={textClass}>{brandMoment.first}</p>
          <p className={`${textClass} mt-8`}>{brandMoment.second}</p>
          <p className="mt-14 text-lg text-fg-muted">{brandMoment.closing.join(' ')}</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-label="Why every day matters" className="relative h-[340vh] bg-black">
      {/* Long fades into pure black, so the shift in register feels like the lights going down. */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-black" />
      <div aria-hidden="true" className="absolute inset-x-0 -bottom-40 z-10 h-40 bg-gradient-to-b from-black to-transparent" />

      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="shell text-center">
          <m.p style={{ opacity: firstOpacity }} className={textClass}>
            <ScrollWords text={brandMoment.first} progress={scrollYProgress} range={[0.04, 0.3]} dim={0.08} />
          </m.p>
          <p className={`${textClass} mt-[0.3em]`}>
            <ScrollWords text={brandMoment.second} progress={scrollYProgress} range={[0.4, 0.68]} dim={0.05} />
          </p>
          <Coda progress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

function Coda({ progress }: { progress: MotionValue<number> }) {
  return (
    <p className="mt-[clamp(2.5rem,6vh,4.5rem)] flex flex-wrap items-baseline justify-center gap-x-[0.5em] gap-y-1 text-[clamp(1.02rem,1.7vw,1.4rem)] tracking-[-0.015em] text-fg-muted">
      {brandMoment.closing.map((phrase, i) => (
        <CodaPhrase key={phrase} text={phrase} progress={progress} from={0.74 + i * 0.05} />
      ))}
    </p>
  )
}

function CodaPhrase({ text, progress, from }: { text: string; progress: MotionValue<number>; from: number }) {
  const opacity = useTransform(progress, [from, from + 0.05], [0, 1])
  const y = useTransform(progress, [from, from + 0.05], [10, 0])
  return <m.span style={{ opacity, y }} className="inline-block">{text}</m.span>
}
