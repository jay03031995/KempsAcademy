// Data-access layer. Every function here is written the way a Sanity GROQ
// query result would be shaped, so swapping the mock arrays below for real
// `client.fetch(...)` calls (see src/lib/sanity/client.ts) does not require
// touching any page or component. This is the seam documented in
// SANITY_SETUP.md.

import { categories } from "./categories";
import { trainers } from "./trainers";
import { programmes } from "./programmes";
import { batches } from "./batches";
import { faqs } from "./faqs";
import { articles } from "./articles";
import { testimonials } from "./testimonials";
import { galleryItems } from "./gallery";
import { siteSettings } from "./site-settings";
import type { Batch, Programme } from "@/lib/types";

export {
  categories,
  trainers,
  programmes,
  batches,
  faqs,
  articles,
  testimonials,
  galleryItems,
  siteSettings,
};

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}

export function getProgrammesByType(type: Programme["type"]) {
  return programmes.filter((p) => p.type === type);
}

export function getFeaturedProgrammes() {
  return programmes.filter((p) => p.featured);
}

export function getRelatedProgrammes(programme: Programme, limit = 3) {
  return programmes
    .filter((p) => p._id !== programme._id && p.categorySlug === programme.categorySlug)
    .slice(0, limit);
}

export function getTrainerBySlug(slug: string) {
  return trainers.find((t) => t.slug === slug);
}

export function getTrainersForProgramme(programme: Programme) {
  return trainers.filter((t) => programme.trainerSlugs.includes(t.slug));
}

export function getProgrammesForTrainer(trainerSlug: string) {
  return programmes.filter((p) => p.trainerSlugs.includes(trainerSlug));
}

export function getFaqsBySlugs(slugs: string[]) {
  return faqs.filter((f) => slugs.includes(f._id));
}

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getLatestArticles(limit = 3) {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

/** Batches whose start date has not yet passed, soonest first. */
export function getUpcomingBatches(referenceDate: Date = new Date()): Batch[] {
  return batches
    .filter((b) => new Date(b.startDate).getTime() >= referenceDate.setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getUpcomingBatchesForProgramme(programmeSlug: string, referenceDate: Date = new Date()) {
  return getUpcomingBatches(referenceDate).filter((b) => b.programmeSlug === programmeSlug);
}

export function getNextBatchForProgramme(programmeSlug: string, referenceDate: Date = new Date()) {
  return getUpcomingBatchesForProgramme(programmeSlug, referenceDate)[0];
}

export function getApprovedTestimonials() {
  return testimonials;
}

export function getGalleryItems() {
  return galleryItems;
}
