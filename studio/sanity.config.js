import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { dashboardTool } from '@sanity/dashboard'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import schemas from './schemas/schema'
import deskStructure, {
  getDefaultDocumentNode,
} from './src/structure/deskStructure'

export default defineConfig({
  title: 'Erickka Patmore Artist Wesbite',
  projectId: 'da6i9l2g',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
    colorInput(),
    dashboardTool({
      widgets: [
        documentListWidget({
          layout: { width: 'medium', height: 'auto' },
          title: 'Recent additions to your Portfolio',
          order: '_createdAt desc',
          types: ['portfolioEntry'],
        }),
      ],
    }),
    unsplashImageAsset(),
  ],
  tools: (prev) => {
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'siteSettings'
        )
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(
          ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return prev
    },
  },
})
