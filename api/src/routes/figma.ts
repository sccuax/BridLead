import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import type { Variables } from '../types'

const figma = new Hono<{ Variables: Variables }>()

figma.use('*', authMiddleware)

figma.get('/files/:fileKey/nodes', async (c) => {
  const fileKey = c.req.param('fileKey')
  const nodeIds = c.req.query('ids')
  const figmaToken = c.get('figmaToken')

  const url = new URL(`https://api.figma.com/v1/files/${fileKey}/nodes`)
  if (nodeIds) url.searchParams.set('ids', nodeIds)

  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${figmaToken}` }
  })

  return c.json(await response.json())
})

figma.get('/files/:fileKey', async (c) => {
  const fileKey = c.req.param('fileKey')
  const figmaToken = c.get('figmaToken')

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: { 'Authorization': `Bearer ${figmaToken}` }
  })

  return c.json(await response.json())
})

export default figma