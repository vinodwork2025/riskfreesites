import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { createId } from '@/lib/slug'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>
    const { name, business_name, email, industry, website } = body

    if (!name || !business_name || !email || !industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const id = createId()
    const db = await getDB()

    await db
      .prepare(
        `INSERT INTO leads (id, name, business_name, email, industry, website, status)
         VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      )
      .bind(id, name, business_name, email, industry, website ?? null)
      .run()

    return NextResponse.json({ id }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
