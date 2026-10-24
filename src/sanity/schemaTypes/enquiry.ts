import { defineField, defineType } from "sanity";

export const enquiry = defineType({
  name: "admissionEnquiry",
  title: "Admissions enquiry",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Email", type: "string" }),
    // Enquiries live in a separate private dataset, so a normal Sanity
    // reference to a course in `production` would be invalid across datasets.
    defineField({ name: "courseInterest", title: "Course of interest", type: "string" }),
    defineField({ name: "courseSlug", title: "Course slug", type: "string" }),
    defineField({ name: "qualification", title: "Highest qualification", type: "string" }),
    defineField({ name: "preferredContact", title: "Preferred contact method", type: "string", options: { list: ["phone", "whatsapp", "email"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "consent", title: "Contact consent", type: "boolean", validation: (Rule) => Rule.required().custom((value) => value === true || "Contact consent must be recorded") }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "source", title: "Form source", type: "string" }),
    defineField({ name: "status", title: "Follow-up status", type: "string", options: { list: ["new", "contacted", "qualified", "enrolled", "closed"] }, initialValue: "new", validation: (Rule) => Rule.required() }),
    defineField({ name: "followUpDate", title: "Follow-up date", type: "date" }),
    defineField({ name: "internalNotes", title: "Internal notes", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "phone", status: "status", course: "courseInterest.title" },
    prepare: ({ title, subtitle, status, course }) => ({ title: title || "New enquiry", subtitle: [status, course, subtitle].filter(Boolean).join(" · ") }),
  },
});
