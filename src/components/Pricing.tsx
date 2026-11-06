import { ArrowRight, Check } from 'lucide-react'
import { pricingCopy } from '../content/copy'
import { pricing } from '../content/pricing'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'

export function Pricing() {
  const { planName, price, period, checkoutUrl, ctaLabel, tagline, features } = pricing

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute top-[32%] left-1/2 aspect-[2/1] w-[min(1200px,160%)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(240_165_53/0.11),transparent)]" />

      <div className="shell relative">
        <div className="text-center">
          <Reveal><p className="eyebrow">{pricingCopy.eyebrow}</p></Reveal>
          <div id="pricing-title">
            <Headline lines={pricingCopy.headline} className="display display-lg mt-6 [&>span]:text-center" />
          </div>
          <Reveal delay={0.1} className="mt-6"><p className="lede">{pricingCopy.body}</p></Reveal>
        </div>

        <Reveal y={40} className="mx-auto mt-14 max-w-[58rem] md:mt-20">
          {/* Lit from above rather than ringed with a glowing border. */}
          <div className="panel overflow-hidden bg-[radial-gradient(90%_75%_at_20%_-10%,rgb(247_191_94/0.16),transparent_70%),linear-gradient(180deg,rgb(255_255_255/0.055),rgb(255_255_255/0.018))]">
            <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex flex-col p-7 md:p-10">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">{planName}</h3>
                <p className="mt-1 text-[0.95rem] text-fg-muted">{tagline}</p>

                <div className="mt-9 md:mt-12">
                  {price ? (
                    <p className="flex items-baseline gap-2">
                      <span className="text-[clamp(3.5rem,6vw,4.75rem)] leading-none font-semibold tracking-[-0.05em] text-fg tabular-nums">{price}</span>
                      {period ? <span className="text-fg-muted">{period}</span> : null}
                    </p>
                  ) : (
                    <>
                      <p className="text-[clamp(2.4rem,4.4vw,3.25rem)] leading-none font-semibold tracking-[-0.045em] text-fg-dim">Price TBA</p>
                      <span className="setup-tag mt-3">Placeholder: set in src/content/pricing.ts</span>
                    </>
                  )}
                </div>

                <div className="mt-8 md:mt-auto md:pt-12">
                  {checkoutUrl ? (
                    <>
                      <a href={checkoutUrl} rel="noopener" className="btn btn-primary w-full">
                        {ctaLabel}
                        <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
                      </a>
                      <p className="mt-3 text-center text-xs text-fg-dim">Secure checkout by Stripe.</p>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        aria-disabled="true"
                        aria-describedby="checkout-status"
                        data-testid="checkout-setup"
                        onClick={(event) => event.preventDefault()}
                        className="btn w-full cursor-not-allowed bg-white/8 text-fg-muted shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]"
                      >
                        {ctaLabel}
                      </button>
                      <p id="checkout-status" className="mt-3 text-center text-xs text-win-300">
                        Checkout isn't connected yet.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t border-white/8 p-7 md:border-t-0 md:border-l md:p-10">
                <p className="text-sm text-fg-muted">Everything in the app:</p>
                <ul className="mt-5 space-y-3.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-[0.97rem] leading-snug tracking-[-0.01em] text-fg">
                      <Check size={17} strokeWidth={2.4} aria-hidden="true" className="mt-px shrink-0 text-win-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
