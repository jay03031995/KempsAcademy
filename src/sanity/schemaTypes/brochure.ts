import { defineField, defineType } from "sanity";

export const brochure = defineType({
  name: "brochure",
  title: "Brochure",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "file", title: "PDF file", type: "file", options: { accept: ".pdf" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "programme",
      title: "Related programme",
      type: "reference",
      to: [{ type: "course" }, { type: "workshop" }],
    }),
  ],
  preview: { select: { title: "title" } },
});
