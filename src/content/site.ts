/**
 * Site-wide configuration. Destinations can be set here or through environment
 * variables (see .env.example). `null` means "not configured yet", and the UI
 * shows an honest setup state rather than linking somewhere fake.
 */
const env = import.meta.env

const fromEnv = (value: string | undefined): string | null => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export const links = {
  /** Your existing 3 Wins app sign-in page. */
  signIn: fromEnv(env.VITE_SIGN_IN_URL),
  /** Navbar "Get Started". */
  getStarted: fromEnv(env.VITE_GET_STARTED_URL) ?? '#pricing',
  /** Hero and closing "Start Winning". */
  startWinning: fromEnv(env.VITE_GET_STARTED_URL) ?? '#pricing',
  privacy: fromEnv(env.VITE_PRIVACY_URL),
  terms: fromEnv(env.VITE_TERMS_URL),
  contact: fromEnv(env.VITE_CONTACT_URL),
}

export const navItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Pricing', href: '#pricing' },
]

export const footerLinks: { label: string; href: string | null }[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Sign In', href: links.signIn },
  { label: 'Privacy Policy', href: links.privacy },
  { label: 'Terms of Service', href: links.terms },
  { label: 'Contact', href: links.contact },
]

/** Update this alt text when you add the real screenshot to src/assets. */
export const screenshotAlt = "The 3 Wins app showing today's three wins"
