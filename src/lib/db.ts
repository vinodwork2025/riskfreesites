import { getCloudflareContext } from '@opennextjs/cloudflare'

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

export async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true })
  return (env as unknown as { DB: D1Database }).DB
}
