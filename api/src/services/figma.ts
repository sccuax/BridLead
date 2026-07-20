const FIGMA_API = 'https://api.figma.com/v1'

export async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const response = await fetch(`${FIGMA_API}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.FIGMA_CLIENT_ID!,
      client_secret: process.env.FIGMA_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      code,
      grant_type: 'authorization_code',
    }),
  })
  return response.json()
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${FIGMA_API}/oauth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.FIGMA_CLIENT_ID!,
      client_secret: process.env.FIGMA_CLIENT_SECRET!,
      refresh_token: refreshToken,
    }),
  })
  return response.json()
}