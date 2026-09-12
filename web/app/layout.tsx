import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pattachitra | Traditional Art of Odisha",
    template: "%s | Pattachitra",
  },

  description:
    "Explore the traditional Pattachitra art of Odisha, its history, paintings, artists, culture, and heritage.",

  keywords: [
    "Pattachitra",
    "Pattachitra art",
    "Odisha art",
    "traditional art of Odisha",
    "Pattachitra paintings",
    "Indian traditional art",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}