import { defineField, defineType } from "sanity";

export const batch = defineType({
  name: "batch",
  title: "Batch",
  type: "document",
  fields: [
    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      to: [{ type: "course" }, { type: "workshop" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "startDate", title: "Start date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "endDate", title: "End date", type: "date" }),
    defineField({ name: "timezone", title: "Timezone", type: "string", initialValue: "Asia/Kolkata" }),
    defineField({ name: "schedule", title: "Schedule", type: "string", description: 'e.g. "Sat–Sun, 10 AM – 5 PM"', validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "trainers",
      title: "Trainers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "trainer" }] }],
    }),
    defineField({ name: "applicationDeadline", title: "Application deadline", type: "date" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["open", "filling-fast", "waitlist", "closed"] },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "programme.title", subtitle: "startDate", status: "status" },
    prepare: ({ title, subtitle, status }) => ({
      title: title ?? "Untitled programme",
      subtitle: `${subtitle ?? "No date"} · ${status ?? ""}`,
    }),
  },
});
