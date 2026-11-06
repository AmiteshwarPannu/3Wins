import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import * as m from 'motion/react-m'

/** Example data only: average wins per day over a rolling window, on one 0 to 3 axis. */
const RANGES = {
  '7D': { days: 7, values: [2, 3, 1, 3, 2, 3, 3] },
  '30D': { days: 30, values: [1.4, 1.6, 1.5, 1.8, 1.7, 2, 1.8, 1.9, 2.1, 2, 1.7, 1.9, 2.2, 2.1, 2.3, 2, 2.2, 2.4, 2.3, 2.1, 2.4, 2.5, 2.3, 2.6, 2.4, 2.6, 2.7, 2.5, 2.7, 2.8] },
  '90D': { days: 90, values: [0.9, 1.1, 1, 1.2, 1.3, 1.2, 1.5, 1.4, 1.6, 1.5, 1.7, 1.8, 1.7, 1.9, 2, 1.9, 2.1, 2.2, 2.1, 2.3, 2.4, 2.3, 2.5, 2.6, 2.5, 2.7, 2.6, 2.8] },
} as const

type RangeKey = keyof typeof RANGES

const PAD = { top: 12, right: 8, bottom: 6, left: 22 }
const MAX = 3

export function AnalyticsChart() {
  const gradientId = useId()
  // The chart is drawn at its real pixel size, so strokes and labels stay
  // the same weight on a phone as on a desktop.
  const containerRef = useRef<HTMLDivElement>(null)
  const [W, setW] = useState(640)
  const H = W < 480 ? 180 : 220

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => setW(Math.max(200, Math.round(entry.contentRect.width))))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const [rangeKey, setRangeKey] = useState<RangeKey>('30D')
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const { values, days } = RANGES[rangeKey]

  const points = useMemo(() => {
    const innerW = W - PAD.left - PAD.right
    const innerH = H - PAD.top - PAD.bottom
    return values.map((value, i) => ({
      x: PAD.left + (i / (values.length - 1)) * innerW,
      y: PAD.top + (1 - value / MAX) * innerH,
      value,
    }))
  }, [values, W, H])

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const baseline = H - PAD.bottom
  const area = `${line} L${points[points.length - 1].x} ${baseline} L${points[0].x} ${baseline} Z`
  const last = points[points.length - 1]
  const hovered = hoverIndex === null ? null : points[hoverIndex]

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * W
    const fraction = (x - PAD.left) / (W - PAD.left - PAD.right)
    setHoverIndex(Math.max(0, Math.min(points.length - 1, Math.round(fraction * (points.length - 1)))))
  }

  const daysAgo = hoverIndex === null ? 0 : Math.round((1 - hoverIndex / (points.length - 1)) * (days - 1))

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.82rem] text-fg-muted">Average wins per day</span>
        <div role="group" aria-label="Date range" className="flex gap-0.5 rounded-full bg-white/[0.05] p-0.5">
          {(Object.keys(RANGES) as RangeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={key === rangeKey}
              onClick={() => { setRangeKey(key); setHoverIndex(null) }}
              className={`min-h-8 min-w-10 rounded-full px-2.5 font-mono text-[0.72rem] transition-colors duration-200 ${
                key === rangeKey ? 'bg-white/14 text-fg' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-pan-y"
          role="img"
          aria-label={`Example line chart over the last ${days} days. Average wins per day rise from ${values[0]} to ${values[values.length - 1]}.`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-win-400)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-win-400)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((tick) => {
            const y = PAD.top + (1 - tick / MAX) * (H - PAD.top - PAD.bottom)
            return (
              <g key={tick}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="rgb(255 255 255 / 0.07)" strokeWidth="1" />
                <text x={0} y={y + 3.5} fontSize="11" fill="var(--color-fg-dim)" fontFamily="var(--font-mono)">{tick}</text>
              </g>
            )
          })}

          <m.path key={`a-${rangeKey}`} d={area} fill={`url(#${gradientId})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.5 }} />
          <m.path
            key={`l-${rangeKey}`}
            d={line}
            fill="none"
            stroke="var(--color-win-400)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.45, 0, 0.15, 1] }}
          />

          {hovered ? (
            <>
              <line x1={hovered.x} x2={hovered.x} y1={PAD.top} y2={baseline} stroke="rgb(255 255 255 / 0.22)" strokeWidth="1" />
              <circle cx={hovered.x} cy={hovered.y} r="5" fill="var(--color-win-400)" stroke="var(--color-ink-850)" strokeWidth="2" />
            </>
          ) : (
            <circle cx={last.x} cy={last.y} r="4.5" fill="var(--color-win-400)" stroke="var(--color-ink-850)" strokeWidth="2" />
          )}
        </svg>

        {hovered ? (
          <div
            aria-hidden="true"
            style={{ left: `${(hovered.x / W) * 100}%`, top: `${(hovered.y / H) * 100}%` }}
            className={`pointer-events-none absolute z-10 -translate-y-[calc(100%+10px)] rounded-lg bg-ink-700 px-2.5 py-1.5 text-xs whitespace-nowrap text-fg shadow-[0_8px_24px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.1)] ${
              hovered.x > W * 0.75 ? '-translate-x-full' : hovered.x < W * 0.25 ? '' : '-translate-x-1/2'
            }`}
          >
            <span className="font-medium">{hovered.value.toFixed(1)} wins</span>
            <span className="ml-1.5 text-fg-dim">{daysAgo === 0 ? 'today' : `${daysAgo}d ago`}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
