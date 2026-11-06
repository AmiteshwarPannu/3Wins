# 3 Wins landing page

The marketing site for [my3wins.com](https://my3wins.com). A standalone static site built with
React, Vite, TypeScript, Tailwind CSS, and Motion. It has no connection to the 3 Wins app's
Lambda, DynamoDB, Cognito, or frontend, and it can't affect them.

## Commands

```bash
npm install          # first time only
npm run dev          # live preview at http://localhost:5173
npm run build        # production build into dist/, with prerendered HTML
npm run preview      # serve that build at http://localhost:4173
npm test             # browser tests at five screen sizes
npm run og           # regenerate the social sharing image
```

`npm test` also saves screenshots of every section to `test-results/shots/`.

## Before launch

Everything unfinished shows a visible placeholder or setup state, so nothing fake can go live by accident.

| What | Where | Until it's set |
| --- | --- | --- |
| App screenshot | Drop in `src/assets/app-screenshot.png` (or `.webp`, `.jpg`, `.avif`), then update `screenshotAlt` in `src/content/site.ts` | Labelled placeholder in the phone |
| Logo (optional) | Drop in `src/assets/logo.svg` (or `.png`, `.webp`) | Placeholder three-bar mark and wordmark |
| Reviews | `src/content/testimonials.ts`, setting `sample: false` on each real one | "Sample" labels. Delete all entries to remove the review sections |
| Price | `price` and `period` in `src/content/pricing.ts` | "Price TBA" with a placeholder tag |
| Stripe checkout | `VITE_STRIPE_CHECKOUT_URL` | "Get 3 Wins" is disabled and says checkout isn't connected |
| Sign-in link | `VITE_SIGN_IN_URL` | "Sign In" is greyed out |
| Get Started and Start Winning | `VITE_GET_STARTED_URL` | Scroll to the pricing section |
| Privacy, Terms, Contact | `VITE_PRIVACY_URL`, `VITE_TERMS_URL`, `VITE_CONTACT_URL` | Plain text marked "Soon", not links |
| Brand color | `--color-win-*` in `src/index.css`, plus `public/favicon.svg` and `scripts/make-og.mjs` | Warm amber, chosen without seeing the app |

Set the `VITE_*` values by copying `.env.example` to `.env.local`, or in your host's environment
settings. They are built into the public site, so use only URLs, never secrets. Rebuild after changing them.

All marketing copy is in `src/content/copy.ts`.

**Example numbers:** the streaks, heatmap, charts, and Monthly Wrap previews use made-up example
data and are labelled as illustrative. Compare them with the real app's features and wording before launch.

## Deploying

`npm run build` produces a plain static folder, `dist/`. Any static host works.

- **AWS Amplify Hosting:** connect the repository. Build command `npm run build`, output directory `dist`.
- **S3 and CloudFront:** upload `dist/` to a new, dedicated bucket behind a new distribution.
  Cache `assets/*` for a long time (the filenames are hashed) and keep `index.html` on a short cache.
- **Vercel, Netlify, Cloudflare Pages:** same build command and output directory.

Keep this in new resources, separate from the app's. Pointing `my3wins.com` here is a DNS decision
to make only once you've settled where the app itself will live, because a change could take the app offline.

## Structure

```
src/content/     Editable copy, pricing, reviews, and links
src/assets/      Drop-in screenshot and logo
src/components/  One file per page section
src/components/visuals/  Feature demos
src/components/ui/       Shared pieces such as Headline and Reveal
src/lib/         Asset detection, example heatmap data, hooks
scripts/         Prerender step and sharing-image generator
tests/           Playwright tests
```

**Phone rendering:** `FloatingPhone` tilts the phone as one flat plane and draws its thickness as a
sliding edge. Don't switch it to `preserve-3d` stacked layers: that blurs the screenshot in Chromium.
