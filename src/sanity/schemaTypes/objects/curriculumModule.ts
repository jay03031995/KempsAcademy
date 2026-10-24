import { defineField, defineType } from "sanity";

export const curriculumModule = defineType({
  name: "curriculumModule",
  title: "Curriculum Module",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Module title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({
      name: "topics",
      title: "Topics covered",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});
