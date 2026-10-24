import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wmrxhjfe";
const dataset = process.env.SANITY_ENQUIRY_DATASET ?? "enquiries";
const token = process.env.SANITY_API_TOKEN;
if (!token) throw new Error("SANITY_API_TOKEN is required. Store it in .env.local or your secret manager.");
if (projectId !== "wmrxhjfe") throw new Error("Refusing to configure a dataset outside the requested Sanity project.");

const api = `https://api.sanity.io/v2021-06-07/projects/${projectId}/datasets`;
const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
const listResponse = await fetch(api, { headers });
if (!listResponse.ok) throw new Error(`Could not list Sanity datasets (HTTP ${listResponse.status}). Check project permissions.`);
const list = await listResponse.json();
const datasets = Array.isArray(list) ? list : list.datasets;
if (!Array.isArray(datasets)) throw new Error("Sanity returned an unexpected dataset list; no change was made.");
const current = datasets.find((item) => item.name === dataset);
let response;
if (!current) {
  response = await fetch(`${api}/${dataset}`, { method: "PUT", headers, body: JSON.stringify({ aclMode: "private", description: "Private admissions enquiries and appointment requests" }) });
} else if (current.aclMode !== "private") {
  response = await fetch(`${api}/${dataset}`, { method: "PATCH", headers, body: JSON.stringify({ aclMode: "private" }) });
}
if (response && !response.ok) throw new Error(`Could not set a private Sanity dataset (HTTP ${response.status}). Check dataset permissions and private-dataset plan access.`);
const verifiedResponse = await fetch(api, { headers });
if (!verifiedResponse.ok) throw new Error(`Could not verify the enquiry dataset (HTTP ${verifiedResponse.status}).`);
const verifiedList = await verifiedResponse.json();
const verifiedDatasets = Array.isArray(verifiedList) ? verifiedList : verifiedList.datasets;
const result = verifiedDatasets?.find((item) => item.name === dataset);
if (result?.aclMode !== "private") throw new Error("The enquiry dataset is not private; refusing to enable form writes.");

const corsUrl = `https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`;
const corsResponse = await fetch(corsUrl, { headers });
if (!corsResponse.ok) throw new Error(`Could not inspect Sanity CORS entries (HTTP ${corsResponse.status}).`);
const corsEntries = await corsResponse.json();
if (!corsEntries.some((entry) => entry.origin === "http://localhost:3000")) {
  const createdCors = await fetch(corsUrl, { method: "POST", headers, body: JSON.stringify({ origin: "http://localhost:3000", allowCredentials: true }) });
  if (!createdCors.ok) throw new Error(`Could not add the exact local Studio CORS origin (HTTP ${createdCors.status}).`);
}
console.log(`Verified private dataset ${projectId}/${dataset} and local Studio CORS.`);
