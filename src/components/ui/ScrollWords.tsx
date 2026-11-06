import type { MotionValue } from 'motion/react'
import { useTransform } from 'motion/react'
import * as m from 'motion/react-m'

type ScrollWordsProps = {
  text: string
  progress: MotionValue<number>
  /** Portion of `progress` over which the words light up. */
  range?: [number, number]
  dim?: number
  className?: string
}

/** Lights up a sentence word by word as the visitor scrolls. Reversible, never hijacks scroll. */
export function ScrollWords({ text, progress, range = [0, 1], dim = 0.13, className }: ScrollWordsProps) {
  const words = text.split(' ')
  const [start, end] = range
  const span = end - start
  return (
    <span className={className}>
      {/* Screen readers get the sentence once, not a word-by-word stutter. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const from = start + (i / words.length) * span
          const to = start + ((i + 1) / words.length) * span
          return (
            <span key={`${word}-${i}`}>
              <Word word={word} progress={progress} from={from} to={to} dim={dim} />
              {i < words.length - 1 ? ' ' : null}
            </span>
          )
        })}
      </span>
    </span>
  )
}

function Word({ word, progress, from, to, dim }: { word: string; progress: MotionValue<number>; from: number; to: number; dim: number }) {
  const opacity = useTransform(progress, [from, to], [dim, 1])
  return <m.span style={{ opacity }}>{word}</m.span>
}
