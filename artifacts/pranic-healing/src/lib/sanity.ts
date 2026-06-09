import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '9op646qf',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
  perspective: 'published',
})

export interface SanityFaq {
  question: string
  answer: string
}

export interface SanityPackage {
  _id: string
  packageId: string
  name: string
  tagline: string
  sessions: number
  duration: string
  price?: string
  savingsNote?: string
  bestFor: string
  includes: string[]
  highlighted: boolean
  badge?: string
  badgeColor?: string
  order: number
}

export interface SanityAbout {
  bio1?: string
  bio2?: string
  quote?: string
}

export async function fetchFaqs(): Promise<SanityFaq[]> {
  try {
    const data = await sanityClient.fetch<SanityFaq[]>(
      `*[_type == "faqItem"] | order(order asc) { question, answer }`
    )
    return data ?? []
  } catch {
    return []
  }
}

export async function fetchPackages(): Promise<SanityPackage[]> {
  try {
    const data = await sanityClient.fetch<SanityPackage[]>(
      `*[_type == "servicePackage"] | order(order asc) {
        _id, packageId, name, tagline, sessions, duration,
        price, savingsNote, bestFor, includes,
        highlighted, badge, badgeColor, order
      }`
    )
    return data ?? []
  } catch {
    return []
  }
}

export async function fetchAboutBio(): Promise<SanityAbout | null> {
  try {
    return await sanityClient.fetch<SanityAbout>(
      `*[_type == "aboutPage"][0] { bio1, bio2, quote }`
    )
  } catch {
    return null
  }
}
