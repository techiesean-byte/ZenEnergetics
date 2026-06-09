import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 60 min  or  4 Sessions',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. Starting at $120',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Waves', value: 'Waves' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Sun', value: 'Sun' },
          { title: 'Moon', value: 'Moon' },
          { title: 'Users / Group', value: 'Users' },
          { title: 'Heart Handshake', value: 'HeartHandshake' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Leaf', value: 'Leaf' },
          { title: 'Star', value: 'Star' },
          { title: 'Wind', value: 'Wind' },
          { title: 'Zap / Lightning', value: 'Zap' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Sparkles',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Colour Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Amber / Gold', value: 'amber' },
          { title: 'Purple', value: 'purple' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Green', value: 'emerald' },
          { title: 'Rose / Pink', value: 'rose' },
        ],
        layout: 'radio',
      },
      initialValue: 'purple',
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
    select: { title: 'title', subtitle: 'price' },
  },
})
