# Sanity CMS — Kemps Academy

The site is a Next.js 16.3 App Router application. Content Studio is at `/studio`; the private admissions dashboard is at `/studio/enquiries`. Both use the schemas in `src/sanity/schemaTypes/`.

## Sanity datasets

- `wmrxhjfe/production` contains public website content. Public queries use Sanity's published perspective and refresh after 30 seconds.
- `wmrxhjfe/enquiries` is a private dataset for admissions enquiries and appointment requests. The website server writes to it with `SANITY_API_TOKEN`; browser code never receives that token. The private dataset was verified and created/configured for this project.

Private datasets are a Sanity paid feature. Do not change `enquiries` to public. Give each staff member who uses `/studio/enquiries` an appropriate Sanity project role with access to the private dataset. Public website readers do not need access to it.

## Environment and local development

The local `.env.local` contains the project configuration and server token; it is excluded by `.gitignore`. Keep the actual token in that file locally and in the production hosting secret manager only. Never use a `NEXT_PUBLIC_` token variable or commit the real token.

Required variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=wmrxhjfe`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2026-10-23`
- `SANITY_ENQUIRY_DATASET=enquiries`
- `SANITY_API_TOKEN` (server-only write token)

Run the site with `npm run dev`, then open `http://localhost:3000/studio` for content and `http://localhost:3000/studio/enquiries` for admissions tracking. The exact local Studio origin `http://localhost:3000` has been added to Sanity CORS with credentials enabled. Add the exact production Studio origin in Sanity CORS when the site host is known; do not use a wildcard.

To recreate/check the private dataset and local Studio CORS using the configured token, run `npm run sanity:setup-enquiries`. The command verifies the dataset remains private and is safe to rerun. Schema deployment remains available to an authorized Sanity account with `npx sanity schema deploy`.

## Enquiries and appointment requests

The existing admissions form writes to the private dataset. General submissions appear in the **Enquiries and follow-ups** list with status `new`. Staff can update status, follow-up date and internal notes in the Studio. If a visitor supplies both a preferred date and time, the submission appears in **Appointment requests** with status `requested`.

An appointment request is not a confirmed booking and does not reserve a slot. Staff must confirm availability in the dashboard and contact the visitor. This avoids representing a regular Sanity document as a concurrency-safe booking system. The form validates the date/time pair, course reference and consent, uses the existing rate limiter and honeypot, and keeps personal details out of public queries and responses.

## Migrated content

The published content from `jv44cv3g/production` was migrated to `wmrxhjfe/production`, preserving document IDs and references and copying referenced media. The migration added 32 published documents and 4 referenced assets: 12 courses, 9 workshops, 4 categories, 5 FAQs, homepage, and site settings. A second seed pass added local-only content that was absent from the old dataset: 1 verified trainer, 3 articles, 4 gallery items and navigation, with 4 local image assets. There were no published batches or testimonials to migrate. No fees, dates, or instructor/course relationships were invented where IDs/slugs did not match.

The migrations are rerunnable:

```sh
npm run sanity:migrate
npm run sanity:seed-local
```

The first copies published documents and asset references from the old project; the second adds missing verified local content without duplicating documents by slug. Review content in Studio before publishing changes. Keep the old project until the new content and production site have been checked.

## Adding and publishing content

Create courses, workshops, categories, trainers, batches, FAQs, homepage content, navigation, articles, gallery items and testimonials in `/studio`. Publishing a course makes its `/courses/[slug]` page available. Trainers must be marked verified to appear publicly; testimonials must be approved; batches are shown only when upcoming. Homepage section order, hero, benefits, learning steps, navigation and site contact settings are editable.

## Deployment notes

Set the public project variables and `SANITY_API_TOKEN` in the hosting environment. The production token must have write access to the private `enquiries` dataset and read access to `production`; keep it server-side. Set `SANITY_ENQUIRY_DATASET=enquiries`. No appointment time is confirmed automatically. Add a real booking system with atomic slot reservation only if confirmed appointments need to be guaranteed.
