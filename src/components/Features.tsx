import { features } from '../content/copy'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'
import { SpotlightCard } from './ui/SpotlightCard'
import { AnalyticsChart } from './visuals/AnalyticsChart'
import { MonthlyWrapPreview } from './visuals/MonthlyWrapPreview'
import { DetoxWeek, RewardBalance } from './visuals/SmallVisuals'
import { StudyTimer } from './visuals/StudyTimer'

const titleClass = 'text-[1.5rem] leading-[1.1] font-semibold tracking-[-0.035em] text-balance text-fg md:text-[1.72rem]'
const bodyClass = 'mt-2.5 text-[0.96rem] leading-relaxed text-pretty text-fg-muted'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section relative">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <Reveal><p className="eyebrow">{features.eyebrow}</p></Reveal>
            <div id="features-title">
              <Headline lines={features.headline} className="display display-lg mt-6" />
            </div>
          </div>
          <Reveal delay={0.1}><p className="pb-2 font-mono text-[0.72rem] text-fg-dim">{features.note}</p></Reveal>
        </div>

        <div className="mt-14 grid gap-3.5 md:mt-20 md:grid-cols-6 md:gap-4">
          <Reveal className="md:col-span-3 lg:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-6 md:p-7">
              <StudyTimer />
              <div className="mt-auto pt-8">
                <h3 className={titleClass}>{features.study.title}</h3>
                <p className={bodyClass}>{features.study.body}</p>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3 lg:col-span-4">
            <SpotlightCard className="flex h-full flex-col p-6 md:p-7">
              <div className="max-w-[28rem]">
                <h3 className={titleClass}>{features.analytics.title}</h3>
                <p className={bodyClass}>{features.analytics.body}</p>
              </div>
              <div className="mt-auto pt-8"><AnalyticsChart /></div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-6 lg:col-span-4">
            <SpotlightCard className="h-full p-3.5 md:p-4">
              <div className="px-2.5 pt-3 pb-5 md:px-3 md:pb-6">
                <h3 className={titleClass}>{features.wrap.title}</h3>
                <p className={`${bodyClass} max-w-[34rem]`}>{features.wrap.body}</p>
              </div>
              <MonthlyWrapPreview />
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3 lg:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-6 md:p-7">
              <h3 className={titleClass}>{features.detox.title}</h3>
              <p className={bodyClass}>{features.detox.body}</p>
              <div className="mt-auto pt-7"><DetoxWeek /></div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-3 lg:col-span-6">
            <SpotlightCard className="grid h-full items-center gap-8 p-6 md:p-7 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 font-mono text-[0.7rem] tracking-[0.12em] text-fg-dim uppercase">Optional extra</p>
                <h3 className={titleClass}>{features.rewards.title}</h3>
                <p className={`${bodyClass} max-w-[28rem]`}>{features.rewards.body}</p>
              </div>
              <RewardBalance />
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-[0.98rem] text-fg-muted">{features.extras}</p>
        </Reveal>
      </div>
    </section>
  )
}
