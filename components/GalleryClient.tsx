'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '../sanity/lib/image'

export default function GalleryClient({
  artworks = [],
}: {
  artworks?: any[]
}) {
  const categories = useMemo(
    () => [
      'ALL',
      ...Array.from(
        new Set(artworks.map((art) => art.category?.title).filter(Boolean))
      ),
    ],
    [artworks]
  )

  const [selected, setSelected] = useState('ALL')

  const filteredArtworks = useMemo(() => {
    if (selected !== 'ALL') {
      return artworks.filter((art) => art.category?.title === selected)
    }

    const seen = new Set<string>()
    const preview: any[] = []

    for (const art of artworks) {
      const cat = art.category?.title || 'Uncategorised'
      if (!seen.has(cat)) {
        seen.add(cat)
        preview.push(art)
      }
    }

    return preview
  }, [artworks, selected])

  return (
    <main className="gallery-page">
      {/* HEADER */}
      <div className="gallery-header">
        <span className="gallery-eyebrow">The Collection</span>
        <h1>Gallery</h1>
        <p>A curated collection of hand-painted Pattachitra works</p>
      </div>

      {/* FILTERS */}
      <div className="gallery-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selected === cat ? 'active' : ''}
            onClick={() => setSelected(cat)}
          >
            {cat === 'ALL' ? 'All Works' : cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filteredArtworks.length === 0 ? (
        <p className="empty-state">No artworks in this category yet.</p>
      ) : (
        <div className="gallery-grid">
          {filteredArtworks.map((art: any) => (
            <Link
              href={`/art/${art.slug?.current}`}
              key={art._id}
              className="gallery-card"
            >
              <div className="gallery-image-wrapper">
                {art.image && (
                  <img
                    src={urlFor(art.image).width(900).url()}
                    alt={art.image?.alt || art.title}
                    className="gallery-img"
                  />
                )}

                {art.availableForSale === false && (
                  <span className="sold-tag">Sold</span>
                )}
              </div>

              <div className="gallery-content">
                <h3>{art.title}</h3>
                <span className="view-details">
                  View Details
                  <svg
                    className="view-details-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </main>
  )
}