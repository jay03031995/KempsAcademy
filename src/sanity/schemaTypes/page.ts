import { defineField, defineType } from "sanity";

/**
 * General-purpose content page (About, Admissions & Eligibility, policy
 * pages, etc). The current Next.js implementation renders these routes
 * from hardcoded React components for speed — see SANITY_SETUP.md for the
 * migration path to make them fully CMS-editable via this schema.
 */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title" } },
});
