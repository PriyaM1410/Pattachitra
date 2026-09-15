import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner footer-grid">
        {/* Column 1 - Brand */}
        <div className="footer-brand">
          <h3>Pattachitra Studio</h3>
          <p>
            Where cloth becomes canvas, and canvas becomes memory — a
            centuries-old craft, still alive in every brushstroke.
          </p>
          <div className="footer-socials">
            <a
              href="https://wa.me/916372633342"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.83-.11-.42-.14-.96-.32-1.66-.62-2.92-1.26-4.83-4.19-4.98-4.39-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.14 1.02-2.43.27-.29.58-.36.77-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.01.9 2.15.07.15.12.32.02.51-.09.19-.14.32-.28.48-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.58-.07.16-.2.68-.79.87-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.87.27.13.44.2.51.31.07.11.07.63-.16 1.31z" />
              </svg>
            </a>
            <a href="mailto:pattachitraa@gmail.com" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 6l-10 7L2 6" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2 - Visit the Studio */}
        <div className="footer-contact">
          <h3>Visit the Studio</h3>
          <p>Raghurajpur Crafts Village, Puri District, Odisha — 752012</p>
          <p>
            <a href="mailto:pattachitraa@gmail.com">pattachitraa@gmail.com</a>
          </p>
          <p>
            <a href="tel:+916372633342">+91 6372633342</a>
          </p>
        </div>

        {/* Column 3 - Explore */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Artwork Rights */}
        <div className="footer-rights">
          <h3>Artwork Notice</h3>
          <p>
            All artworks on this website are original creations by the
            artist. We kindly request that you do not copy or use them
            without permission.
          </p>
        </div>
      </div>

      {/* Bottom bar - only copyright now */}
      <div className="footer-bottom">
        <p className="copy">
          © 2026 All rights reserved. Pattachitra Studio. Designed and
          developed by -
          <a
            href="https://jsdc.academy/"
            target="_blank"
            rel="noopener noreferrer"
            className="credit-link"
          >
            {" "}
            TARA IT
          </a>
        </p>
      </div>
    </footer>
  );
}