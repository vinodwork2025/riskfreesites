'use client'

import { useState } from 'react'

const INDUSTRIES = [
  'Plumbing', 'Electrical', 'HVAC', 'Cleaning', 'Landscaping',
  'Roofing', 'Painting', 'Construction', 'Pest Control', 'Moving',
  'Catering', 'Salon / Beauty', 'Fitness / Gym', 'Restaurant',
  'Marketing', 'Accounting / Finance', 'Legal', 'HR / Recruitment',
  'IT / Technology', 'Management Consulting', 'Healthcare', 'Education',
  'Photography', 'Graphic Design', 'Web Development', 'Writing / Copywriting',
  'Video Production', 'Real Estate', 'Other',
]

interface Props {
  onSubmit: (data: {
    name: string
    business_name: string
    email: string
    industry: string
    website?: string
  }) => void
  onBack: () => void
}

export default function LeadForm({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    email: '',
    industry: '',
    website: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.business_name.trim()) e.business_name = 'Please enter your business name'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address'
    if (!form.industry) e.industry = 'Please select your industry'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    onSubmit({
      name: form.name.trim(),
      business_name: form.business_name.trim(),
      email: form.email.trim(),
      industry: form.industry,
      website: form.website.trim() || undefined,
    })
  }

  function field(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  return (
    <div className="w-full max-w-lg animate-[slideUp_0.4s_ease-out]">
      <button
        onClick={onBack}
        className="text-sm text-gray-400 hover:text-gray-600 mb-8 flex items-center gap-1 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Let's build your demo
      </h1>
      <p className="text-gray-500 mb-8">
        Takes about 60 seconds. We'll have your site ready in minutes.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field label="Your name" error={errors.name}>
          <input
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => field('name', e.target.value)}
            className={inputCls(errors.name)}
          />
        </Field>

        <Field label="Business name" error={errors.business_name}>
          <input
            type="text"
            placeholder="Smith Plumbing Co."
            value={form.business_name}
            onChange={(e) => field('business_name', e.target.value)}
            className={inputCls(errors.business_name)}
          />
        </Field>

        <Field label="Email address" error={errors.email}>
          <input
            type="email"
            placeholder="jane@smithplumbing.com"
            value={form.email}
            onChange={(e) => field('email', e.target.value)}
            className={inputCls(errors.email)}
          />
        </Field>

        <Field label="Industry" error={errors.industry}>
          <select
            value={form.industry}
            onChange={(e) => field('industry', e.target.value)}
            className={inputCls(errors.industry)}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </Field>

        <Field label="Current website" hint="Optional">
          <input
            type="url"
            placeholder="https://yoursite.com"
            value={form.website}
            onChange={(e) => field('website', e.target.value)}
            className={inputCls()}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold text-lg py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-100 mt-2"
        >
          {submitting ? 'Building your site…' : 'Build My Demo Website →'}
        </button>

        <p className="text-xs text-gray-400 text-center">
          No credit card. No spam. Unsubscribe any time.
        </p>
      </form>
    </div>
  )
}

function Field({
  label, error, hint, children,
}: {
  label: string; error?: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {hint && <span className="text-gray-400 font-normal text-xs">{hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

function inputCls(error?: string) {
  return `w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 transition
    ${error
      ? 'border-red-400 focus:ring-red-300 bg-red-50'
      : 'border-gray-200 focus:ring-brand-400 bg-white hover:border-gray-300'
    }`
}
