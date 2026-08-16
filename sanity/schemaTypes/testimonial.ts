// sanity/schemaTypes/testimonial.ts

import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhoto',
      title: 'Customer Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'location',
      title: 'Location (City, State)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5 stars)',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'reviewMessage',
      title: 'Review Message',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artworkPurchased',
      title: 'Artwork Purchased',
      type: 'reference',
      to: [{ type: 'artwork' }],
    }),
    defineField({
      name: 'purchaseDate',
      title: 'Purchase Month & Year',
      type: 'date',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    }),
    defineField({
      name: 'displayOnWebsite',
      title: 'Display on Website',
      type: 'boolean',
      initialValue: false,
      description: 'Turn ON to show this testimonial on the live website',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'location',
      media: 'customerPhoto',
    },
  },
})