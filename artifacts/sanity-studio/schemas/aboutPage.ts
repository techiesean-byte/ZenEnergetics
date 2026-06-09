import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'bio1',
      title: 'Bio — Paragraph 1',
      type: 'text',
      rows: 4,
      description: 'First paragraph on the About page (under the portrait).',
    }),
    defineField({
      name: 'bio2',
      title: 'Bio — Paragraph 2',
      type: 'text',
      rows: 4,
      description: 'Second paragraph on the About page.',
    }),
    defineField({
      name: 'quote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
      description: 'The large italic quote shown in the middle of the page.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Content' }
    },
  },
})
