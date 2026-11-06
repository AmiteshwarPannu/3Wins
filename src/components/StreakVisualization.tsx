import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useScroll } from 'motion/react'
import { Flame, Plus } from 'lucide-react'
import { streaks } from '../content/copy'
import { generateHeatmap } from '../lib/heatmap'
import { usePrefersReducedMotion } from '../lib/hooks'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'
import { Heatmap, HeatmapLegend } from './visuals/Heatmap'

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function StreakVisualization() {
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(streaks.disciplines[0].id)
  const active = streaks.disciplines.find((d) => d.id === activeId)!
  const data = useMemo(
    () => generateHeatmap(active.seed, active.current, active.longest, active.density),
    [active],
  )

  const panelRef = useRef<HTMLDivElement>(null)
  const fixed = useMotionValue(1)
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start 85%', 'end 92%'] })
  const progress = reduced ? fixed : scrollYProgress

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = streaks.disciplines[(index + delta + streaks.disciplines.length) % streaks.disciplines.length]
    setActiveId(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section aria-labelledby="streaks-title" className="section relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[28%] h-[60%] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(240_165_53/0.075),transparent_75%)]" />
      <div className="shell relative">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <div>
            <Reveal><p className="eyebrow">{streaks.eyebrow}</p></Reveal>
            <div id="streaks-title">
              <Headline lines={streaks.headline} className="display display-lg mt-6" />
            </div>
          </div>
          <Reveal delay={0.1}><p className="lede lg:pb-2">{streaks.body}</p></Reveal>
        </div>

        <Reveal y={40} className="mt-14 md:mt-20">
          <div ref={panelRef} className="panel p-4 md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <div role="tablist" aria-label="Example disciplines" className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto px-1 py-1">
                {streaks.disciplines.map((discipline, i) => {
                  const selected = discipline.id === activeId
                  return (
                    <button
                      key={discipline.id}
                      id={`tab-${discipline.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="streak-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(discipline.id)}
                      onKeyDown={(event) => onTabKey(event, i)}
                      className={`min-h-10 rounded-full px-4 text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ${
                        selected ? 'bg-fg text-ink-950' : 'text-fg-muted hover:bg-white/6 hover:text-fg'
                      }`}
                    >
                      {discipline.label}
                    </button>
                  )
                })}
                <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-dashed border-white/15 px-4 text-sm whitespace-nowrap text-fg-dim">
                  <Plus size={14} aria-hidden="true" />
                  Your own
                </span>
              </div>
              <span className="font-mono text-[0.7rem] text-fg-dim">{streaks.disclaimer}</span>
            </div>

            <div
              id="streak-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeId}`}
              className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-14"
            >
              <StreakStats current={data.current} longest={data.longest} activeDays={data.activeDays} />

              <div
                role="img"
                aria-label={`Example activity heatmap for ${active.label}: ${data.activeDays} active days in the past year, longest streak ${data.longest} days, current streak ${data.current} days.`}
              >
                {/* A year doesn't fit legibly on a phone, so mobile shows the last 26 weeks. */}
                <Heatmap key={`d-${activeId}`} clipId={`clip-d-${activeId}`} levels={data.levels} weeks={52} progress={progress} monthLabels={allMonths} className="hidden md:block" />
                <Heatmap key={`m-${activeId}`} clipId={`clip-m-${activeId}`} levels={data.levels} weeks={26} progress={progress} monthLabels={allMonths.slice(6)} className="md:hidden" />
                <div className="mt-3 flex justify-end"><HeatmapLegend /></div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {streaks.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <h3 className="text-[1.08rem] font-medium tracking-[-0.02em] text-fg">{point.title}</h3>
              <p className="mt-2 text-[0.96rem] leading-relaxed text-fg-muted">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StreakStats({ current, longest, activeDays }: { current: number; longest: number; activeDays: number }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  useEffect(() => {
    if (!isInView || reduced) return
    const controls = animate(0, current, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        if (numberRef.current) numberRef.current.textContent = String(Math.round(value))
      },
    })
    return () => controls.stop()
  }, [current, isInView, reduced])

  return (
    <div ref={ref} className="flex items-end justify-between gap-8 lg:block">
      <div>
        <p className="leading-none">
          <Flame size={22} aria-hidden="true" className="mb-3 text-win-400" />
          <span ref={numberRef} className="block text-[clamp(5.5rem,10vw,9rem)] leading-[0.82] font-semibold tracking-[-0.06em] text-fg">
            {current}
          </span>
        </p>
        <p className="mt-4 text-lg font-medium tracking-[-0.02em] text-fg">day streak</p>
      </div>
      <dl className="flex gap-6 lg:mt-7">
        <div>
          <dt className="text-xs text-fg-dim">Longest</dt>
          <dd className="mt-1 font-mono text-[0.95rem] text-fg tabular-nums">{longest} days</dd>
        </div>
        <div>
          <dt className="text-xs text-fg-dim">This year</dt>
          <dd className="mt-1 font-mono text-[0.95rem] text-fg tabular-nums">{activeDays} days</dd>
        </div>
      </dl>
    </div>
  )
}
