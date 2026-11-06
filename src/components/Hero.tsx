import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight } from 'lucide-react'
import { hero } from '../content/copy'
import { links } from '../content/site'
import { testimonials } from '../content/testimonials'
import { FloatingPhone } from './FloatingPhone'
import { TestimonialCard } from './TestimonialCard'
import { Headline } from './ui/Headline'
import { Reveal, easeExpo } from './ui/Reveal'

const featured = testimonials.filter((t) => t.featured).slice(0, 3)

/** Staggered, editorial placement of the cards beside the phone. */
const cardLayout = [
  { offset: '3col:ml-0', depth: 'shadow-[0_24px_60px_-24px_rgb(0_0_0/0.85)]', drift: -30 },
  { offset: '3col:ml-14', depth: 'shadow-[0_34px_80px_-22px_rgb(0_0_0/0.95)]', drift: -70 },
  { offset: '3col:ml-5', depth: 'shadow-[0_18px_46px_-22px_rgb(0_0_0/0.75)]', drift: -18 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const drift0 = useTransform(scrollYProgress, [0, 1], [0, cardLayout[0].drift])
  const drift1 = useTransform(scrollYProgress, [0, 1], [0, cardLayout[1].drift])
  const drift2 = useTransform(scrollYProgress, [0, 1], [0, cardLayout[2].drift])
  const drifts = [drift0, drift1, drift2]

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="grain relative overflow-x-clip">
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,rgb(240_165_53/0.09),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />

      <div className="shell relative grid min-h-[100svh] grid-cols-1 items-center gap-x-8 gap-y-14 pt-28 pb-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-y-16 3col:grid-cols-[minmax(0,1.15fr)_auto_minmax(0,0.85fr)] 3col:gap-x-10 3col:pt-24 3col:pb-16">
        {/* Headline and introduction */}
        <div className="text-center md:col-span-2 3col:col-span-1 3col:text-left">
          <Reveal immediate delay={0.05} y={12}>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>
          <Headline as="h1" lines={hero.headline} immediate delay={0.1} className="display display-xl mt-6" />
          <Reveal immediate delay={0.45} className="mx-auto mt-7 max-w-[32rem] 3col:mx-0 3col:max-w-[27rem]">
            <p className="lede">{hero.body}</p>
          </Reveal>
          <Reveal immediate delay={0.55} className="mt-9 flex flex-wrap items-center justify-center gap-3 3col:justify-start">
            <a href={links.startWinning} className="btn btn-primary">
              {hero.primaryCta}
              <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
            </a>
            <a href="#how-it-works" className="btn btn-ghost">
              {hero.secondaryCta}
            </a>
          </Reveal>
        </div>

        {/* The phone, sized from whichever viewport dimension is tighter */}
        <m.div style={{ y: phoneY }} className="relative justify-self-center md:justify-self-end 3col:justify-self-center">
          <FloatingPhone className="w-[min(70vw,290px)] md:w-[min(38vw,300px)] 3col:w-[min(24vw,38svh,350px)]" />
        </m.div>

        {/* Testimonials beside the phone */}
        {featured.length > 0 ? (
          <div
            aria-label="What people are saying"
            role="group"
            tabIndex={0}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pl-4 3col:pl-0"
          >
            {featured.map((testimonial, i) => (
              <m.div
                key={testimonial.id}
                style={{ y: drifts[i] }}
                className={`w-[78vw] max-w-[20rem] shrink-0 snap-center md:w-full md:max-w-[20rem] 3col:max-w-[19rem] ${cardLayout[i].offset}`}
              >
                <m.div
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.1, delay: 0.75 + i * 0.16, ease: easeExpo }}
                >
                  <TestimonialCard compact testimonial={testimonial} className={`glass ${cardLayout[i].depth}`} />
                </m.div>
              </m.div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
