import { cors } from 'hono/cors'
import { env } from '../config/env'

export const corsMiddleware = cors({
  origin: env.NODE_ENV === 'production' 
    ? [env.APP_URL, 'https://*.webflow.com'] 
    : '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
})