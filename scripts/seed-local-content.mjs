import { readFile } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import jiti from "jiti";
import { createClient } from "@sanity/client";

nextEnv.loadEnvConfig(process.cwd());
const loadTs = jiti(import.meta.url);
const { trainers, articles, galleryItems } = await loadTs.import("../src/lib/content/index.ts");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wmrxhjfe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-10-23";
const token = process.env.SANITY_API_TOKEN;
if (!token) throw new Error("SANITY_API_TOKEN is required; no documents were written.");
if (projectId !== "wmrxhjfe" || dataset !== "production") throw new Error("The seed target must be wmrxhjfe/production.");

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
const existing = await client.fetch(`*[_type in ["trainer", "article", "galleryItem", "course", "workshop"]]{_id,_type,"slug":slug.current,question,title,"trainers":trainers[]._ref}`);
const bySlug = new Map(existing.filter((doc) => doc.slug).map((doc) => [`${doc._type}:${doc.slug}`, doc]));
const assetCache = new Map();

async function imageReference(image) {
  if (!image?.url?.startsWith("/")) return undefined;
  if (assetCache.has(image.url)) return assetCache.get(image.url);
  const file = path.join(process.cwd(), "public", image.url.replace(/^\//, ""));
  const bytes = await readFile(file);
  const filename = path.basename(file);
  const contentType = filename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  const asset = await client.assets.upload("image", bytes, { filename, contentType });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: image.alt || "" };
  assetCache.set(image.url, ref);
  return ref;
}

const migrated = { trainers: 0, articles: 0, galleryItems: 0, trainerCourseLinks: 0, navigation: 0 };
const trainerIds = new Map();
for (const trainer of trainers) {
  const existingTrainer = bySlug.get(`trainer:${trainer.slug}`);
  if (existingTrainer) {
    trainerIds.set(trainer.slug, existingTrainer._id);
    continue;
  }
  const portrait = await imageReference(trainer.portrait);
  if (!portrait) continue;
  const doc = {
    _id: trainer._id,
    _type: "trainer",
    name: trainer.name,
    slug: { _type: "slug", current: trainer.slug },
    credentials: trainer.credentials,
    specialtyLabel: trainer.specialtyLabel,
    practicingSince: trainer.practicingSince,
    portrait,
    experienceSummary: trainer.experienceSummary,
    teachingAreas: trainer.teachingAreas,
    biography: trainer.biography.map((text, index) => ({ _type: "block", _key: `bio${index}`, style: "normal", markDefs: [], children: [{ _type: "span", _key: `bio${index}text`, text, marks: [] }] })),
    verified: trainer.verified,
    approvedLinks: trainer.approvedLinks ?? [],
  };
  await client.createOrReplace(doc);
  trainerIds.set(trainer.slug, trainer._id);
  migrated.trainers++;
}

for (const trainer of trainers) {
  const trainerId = trainerIds.get(trainer.slug);
  if (!trainerId) continue;
  for (const slug of trainer.programmeSlugs) {
    const programme = bySlug.get(`course:${slug}`) ?? bySlug.get(`workshop:${slug}`);
    if (!programme) continue;
    const refs = [...new Set([...(programme.trainers ?? []), trainerId])].map((id, index) => ({ _type: "reference", _key: `trainer${index}`, _ref: id }));
    await client.patch(programme._id).set({ trainers: refs }).commit();
    migrated.trainerCourseLinks++;
  }
}

function portableText(paragraphs) {
  return paragraphs.map((text, index) => ({ _type: "block", _key: `para${index}`, style: "normal", markDefs: [], children: [{ _type: "span", _key: `text${index}`, text, marks: [] }] }));
}

for (const article of articles) {
  if (bySlug.has(`article:${article.slug}`)) continue;
  const coverImage = await imageReference(article.coverImage);
  if (!coverImage) continue;
  await client.createOrReplace({
    _id: article._id,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    summary: article.summary,
    coverImage,
    body: portableText(article.body),
    author: article.author,
    publishedAt: new Date(article.publishedAt).toISOString(),
    ...(article.updatedAt ? { updatedAt: new Date(article.updatedAt).toISOString() } : {}),
    tags: article.tags,
  });
  migrated.articles++;
}

for (const item of galleryItems) {
  const existingGallery = existing.find((doc) => doc._type === "galleryItem" && doc._id === item._id);
  if (existingGallery) continue;
  const image = await imageReference(item.image);
  if (!image) continue;
  await client.createOrReplace({ _id: item._id, _type: "galleryItem", image, caption: item.caption, category: item.category });
  migrated.galleryItems++;
}

const navigation = await client.fetch(`*[_id == "navigation"][0]{_id}`);
if (!navigation) {
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    primaryLinks: [
      { _key: "workshops", label: "Workshops", path: "/workshops" },
      { _key: "online", label: "Learn online", path: "/courses?mode=Online" },
      { _key: "faculty", label: "Our faculty", path: "/trainers" },
      { _key: "about", label: "About Kemps", path: "/about" },
      { _key: "insights", label: "Learning resources", path: "/insights" },
      { _key: "gallery", label: "Gallery", path: "/gallery" },
      { _key: "faqs", label: "FAQs", path: "/faqs" },
      { _key: "batches", label: "Upcoming batches", path: "/batches" },
      { _key: "contact", label: "Contact us", path: "/contact" },
    ],
  });
  migrated.navigation++;
}

console.log(JSON.stringify({ target: `${projectId}/${dataset}`, addedLocalContent: migrated, uploadedImageAssets: assetCache.size }));
