import type { DemoData } from '@/lib/demo-generator'
import type { DemoContent } from './local-service'

export function consultantTemplate(data: DemoData): DemoContent {
  const { businessName, industry, city, services, phone, email } = data
  const cityStr = city ? `, ${city}` : ''

  return {
    headline: `${industry} Consulting That Drives Results`,
    subheadline: `${businessName} helps businesses solve their toughest ${industry.toLowerCase()} challenges — with clear strategy, practical advice, and measurable outcomes.`,
    services: services.slice(0, 5).map((s, i) => ({
      title: s,
      description: consultDescriptions[i % consultDescriptions.length],
    })),
    about: `${businessName}${cityStr} is a specialist consulting practice focused on delivering real, lasting results for clients. We combine deep ${industry.toLowerCase()} expertise with a practical, no-nonsense approach. Every engagement starts with listening — we take the time to understand your business before recommending a single thing.`,
    cta: {
      headline: 'Book a Free 30-Minute Strategy Call',
      subtext: 'No pitch. Just a focused conversation about your biggest challenge.',
      button: 'Book My Free Call',
    },
    contact: { phone, email },
  }
}

const consultDescriptions = [
  'Clarity, strategy, and a plan you can actually execute.',
  'Expert guidance tailored to your specific situation.',
  'Practical recommendations — not generic frameworks.',
  'Ongoing support to ensure you hit your goals.',
  'Measurable outcomes from day one.',
]
