import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { corsMiddleware } from './src/middleware/cors'
import auth from './src/routes/auth'
import figma from './src/routes/figma'
import health from './src/routes/health'

const app = new Hono()

app.use(logger())
app.use(prettyJSON())
app.use(corsMiddleware)

app.route('/auth', auth)
app.route('/figma', figma)
app.route('/health', health)

app.notFound((c) => c.json({ error: 'Not Found' }, 404))

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app