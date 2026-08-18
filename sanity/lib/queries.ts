// sanity/lib/queries.ts

import { groq } from 'next-sanity'

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
export const HERO_QUERY = groq`
  *[_type == "hero"][0]{
    title,
    subtitle,
    image
  }
`

// ─────────────────────────────────────────────
// All Artworks
// ─────────────────────────────────────────────
export const ARTWORKS_QUERY = groq`
  *[_type == "artwork" && showStatus == true]
  | order(_createdAt desc) {
    _id,
    title,
    artworkId,
    slug,
    price,
    size,
    description,
    availableForSale,
    showStatus,

    image{
      asset,
      alt
    },

    category->{
      _id,
      title,
      prefix
    }
  }
`

// ─────────────────────────────────────────────
// Single Artwork by Slug
// ─────────────────────────────────────────────
export const ARTWORK_QUERY = groq`
  *[_type == "artwork" && slug.current == $slug][0]{
    _id,
    title,
    artworkId,
    slug,
    price,
    size,
    description,
    availableForSale,
    showStatus,
    colours,
    material,
    otherMaterial,
    timeTaken,

    image{
      asset,
      alt
    },

    category->{
      _id,
      title,
      prefix
    }
  }
`

// ─────────────────────────────────────────────
// Active Categories
// ─────────────────────────────────────────────
export const CATEGORIES_QUERY = groq`
  *[_type == "category" && isActive == true]
  | order(title asc) {
    _id,
    title,
    prefix
  }
`

// ─────────────────────────────────────────────
// Contact Enquiries
// ─────────────────────────────────────────────
export const CONTACTS_QUERY = groq`
  *[_type == "contact"]
  | order(createdAt desc) {
    _id,
    name,
    email,
    phone,
    subject,
    message,
    createdAt
  }
`