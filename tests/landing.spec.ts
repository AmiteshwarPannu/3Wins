import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/** Scroll the whole page in steps so scroll and in-view animations fire, as for a real visitor. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = Math.floor(window.innerHeight * 0.5)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 90))
    }
    await new Promise((resolve) => setTimeout(resolve, 1200))
  })
}

test('renders without errors and with no horizontal overflow', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' || message.text().toLowerCase().includes('hydrat')) errors.push(message.text())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Three wins.')
  await scrollThrough(page)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBe(0)
  expect(errors).toEqual([])
})

test('prerendered HTML contains the real content', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('A different you.')
  expect(html).toContain('Just three.')
  expect(html).not.toContain('<!--app-html-->')
})

test('honest placeholders: nothing fake is presented as real', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('Placeholder for the 3 Wins app screenshot')).toBeVisible()
  const checkout = page.getByTestId('checkout-setup')
  await expect(checkout).toHaveAttribute('aria-disabled', 'true')
  await expect(page.getByText("Checkout isn't connected yet.")).toBeAttached()
  await expect(page.getByText('Sample content. These are placeholders, not real reviews.')).toBeAttached()
  await expect(page.locator('footer').getByRole('link', { name: 'Privacy Policy' })).toHaveCount(0)
})

test('nav links reach their sections', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile || (page.viewportSize()?.width ?? 0) < 1024) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Pricing' }).click()
    await expect(page.locator('#mobile-menu')).toBeHidden()
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' }).click()
  }
  await expect(page.locator('#pricing')).toBeInViewport()
})

test('discipline tabs switch and work from the keyboard', async ({ page }) => {
  await page.goto('/')
  const fitness = page.getByRole('tab', { name: 'Fitness' })
  await fitness.scrollIntoViewIfNeeded()
  await expect(page.getByRole('tabpanel')).toContainText('12')
  await fitness.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Coding' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('23')
})

test('no serious accessibility violations', async ({ page }) => {
  await page.goto('/')
  await scrollThrough(page)
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
  const serious = results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
  expect(serious).toEqual([])
})

test('reduced motion shows everything without pinned scroll sections', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', baseURL })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByText('But what you do every day might.')).toBeVisible()
  // Pinned sections become ordinary flow: no element is sticky, and the closing line is fully opaque.
  const stickyPinned = await page.evaluate(() => [...document.querySelectorAll('section *')].filter((el) => getComputedStyle(el).position === 'sticky' && el.clientHeight >= window.innerHeight - 1).length)
  expect(stickyPinned).toBe(0)
  await page.getByText('A good day doesn').scrollIntoViewIfNeeded()
  await expect(page.getByText('A good day doesn')).toHaveCSS('opacity', '1')
  await context.close()
})

test('capture screenshots for review', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.waitForTimeout(2200)
  await page.screenshot({ path: `test-results/shots/${testInfo.project.name}-00-hero.png` })

  const marks: [string, string][] = [
    ['01-problem', '#problem-title'],
    ['03-how', '#how-title'],
    ['04-streaks', '#streaks-title'],
    ['05-features', '#features-title'],
    ['07-reviews', '#reviews-title'],
    ['08-pricing', '#pricing-title'],
    ['09-final', '#final-title'],
  ]
  await scrollThrough(page)
  for (const [name, selector] of marks) {
    await page.locator(selector).evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }))
    await page.evaluate(() => window.scrollBy({ top: -110, behavior: 'instant' }))
    await page.waitForTimeout(900)
    await page.screenshot({ path: `test-results/shots/${testInfo.project.name}-${name}.png` })
  }

  // Pinned sections, at the end of their scroll.
  for (const [name, label, fraction] of [
    ['02-three-wins', 'philosophy-title', 0.9],
    ['06-brand', 'brand', 0.95],
  ] as const) {
    const y = await page.evaluate(
      ([id, f]) => {
        const el = (id === 'brand'
          ? document.querySelector('section[aria-label="Why every day matters"]')
          : document.getElementById(id as string)?.closest('section')) as HTMLElement
        const top = el.getBoundingClientRect().top + window.scrollY
        return top + (el.offsetHeight - window.innerHeight) * (f as number)
      },
      [label, fraction] as const,
    )
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
    await page.waitForTimeout(900)
    await page.screenshot({ path: `test-results/shots/${testInfo.project.name}-${name}.png` })
  }

  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(900)
  await page.screenshot({ path: `test-results/shots/${testInfo.project.name}-10-footer.png` })
})
