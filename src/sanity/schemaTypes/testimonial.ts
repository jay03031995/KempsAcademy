import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "studentName", title: "Student name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "programme", title: "Programme", type: "reference", to: [{ type: "course" }, { type: "workshop" }] }),
    defineField({ name: "batchLabel", title: "Batch label", type: "string", description: 'e.g. "Nov 2026 batch"' }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({
      name: "approved",
      title: "Approved for publishing",
      type: "boolean",
      initialValue: false,
      description: "Only approved testimonials appear on the site. Never publish an unapproved quote.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "studentName", subtitle: "quote", approved: "approved" },
    prepare: ({ title, subtitle, approved }) => ({ title, subtitle: `${approved ? "Approved" : "NOT approved"} — ${subtitle}` }),
  },
});
