'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const HERO_IMAGES = ['/images/hero1.webp','/images/hero2.webp','/images/hero3.webp', '/images/hero4.webp', '/images/hero5.webp']

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

export default function HomeClient({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const categories = [
    {
      id: 1,
      name: 'Mythology',
      image: '/images/categories/mythology.webp',
      title: 'Yashoda with Baby Krishna',
      description:
        'A beautifully handcrafted Pattachitra painting depicting Mother Yashoda lovingly carrying Baby Krishna, symbolizing unconditional love and devotion.',
    },
    {
      id: 2,
      name: 'Nature',
      image: '/images/categories/nature.webp',
      title: 'Tree of Life',
      description:
        'A handcrafted Pattachitra painting featuring the Tree of Life, symbolizing harmony, growth, and the beauty of nature.',
    },
    {
      id: 3,
      name: 'Tribal Art',
      image: '/images/categories/tribal.webp',
      title: 'Tribal Village Life',
      description:
        'A vibrant tribal artwork portraying the traditions, daily life, and cultural celebrations of indigenous communities.',
    },
    {
      id: 4,
      name: 'Jagannath',
      image: '/images/categories/jagannath.webp',
      title: 'Jagannath, Balabhadra & Subhadra',
      description:
        "A sacred Pattachitra painting of Lord Jagannath, Balabhadra, and Subhadra, reflecting Odisha's rich spiritual heritage.",
    },
  ]

  // ----- Hero slider state (merged from HeroSlider.tsx) -----
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // ----- Testimonials pagination state -----
  const TESTI_PER_PAGE = 4
  const [testiPage, setTestiPage] = useState(0)
  const testiPageCount = Math.ceil(testimonials.length / TESTI_PER_PAGE)
  const visibleTestimonials = testimonials.slice(
    testiPage * TESTI_PER_PAGE,
    testiPage * TESTI_PER_PAGE + TESTI_PER_PAGE
  )

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % HERO_IMAGES.length),
    []
  )
  const prev = () =>
    setCurrent((p) => (p - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)

  useEffect(() => {
    if (paused || HERO_IMAGES.length < 4) return
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <main className="home">
      <br></br><br></br><br></br>
      {/* HERO SLIDER */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide${i === current ? ' active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        <div className="hero-scrim" />

        <div className="hero-text">
          <h1>Pattachitra</h1>
          <p>Ancient art of Odisha — where myths breathe through colour</p>
          <a href="/gallery" className="hero-cta">
            Explore the Gallery
          </a>
        </div>

        {HERO_IMAGES.length > 1 && (
          <>
            <button
              className="hero-nav hero-nav-prev"
              onClick={prev}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className="hero-nav hero-nav-next"
              onClick={next}
              aria-label="Next slide"
            >
              ›
            </button>

            <div className="hero-dots">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ARTIST SECTION */}
      <section className="artist">
        <div className="artist-img">
          <img src="/images/artist.webp" alt="The artist at work" />
        </div>

        <div className="artist-text">
          <span className="eyebrow">Meet the Artist</span>
          <h2>The Art &amp; The Artist</h2>

          <p>
            Pattachitra is a centuries-old tradition of cloth-based scroll
            painting from Odisha. Using natural colours derived from stones,
            leaves, and flowers, each artwork narrates tales from the Puranas
            and epics.
          </p>

          <p>
            As a practitioner of this sacred art, I dedicate each brushstroke
            to preserving our cultural heritage while sharing it with the
            modern world. Every piece is hand-painted using traditional
            techniques passed down through generations.
          </p>

          <Link href="/about" className="artist-link">
            Read the full story →
          </Link>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="works">
        <div className="works-head">
          <span className="eyebrow">Selected Works</span>
          <h2>A Glimpse Into the Collection</h2>
        </div>

        <div className="work-grid">
          {categories.map((item) => (
            <div className="card" key={item.id}>
              <div className="image-wrapper">
                <img src={item.image} alt={item.title} className="card-img" />
              </div>

              <div className="card-content">
                <span className="card-tag">{item.name}</span>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="works-cta">
          <Link href="/gallery" className="gallery-btn">
            View All Works
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS — data fetched server-side in page.tsx, passed in as a prop */}
      {testimonials.length > 0 && (
        <section className="testimonials">
          <div className="testi-head">
            <span className="eyebrow">Customer Love</span>
            <h2>Words About Our Art</h2>
            <div className="head-line">
              <span /> <span className="head-dot">✦</span> <span />
            </div>
          </div>

          {testiPageCount > 1 && (
            <div className="testi-dots-row">
              <div className="testi-dots">
                {Array.from({ length: testiPageCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`testi-dot${i === testiPage ? ' active' : ''}`}
                    onClick={() => setTestiPage(i)}
                    aria-label={`Go to testimonials page ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="testi-grid">
            {visibleTestimonials.map((t, i) => (
              <div className="testi-card" key={`${t._id}-${i}`}>
                <span className="testi-quote">&ldquo;</span>

                <div className="testi-stars">
                  <span className="rating-chip">{t.rating.toFixed(1)}</span>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={idx < t.rating ? 'star filled' : 'star'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {t.artworkTitle && (
                  <p className="testi-artwork">{t.artworkTitle}</p>
                )}

                <p className="testi-message">{t.reviewMessage}</p>

                <div className="testi-footer">
                  <div className="testi-top">
                    <div className="avatar-ring">
                      {t.customerPhotoUrl ? (
                        <img
                          src={t.customerPhotoUrl}
                          alt={t.customerName}
                          className="testi-photo"
                        />
                      ) : (
                        <div className="testi-photo placeholder">
                          {t.customerName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="testi-name">
                        {t.customerName}
                        <span className="verified-badge" title="Verified buyer">
                          ✓
                        </span>
                      </p>
                      <p className="testi-location">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}