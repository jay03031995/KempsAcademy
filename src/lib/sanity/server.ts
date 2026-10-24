import "server-only";
import { createClient } from "next-sanity";
import { projectId, apiVersion } from "@/sanity/env";

export function getEnquiryWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  const dataset = process.env.SANITY_ENQUIRY_DATASET ?? "enquiries";
  if (!token) throw new Error("Sanity enquiry storage is not configured");
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "published" });
}
