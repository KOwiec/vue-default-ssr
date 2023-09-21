// main application server (only dev mode)  ESM
// https://vitejs.dev/guide/ssr.html
import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()
    const manifest = {}

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    //
    // In middleware mode, if you want to use Vite's own HTML serving logic
    // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    app.use(vite.middlewares)
    // serve index.html - we will tackle this next
    app.use('*', async (req, res) => {
        const url = req.originalUrl

        try {
            // 1. Read index.html
            let template = fs.readFileSync(
                path.resolve(__dirname, '../index.html'),
                'utf-8',
            )

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
            //    and also applies HTML transforms from Vite plugins, e.g. global
            //    preambles from @vitejs/plugin-react
            template = await vite.transformIndexHtml(url, template)

            // 3. Load the server entry. ssrLoadModule automatically transforms
            //    ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            const { render } = await vite.ssrLoadModule('/build/entry-server.js')

            // 4. render the app HTML. This assumes entry-server-dev.js's exported
            //     `render` function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const [appHtml, preloadLinks] = await render(url, manifest)

            // 5. Inject the app-rendered HTML into the template.
            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)

            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace it maps back
            // to your actual source code.
            vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
)

