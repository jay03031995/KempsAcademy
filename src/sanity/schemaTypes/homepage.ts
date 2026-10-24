import { defineField, defineType } from "sanity";

const SECTION_TYPES = [
  "hero",
  "findYourCourse",
  "featuredCourses",
  "whyLearn",
  "meetTrainers",
  "learningExperience",
  "upcomingBatches",
  "facilitiesGallery",
  "studentStories",
  "faqs",
  "insights",
  "admissionsEnquiry",
] as const;

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      initialValue: "Build Practical Skills in Aesthetics & Cosmetology.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "heroSupportingCopy", title: "Hero supporting copy", type: "text", rows: 3 }),
    defineField({ name: "whyHeading", title: "Benefits section heading", type: "string" }),
    defineField({ name: "whyItems", title: "Benefits", type: "array", of: [{ type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "text", title: "Description", type: "text", rows: 2 },
    ] }] }),
    defineField({ name: "learningHeading", title: "Learning section heading", type: "string" }),
    defineField({ name: "learningIntro", title: "Learning section introduction", type: "text", rows: 2 }),
    defineField({ name: "learningSteps", title: "Learning steps", type: "array", of: [{ type: "object", fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "text", title: "Description", type: "text", rows: 2 },
    ] }] }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({
      name: "sectionOrder",
      title: "Section order",
      type: "array",
      description: "Controls which homepage sections render and in what order. Sections with no underlying content (e.g. Student Stories with no approved testimonials) are hidden automatically regardless of this order.",
      of: [{ type: "string" }],
      options: { list: SECTION_TYPES.map((s) => ({ title: s, value: s })) },
      validation: (Rule) => Rule.required().unique(),
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
