import { defineType } from "sanity";
import { programmeFields } from "./shared/programmeFields";

export const workshop = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: programmeFields,
  preview: { select: { title: "title", subtitle: "duration", media: "image" } },
});
