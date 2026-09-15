import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import ArtDetailClient from "@/components/ArtDetailClient";
import { headers } from "next/headers";

export const revalidate = 60;

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
`;

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
`;

type SanityImage = {
  asset: {
    _ref?: string;
    _type?: string;
    [key: string]: unknown;
  };
  alt?: string;
};

type Category = {
  _id: string;
  title: string;
  prefix?: string;
};

type Artwork = {
  _id: string;
  title: string;
  artworkId?: string;
  slug: {
    current: string;
  };
  price?: number;
  size?: string;
  description?: string;
  availableForSale?: "Available" | "Sold";
  colours?: string[];
  material?: string;
  otherMaterial?: string;
  timeTaken?: string;
  image?: SanityImage;
  category?: Category;
};

/* =========================
   OPEN GRAPH METADATA
========================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const art: Artwork | null = await client.fetch(ART_BY_SLUG_QUERY, {
    slug,
  });

  const headersList = await headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const baseUrl = `${protocol}://${host}`;

  const pageUrl = `${baseUrl}/art/${slug}`;

  const ogImageUrl = `${baseUrl}/images/og-image.png`;

  return {
    title: art
      ? `${art.title} | Pattachitra Studio`
      : "Pattachitra Studio",

    description:
      art?.description ||
      "Explore traditional Pattachitra artwork from Pattachitra Studio.",

    openGraph: {
      title: art
        ? `${art.title} | Pattachitra Studio`
        : "Pattachitra Studio",

      description:
        art?.description ||
        "Explore traditional Pattachitra artwork from Pattachitra Studio.",

      url: pageUrl,
      siteName: "Pattachitra Studio",
      type: "website",

      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Pattachitra Studio",
        },
      ],
    },
  };
}

/* =========================
   ARTWORK DETAIL PAGE
========================= */

export default async function ArtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const art: Artwork | null = await client.fetch(ART_BY_SLUG_QUERY, {
    slug,
  });

  if (!art) {
    return (
      <main
        style={{
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <h2>Artwork not found</h2>
      </main>
    );
  }

  const relatedArts: Artwork[] = await client.fetch(RELATED_ARTS_QUERY, {
    slug,
    category: art.category?.title,
  });

  const headersList = await headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const baseUrl = `${protocol}://${host}`;

  const pageUrl = `${baseUrl}/art/${slug}`;

  const phone = "916372633342";

  const imageUrl = art.image
    ? urlFor(art.image).width(800).url()
    : "";

  const whatsappMessage = `Hi! 👋
I'm interested in purchasing this beautiful *${art.title}* painting.
🆔 Artwork ID: ${art.artworkId || "N/A"}
📐 Size: ${art.size || "N/A"}
💰 Price: ₹${art.price?.toLocaleString("en-IN")}
🖼️ ${pageUrl}`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  const shareWhatsapp = `https://wa.me/?text=${encodeURIComponent(
    `Check out this beautiful Pattachitra artwork: ${art.title}\n${pageUrl}`,
  )}`;

  const relatedImageUrls = relatedArts.map((r) =>
    r.image ? urlFor(r.image).width(400).url() : "",
  );

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
  );
}