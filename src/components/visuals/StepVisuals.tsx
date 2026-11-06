import * as m from 'motion/react-m'
import { Check, Flame } from 'lucide-react'
import { easeExpo } from '../ui/Reveal'

const inView = { once: true, margin: '0px 0px -12% 0px' }

/** Step 1: three wins being written in, one after another. */
export function ComposerVisual() {
  const lines = ['Ran 5k before class', 'Read 30 pages', 'Fixed the login bug']
  return (
    <div className="panel p-5 md:p-7" role="img" aria-label="Example: three wins written down for today">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="text-[0.95rem] font-medium tracking-[-0.015em] text-fg">Today's wins</span>
        <span className="font-mono text-xs text-fg-dim">example</span>
      </div>
      <div className="space-y-2.5">
        {lines.map((line, i) => (
          <div key={line} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3.5">
            <m.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.45, delay: 0.75 + i * 0.75, ease: easeExpo }}
              className="grid size-[1.15rem] shrink-0 place-items-center rounded-full bg-win-400"
            >
              <Check size={11} strokeWidth={3.5} className="text-[#1a1204]" />
            </m.span>
            {/* Typed in by widening a clip rather than re-rendering text. */}
            <m.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={inView}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.75, ease: 'linear' }}
              className="truncate text-[0.98rem] tracking-[-0.012em] text-fg"
            >
              {line}
            </m.span>
          </div>
        ))}
      </div>
    </div>
  )
}

const rows = [
  { name: 'Fitness', streak: 12, days: [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { name: 'Coding', streak: 6, days: [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1] },
  { name: 'Reading', streak: 3, days: [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1] },
]

/** Step 2: disciplines with their last two weeks and current streak. */
export function MomentumVisual() {
  return (
    <div className="panel space-y-5 p-5 md:p-7" role="img" aria-label="Example: three disciplines with their streaks, 12, 6 and 3 days">
      {rows.map((row) => (
        <div key={row.name}>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[0.95rem] font-medium tracking-[-0.015em] text-fg">{row.name}</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-fg-muted tabular-nums">
              <Flame size={12} className="text-win-400" />
              {row.streak} days
            </span>
          </div>
          <div className="grid grid-cols-14 gap-1">
            {row.days.map((on, i) => (
              <m.span
                key={i}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.045 }}
                className={`aspect-square rounded-[22%] ${on ? 'bg-win-400' : 'bg-white/[0.07]'}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const weeks = [9, 12, 11, 14, 13, 16, 15, 18]
const MAX_WINS_PER_WEEK = 21

/** Step 3: wins per week, with the latest week highlighted and labelled. */
export function ProgressVisual() {
  const latest = weeks[weeks.length - 1]
  return (
    <div className="panel p-5 md:p-7" role="img" aria-label={`Example: wins per week rising from ${weeks[0]} to ${latest} over eight weeks`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.95rem] font-medium tracking-[-0.015em] text-fg">Wins per week</span>
        <span className="font-mono text-xs text-fg-dim">example</span>
      </div>
      <p className="mt-4 text-[2.6rem] leading-none font-semibold tracking-[-0.045em] text-fg tabular-nums">
        {latest}
        <span className="ml-2 text-sm font-normal tracking-normal text-fg-dim">of {MAX_WINS_PER_WEEK} this week</span>
      </p>
      <div className="mt-6 flex h-32 items-end gap-1.5 border-b border-white/10 md:gap-2">
        {weeks.map((value, i) => (
          <m.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: easeExpo }}
            style={{ height: `${(value / MAX_WINS_PER_WEEK) * 100}%` }}
            className={`flex-1 origin-bottom rounded-t ${i === weeks.length - 1 ? 'bg-win-400' : 'bg-white/15'}`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[0.68rem] text-fg-dim">
        <span>8 weeks ago</span>
        <span>This week</span>
      </div>
    </div>
  )
}
