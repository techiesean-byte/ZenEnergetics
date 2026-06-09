import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'Two letters shown in the avatar circle — e.g. SJ',
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'city',
      title: 'City & State',
      type: 'string',
      description: 'e.g. Paso Robles, CA',
    }),
    defineField({
      name: 'condition',
      title: 'Condition / Topic',
      type: 'string',
      description: 'Short tag shown on the card — e.g. Chronic Migraines',
    }),
    defineField({
      name: 'story',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'condition' },
  },
})
