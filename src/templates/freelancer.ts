import type { DemoData } from '@/lib/demo-generator'
import type { DemoContent } from './local-service'

export function freelancerTemplate(data: DemoData): DemoContent {
  const { businessName, industry, city, services, phone, email } = data
  const cityStr = city ? ` based in ${city}` : ''

  return {
    headline: `${industry} Expertise, Delivered Fast`,
    subheadline: `${businessName} is a specialist ${industry.toLowerCase()} freelancer${cityStr}. I work directly with clients to deliver high-quality work on time, every time.`,
    services: services.slice(0, 4).map((s, i) => ({
      title: s,
      description: freelanceDescriptions[i % freelanceDescriptions.length],
    })),
    about: `Hi, I'm the person behind ${businessName}. I've spent years honing my ${industry.toLowerCase()} skills and now work directly with clients who want quality work without the overhead of an agency. You get direct communication, fast turnarounds, and someone who genuinely cares about your project.`,
    cta: {
      headline: "Let's Work Together",
      subtext: 'Tell me about your project and I\'ll get back to you today.',
      button: 'Get in Touch',
    },
    contact: { phone, email },
  }
}

const freelanceDescriptions = [
  'Delivered on time, exactly to your brief.',
  'Clear communication throughout the project.',
  'Revision rounds included — satisfaction guaranteed.',
  'Fast turnaround without cutting corners.',
]
