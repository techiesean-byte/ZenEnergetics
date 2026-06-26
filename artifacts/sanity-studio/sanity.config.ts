import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureResolver } from 'sanity/structure'
import { schemaTypes } from './schemas'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Zen Energetics')
    .items([
      S.listItem()
        .title('Home Page')
        .id('siteSettings-singleton')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Home Page Settings')
        ),

      S.listItem()
        .title('About Rosalyn')
        .id('aboutPage-singleton')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Rosalyn')
        ),

      S.divider(),

      S.documentTypeListItem('service')
        .title('Services'),

      S.documentTypeListItem('servicePackage')
        .title('Packages & Pricing'),

      S.documentTypeListItem('testimonial')
        .title('Client Reviews'),

      S.documentTypeListItem('faqItem')
        .title('FAQ Questions'),

      S.documentTypeListItem('video')
        .title('Videos'),

      S.documentTypeListItem('galleryImage')
        .title('Gallery Images'),

      S.divider(),

      S.documentTypeListItem('article')
        .title('Blog Articles'),
    ])

export default defineConfig({
  name: 'zen-energetics',
  title: 'Zen Energetics',
  projectId: '9op646qf',
  dataset: 'production',
  basePath: '/',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
