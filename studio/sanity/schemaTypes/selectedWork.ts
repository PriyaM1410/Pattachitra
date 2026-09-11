// sanity/schemaTypes/selectedWork.ts

import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";
import { SelectedWorkOrderInput } from "../../components/SelectedWorkOrderInput";

export default defineType({
  name: "selectedWork",
  title: "Selected Works (Home Page)",
  type: "document",
  icon: StarIcon,

  fields: [
    // ── 1. Art Name ──
    defineField({
      name: "artName",
      title: "Art Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ── 2. Category ──
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Example: Mythology, Nature, Tribal Art, Jagannath",
      validation: (Rule) => Rule.required(),
    }),

    // ── 3. Art Image ──
    defineField({
      name: "artImage",
      title: "Art Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the artwork for accessibility & SEO",
        }),
      ],
    }),

    // ── 4. Display Order (Dropdown, 1-8, taken numbers disabled) ──
    defineField({
      name: "displayOrder",
      title: "Display Order (Position on Home Page)",
      type: "number",
      description:
        "Choose where this appears on the home page (1 = first). Numbers already used by another entry cannot be selected.",
      components: {
        input: SelectedWorkOrderInput,
      },
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
  ],

  // ── Preview ──
  preview: {
    select: {
      title: "artName",
      category: "category",
      order: "displayOrder",
      media: "artImage",
    },

    prepare({ title, category, order, media }: any) {
      return {
        title: title ?? "Untitled",
        subtitle: `#${order ?? "—"} · ${category ?? "No category"}`,
        media,
      };
    },
  },

  // ── Orderings ──
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [
        {
          field: "displayOrder",
          direction: "asc",
        },
      ],
    },
  ],
});
