import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { ImagePlus } from 'lucide-react'
import { screenshotAlt } from '../content/site'
import { screenshotSrc } from '../lib/assets'
import { usePrefersReducedMotion } from '../lib/hooks'
import { easeExpo } from './ui/Reveal'

/** Apparent body thickness in px. The visible edge is this depth projected through the tilt. */
const DEPTH = 18
const FLOAT_SECONDS = 8

const BASE_TILT = { x: 5, y: -15, z: 1.4 }
const MOUSE_RANGE = { x: 5, y: 7 }

export function FloatingPhone({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const spring = { stiffness: 55, damping: 18, mass: 0.8 }
  const smoothX = useSpring(pointerX, spring)
  const smoothY = useSpring(pointerY, spring)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [BASE_TILT.y - MOUSE_RANGE.y, BASE_TILT.y + MOUSE_RANGE.y])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [BASE_TILT.x + MOUSE_RANGE.x, BASE_TILT.x - MOUSE_RANGE.x])
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['-8%', '8%'])
  // The phone is deliberately one flat plane tilted in 3D. A preserve-3d stack looks
  // similar but makes Chromium rasterize the screen soft, so the image would blur.
  // The edge is drawn behind the face and slides as the tilt changes, to read as depth.
  const edgeX = useTransform(rotateY, (deg) => -Math.sin((deg * Math.PI) / 180) * DEPTH)
  const edgeY = useTransform(rotateX, (deg) => Math.sin((deg * Math.PI) / 180) * DEPTH)

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, pointerX, pointerY])

  const floatLoop = { duration: FLOAT_SECONDS, repeat: Infinity, ease: 'easeInOut' } as const

  return (
    <div className={`relative [perspective:1700px] ${className}`}>
      {/* Light behind the device. A gradient rather than a blur filter, so it costs nothing to animate. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(240_165_53/0.3),rgb(240_165_53/0.1)_45%,transparent_72%)]"
      />

      {/* Shadow on the "ground". It tightens as the phone sinks and softens as it rises. */}
      <m.div
        aria-hidden="true"
        animate={reduced ? undefined : { scaleX: [1, 0.9, 1], opacity: [0.75, 0.5, 0.75] }}
        transition={floatLoop}
        className="pointer-events-none absolute -bottom-[5%] left-1/2 h-[9%] w-[92%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.95),transparent)]"
      />

      <m.div
        initial={{ opacity: 0, y: 70, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: easeExpo, delay: 0.1 }}
      >
        <m.div animate={reduced ? undefined : { y: [0, -16, 0] }} transition={floatLoop}>
          <m.div style={{ rotateX, rotateY, rotateZ: BASE_TILT.z }} className="relative aspect-[9/19.3] w-full">
            {/* Side buttons on the near edge travel with the body. */}
            <div aria-hidden="true" className="absolute top-[17%] -left-[0.8%] h-[3.6%] w-[1.2%] rounded-l-sm bg-[#4a4a52]" />
            <div aria-hidden="true" className="absolute top-[23.5%] -left-[0.8%] h-[6.5%] w-[1.2%] rounded-l-sm bg-[#4a4a52]" />
            <div aria-hidden="true" className="absolute top-[31.5%] -left-[0.8%] h-[6.5%] w-[1.2%] rounded-l-sm bg-[#4a4a52]" />

            {/* Body edge */}
            <m.div aria-hidden="true" style={{ x: edgeX, y: edgeY }} className="absolute inset-0">
              <div className="absolute top-[26%] -right-[0.8%] h-[10%] w-[1.2%] rounded-r-sm bg-[#6a6a73]" />
              <div className="absolute inset-0 rounded-[13.5%/6.3%] bg-gradient-to-b from-[#62626a] via-[#3a3a41] to-[#50505a]" />
            </m.div>

            {/* Front face: titanium rim, black bezel, screen */}
            <div className="absolute inset-0 rounded-[13.5%/6.3%] bg-[linear-gradient(145deg,#7a7a83_0%,#3b3b42_22%,#2a2a30_55%,#62626b_100%)] p-[1.1%] shadow-[0_60px_110px_-30px_rgb(0_0_0/0.9),0_24px_50px_-20px_rgb(0_0_0/0.75)]">
              <div className="relative h-full w-full rounded-[12.7%/5.9%] bg-black p-[2.6%] shadow-[inset_0_0_2px_rgb(255_255_255/0.25)]">
                <div className="relative h-full w-full overflow-hidden rounded-[10.8%/5%] bg-ink-900">
                  {screenshotSrc ? (
                    <img
                      src={screenshotSrc}
                      alt={screenshotAlt}
                      fetchPriority="high"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <ScreenshotPlaceholder />
                  )}

                  {/* Dynamic Island */}
                  <div aria-hidden="true" className="absolute top-[1.6%] left-1/2 h-[3.3%] w-[29%] -translate-x-1/2 rounded-full bg-black" />

                  {/* Glass reflection, which drifts slightly with the pointer */}
                  <m.div
                    aria-hidden="true"
                    style={{ x: glareX }}
                    className="pointer-events-none absolute -inset-[10%] bg-[linear-gradient(112deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.025)_26%,transparent_40%)]"
                  />
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      </m.div>
    </div>
  )
}

/** Deliberately not a fake app UI. Replaced automatically by src/assets/app-screenshot.*. */
function ScreenshotPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Placeholder for the 3 Wins app screenshot"
      className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(120%_70%_at_50%_0%,#2a2118_0%,#111114_60%)] p-[9%] text-center"
    >
      <div className="flex h-[62%] w-full flex-col items-center justify-center rounded-[1.1rem] border border-dashed border-win-400/45 px-4">
        <span aria-hidden="true" className="mb-4 flex h-11 items-end gap-1.5">
          <span className="h-5 w-2 rounded-full bg-win-400/55" />
          <span className="h-8 w-2 rounded-full bg-win-400/80" />
          <span className="h-11 w-2 rounded-full bg-win-400" />
        </span>
        <span className="font-mono text-[0.62rem] font-medium tracking-[0.15em] text-win-300 uppercase">Placeholder</span>
        <span className="mt-2 text-[0.95rem] leading-snug font-medium tracking-[-0.02em] text-fg">Your app screenshot goes here</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] leading-snug text-fg-muted">
          <ImagePlus size={12} aria-hidden="true" className="shrink-0" />
          src/assets/app-screenshot.png
        </span>
      </div>
    </div>
  )
}
