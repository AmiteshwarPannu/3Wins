/**
 * Picks up your real assets from src/assets at build time. If a file isn't
 * there, the value is null and the placeholder renders. No code change needed.
 * Extensions match in lower or upper case (Windows often saves `.PNG`).
 */
const pick = (files: Record<string, unknown>): string | null => {
  const first = Object.values(files)[0]
  return typeof first === 'string' ? first : null
}

export const screenshotSrc = pick(
  import.meta.glob('../assets/app-screenshot.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}', { eager: true, query: '?url', import: 'default' }),
)

export const logoSrc = pick(
  import.meta.glob('../assets/logo.{svg,png,webp,SVG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' }),
)
