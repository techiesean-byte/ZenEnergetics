import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'home',    title: 'Home Page' },
    { name: 'contact', title: 'Contact & Social' },
    { name: 'reviews', title: 'Reviews' },
  ],
  fields: [
    /* ── Home Page ─────────────────────────────────────── */
    defineField({
      name: 'heroHeadline',
      title: 'Main Headline',
      type: 'string',
      group: 'home',
      description: 'Large headline visitors see first on the home page.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Headline Subtext',
      type: 'text',
      rows: 2,
      group: 'home',
      description: 'Smaller supporting text under the main headline.',
    }),
    defineField({
      name: 'homeBio1',
      title: 'Meet Your Healer — Paragraph 1',
      type: 'text',
      rows: 3,
      group: 'home',
      description: 'First paragraph in the "Meet Your Healer" section on the home page.',
    }),
    defineField({
      name: 'homeBio2',
      title: 'Meet Your Healer — Paragraph 2',
      type: 'text',
      rows: 3,
      group: 'home',
      description: 'Second paragraph in the "Meet Your Healer" section.',
    }),

    /* ── Contact & Social ───────────────────────────────── */
    defineField({
      name: 'contactPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'Shown in the booking page and footer — e.g. (805) 234-1108',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      description: 'Shown in the booking page and footer.',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'url',
      group: 'contact',
      description: 'Full URL to your Instagram profile.',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Link',
      type: 'url',
      group: 'contact',
      description: 'Full URL to your Facebook page.',
    }),

    /* ── Reviews ────────────────────────────────────────── */
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Reviews Link',
      type: 'url',
      group: 'reviews',
      description: 'Full URL to your Google Business reviews page.',
    }),
    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'number',
      group: 'reviews',
      description: 'Your star rating — e.g. 4.9',
    }),
    defineField({
      name: 'googleReviewCount',
      title: 'Number of Google Reviews',
      type: 'number',
      group: 'reviews',
      description: 'Total number of reviews — e.g. 127',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
