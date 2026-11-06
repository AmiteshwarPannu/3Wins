import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { useMotionValue, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { Check } from 'lucide-react'
import { philosophy } from '../content/copy'
import { usePrefersReducedMotion } from '../lib/hooks'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'

/** Scroll positions (0 to 1 across the pinned section) where each win completes. */
const THRESHOLDS: [number, number][] = [
  [0.12, 0.26],
  [0.34, 0.48],
  [0.56, 0.7],
]

export function ThreeWinsDemo() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const fixed = useMotionValue(1)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = reduced ? fixed : scrollYProgress

  const count = useTransform(progress, (p) => THRESHOLDS.filter(([, end]) => p >= end - 0.03).length)
  const closerOpacity = useTransform(progress, [0.76, 0.86], [0, 1])
  const closerY = useTransform(progress, [0.76, 0.86], [14, 0])

  return (
    <section ref={ref} aria-labelledby="philosophy-title" className={reduced ? 'section relative' : 'relative h-[290vh]'}>
      <div className={reduced ? 'shell' : 'sticky top-0 flex h-[100svh] items-center overflow-hidden'}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_78%_50%,rgb(240_165_53/0.06),transparent_75%)]" />
        <div className={`relative grid w-full items-center gap-5 pt-14 lg:grid-cols-2 lg:gap-20 lg:pt-0 ${reduced ? '' : 'shell'}`}>
          <div>
            <Reveal><p className="eyebrow">{philosophy.eyebrow}</p></Reveal>
            <div id="philosophy-title">
              <Headline lines={philosophy.headline} className="display display-lg mt-3 lg:mt-6" />
            </div>
            <Reveal delay={0.1} className="mt-3 max-w-[29rem] lg:mt-7">
              <p className="lede max-[26rem]:text-[0.95rem] max-[26rem]:leading-snug">{philosophy.body}</p>
            </Reveal>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-3 lg:mb-5">
              <span className="font-mono text-sm text-fg tabular-nums" aria-hidden="true">
                <m.span>{count}</m.span>/3
              </span>
              <div aria-hidden="true" className="flex flex-1 gap-1.5">
                {THRESHOLDS.map(([start, end]) => (
                  <Segment key={start} progress={progress} start={start} end={end} />
                ))}
              </div>
            </div>

            <ol className="space-y-2.5 lg:space-y-3.5">
              {philosophy.wins.map((win, i) => (
                <WinCard key={win.n} {...win} progress={progress} range={THRESHOLDS[i]} />
              ))}
            </ol>

            <m.p
              style={{ opacity: closerOpacity, y: closerY }}
              className="mt-4 text-center font-serif text-[clamp(1.35rem,2.3vw,1.85rem)] leading-tight text-win-200 italic lg:mt-7"
            >
              {philosophy.closer}
            </m.p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Segment({ progress, start, end }: { progress: MotionValue<number>; start: number; end: number }) {
  const scaleX = useTransform(progress, [start, end], [0, 1])
  return (
    <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
      <m.span style={{ scaleX }} className="block h-full origin-left rounded-full bg-win-400" />
    </span>
  )
}

type WinCardProps = { n: string; text: string; tag: string; progress: MotionValue<number>; range: [number, number] }

function WinCard({ n, text, tag, progress, range }: WinCardProps) {
  const [start, end] = range
  const lit = useTransform(progress, [start, end], [0, 1])
  const textOpacity = useTransform(progress, [start, end], [0.42, 1])
  const y = useTransform(progress, [start, end], [6, 0])
  const scale = useTransform(progress, [start, end], [0.5, 1])

  return (
    <m.li style={{ y }} className="panel flex items-center gap-3.5 overflow-hidden !rounded-[1.1rem] px-4 py-3.5 lg:gap-5 lg:!rounded-[1.25rem] lg:px-6 lg:py-6">
      {/* Warm wash that fades in as the win lands */}
      <m.span aria-hidden="true" style={{ opacity: lit }} className="absolute inset-0 bg-[linear-gradient(100deg,rgb(247_191_94/0.13),rgb(247_191_94/0.02)_65%)] shadow-[inset_0_0_0_1px_rgb(247_191_94/0.24)] [border-radius:inherit]" />

      <span aria-hidden="true" className="relative font-mono text-xs text-fg-dim tabular-nums">{n}</span>

      <m.span style={{ opacity: textOpacity }} className="relative min-w-0 flex-1">
        <span className="block text-[1rem] leading-snug font-medium tracking-[-0.02em] text-fg lg:text-[1.3rem]">{text}</span>
        <span className="mt-0.5 block text-xs text-fg-muted lg:mt-1 lg:text-[0.8rem]">{tag}</span>
      </m.span>

      <span aria-hidden="true" className="relative grid size-7 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.18)] lg:size-9">
        <m.span style={{ opacity: lit, scale }} className="absolute inset-0 grid place-items-center rounded-full bg-win-400">
          <Check size={16} strokeWidth={3} className="text-[#1a1204]" />
        </m.span>
      </span>
    </m.li>
  )
}
