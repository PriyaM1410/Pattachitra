import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client"; // adjust path to match your project

export type SelectedWork = {
  _id: string;
  artName: string;
  category: string;
  displayOrder: number;
  artImageUrl?: string;
};

export type Testimonial = {
  _id: string;
  customerName: string;
  customerPhotoUrl?: string;
  location: string;
  rating: number;
  reviewMessage: string;
  artworkTitle?: string;
  purchaseDate?: string;
};

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
`;

const selectedWorksQuery = `
  *[_type == "selectedWork" && defined(displayOrder)] | order(displayOrder asc) [0...8] {
    _id,
    artName,
    category,
    displayOrder,
    "artImageUrl": artImage.asset->url
  }
`;

export default async function Home() {
  let testimonials: Testimonial[] = [];
  let selectedWorks: SelectedWork[] = [];

  try {
    testimonials = await client.fetch(testimonialsQuery);
  } catch (error) {
    // Network / Sanity unreachable — fail gracefully, don't crash the page
    console.error("Failed to fetch testimonials:", error);
  }

  try {
    selectedWorks = await client.fetch(selectedWorksQuery);
  } catch (error) {
    console.error("Failed to fetch selected works:", error);
  }

  return (
    <HomeClient testimonials={testimonials} selectedWorks={selectedWorks} />
  );
}
