import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Gallery Design',

  projectId: 'b01m1opg',
  dataset: 'gallerydesign',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
