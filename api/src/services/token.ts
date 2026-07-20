import { sign, verify } from 'hono/jwt'
import { env } from '../config/env'

interface SessionPayload {
  userId: string
  figmaToken: string
  refreshToken: string
  exp: number
  [key: string]: unknown
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return sign(payload, env.JWT_SECRET, 'HS256')
}

export async function verifySession(token: string): Promise<SessionPayload> {
  const payload = await verify(token, env.JWT_SECRET, 'HS256')
  return payload as unknown as SessionPayload
}