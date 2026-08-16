import HomeClient from '@/components/HomeClient'
import { client } from '@/sanity/lib/client' // adjust path to match your project

const testimonialsQuery = `
  *[_type == "testimonial" && displayOnWebsite == true] | order(_createdAt desc) {
    _id,
    customerName,
    "customerPhotoUrl": customerPhoto.asset->url,
    location,
    rating,
    reviewMessage,
    "artworkTitle": artworkPurchased->title,
    purchaseDate
  }
`

export type Testimonial = {
  _id: string
  customerName: string
  customerPhotoUrl?: string
  location: string
  rating: number
  reviewMessage: string
  artworkTitle?: string
  purchaseDate?: string
}

export default async function Home() {
  let testimonials: Testimonial[] = []

  try {
    testimonials = await client.fetch(testimonialsQuery)
  } catch (error) {
    // Network / Sanity unreachable — fail gracefully, don't crash the page
    console.error('Failed to fetch testimonials:', error)
  }

  return <HomeClient testimonials={testimonials} />
}