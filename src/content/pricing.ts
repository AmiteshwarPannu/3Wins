/**
 * Pricing configuration. Nothing here is invented: until you fill in `price`
 * and a checkout URL, the card shows a labelled placeholder and the button
 * stays in its setup state.
 */
export const pricing = {
  planName: '3 Wins',
  /** Display string, for example '$29'. null shows the placeholder. */
  price: null as string | null,
  /** For example '/ year' or 'one-time'. */
  period: null as string | null,
  /** Your Stripe Checkout or Payment Link URL. Or set VITE_STRIPE_CHECKOUT_URL. */
  checkoutUrl: (import.meta.env.VITE_STRIPE_CHECKOUT_URL?.trim() || null) as string | null,
  ctaLabel: 'Get 3 Wins',
  tagline: 'The whole system. One plan.',
  features: [
    'Three daily wins and full daily history',
    'Personal disciplines with current and longest streaks',
    'A year-long activity heatmap',
    'Study timer and productivity analytics',
    'Monthly Wrap and Weekly Detox',
    'Optional gaming rewards you configure',
    'Secure personal account with cloud sync',
  ],
}
