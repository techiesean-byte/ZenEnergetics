import { createClient } from '@sanity/client'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: '9op646qf',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

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

export interface SanityTestimonial {
  _id: string
  name: string
  initials: string
  city: string
  condition: string
  story: string
  order: number
}

export interface SanityService {
  _id: string
  title: string
  time: string
  price: string
  description: string
  iconName: string
  colorTheme: string
  order: number
}

export interface SanityArticle {
  slug: string
  title: string
  subtitle: string
  category: string
  readTime: string
  publishedDate: string
  excerpt: string
  heroImageRef: unknown
  body: unknown[]
}

export interface SanitySettings {
  heroHeadline?: string
  heroSubtext?: string
  homeBio1?: string
  homeBio2?: string
  contactPhone?: string
  contactEmail?: string
  googleRating?: number
  googleReviewCount?: number
  googleReviewUrl?: string
}

async function query<T>(groq: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(groq, params)
}

export async function fetchFaqs(): Promise<SanityFaq[]> {
  try {
    return (await query<SanityFaq[]>(
      `*[_type == "faqItem"] | order(order asc) { question, answer }`
    )) ?? []
  } catch { return [] }
}

export async function fetchPackages(): Promise<SanityPackage[]> {
  try {
    return (await query<SanityPackage[]>(
      `*[_type == "servicePackage"] | order(order asc) {
        _id, packageId, name, tagline, sessions, duration,
        price, savingsNote, bestFor, includes,
        highlighted, badge, badgeColor, order
      }`
    )) ?? []
  } catch { return [] }
}

export async function fetchAboutBio(): Promise<SanityAbout | null> {
  try {
    return await query<SanityAbout>(
      `*[_type == "aboutPage"][0] { bio1, bio2, quote }`
    )
  } catch { return null }
}

export async function fetchTestimonials(): Promise<SanityTestimonial[]> {
  try {
    return (await query<SanityTestimonial[]>(
      `*[_type == "testimonial"] | order(order asc) {
        _id, name, initials, city, condition, story, order
      }`
    )) ?? []
  } catch { return [] }
}

export async function fetchServices(): Promise<SanityService[]> {
  try {
    return (await query<SanityService[]>(
      `*[_type == "service"] | order(order asc) {
        _id, title, time, price, description, iconName, colorTheme, order
      }`
    )) ?? []
  } catch { return [] }
}

export async function fetchArticles(): Promise<SanityArticle[]> {
  try {
    return (await query<SanityArticle[]>(
      `*[_type == "article"] | order(publishedDate desc) {
        "slug": slug.current,
        title, subtitle, category, readTime,
        "publishedDate": coalesce(publishedDate, ""),
        excerpt,
        "heroImageRef": heroImage,
        body
      }`
    )) ?? []
  } catch { return [] }
}

export async function fetchArticleBySlug(slug: string): Promise<SanityArticle | null> {
  try {
    return await query<SanityArticle>(
      `*[_type == "article" && slug.current == $slug][0] {
        "slug": slug.current,
        title, subtitle, category, readTime,
        "publishedDate": coalesce(publishedDate, ""),
        excerpt,
        "heroImageRef": heroImage,
        body
      }`,
      { slug }
    )
  } catch { return null }
}

export async function fetchSiteSettings(): Promise<SanitySettings | null> {
  try {
    return await query<SanitySettings>(
      `*[_type == "siteSettings"][0] {
        heroHeadline, heroSubtext, homeBio1, homeBio2,
        contactPhone, contactEmail,
        googleRating, googleReviewCount, googleReviewUrl
      }`
    )
  } catch { return null }
}
