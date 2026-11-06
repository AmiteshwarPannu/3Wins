import { ArrowRight } from 'lucide-react'
import { finalCta } from '../content/copy'
import { links } from '../content/site'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="grain relative overflow-hidden pt-[clamp(6rem,12vw,10rem)] pb-[clamp(7rem,14vw,12rem)]">
      {/* A low sunrise. The footer's top edge is the horizon it rises from. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] bg-[radial-gradient(62%_100%_at_50%_100%,rgb(240_165_53/0.27),rgb(240_165_53/0.08)_52%,transparent_100%)]" />

      <div className="shell relative text-center">
        <div id="final-title">
          <Headline lines={finalCta.headline} className="display text-[clamp(2.5rem,7vw,6.5rem)] [&>span]:text-center" />
        </div>
        <Reveal delay={0.15} className="mt-8"><p className="lede !text-fg">{finalCta.body}</p></Reveal>
        <Reveal delay={0.25} className="mt-9">
          <a href={links.startWinning} className="btn btn-primary">
            {finalCta.cta}
            <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
