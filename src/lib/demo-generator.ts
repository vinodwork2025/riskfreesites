import { localServiceTemplate, type DemoContent } from '@/templates/local-service'
import { consultantTemplate } from '@/templates/consultant'
import { freelancerTemplate } from '@/templates/freelancer'

export interface DemoData {
  businessName: string
  industry: string
  city?: string
  services: string[]
  phone?: string
  email?: string
}

// Industry → template type mapping
const INDUSTRY_TEMPLATE_MAP: Record<string, 'local-service' | 'consultant' | 'freelancer'> = {
  // Local service industries
  plumbing:       'local-service',
  electrical:     'local-service',
  hvac:           'local-service',
  cleaning:       'local-service',
  landscaping:    'local-service',
  roofing:        'local-service',
  painting:       'local-service',
  construction:   'local-service',
  carpentry:      'local-service',
  pest:           'local-service',
  moving:         'local-service',
  catering:       'local-service',
  salon:          'local-service',
  fitness:        'local-service',
  gym:            'local-service',
  restaurant:     'local-service',
  // Consultant industries
  finance:        'consultant',
  accounting:     'consultant',
  legal:          'consultant',
  hr:             'consultant',
  management:     'consultant',
  strategy:       'consultant',
  marketing:      'consultant',
  business:       'consultant',
  it:             'consultant',
  technology:     'consultant',
  healthcare:     'consultant',
  education:      'consultant',
  // Freelancer industries
  design:         'freelancer',
  photography:    'freelancer',
  writing:        'freelancer',
  video:          'freelancer',
  music:          'freelancer',
  development:    'freelancer',
  coding:         'freelancer',
  seo:            'freelancer',
  social:         'freelancer',
}

// Default services by industry
const INDUSTRY_SERVICES: Record<string, string[]> = {
  plumbing:    ['Emergency Repairs', 'Pipe Installation', 'Drain Cleaning', 'Leak Detection', 'Water Heater Service'],
  electrical:  ['Wiring & Rewiring', 'Panel Upgrades', 'Outlet Installation', 'Safety Inspections', 'Emergency Repairs'],
  cleaning:    ['Regular House Cleaning', 'Deep Cleaning', 'Move-In / Move-Out', 'Office Cleaning', 'Post-Construction'],
  marketing:   ['SEO & Content', 'Social Media', 'Paid Advertising', 'Email Campaigns', 'Brand Strategy'],
  design:      ['Logo Design', 'Brand Identity', 'Website Design', 'Print Materials', 'Social Graphics'],
  photography: ['Portrait Sessions', 'Product Photography', 'Event Coverage', 'Real Estate Shoots', 'Editing & Retouching'],
  default:     ['Consultation', 'Project Management', 'Implementation', 'Ongoing Support', 'Training'],
}

function detectTemplate(industry: string): 'local-service' | 'consultant' | 'freelancer' {
  const key = industry.toLowerCase().split(' ')[0]
  return INDUSTRY_TEMPLATE_MAP[key] ?? 'consultant'
}

function getServices(industry: string): string[] {
  const key = industry.toLowerCase().split(' ')[0]
  return INDUSTRY_SERVICES[key] ?? INDUSTRY_SERVICES.default
}

export function generateDemoContent(
  businessName: string,
  industry: string,
  city?: string,
): { content: DemoContent; template: string } {
  const template = detectTemplate(industry)
  const services = getServices(industry)

  const data: DemoData = {
    businessName,
    industry,
    city,
    services,
  }

  let content: DemoContent
  if (template === 'local-service') {
    content = localServiceTemplate(data)
  } else if (template === 'freelancer') {
    content = freelancerTemplate(data)
  } else {
    content = consultantTemplate(data)
  }

  return { content, template }
}
