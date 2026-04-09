export const runtime = 'edge'

import { notFound } from 'next/navigation'
import { getDB } from '@/lib/db'
import type { DemoContent } from '@/templates/local-service'
import DemoBanner from '@/components/DemoBanner'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params
  const db = getDB()

  const demo = await db
    .prepare(`SELECT content_json, lead_id FROM demos WHERE slug = ?`)
    .bind(slug)
    .first<{ content_json: string; lead_id: string }>()

  if (!demo) notFound()

  const lead = await db
    .prepare(`SELECT business_name, industry FROM leads WHERE id = ?`)
    .bind(demo.lead_id)
    .first<{ business_name: string; industry: string }>()

  const content: DemoContent = JSON.parse(demo.content_json)

  return (
    <div className="min-h-screen bg-white">
      <DemoBanner businessName={lead?.business_name ?? 'Your Business'} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-600 text-white py-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest mb-5">
            {lead?.industry}
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            {content.headline}
          </h1>
          <p className="text-xl text-brand-100 mb-10 max-w-xl mx-auto leading-relaxed">
            {content.subheadline}
          </p>
          <a
            href={`#contact`}
            className="inline-block bg-white text-brand-700 font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:bg-brand-50 transition"
          >
            {content.cta.button}
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center mb-5">
                  <span className="text-brand-600 font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Us</h2>
          <p className="text-gray-500 text-lg leading-relaxed">{content.about}</p>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="bg-brand-500 py-24 px-6 text-center text-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">{content.cta.headline}</h2>
          <p className="text-brand-100 text-lg mb-10">{content.cta.subtext}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {content.contact.phone && (
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition"
              >
                📞 Call Us
              </a>
            )}
            {content.contact.email && (
              <a
                href={`mailto:${content.contact.email}`}
                className="bg-brand-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-800 transition"
              >
                ✉️ Email Us
              </a>
            )}
            {!content.contact.phone && !content.contact.email && (
              <a
                href="#contact"
                className="bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition"
              >
                Get in Touch
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <p>
          Demo built by{' '}
          <a href="/" className="text-brand-500 hover:underline">Risk Free Sites</a>
          {' '}— see your real website for free.
        </p>
      </footer>
    </div>
  )
}
