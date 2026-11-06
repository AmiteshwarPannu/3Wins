import * as m from 'motion/react-m'
import { Check, Gamepad2, Timer } from 'lucide-react'
import { easeExpo } from '../ui/Reveal'

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DETOX_DAY = 'Sun'

/** Example week: everything is ordinary apart from one completed reset day. */
export function DetoxWeek() {
  return (
    <div className="space-y-1" role="img" aria-label="Example weekly planner with Sunday marked as a completed detox day">
      {week.map((day) => {
        const isDetox = day === DETOX_DAY
        return (
          <div
            key={day}
            className={`flex items-center justify-between rounded-[0.65rem] px-3 ${
              isDetox ? 'bg-win-400/14 py-2.5 shadow-[inset_0_0_0_1px_rgb(247_191_94/0.28)]' : 'py-1.5'
            }`}
          >
            <span className={`text-[0.83rem] ${isDetox ? 'font-medium text-fg' : 'text-fg-dim'}`}>{day}</span>
            {isDetox ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-win-200">
                Detox day
                <m.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, ease: easeExpo }}
                  className="grid size-4 place-items-center rounded-full bg-win-400"
                >
                  <Check size={10} strokeWidth={3.5} className="text-[#1a1204]" />
                </m.span>
              </span>
            ) : (
              <span className="h-px w-5 bg-white/12" />
            )}
          </div>
        )
      })}
    </div>
  )
}

/** Example reward balance using a 2:1 study-to-gaming ratio. */
export function RewardBalance() {
  const earned = 45
  const used = 13
  const remaining = earned - used
  return (
    <div role="img" aria-label={`Example: 90 minutes of study at a 2 to 1 ratio earned ${earned} minutes of gaming, with ${remaining} minutes remaining`}>
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 rounded-xl bg-white/[0.04] p-3.5">
          <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><Timer size={13} aria-hidden="true" /> Studied</span>
          <p className="mt-1.5 font-mono text-lg text-fg">1h 30m</p>
        </div>
        <span className="font-mono text-xs text-fg-dim">2:1</span>
        <div className="min-w-0 flex-1 rounded-xl bg-win-400/12 p-3.5 shadow-[inset_0_0_0_1px_rgb(247_191_94/0.22)]">
          <span className="inline-flex items-center gap-1.5 text-xs text-win-200"><Gamepad2 size={13} aria-hidden="true" /> Remaining</span>
          <p className="mt-1.5 font-mono text-lg text-fg">00:{remaining}:00</p>
        </div>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: remaining / earned }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: easeExpo }}
          className="h-full origin-left rounded-full bg-win-400"
        />
      </div>
      <p className="mt-2 text-right font-mono text-[0.7rem] text-fg-dim">{remaining} of {earned} min left</p>
    </div>
  )
}
