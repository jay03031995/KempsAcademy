import { defineField, defineType } from "sanity";

export const appointment = defineType({
  name: "appointmentRequest",
  title: "Appointment request",
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
    defineField({ name: "requestedDate", title: "Preferred date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "requestedTime", title: "Preferred time", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "timezone", title: "Timezone", type: "string", initialValue: "Asia/Kolkata" }),
    defineField({ name: "consent", title: "Contact consent", type: "boolean", validation: (Rule) => Rule.required().custom((value) => value === true || "Contact consent must be recorded") }),
    defineField({ name: "submittedAt", title: "Requested at", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "source", title: "Form source", type: "string" }),
    defineField({ name: "status", title: "Appointment status", type: "string", options: { list: ["requested", "confirmed", "cancelled", "completed"] }, initialValue: "requested", validation: (Rule) => Rule.required() }),
    defineField({ name: "internalNotes", title: "Internal notes", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "fullName", date: "requestedDate", time: "requestedTime", status: "status" },
    prepare: ({ title, date, time, status }) => ({ title: title || "Appointment request", subtitle: [date, time, status].filter(Boolean).join(" · ") }),
  },
});
