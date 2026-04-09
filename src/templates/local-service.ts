import type { DemoData } from '@/lib/demo-generator'

export function localServiceTemplate(data: DemoData): DemoContent {
  const { businessName, industry, city, services, phone, email } = data
  const cityStr = city ? ` in ${city}` : ''

  return {
    headline: `Trusted ${industry} Services${cityStr}`,
    subheadline: `${businessName} delivers reliable, high-quality ${industry.toLowerCase()} services for homes and businesses. Fast response. Fair pricing. Guaranteed work.`,
    services: services.slice(0, 5).map((s, i) => ({
      title: s,
      description: serviceDescriptions[i % serviceDescriptions.length],
    })),
    about: `${businessName} has been serving the local community with professional ${industry.toLowerCase()} solutions. We take pride in our work, stand behind every job, and treat every client like a neighbour. Our team arrives on time, works cleanly, and keeps you informed every step of the way.`,
    cta: {
      headline: 'Get a Free Quote Today',
      subtext: 'No obligation. We respond within 2 hours.',
      button: 'Request My Free Quote',
    },
    contact: { phone, email },
  }
}

const serviceDescriptions = [
  'Professional, efficient, and done right the first time.',
  'Quality workmanship with attention to detail.',
  'Fast turnaround and transparent pricing.',
  'Licensed and insured for your peace of mind.',
  'Serving local homes and businesses with pride.',
]

export interface DemoContent {
  headline: string
  subheadline: string
  services: { title: string; description: string }[]
  about: string
  cta: { headline: string; subtext: string; button: string }
  contact: { phone?: string; email?: string }
}
