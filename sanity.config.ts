"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

export default defineConfig({
  name: "kemps-academy",
  title: "Kemps Academy",
  projectId: projectId,
  dataset,
  basePath: "/studio",
  apiVersion,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
