// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { render } from '../dist/server/entry-server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = '../dist/static/ssr-manifest.json'
const template = fs.readFileSync(toAbsolute('../dist/static/index.html'), 'utf-8')

// determine routes to pre-render from src/views
const routesToPrerender = fs
    .readdirSync(toAbsolute('../src/views'))
    .map((file) => {
        const name = file.replace(/\.vue$/, '').toLowerCase()
        //console.log("name", name)
        return name === 'homeview' ? `/` : `/${name}`
    })

;(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        //console.log("url",url)
        const [appHtml, preloadLinks] = await render(url, manifest)

        const html = template
            .replace(`<!--preload-links-->`, preloadLinks)
            .replace(`<!--app-html-->`, appHtml)

        const filePath = `../dist/static${url === '/' ? '/index' : url}.html`
        fs.writeFileSync(toAbsolute(filePath), html)
        console.log('pre-rendered:', filePath)
    }

    // done, delete ssr manifest
    fs.unlinkSync(toAbsolute('../dist/static/ssr-manifest.json'))
})()