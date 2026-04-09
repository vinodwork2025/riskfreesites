import { getRequestContext } from '@cloudflare/next-on-pages'

export interface Lead {
  id: string
  name: string
  business_name: string
  email: string
  industry: string
  website?: string
  status: 'new' | 'demo_generated' | 'contacted'
  demo_url?: string
  demo_slug?: string
  created_at: string
}

export function getDB(): D1Database {
  const { env } = getRequestContext()
  return (env as unknown as { DB: D1Database }).DB
}
