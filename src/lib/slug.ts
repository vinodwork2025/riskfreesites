export function createSlug(businessName: string): string {
  const base = businessName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)

  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

export function createId(): string {
  return crypto.randomUUID()
}
