import { reviews } from '../content/copy'
import { hasSampleTestimonials, testimonials } from '../content/testimonials'
import { TestimonialCard } from './TestimonialCard'
import { Headline } from './ui/Headline'
import { Reveal } from './ui/Reveal'

export function Testimonials() {
  if (testimonials.length === 0) return null

  // Three staggered columns on desktop. Each column starts lower than the last.
  const columns = [0, 1, 2].map((c) => testimonials.filter((_, i) => i % 3 === c))
  const columnOffsets = ['lg:pt-0', 'lg:pt-16', 'lg:pt-7']

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section relative">
      <div className="shell">
        <Reveal><p className="eyebrow">{reviews.eyebrow}</p></Reveal>
        <div id="reviews-title">
          <Headline lines={reviews.headline} className="display display-lg mt-6" />
        </div>
        {hasSampleTestimonials ? (
          <Reveal delay={0.1} className="mt-6"><span className="setup-tag">{reviews.sampleNotice}</span></Reveal>
        ) : null}

        {/* Desktop: staggered columns */}
        <div className="mt-14 hidden gap-4 md:mt-20 md:grid md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, c) => (
            <div key={c} className={`space-y-4 ${columnOffsets[c]}`}>
              {column.map((testimonial, i) => (
                <Reveal key={testimonial.id} delay={c * 0.08 + i * 0.06}>
                  <TestimonialCard testimonial={testimonial} className="panel transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1" />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Phones: a swipeable row that runs past the screen edge */}
      <div role="group" aria-label="Customer reviews" tabIndex={0} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:hidden">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} className="panel w-[82vw] max-w-[22rem] shrink-0 snap-center" />
        ))}
      </div>
    </section>
  )
}
