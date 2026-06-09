import { defineField, defineType } from 'sanity'

export const servicePackage = defineType({
  name: 'servicePackage',
  title: 'Session Package',
  type: 'document',
  fields: [
    defineField({
      name: 'packageId',
      title: 'Package ID',
      type: 'string',
      description: 'Short identifier — e.g. single, starter, journey, transformation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short phrase shown under the name',
    }),
    defineField({
      name: 'sessions',
      title: 'Number of Sessions',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'duration',
      title: 'Duration Label',
      type: 'string',
      description: 'e.g. 60 min  or  3 × 60 min',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. $150. Leave blank to show "Pricing coming soon".',
    }),
    defineField({
      name: 'savingsNote',
      title: 'Savings Note',
      type: 'string',
      description: 'e.g. Save $30 vs individual sessions',
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'includes',
      title: 'What is Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlighted',
      title: 'Featured / Highlighted',
      type: 'boolean',
      description: 'Shows this package with a prominent border',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'e.g. Most Popular  or  Best Value',
    }),
    defineField({
      name: 'badgeColor',
      title: 'Badge Colour',
      type: 'string',
      options: {
        list: [
          { title: 'Purple (default)', value: 'primary' },
          { title: 'Amber / Gold', value: 'amber' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
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
    select: { title: 'name', subtitle: 'price' },
    prepare({ title, subtitle }: { title: string; subtitle?: string }) {
      return { title, subtitle: subtitle ? subtitle : 'Price not set yet' }
    },
  },
})
