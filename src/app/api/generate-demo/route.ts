export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { createSlug } from '@/lib/slug'
import { generateDemoContent } from '@/lib/demo-generator'
import { sendDemoEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { lead_id, business_name, industry, city, name, email } = body

    if (!lead_id || !business_name || !industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug = createSlug(business_name)
    const { content } = generateDemoContent(business_name, industry, city)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const demoUrl = `${baseUrl}/demo/${slug}`

    const db = getDB()

    // Store demo content alongside the lead
    await db
      .prepare(
        `UPDATE leads
         SET status = 'demo_generated',
             demo_slug = ?,
             demo_url = ?
         WHERE id = ?`,
      )
      .bind(slug, demoUrl, lead_id)
      .run()

    // Store the generated content in a separate demos table (created inline if needed)
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS demos (
          slug        TEXT PRIMARY KEY,
          lead_id     TEXT NOT NULL,
          content_json TEXT NOT NULL,
          created_at  TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
      )
      .run()

    await db
      .prepare(`INSERT OR REPLACE INTO demos (slug, lead_id, content_json) VALUES (?, ?, ?)`)
      .bind(slug, lead_id, JSON.stringify(content))
      .run()

    // Send email asynchronously — don't block the response
    if (name && email) {
      sendDemoEmail({ to: email, name, businessName: business_name, demoUrl }).catch(
        (err) => console.error('Email send failed:', err),
      )
    }

    return NextResponse.json({ demo_url: demoUrl, slug }, { status: 201 })
  } catch (err) {
    console.error('POST /api/generate-demo error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
