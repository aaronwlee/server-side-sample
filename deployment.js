const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')
const _ = require('lodash');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => {
    const data = await app.renderToHTML(req, res, pagePath, queryParams)

    // Add here custom logic for when you do not want to cache the page, for
    // example when the page returns a 404 status code:
    if (res.statusCode === 404) {
      res.end(data)
      return
    }

    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express()

  server.get('*',
    (req, res, next) => {
      const fullPath = req.baseUrl + req.path;

      if (process.env.NODE_ENV !== "production" || fullPath.split("/")[1] === "_next") {
        return handle(req, res);
      } else {
        next();
      }
    },
    (req, res) => {
      const fullPath = req.baseUrl + req.path;
      return ssrCache({ req, res, pagePath: fullPath })

    }
  )

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})