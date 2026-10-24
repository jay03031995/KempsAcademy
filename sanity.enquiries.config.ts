"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { enquiryStructure } from "./src/sanity/enquiry-structure";
import { projectId, apiVersion } from "./src/sanity/env";

export default defineConfig({
  name: "kemps-enquiries",
  title: "Kemps Admissions Dashboard",
  projectId,
  dataset: process.env.SANITY_ENQUIRY_DATASET ?? "enquiries",
  basePath: "/studio/enquiries",
  apiVersion,
  schema,
  plugins: [structureTool({ structure: enquiryStructure })],
});
