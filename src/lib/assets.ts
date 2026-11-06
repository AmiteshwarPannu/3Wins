/**
 * Picks up your real assets from src/assets at build time. If a file isn't
 * there, the value is null and the placeholder renders. No code change needed.
 */
const pick = (files: Record<string, unknown>): string | null => {
  const first = Object.values(files)[0]
  return typeof first === 'string' ? first : null
}

export const screenshotSrc = pick(
  import.meta.glob('../assets/app-screenshot.{png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' }),
)

export const logoSrc = pick(
  import.meta.glob('../assets/logo.{svg,png,webp}', { eager: true, query: '?url', import: 'default' }),
)
