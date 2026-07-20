// src/config/env.ts — SOLO lee, no define
import { z } from 'zod'

const envSchema = z.object({
  FIGMA_CLIENT_ID: z.string().min(1),
  FIGMA_CLIENT_SECRET: z.string().min(1),
  FIGMA_REDIRECT_URI: z.string().url(),
  APP_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
})

// Esto falla en build si falta alguna variable en Vercel
export const env = envSchema.parse(process.env)