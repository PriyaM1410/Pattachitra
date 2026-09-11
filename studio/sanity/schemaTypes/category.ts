// sanity/schemaTypes/category.ts

import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";
import { PrefixInput } from "../../components/PrefixInput";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,

  fields: [
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "prefix",
      title: "Prefix Code",
      type: "string",
      description:
        "Auto generated from category name — change only if there is a conflict",
      validation: (Rule) =>
        Rule.required().min(2).max(3).error("Prefix must be 2–3 letters"),
      // ✅ Use custom component
      components: {
        input: PrefixInput,
      },
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Turn OFF to hide this category from the website",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "prefix",
      active: "isActive",
    },
    prepare({ title, subtitle, active }: any) {
      return {
        title,
        subtitle: `${subtitle ?? "—"} · ${active ? "✅ Active" : "❌ Inactive"}`,
      };
    },
  },
});
