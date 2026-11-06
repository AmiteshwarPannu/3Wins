import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import * as m from 'motion/react-m'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { easeExpo } from '../ui/Reveal'

const START_SECONDS = 47 * 60 + 12
const SESSION_GOAL = 60 * 60
const TICKS = 60

const format = (total: number) => {
  const h = Math.floor(total / 3600)
  const min = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h, min, s].map((n) => String(n).padStart(2, '0')).join(':')
}

/** A running session. It only ticks while on screen and writes straight to the DOM. */
export function StudyTimer() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (!isInView || reduced) return
    let seconds = START_SECONDS
    const id = window.setInterval(() => {
      seconds += 1
      if (clockRef.current) clockRef.current.textContent = format(seconds)
    }, 1000)
    return () => window.clearInterval(id)
  }, [isInView, reduced])

  const fraction = START_SECONDS / SESSION_GOAL
  const litTicks = Math.round(fraction * TICKS)

  return (
    <div ref={ref} role="img" aria-label="Example study timer: a session labelled Linear algebra running at 47 minutes, with 2 hours 35 minutes of study today" className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[15.5rem]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {Array.from({ length: TICKS }, (_, i) => {
            const lit = i < litTicks
            return (
              <m.line
                key={i}
                x1="100"
                y1="6"
                x2="100"
                y2={i % 5 === 0 ? 18 : 14}
                transform={`rotate(${(i / TICKS) * 360} 100 100)`}
                stroke={lit ? 'var(--color-win-400)' : 'rgb(255 255 255 / 0.13)'}
                strokeWidth={1.8}
                strokeLinecap="round"
                initial={lit ? { opacity: 0.13 } : false}
                whileInView={lit ? { opacity: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.022, ease: easeExpo }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-fg-muted">Linear algebra</span>
          <span ref={clockRef} className="mt-1.5 font-mono text-[1.72rem] font-medium tracking-[-0.03em] text-fg tabular-nums">
            {format(START_SECONDS)}
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] text-win-300">
            <span className="size-1.5 rounded-full bg-win-400" />
            Focusing
          </span>
        </div>
      </div>
      <dl className="mt-5 grid w-full grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[0.04] px-3.5 py-3">
          <dt className="text-xs text-fg-dim">Today</dt>
          <dd className="mt-0.5 font-mono text-sm text-fg">2h 35m</dd>
        </div>
        <div className="rounded-xl bg-white/[0.04] px-3.5 py-3">
          <dt className="text-xs text-fg-dim">Sessions</dt>
          <dd className="mt-0.5 font-mono text-sm text-fg">3</dd>
        </div>
      </dl>
    </div>
  )
}
