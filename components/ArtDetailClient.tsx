'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ArtDetailClientProps {
  art: any
  relatedArts?: any[]
  whatsappUrl: string
  shareWhatsapp: string
  pageUrl: string
  imageUrl: string
  relatedImageUrls?: string[]
}

export default function ArtDetailClient({
  art,
  relatedArts = [],
  whatsappUrl,
  shareWhatsapp,
  imageUrl,
  relatedImageUrls = [],
}: ArtDetailClientProps) {
  const [zoomOpen, setZoomOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Close zoom on Escape
  useEffect(() => {
    if (!zoomOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomOpen(false)
      }
    }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  const sold = art.availableForSale === 'Sold'

  // Material display value
  const material =
    art.material === 'Other'
      ? art.otherMaterial
      : art.material

  // Icon mapping for pigment/colour types
  const colourIcons: Record<string, string> = {
    'Natural Pigments': '🎨',
    'Plant-based Colours': '🌿',
    'Mineral Pigments': '⛰️',
    'Shell-derived White': '🐚',
    'Lamp Black': '🕯️',
  }

  return (
    <>
      <main className="art-page">
        {/* Breadcrumb */}
        <nav className="crumb">
          <Link href="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link href="/gallery">Gallery</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{art.title}</span>
        </nav>

        <div className="art-grid">
          {/* INFO */}
          <section className="info-col">
            <div className="badge-row">
              {art.category?.title && (
                <span className="badge">{art.category.title}</span>
              )}
            </div>

            <h1 className="title">{art.title}</h1>


            {/* Price */}
            <div className="price-box">
              <span className="price-label">Price</span>

              <span className="price-value">
                ₹{art.price?.toLocaleString('en-IN') ?? '—'}
              </span>
            </div>

            {/* Artwork Details */}
            <div className="detail-card">
              <Row
                label="Artwork ID"
                value={art.artworkId || '—'}
              />

              <Row
                label="Size"
                value={art.size || '—'}
              />

              <Row
                label="Category"
                value={art.category?.title || '—'}
              />

              {/* Colours / Pigments */}
              {art.colours?.length > 0 && (
                <div className="row row-chips">
                  <span className="row-label">Colours</span>

                  <div className="chip-group">
                    {art.colours.map((c: string) => (
                      <span className="colour-chip" key={c}>
                        <span className="colour-chip-icon" aria-hidden="true">
                          {colourIcons[c] || '●'}
                        </span>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Material */}
              {material && (
                <Row
                  label="Material"
                  value={material}
                />
              )}

              {/* Time Taken */}
              {art.timeTaken && (
                <Row
                  label="Time Taken"
                  value={art.timeTaken}
                />
              )}

              {/* Status */}
              <Row
                label="Status"
                value={sold ? 'Sold' : 'Available'}
                state={sold ? 'sold' : 'available'}
              />
            </div>

            {/* Description */}
            {art.description && (
              <div className="desc-card">
                <span className="desc-title">
                  About this piece
                </span>

                <p className="desc-text">
                  {art.description}
                </p>
              </div>
            )}

            {/* Enquiry */}
            {!sold ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta"
              >
                <span
                  className="cta-icon"
                  aria-hidden="true"
                >
                  ✆
                </span>

                Enquire on WhatsApp
              </a>
            ) : (
              <div className="sold-banner">
                This piece has found its home
              </div>
            )}

            {/* Share */}
            <div className="share-row">
              <button
                onClick={handleCopy}
                className="share-btn"
              >
                {copied
                  ? '✓ Link copied'
                  : 'Copy link'}
              </button>

              <a
                href={shareWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-btn-alt"
              >
                Share
              </a>
            </div>
          </section>

          {/* MEDIA */}
          <section className="media-col">
            <div className="media-top">
              <Link
                href="/gallery"
                className="back-btn"
              >
                ← Back to Gallery
              </Link>
            </div>

            <div
              className="mount"
              onClick={() => setZoomOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Enlarge artwork"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setZoomOpen(true)
                }
              }}
            >
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />

              <div className="mount-inner">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={art.title}
                    className="art-img"
                  />
                )}
              </div>

              <span className="zoom-hint">
                🔍 Tap to enlarge
              </span>
            </div>

            <p className="plaque">
              Hand-painted Pattachitra scroll art · Odisha, India
            </p>
          </section>
        </div>

        {/* RELATED */}
        {relatedArts.length > 0 && (
          <section className="related">
            <div className="related-head">
              <span className="related-eyebrow">
                You may also like
              </span>

              <h2 className="related-title">
                More from{' '}
                {art.category?.title ||
                  'this collection'}
              </h2>
            </div>

            <div className="related-grid">
              {relatedArts.map(
                (r: any, i: number) => (
                  <Link
                    key={r._id}
                    href={`/art/${r.slug?.current}`}
                    className="related-card"
                  >
                    <div className="related-img-wrap">
                      {relatedImageUrls[i] && (
                        <img
                          src={relatedImageUrls[i]}
                          alt={r.title}
                          className="related-img"
                        />
                      )}
                    </div>

                    <div className="related-info">
                      <span className="related-name">
                        {r.title}
                      </span>

                      {r.price != null && (
                        <span className="related-price">
                          ₹
                          {r.price.toLocaleString(
                            'en-IN'
                          )}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          </section>
        )}
      </main>

      {/* ZOOM */}
      {zoomOpen && (
        <div
          className="zoom-overlay"
          onClick={() => setZoomOpen(false)}
        >
          <button
            className="zoom-close"
            onClick={() =>
              setZoomOpen(false)
            }
            aria-label="Close"
          >
            ✕
          </button>

          {imageUrl && (
            <img
              src={imageUrl}
              alt={art.title}
              className="zoom-img"
              onClick={(e) =>
                e.stopPropagation()
              }
            />
          )}
        </div>
      )}

      <style jsx>{`
        .badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .row-available {
          color: #1e7a1e;
          font-weight: 600;
        }

        .row-sold {
          color: #8b1c1c;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

/* ---------------- ROW ---------------- */

function Row({
  label,
  value,
  state,
}: {
  label: string
  value: string
  state?: 'available' | 'sold'
}) {
  return (
    <div className="row">
      <span className="row-label">
        {label}
      </span>

      <span
        className={`row-value${
          state
            ? ` row-${state}`
            : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}