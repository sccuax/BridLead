import { Hono } from 'hono'
import { getSignedCookie, setSignedCookie, deleteCookie } from 'hono/cookie'
import { env } from '../config/env'
import { createSession } from '../services/token'
import { exchangeCodeForTokens, refreshAccessToken } from '../services/figma'
import { generateState } from '../lib/crypto'

const auth = new Hono()

auth.get('/figma', async (c) => {
  const state = generateState()
  
  await setSignedCookie(c, 'oauth_state', state, env.JWT_SECRET, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 600,
    path: '/',
  })

  const url = new URL('https://www.figma.com/oauth')
  url.searchParams.set('client_id', env.FIGMA_CLIENT_ID)
  url.searchParams.set('redirect_uri', env.FIGMA_REDIRECT_URI)
  url.searchParams.set('scope', 'file_content:read')
  url.searchParams.set('state', state)
  url.searchParams.set('response_type', 'code')

  return c.redirect(url.toString())
})

auth.get('/figma/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  const storedState = await getSignedCookie(c, env.JWT_SECRET, 'oauth_state')

  if (!state || state !== storedState) {
    return c.json({ error: 'Invalid state' }, 403)
  }

  deleteCookie(c, 'oauth_state', { path: '/' })
  if (!code) return c.json({ error: 'No code' }, 400)

  const tokenData = await exchangeCodeForTokens(code, env.FIGMA_REDIRECT_URI)

  if (!tokenData.access_token) {
    return c.json({ error: 'Token failed', details: tokenData }, 400)
  }

  const sessionToken = await createSession({
    userId: tokenData.user_id || 'figma_user',
    figmaToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
    exp: Math.floor(Date.now() / 1000) + (tokenData.expires_in || 3600),
  })

  await setSignedCookie(c, 'session', sessionToken, env.JWT_SECRET, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: tokenData.expires_in || 3600,
    path: '/',
  })

  return c.redirect(`${env.APP_URL}?auth=success`)
})

auth.post('/refresh', async (c) => {
  const sessionToken = await getSignedCookie(c, env.JWT_SECRET, 'session')
  if (!sessionToken) return c.json({ error: 'No session' }, 401)

  try {
    const { verifySession } = await import('../services/token')
    const payload = await verifySession(sessionToken)
    const newTokens = await refreshAccessToken(payload.refreshToken)

    const newSession = await createSession({
      ...payload,
      figmaToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
      exp: Math.floor(Date.now() / 1000) + newTokens.expires_in,
    })

    await setSignedCookie(c, 'session', newSession, env.JWT_SECRET, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: newTokens.expires_in,
      path: '/',
    })

    return c.json({ success: true })
  } catch {
    return c.json({ error: 'Refresh failed' }, 401)
  }
})

auth.post('/logout', (c) => {
  deleteCookie(c, 'session', { path: '/' })
  return c.json({ success: true })
})

export default auth