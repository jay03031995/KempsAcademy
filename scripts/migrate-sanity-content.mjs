import nextEnv from "@next/env";
import { createClient } from "@sanity/client";

nextEnv.loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wmrxhjfe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-10-23";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  throw new Error("SANITY_API_TOKEN is required. Store it in .env.local or your secret manager.");
}
if (projectId !== "wmrxhjfe" || dataset !== "production") {
  throw new Error("Migration target must be wmrxhjfe/production. Check the NEXT_PUBLIC_SANITY_* environment values.");
}

const source = createClient({ projectId: "jv44cv3g", dataset: "production", apiVersion, useCdn: false, perspective: "published" });
const target = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "published" });
const contentTypes = ["course", "workshop", "programmeCategory", "trainer", "batch", "faq", "homepage", "siteSettings", "navigation", "testimonial", "galleryItem", "article", "page", "brochure", "redirect"];

const docs = await source.fetch(`*[_type in $types && !(_id in path("drafts.**"))]`, { types: contentTypes });
if (!docs.length) {
  throw new Error("The source dataset returned no published content; migration stopped without writing anything.");
}

const assetIds = new Set();
function collectAssetRefs(value) {
  if (!value || typeof value !== "object") return;
  if (value._type === "reference" && typeof value._ref === "string" && /^(image|file)-/.test(value._ref)) assetIds.add(value._ref);
  for (const child of Object.values(value)) collectAssetRefs(child);
}
for (const doc of docs) collectAssetRefs(doc);

const assetIdList = [...assetIds];
const assets = [];
for (let offset = 0; offset < assetIdList.length; offset += 100) {
  assets.push(...await source.fetch(`*[_id in $ids] {_id, _type, url, originalFilename, mimeType, sha1hash}`, { ids: assetIdList.slice(offset, offset + 100) }));
}

const assetMap = new Map();
for (const asset of assets) {
  if (!asset.url) continue;
  if (asset.sha1hash) {
    const assetType = asset._type === "sanity.fileAsset" ? "sanity.fileAsset" : "sanity.imageAsset";
    const existingAsset = await target.fetch(`*[_type == $type && sha1hash == $sha1hash][0]{_id}`, { type: assetType, sha1hash: asset.sha1hash });
    if (existingAsset?._id) {
      assetMap.set(asset._id, existingAsset._id);
      continue;
    }
  }
  const response = await fetch(asset.url);
  if (!response.ok) throw new Error(`Could not download a source media asset (HTTP ${response.status}).`);
  const kind = asset._type === "sanity.fileAsset" ? "file" : "image";
  const uploaded = await target.assets.upload(kind, Buffer.from(await response.arrayBuffer()), {
    filename: asset.originalFilename ?? `${asset._id}.${kind === "image" ? "jpg" : "bin"}`,
    contentType: asset.mimeType,
  });
  assetMap.set(asset._id, uploaded._id);
}
const unresolvedAssetIds = assetIdList.filter((id) => !assetMap.has(id));
if (unresolvedAssetIds.length) throw new Error(`Migration stopped because ${unresolvedAssetIds.length} referenced assets could not be copied.`);

function rewriteRefs(value) {
  if (Array.isArray(value)) return value.map(rewriteRefs);
  if (!value || typeof value !== "object") return value;
  const output = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "_ref" && typeof child === "string" && assetMap.has(child)) output[key] = assetMap.get(child);
    else output[key] = rewriteRefs(child);
  }
  return output;
}

const migrated = docs.map((doc) => {
  const content = { ...doc };
  delete content._rev;
  delete content._createdAt;
  delete content._updatedAt;
  return rewriteRefs(content);
});

for (let offset = 0; offset < migrated.length; offset += 50) {
  const transaction = target.transaction();
  for (const doc of migrated.slice(offset, offset + 50)) transaction.createIfNotExists(doc);
  await transaction.commit();
}

const counts = docs.reduce((all, doc) => ({ ...all, [doc._type]: (all[doc._type] ?? 0) + 1 }), {});
console.log(JSON.stringify({ target: `${projectId}/${dataset}`, migratedPublishedDocuments: docs.length, migratedAssets: assetMap.size, types: counts }));
