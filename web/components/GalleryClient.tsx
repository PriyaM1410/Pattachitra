"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "../sanity/lib/image";

const ITEMS_PER_PAGE = 20;

type Category = {
  _id: string;
  title: string;
};

type Artwork = {
  _id: string;
  title: string;
  artworkId?: string;
  slug?: { current: string };
  availableForSale?: "Available" | "Sold";
  category?: Category;
  image?: {
    asset: {
      _ref?: string;
      _type?: string;
      [key: string]: unknown;
    };
    alt?: string;
  };
};

export default function GalleryClient({
  artworks = [],
}: {
  artworks?: Artwork[];
}) {
  const categories = useMemo(
    () => [
      "ALL",
      ...Array.from(
        new Set(artworks.map((art) => art.category?.title).filter(Boolean)),
      ),
    ],
    [artworks],
  );

  const [selected, setSelected] = useState("ALL");
  const [prevSelected, setPrevSelected] = useState(selected);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when the filter changes (done during render, not in an effect)
  if (selected !== prevSelected) {
    setPrevSelected(selected);
    setCurrentPage(1);
  }

  const filteredArtworks = useMemo(() => {
    if (selected !== "ALL") {
      return artworks.filter((art) => art.category?.title === selected);
    }
    return artworks;
  }, [artworks, selected]);

  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);

  const paginatedArtworks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArtworks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArtworks, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="gallery-page">
      {/* HEADER */}
      <div className="gallery-header">
        <span className="gallery-eyebrow">The Collection</span>
        <h1>Gallery</h1>
        <p>A curated collection of hand-painted Pattachitra works</p>
      </div>

      {/* TOP BAR: Filter (left) + Pagination (right) */}
      <div className="gallery-topbar">
        <div className="gallery-filter">
          <label htmlFor="category-filter" className="filter-label">
            Filter by category:
          </label>
          <div className="filter-select-wrapper">
            <select
              id="category-filter"
              className="filter-select"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "ALL" ? "All Works" : cat}
                </option>
              ))}
            </select>
            <svg
              className="filter-select-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="gallery-pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* GRID */}
      {paginatedArtworks.length === 0 ? (
        <p className="empty-state">No artworks in this category yet.</p>
      ) : (
        <div className="gallery-grid">
          {paginatedArtworks.map((art) => (
            <Link
              href={`/art/${art.slug?.current}`}
              key={art._id}
              className="gallery-card"
            >
              <div className="gallery-image-wrapper">
                {art.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(art.image).width(900).url()}
                    alt={art.image?.alt || art.title}
                    className="gallery-img"
                  />
                )}

                {art.availableForSale === "Sold" && (
                  <span className="sold-tag">Sold</span>
                )}
              </div>

              <div className="gallery-content">
                <h5>{art.artworkId}</h5>
                <h3>{art.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}