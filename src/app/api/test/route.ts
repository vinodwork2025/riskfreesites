export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export async function GET() {
  try {
    const ctx = getRequestContext()
    const env = ctx.env as Record<string, unknown>
    const keys = Object.keys(env)
    return NextResponse.json({ ok: true, bindings: keys })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) })
  }
}
