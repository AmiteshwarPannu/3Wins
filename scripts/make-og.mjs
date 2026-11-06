// Regenerates public/og.png, the social sharing image. Run with: npm run og
import { chromium } from '@playwright/test'

const html = `<!doctype html><html><head><style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#08080a;color:#f4f2ee;font-family:'Segoe UI',system-ui,sans-serif;padding:72px 80px;position:relative;overflow:hidden}
  .glow{position:absolute;inset:0;background:radial-gradient(620px 420px at 88% 104%,rgba(240,165,53,.30),transparent 70%)}
  .brand{display:flex;align-items:flex-end;gap:5px;height:40px;position:relative}
  .brand i{width:9px;border-radius:5px;background:#f7bf5e}
  .brand span{font-size:30px;font-weight:600;margin-left:14px;letter-spacing:-.02em;line-height:36px}
  h1{position:relative;margin-top:92px;font-size:92px;line-height:1.02;font-weight:600;letter-spacing:-.04em}
  em{font-family:Georgia,serif;font-weight:400;color:#fbd38a}
</style></head><body><div class="glow"></div>
<div class="brand"><i style="height:16px;opacity:.55"></i><i style="height:26px;opacity:.78"></i><i style="height:36px"></i><span>3 Wins</span></div>
<h1>Three wins.<br/>Every day.<br/><em>A different you.</em></h1></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('Wrote public/og.png')
