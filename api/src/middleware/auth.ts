import { createMiddleware } from 'hono/factory'
import { getSignedCookie } from 'hono/cookie'
import { env } from '../config/env'
import { verifySession } from '../services/token'
import type { Variables } from '../types/index.js'

export const authMiddleware = createMiddleware<{ Variables: Variables }>(async (c, next) => {
  const sessionToken = await getSignedCookie(c, env.JWT_SECRET, 'session')
  
  if (!sessionToken) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const payload = await verifySession(sessionToken)
    c.set('userId', payload.userId)
    c.set('figmaToken', payload.figmaToken)
    await next()
  } catch {
    return c.json({ error: 'Invalid session' }, 401)
  }
})