/**
 * Deterministic example data for the heatmap. A cell is one day and its level
 * is the number of wins logged that day (0 to 3). Displayed streak numbers are
 * computed from this data, so the grid and the counters always agree.
 */
export const WEEKS = 52
export const DAYS = 7

const mulberry32 = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export type HeatmapData = { levels: number[]; current: number; longest: number; activeDays: number }

export function generateHeatmap(seed: number, current: number, longest: number, density: number): HeatmapData {
  const random = mulberry32(seed)
  const total = WEEKS * DAYS
  const levels: number[] = []

  // Activity becomes more consistent across the year.
  for (let i = 0; i < total; i++) {
    const chance = (0.22 + 0.5 * (i / total)) * density
    levels.push(random() < chance ? 1 + Math.floor(random() * 3) : 0)
  }

  // A long run mid-year, then the current streak up to today (the last cell).
  const runStart = Math.floor(total * (0.45 + random() * 0.15))
  levels[runStart - 1] = 0
  for (let i = runStart; i < runStart + longest; i++) levels[i] ||= 1 + Math.floor(random() * 3)
  levels[runStart + longest] = 0

  const streakStart = total - current
  levels[streakStart - 1] = 0
  for (let i = streakStart; i < total; i++) levels[i] = random() < 0.65 ? 3 : 2

  let best = 0
  let run = 0
  let activeDays = 0
  for (const level of levels) {
    run = level > 0 ? run + 1 : 0
    best = Math.max(best, run)
    if (level > 0) activeDays++
  }
  return { levels, current, longest: best, activeDays }
}
