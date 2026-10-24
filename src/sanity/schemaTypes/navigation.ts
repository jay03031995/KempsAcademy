import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "primaryLinks",
      title: "Primary navigation links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
            { name: "path", title: "Path", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
      description: "Shown in the header next to the Courses dropdown, e.g. Workshops, About, Trainers, Insights, Contact.",
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
