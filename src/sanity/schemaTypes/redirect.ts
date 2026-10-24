import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({ name: "source", title: "From path", type: "string", description: "e.g. /old-course-url", validation: (Rule) => Rule.required() }),
    defineField({ name: "destination", title: "To path", type: "string", description: "e.g. /courses/new-course-slug", validation: (Rule) => Rule.required() }),
    defineField({ name: "permanent", title: "Permanent (308)", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { source: "source", destination: "destination" },
    prepare: ({ source, destination }) => ({ title: `${source} → ${destination}` }),
  },
});
