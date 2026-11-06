import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { MotionValue } from 'motion/react'
import { useMotionValueEvent } from 'motion/react'
import { DAYS, WEEKS } from '../../lib/heatmap'

const CELL = 12
const GAP = 3
const STEP = CELL + GAP

/** Sequential ramp, one hue, encoding wins logged that day (1 to 3). */
const levelOpacity = [0, 0.3, 0.6, 1]

type HeatmapProps = {
  levels: number[]
  weeks: number
  /** 0 to 1. Columns light up left to right as this advances. */
  progress: MotionValue<number>
  clipId: string
  monthLabels: string[]
  className?: string
}

export function Heatmap({ levels, weeks, progress, clipId, monthLabels, className = '' }: HeatmapProps) {
  const width = weeks * STEP - GAP
  const height = DAYS * STEP - GAP
  const offset = (WEEKS - weeks) * DAYS
  const clipRect = useRef<SVGRectElement>(null)
  const [hover, setHover] = useState<{ x: number; y: number; wins: number } | null>(null)

  // Snap to whole columns so the year fills in week by week. Writing the attribute
  // directly means one cheap DOM change per column, with no React render.
  const applyProgress = (value: number) => {
    const columns = Math.round(value * weeks)
    clipRect.current?.setAttribute('width', String(columns * STEP))
  }
  useMotionValueEvent(progress, 'change', applyProgress)

  const onMove = (event: MouseEvent<SVGSVGElement>) => {
    const target = event.target as SVGElement
    const index = target.getAttribute?.('data-i')
    if (index === null || index === undefined) return setHover(null)
    const i = Number(index)
    setHover({ x: Math.floor(i / DAYS) * STEP + CELL / 2, y: (i % DAYS) * STEP, wins: levels[offset + i] })
  }

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="mb-2 flex justify-between font-mono text-[0.68rem] text-fg-dim">
        {monthLabels.map((label) => <span key={label}>{label}</span>)}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full"
        aria-hidden="true"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <clipPath id={clipId}>
          <rect ref={(node) => { clipRect.current = node; applyProgress(progress.get()) }} x={-1} y={-1} width={0} height={height + 2} />
        </clipPath>

        {/* Empty grid. This doubles as the hit area for the tooltip. */}
        {Array.from({ length: weeks * DAYS }, (_, i) => (
          <rect key={i} data-i={i} x={Math.floor(i / DAYS) * STEP} y={(i % DAYS) * STEP} width={CELL} height={CELL} rx={2.6} fill="rgb(255 255 255 / 0.055)" />
        ))}

        {/* Days with wins, revealed by the clip as the visitor scrolls. */}
        <g clipPath={`url(#${clipId})`} pointerEvents="none">
          {levels.slice(offset).map((level, i) =>
            level > 0 ? (
              <rect key={i} x={Math.floor(i / DAYS) * STEP} y={(i % DAYS) * STEP} width={CELL} height={CELL} rx={2.6} fill="var(--color-win-400)" opacity={levelOpacity[level]} />
            ) : null,
          )}
        </g>
      </svg>

      {hover ? (
        <div
          aria-hidden="true"
          style={{ left: `${(hover.x / width) * 100}%`, top: `calc(1.4rem + ${(hover.y / height) * 100}%)` }}
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+6px)] rounded-lg bg-ink-700 px-2.5 py-1.5 text-xs whitespace-nowrap text-fg shadow-[0_8px_24px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.1)]"
        >
          {hover.wins === 0 ? 'No wins' : hover.wins === 1 ? '1 win' : `${hover.wins} wins`}
        </div>
      ) : null}
    </div>
  )
}

/** Legend for the heatmap ramp. Identity is carried by the labels, not color alone. */
export function HeatmapLegend() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[0.68rem] text-fg-dim">
      <span className="mr-0.5">Wins per day</span>
      {[0, 1, 2, 3].map((level) => (
        <span key={level} className="inline-flex items-center gap-1">
          <span
            className="size-2.5 rounded-[3px]"
            style={level === 0 ? { background: 'rgb(255 255 255 / 0.055)' } : { background: 'var(--color-win-400)', opacity: levelOpacity[level] }}
          />
          <span>{level}</span>
        </span>
      ))}
    </div>
  )
}
