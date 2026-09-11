import { type SchemaTypeDefinition } from "sanity";
import category from "./category";
import artwork from "./artwork";
import selectedWork from "./selectedWork";
import testimonial from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  category,
  artwork,
  selectedWork,
  testimonial,
];
// sanity.config.ts expects 'schema' export
export const schema = {
  types: schemaTypes,
};
