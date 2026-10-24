import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";

/**
 * Field set shared by the `course` and `workshop` document types. Kept as a
 * single source of truth so the two schemas can't drift apart — they are
 * genuinely the same shape with different document names, which also keeps
 * them as separate, independently-listable content types in the Studio
 * desk structure (per the project brief).
 */
export const programmeFields: FieldDefinition[] = [
  defineField({ name: "sourceUrl", title: "Reference source", type: "url", description: "Source used when preparing the course content." }),
  defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
  defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
  defineField({ name: "summary", title: "Short summary", type: "text", rows: 3, validation: (Rule) => Rule.required().max(220) }),
  defineField({
    name: "category",
    title: "Category",
    type: "reference",
    to: [{ type: "programmeCategory" }],
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "eligibility",
    title: "Eligibility",
    type: "array",
    of: [{ type: "string" }],
    validation: (Rule) => Rule.required().min(1),
  }),
  defineField({ name: "duration", title: "Duration", type: "string", description: 'e.g. "2 days" or "6 months, part-time"', validation: (Rule) => Rule.required() }),
  defineField({
    name: "format",
    title: "Learning mode",
    type: "string",
    options: { list: ["In-person", "Online", "Hybrid"] },
    validation: (Rule) => Rule.required(),
  }),
  defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
  defineField({
    name: "learningObjectives",
    title: "Learning objectives",
    type: "array",
    of: [{ type: "string" }],
  }),
  defineField({
    name: "curriculum",
    title: "Curriculum",
    type: "array",
    of: [{ type: "curriculumModule" }],
  }),
  defineField({ name: "practicalTraining", title: "Practical training arrangement", type: "text", rows: 3 }),
  defineField({ name: "assessment", title: "Assessment method", type: "text", rows: 2 }),
  defineField({ name: "certification", title: "Certification details", type: "text", rows: 2, description: "Exact certificate name and any accrediting body — leave blank until verified." }),
  defineField({ name: "included", title: "What's included", type: "array", of: [{ type: "string" }] }),
  defineField({ name: "excluded", title: "What's excluded", type: "array", of: [{ type: "string" }] }),
  defineField({
    name: "feesVisible",
    title: "Show fee publicly",
    type: "boolean",
    initialValue: false,
    description: 'When off, the site shows "Request Fee Details" instead of the fee info below.',
  }),
  defineField({
    name: "feeInfo",
    title: "Fee info",
    type: "string",
    hidden: ({ document }) => !document?.feesVisible,
  }),
  defineField({
    name: "trainers",
    title: "Trainers",
    type: "array",
    of: [{ type: "reference", to: [{ type: "trainer" }] }],
    description: "Assign faculty once their teaching role for this programme is confirmed.",
  }),
  defineField({
    name: "faqs",
    title: "Programme-specific FAQs",
    type: "array",
    of: [{ type: "reference", to: [{ type: "faq" }] }],
  }),
  defineField({ name: "brochure", title: "Brochure", type: "reference", to: [{ type: "brochure" }] }),
  defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
  defineField({ name: "seo", title: "SEO", type: "seo" }),
];
