import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone Number',
      type: 'string',
      description: 'Shown on the Packages and contact areas.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown on the Packages and contact areas.',
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Reviews Link',
      type: 'url',
      description: 'Full URL to your Google Business reviews page.',
    }),
    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'number',
      description: 'e.g. 4.9',
    }),
    defineField({
      name: 'googleReviewCount',
      title: 'Number of Google Reviews',
      type: 'number',
      description: 'e.g. 127',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Home Page Headline',
      type: 'string',
      description: 'Large headline on the home page hero section.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Home Page Subtext',
      type: 'text',
      rows: 2,
      description: 'Smaller text under the home page headline.',
    }),
    defineField({
      name: 'homeBio1',
      title: 'Home — Bio Paragraph 1',
      type: 'text',
      rows: 3,
      description: 'First bio paragraph in the "Meet Your Healer" section on the home page.',
    }),
    defineField({
      name: 'homeBio2',
      title: 'Home — Bio Paragraph 2',
      type: 'text',
      rows: 3,
      description: 'Second bio paragraph in the "Meet Your Healer" section on the home page.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
