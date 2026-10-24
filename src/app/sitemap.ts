import {getCmsContent} from "@/lib/cms";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const staticRoutes = [
  "", "/about", "/courses", "/workshops", "/trainers", "/batches", "/admissions",
  "/gallery", "/insights", "/faqs", "/contact", "/privacy-policy", "/terms-and-conditions", "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {programmes, trainers, articles} = await getCmsContent();
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
  }));

  const programmeEntries: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${SITE_URL}/${p.type === "course" ? "courses" : "workshops"}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
  }));

  const trainerEntries: MetadataRoute.Sitemap = trainers.map((t) => ({
    url: `${SITE_URL}/trainers/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly",
  }));

  return [...staticEntries, ...programmeEntries, ...trainerEntries, ...articleEntries];
}
