// Renders the page to static HTML after the build, so crawlers and first paint
// get real content. The client then hydrates it. No server is needed at runtime.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const htmlPath = resolve(root, 'dist/index.html')
const template = await readFile(htmlPath, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('index.html is missing the <!--app-html--> marker')
await writeFile(htmlPath, template.replace('<!--app-html-->', () => render()))
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerendered dist/index.html')
