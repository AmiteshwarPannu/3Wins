import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { useMotionValue, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { Check } from 'lucide-react'
import { problem } from '../content/copy'
import { usePrefersReducedMotion } from '../lib/hooks'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'
import { ScrollWords } from './ui/ScrollWords'

export function ProblemSection() {
  const reduced = usePrefersReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const turnRef = useRef<HTMLParagraphElement>(null)
  const fixed = useMotionValue(1)

  const { scrollYProgress: listScroll } = useScroll({ target: listRef, offset: ['start 72%', 'end 62%'] })
  const { scrollYProgress: turnScroll } = useScroll({ target: turnRef, offset: ['start 88%', 'end 52%'] })
  const listProgress = reduced ? fixed : listScroll
  const turnProgress = reduced ? fixed : turnScroll

  const total = problem.list.length
  const doneCount = useTransform(listProgress, (p) => Math.min(total, Math.round(p * total)))
  const questionOpacity = useTransform(listProgress, [0.86, 1], [0.2, 1])

  return (
    <section aria-labelledby="problem-title" className="section relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          {/* The argument stays put while the list runs past it. */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal><p className="eyebrow">{problem.eyebrow}</p></Reveal>
            <div id="problem-title">
              <Headline lines={problem.headline} className="display display-lg mt-6" />
            </div>
            <Reveal delay={0.1} className="mt-8 max-w-[33rem]">
              <p className="lede">{problem.body}</p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-fg-dim">{problem.audience}</p>
            </Reveal>
          </div>

          <div ref={listRef}>
            <div className="panel overflow-hidden p-2.5 md:p-3">
              <div className="flex items-center justify-between px-3.5 pt-3 pb-4">
                <span className="text-[0.95rem] font-medium tracking-[-0.015em] text-fg">Today</span>
                <span className="font-mono text-xs text-fg-dim tabular-nums">
                  <span className="sr-only">{total} of {total} done</span>
                  <span aria-hidden="true"><m.span>{doneCount}</m.span> / {total} done</span>
                </span>
              </div>
              <ul>
                {problem.list.map((item, i) => (
                  <TaskRow key={item} text={item} index={i} total={total} progress={listProgress} />
                ))}
              </ul>
              <m.p
                style={{ opacity: questionOpacity }}
                className="mt-2 rounded-[1rem] bg-white/[0.04] px-4 py-5 text-center font-serif text-[1.65rem] leading-tight tracking-[-0.01em] text-fg italic"
              >
                {problem.listQuestion}
              </m.p>
            </div>
          </div>
        </div>

        <p
          ref={turnRef}
          className="display mx-auto mt-[clamp(6rem,14vw,12rem)] max-w-[15em] text-center text-[clamp(2.3rem,6vw,5.25rem)] leading-[1.04] text-balance"
        >
          <ScrollWords text={problem.turn} progress={turnProgress} />
        </p>
      </div>
    </section>
  )
}

function TaskRow({ text, index, total, progress }: { text: string; index: number; total: number; progress: MotionValue<number> }) {
  const from = index / total
  const to = (index + 0.9) / total
  const strike = useTransform(progress, [from, to], [0, 1])
  const textOpacity = useTransform(progress, [from, to], [1, 0.6])
  const checkOpacity = useTransform(progress, [from + 0.01, to], [0, 1])

  return (
    <li className="flex items-center gap-3 rounded-xl px-3.5 py-[0.62rem]">
      <span aria-hidden="true" className="relative grid size-[1.15rem] shrink-0 place-items-center rounded-[0.35rem] shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.2)]">
        <m.span style={{ opacity: checkOpacity }} className="absolute inset-0 grid place-items-center rounded-[0.35rem] bg-white/25">
          <Check size={12} strokeWidth={3} className="text-fg" />
        </m.span>
      </span>
      <span className="relative text-[0.96rem] tracking-[-0.012em] text-fg">
        <m.span style={{ opacity: textOpacity }}>{text}</m.span>
        <m.span aria-hidden="true" style={{ scaleX: strike }} className="absolute top-1/2 left-0 h-px w-full origin-left bg-fg-muted" />
      </span>
    </li>
  )
}
