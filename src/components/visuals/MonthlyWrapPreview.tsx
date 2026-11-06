import { Reveal } from '../ui/Reveal'

const stats = [
  { label: 'Wins', value: '78', compare: '12 more than September' },
  { label: 'Study hours', value: '41.5', compare: '6 more than September' },
  { label: 'Best streak', value: '18', compare: 'days in a row' },
  { label: 'Days active', value: '26', compare: 'of 31' },
]

/** Stat tiles rather than a chart: each of these is a single headline number. */
export function MonthlyWrapPreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,rgb(247_191_94/0.14),rgb(255_255_255/0.025)_55%)] p-4 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-serif text-[1.9rem] leading-none text-fg italic md:text-[2.3rem]">October wrap</p>
        <span className="font-mono text-[0.7rem] text-fg-dim">example</span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2 md:mt-6 md:grid-cols-4 md:gap-2.5">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.08 * i} y={14} className="rounded-xl bg-ink-950/55 p-3.5 md:p-4">
            <dt className="text-xs text-fg-muted">{stat.label}</dt>
            <dd className="mt-2 text-[1.95rem] leading-none font-semibold tracking-[-0.045em] text-fg tabular-nums md:text-[2.3rem]">{stat.value}</dd>
            <dd className="mt-2 text-[0.72rem] leading-snug text-fg-dim">{stat.compare}</dd>
          </Reveal>
        ))}
      </dl>

      <div className="mt-2.5 rounded-xl bg-ink-950/55 px-4 py-3.5">
        <p className="text-xs text-fg-muted">Highlight</p>
        <p className="mt-1 text-[0.98rem] tracking-[-0.015em] text-fg">“Finished the portfolio rewrite.”</p>
      </div>
    </div>
  )
}
