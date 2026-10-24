import { defineType } from "sanity";
import { programmeFields } from "./shared/programmeFields";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: programmeFields,
  preview: { select: { title: "title", subtitle: "duration", media: "image" } },
});
