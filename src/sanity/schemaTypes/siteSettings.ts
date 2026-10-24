import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "academyName", title: "Academy name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "legalName", title: "Legal / registered name", type: "string" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {hotspot: true},
      description: "Optional. Leave empty to use the Kemps Academy wordmark.",
      fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({ name: "brandColors", title: "Brand colors", type: "object", fields: [
      { name: "plum", title: "Plum", type: "string" },
      { name: "ivory", title: "Ivory", type: "string" },
      { name: "blush", title: "Blush", type: "string" },
      { name: "gold", title: "Gold", type: "string" },
      { name: "charcoal", title: "Charcoal", type: "string" },
    ] }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({ name: "admissionsCtaLabel", title: "Admissions CTA label", type: "string", initialValue: "Speak to Admissions" }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo" }),
  ],
  preview: { select: { title: "academyName" } },
});
