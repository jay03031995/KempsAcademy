import { defineField, defineType } from "sanity";

export const trainer = defineType({
  name: "trainer",
  title: "Trainer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      description: "Transcribe exactly as verified — do not abbreviate or alter.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "string",
      description: "e.g. MBBS, MD Dermatology & Venereology. Must be verified before publishing.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "specialtyLabel", title: "Specialty label", type: "string", description: "Verified specialty shown on compact faculty cards." }),
    defineField({ name: "practicingSince", title: "Practicing since", type: "number", description: "Verified year practice began. Leave blank if unconfirmed.", validation: (Rule) => Rule.integer().min(1900).max(2100) }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "experienceSummary",
      title: "One-line experience summary",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "teachingAreas",
      title: "Teaching areas",
      type: "array",
      of: [{ type: "string" }],
      description: "Short tags shown on the profile, e.g. \"Acne & scarring\".",
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
      description: "Keep factual and specific — avoid promotional language.",
    }),
    defineField({
      name: "approvedLinks",
      title: "Approved professional links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "verified",
      title: "Credentials verified",
      type: "boolean",
      description: "Must be checked before this trainer can be published. Do not publish unverified trainers.",
      initialValue: false,
      validation: (Rule) => Rule.required().custom((v) => (v === true ? true : "Trainer credentials must be verified before publishing.")),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "name", subtitle: "credentials", media: "portrait" } },
});
