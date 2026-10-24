import { defineField, defineType } from "sanity";

export const programmeCategory = defineType({
  name: "programmeCategory",
  title: "Programme Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "Shown under the category name in the Courses navigation dropdown.",
      validation: (Rule) => Rule.required().max(160),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
