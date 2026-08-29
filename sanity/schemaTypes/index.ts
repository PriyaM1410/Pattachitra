import { type SchemaTypeDefinition } from 'sanity'
import { contact } from './contact'
import category from './category'
import artwork from './artwork'
import testimonial from './testimonial'

export const schemaTypes: SchemaTypeDefinition[] = [
  category,
  artwork,
  contact,
  testimonial
]
// sanity.config.ts expects 'schema' export
export const schema = {
  types: schemaTypes,
}