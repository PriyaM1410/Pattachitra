// sanity/schemaTypes/artwork.ts

import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { ArtworkIdInput } from '../../components/ArtworkIdInput'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,

  fields: [
    // ── 1. Category ──
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description:
        'Select category first — Artwork ID will be auto generated',
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: false,
        filter: 'isActive == true',
      },
    }),

    // ── 2. Artwork ID — Auto Generated ──
    defineField({
      name: 'artworkId',
      title: 'Artwork ID',
      type: 'string',
      description:
        'Auto generated after category is selected (e.g. JP001, KL002)',
      readOnly: true,
      components: {
        input: ArtworkIdInput,
      },
    }),

    // ── 3. Artwork Name ──
    defineField({
      name: 'title',
      title: 'Artwork Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ── 4. Slug — Auto from Artwork Name ──
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Auto generated from artwork name',
      validation: (Rule) => Rule.required(),
    }),

    // ── 5. Price ──
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),

    // ── 6. Size ──
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'Example: 24 × 36 inches',
      validation: (Rule) => Rule.required(),
    }),

    // ── 7. Colours / Pigments Used ──
    defineField({
      name: 'colours',
      title: 'Colours Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {
            title: 'Natural Pigments',
            value: 'Natural Pigments',
          },
          {
            title: 'Plant-based Colours',
            value: 'Plant-based Colours',
          },
          {
            title: 'Mineral Pigments',
            value: 'Mineral Pigments',
          },
          {
            title: 'Shell-derived White',
            value: 'Shell-derived White',
          },
          {
            title: 'Lamp Black',
            value: 'Lamp Black',
          },
        ],
      },
      description:
        'Select the colours used in this artwork.',
    }),

    // ── 8. Material / Base ──
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      options: {
        list: [
          {
            title: 'Traditional Cotton Patta',
            value: 'Traditional Cotton Patta',
          },
          {
            title: 'Tussar Silk',
            value: 'Tussar Silk',
          },
          {
            title:'Palm Leaf',
            value:'Palm Leaf',
          },
          {
            title: 'Other',
            value: 'Other',
          },
        ],
        layout: 'dropdown',
      },
    }),

    // ── 9. Other Material ──
    defineField({
      name: 'otherMaterial',
      title: 'Other Material',
      type: 'string',
      description:
        'Fill this only when Material is set to Other',
      hidden: ({ parent }) => parent?.material !== 'Other',
    }),

    // ── 10. Time Taken ──
    defineField({
      name: 'timeTaken',
      title: 'Time Taken',
      type: 'string',
      description:
        'Example: 15 Days, 3 Weeks, 1 Month, 2 Months',
    }),

    // ── 11. Description ──
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description:
        'Describe the artwork, story, inspiration, or cultural significance',
    }),

    // ── 12. Artwork Image ──
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describe the artwork for accessibility & SEO',
        }),
      ],
    }),

    // ── 13. Available for Sale ──
    defineField({
      name: 'availableForSale',
      title: 'Available for Sale',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  // ── Preview ──
  preview: {
    select: {
      title: 'title',
      artworkId: 'artworkId',
      media: 'image',
      available: 'availableForSale',
    },

    prepare({ title, artworkId, media, available }: any) {
      return {
        title: title ?? 'Untitled Artwork',
        subtitle: `${artworkId ?? '—'} · ${
          available ? '🟢 For Sale' : '🔴 Not for Sale'
        }`,
        media,
      }
    },
  },

  // ── Orderings ──
  orderings: [
    {
      title: 'Artwork ID',
      name: 'artworkIdAsc',
      by: [
        {
          field: 'artworkId',
          direction: 'asc',
        },
      ],
    },

    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [
        {
          field: '_createdAt',
          direction: 'desc',
        },
      ],
    },
  ],
})