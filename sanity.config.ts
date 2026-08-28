'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {buildLegacyTheme} from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const pattachitraTheme = buildLegacyTheme({
  '--black': '#1f1a17',
  '--white': '#fcfbfa',
  '--gray': '#7a6a5c',
  '--gray-base': '#7a6a5c',
  '--component-bg': '#fcfbfa',
  '--component-text-color': '#1f1a17',
  '--brand-primary': '#8b1c1c',
  '--default-button-color': '#1f1a17',
  '--default-button-primary-color': '#8b1c1c',
  '--default-button-success-color': '#2f7a4d',
  '--default-button-warning-color': '#b8860b',
  '--default-button-danger-color': '#611414',
  '--state-info-color': '#124696',
  '--state-success-color': '#2f7a4d',
  '--state-warning-color': '#b8860b',
  '--state-danger-color': '#8b1c1c',
  '--focus-color': '#b8860b',
  '--main-navigation-color': '#8b1c1c',
  '--main-navigation-color--inverted': '#fcfbfa',
})

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  theme: pattachitraTheme,
})