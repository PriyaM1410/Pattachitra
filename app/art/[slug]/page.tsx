import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import ArtDetailClient from '@/components/ArtDetailClient'
import { headers } from 'next/headers'

export const revalidate = 60

const ART_BY_SLUG_QUERY = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    artworkId,
    slug,
    price,
    size,
    description,
    availableForSale,
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

const RELATED_ARTS_QUERY = groq`
  *[
    _type == "artwork" &&
    slug.current != $slug &&
    category->title == $category
  ]
  | order(_createdAt desc)[0...3] {
    _id,
    title,
    artworkId,
    slug,
    price,

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

export default async function ArtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const art = await client.fetch(ART_BY_SLUG_QUERY, {
    slug,
  })

  if (!art) {
    return (
      <main
        style={{
          padding: '4rem',
          textAlign: 'center',
        }}
      >
        <h2>Artwork not found</h2>
      </main>
    )
  }

  const relatedArts = await client.fetch(
    RELATED_ARTS_QUERY,
    {
      slug,
      category: art.category?.title,
    }
  )

const headersList = await headers()
const host = headersList.get('host')

const pageUrl = `https://${host}/art/${slug}`

  const phone = '916374781871'

  const imageUrl = art.image
    ? urlFor(art.image).width(800).url()
    : ''

  const whatsappMessage = `Hi! 👋

I'm interested in purchasing this beautiful *${art.title}* painting.

🆔 Artwork ID: ${art.artworkId || 'N/A'}
📐 Size: ${art.size || 'N/A'}
💰 Price: ₹${art.price?.toLocaleString('en-IN')}
🖼️ ${imageUrl}

I really loved this artwork and would like to know if it is available for purchase. Please share the details regarding delivery and payment.`

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  const shareWhatsapp = `https://wa.me/?text=${encodeURIComponent(
    `Check out this beautiful Pattachitra artwork: ${art.title}\n${pageUrl}`
  )}`

  const relatedImageUrls = relatedArts.map((r: any) =>
    r.image
      ? urlFor(r.image).width(400).url()
      : ''
  )

  return (
    <ArtDetailClient
      art={art}
      relatedArts={relatedArts}
      whatsappUrl={whatsappUrl}
      shareWhatsapp={shareWhatsapp}
      pageUrl={pageUrl}
      imageUrl={imageUrl}
      relatedImageUrls={relatedImageUrls}
    />
  )
}