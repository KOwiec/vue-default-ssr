// main application server  (dev & prod mode)  ESM
// https://vitejs.dev/guide/ssr.html
// example from https://github.com/vitejs/vite/blob/v2/packages/playground/ssr-vue/server.js
import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'
import compression from 'compression'
// option:
//serveStatic from 'serve-static'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const __dirname = path.dirname(fileURLToPath(import.meta.url))
async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production'
) {
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProd = isProd
        ? fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8')
        : ''

    const manifest = isProd
        ? '../dist/client/ssr-manifest.json'
        : {}

    const app = express()
    let vite
    if (!isProd) {
        vite = await createViteServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency.
                    usePolling: true,
                    interval: 100
                }
            }
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        //https://www.npmjs.com/package/compression
        //Node.js compression middleware. The middleware will attempt to compress
        // response bodies for all request that traverse through the middleware
        app.use(compression())
        //https://expressjs.com/en/starter/static-files.html
        //To serve static files such as images, CSS files, and JavaScript files,
        // argument specifies the root directory from which to serve static assets
        app.use(express.static(resolve('../dist/client')))
        // option:
        //app.use(
        //    serveStatic(resolve('dist/client'), {
        //        index: false
        //    })
        //)
    }
    // serve index.html - we will tackle this next
    app.use('*', async (req, res) => {
        const url = req.originalUrl

        try {
            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render   = (await vite.ssrLoadModule('/build/entry-server.js')).render
            } else {
                template = indexProd
                //we need to read and pass the manifest to the render function exported by src/entry-server.js.
                // This would provide us with enough information to render preload directives for files used by async routes
                render = import('../dist/server/entry-server.js')
            }

            const [appHtml, preloadLinks] = await render(url, manifest)
            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log('http://localhost:3000')
        })
    )
}

// for test use
export default createServer