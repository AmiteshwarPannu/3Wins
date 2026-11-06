import { useRef } from 'react'
import { useScroll } from 'motion/react'
import * as m from 'motion/react-m'
import { howItWorks } from '../content/copy'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'
import { ComposerVisual, MomentumVisual, ProgressVisual } from './visuals/StepVisuals'

const visuals = [ComposerVisual, MomentumVisual, ProgressVisual]

export function HowItWorks() {
  const railRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 62%', 'end 62%'] })

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section relative">
      <div className="shell">
        <Reveal><p className="eyebrow">{howItWorks.eyebrow}</p></Reveal>
        <div id="how-title">
          <Headline lines={howItWorks.headline} className="display display-lg mt-6" />
        </div>

        <ol ref={railRef} className="relative mt-20 space-y-24 md:mt-28 md:space-y-36">
          {/* The rail fills as you read down the steps. */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-white/10 lg:left-1/2">
            <m.span style={{ scaleY: scrollYProgress }} className="block h-full w-full origin-top bg-gradient-to-b from-win-300 to-win-500" />
          </span>

          {howItWorks.steps.map((step, i) => {
            const Visual = visuals[i]
            const flipped = i % 2 === 1
            return (
              <li key={step.n} className="relative grid gap-10 pl-11 lg:grid-cols-2 lg:gap-28 lg:pl-0">
                <m.span
                  aria-hidden="true"
                  initial={{ backgroundColor: '#202027', scale: 0.8 }}
                  whileInView={{ backgroundColor: '#f7bf5e', scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -38% 0px' }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1 left-0 grid size-[1.4rem] place-items-center rounded-full shadow-[0_0_0_6px_var(--color-ink-950)] lg:left-1/2 lg:-ml-[0.7rem]"
                >
                  <span className="size-1.5 rounded-full bg-ink-950" />
                </m.span>

                <Reveal className={`self-center ${flipped ? 'lg:order-2' : 'lg:text-right'}`}>
                  <span aria-hidden="true" className="block font-serif text-[clamp(4.5rem,9vw,8rem)] leading-[0.8] text-white/20 italic">
                    {step.n}
                  </span>
                  <h3 className="display mt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">
                    <span className="sr-only">Step {step.n}: </span>
                    {step.title}
                  </h3>
                  <p className={`lede mt-4 max-w-[26rem] ${flipped ? '' : 'lg:ml-auto'}`}>{step.body}</p>
                </Reveal>

                <Reveal delay={0.12} y={34} className={flipped ? 'lg:order-1' : ''}>
                  <Visual />
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
