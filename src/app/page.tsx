'use client'

import { useState } from 'react'
import LeadForm from '@/components/LeadForm'
import LoadingScreen from '@/components/LoadingScreen'

type Stage = 'landing' | 'form' | 'loading' | 'done'

export default function Home() {
  const [stage, setStage] = useState<Stage>('landing')
  const [demoUrl, setDemoUrl] = useState('')

  function handleCTA() {
    setStage('form')
  }

  async function handleFormSubmit(data: {
    name: string
    business_name: string
    email: string
    industry: string
    website?: string
  }) {
    setStage('loading')

    try {
      // Step 1: Save lead
      const leadRes = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const { id: lead_id } = await leadRes.json()

      // Step 2: Generate demo (runs while loading screen plays)
      const demoRes = await fetch('/api/generate-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id,
          business_name: data.business_name,
          industry: data.industry,
          name: data.name,
          email: data.email,
        }),
      })
      const { demo_url } = await demoRes.json()
      setDemoUrl(demo_url)
    } catch {
      // Even on error, keep loading so UX isn't broken
    }
  }

  function handleLoadingComplete() {
    if (demoUrl) {
      window.location.href = demoUrl
    } else {
      setStage('done')
    }
  }

  // ── Landing ──────────────────────────────────────────────
  if (stage === 'landing') {
    return (
      <main className="min-h-screen bg-white flex flex-col">
        {/* Nav */}
        <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Risk Free <span className="text-brand-500">Sites</span>
          </span>
          <button
            onClick={handleCTA}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition"
          >
            Get my demo →
          </button>
        </nav>

        {/* Hero */}
        <section className="flex-1 flex items-center justify-center px-6 py-24 text-center">
          <div className="max-w-2xl mx-auto animate-[fadeIn_0.7s_ease-out]">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Your demo is being prepared right now
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              We've Already Started<br />
              <span className="text-brand-500">Your Website</span>
            </h1>

            <p className="text-xl text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
              Tell us your business name and industry. We'll build a personalised demo site — live, real, and ready to view in minutes.
            </p>

            <button
              onClick={handleCTA}
              className="bg-brand-500 hover:bg-brand-600 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-105 active:scale-100"
            >
              View My Demo Website →
            </button>

            <p className="mt-5 text-sm text-gray-400">
              Free. No credit card. No commitment.
            </p>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="border-t border-gray-100 py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center text-sm text-gray-500">
            <div>
              <p className="text-2xl font-bold text-gray-900">48h</p>
              <p>Average delivery time</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p>Risk free — pay only if you love it</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">3 min</p>
              <p>To see your personalised preview</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Tell us about your business', desc: 'Takes 60 seconds. Name, industry, and email.' },
                { step: '02', title: 'We build your demo site', desc: 'A personalised website goes live instantly with your business details.' },
                { step: '03', title: 'Review and decide', desc: 'Love it? We'll build the real version. No? Walk away — no charge.' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm">
                  <p className="text-brand-500 font-bold text-sm mb-4">{item.step}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-5">
              Ready to see your site?
            </h2>
            <p className="text-gray-500 mb-8">It only takes a minute to get started.</p>
            <button
              onClick={handleCTA}
              className="bg-brand-500 hover:bg-brand-600 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-105 active:scale-100"
            >
              View My Demo Website →
            </button>
          </div>
        </section>

        <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Risk Free Sites. All rights reserved.
        </footer>
      </main>
    )
  }

  // ── Form ──────────────────────────────────────────────────
  if (stage === 'form') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
        <LeadForm onSubmit={handleFormSubmit} onBack={() => setStage('landing')} />
      </main>
    )
  }

  // ── Loading ───────────────────────────────────────────────
  if (stage === 'loading') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <LoadingScreen onComplete={handleLoadingComplete} demoReady={!!demoUrl} />
      </main>
    )
  }

  // ── Fallback done state ───────────────────────────────────
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">You're on the list!</h1>
        <p className="text-gray-500">Check your email — your demo link is on its way.</p>
      </div>
    </main>
  )
}
