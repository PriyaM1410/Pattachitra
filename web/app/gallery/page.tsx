import GalleryClient from "@/components/GalleryClient";
import { client } from "@/sanity/lib/client";
import { ARTWORKS_QUERY } from "@/sanity/lib/queries";

export default async function GalleryPage() {
  const artworks = await client.fetch(ARTWORKS_QUERY);

  return <GalleryClient artworks={artworks} />;
}
