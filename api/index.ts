import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ status: 'Leadbri API running' }))

app.get('/auth/figma/callback', (c) => {
  const code = c.req.query('code')
  return c.json({ code })
})

export default app