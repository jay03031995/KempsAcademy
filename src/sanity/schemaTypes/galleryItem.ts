import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", description: 'e.g. "Training room", "Equipment", "Live session"' }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});
