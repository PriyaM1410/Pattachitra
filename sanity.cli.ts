import { defineCliConfig } from 'sanity/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },

  deployment: {
    appId: 'x80181gs8tunwg6r2dnzzr8w',
  },
})