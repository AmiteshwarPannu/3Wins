/**
 * Customer reviews. Everything below is a PLACEHOLDER, not a real review.
 *
 * To add a real one: replace `quote`, `name` and `role`, set `sample: false`,
 * and optionally set `avatar` to an image in /public (for example '/avatars/sam.webp').
 * `featured: true` also shows it beside the phone in the hero (up to three).
 * Delete every entry and the review sections disappear from the page.
 */
export type Testimonial = {
  id: string
  quote: string
  name: string
  role?: string
  avatar?: string
  featured?: boolean
  /** True until this is a real customer review. Shows a "Sample" label. */
  sample: boolean
}

export const testimonials: Testimonial[] = [
  { id: 'r1', featured: true, sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: "Sample review. A real customer's words about what changed for them go here." },
  { id: 'r2', featured: true, sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: 'Sample review. Short and specific works best beside the phone.' },
  { id: 'r3', featured: true, sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: 'Sample review. Replace this text in src/content/testimonials.ts.' },
  { id: 'r4', sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: 'Sample review. This card has room for a longer story: where the person started, what they tracked, and what they noticed once showing up became a habit.' },
  { id: 'r5', sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: 'Sample review. One honest sentence is enough.' },
  { id: 'r6', sample: true, name: 'Reviewer name', role: 'Role or description',
    quote: 'Sample review. A student, developer, or founder describing their streak in their own words would sit nicely here.' },
]

export const hasSampleTestimonials = testimonials.some((t) => t.sample)
