import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ status: 'Leadbri API running' }))

// Redirige al usuario a Figma para autorizar
app.get('/auth/figma', (c) => {
  const clientId = process.env.FIGMA_CLIENT_ID!
  const redirectUri = process.env.FIGMA_REDIRECT_URI!
  const url = `https://www.figma.com/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=file_content:read&state=leadbri&response_type=code`
  return c.redirect(url)
})

// Figma redirige aquí con el código
app.get('/auth/figma/callback', async (c) => {
  const code = c.req.query('code')
  if (!code) return c.json({ error: 'No code received' }, 400)

  const clientId = process.env.FIGMA_CLIENT_ID!
  const clientSecret = process.env.FIGMA_CLIENT_SECRET!
  const redirectUri = process.env.FIGMA_REDIRECT_URI!

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://api.figma.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    },
    body: new URLSearchParams({
      redirect_uri: redirectUri,
      code,
      grant_type: 'authorization_code'
    })
  })

  const token = await response.json()
  return c.json({ success: true, token })
})

export default app