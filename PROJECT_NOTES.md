# Project notes — scope decisions made while building

Captured here so the reasoning survives even if the conversation that
produced it doesn't.

## Brand image provided

The brand reference image contained two things: the **Kemps Clinic** logo
(pink/magenta flower mark, black wordmark) and a bio section for
**Dr. Manju Keshari** (MBBS, MD Dermatology & Venereology, practicing since
2001; listed focus areas: acne/scars/pigmentation, hair & scalp, body
rejuvenation/contouring, surgical dermatology, aesthetic gynaecology).

Two explicit decisions were made with the project owner before building:

1. **Palette**: keep the brief's provisional plum/ivory/blush/gold/charcoal
   palette rather than extracting colors from the real (pink/magenta) logo.
   If this changes, the only place to edit is the `@theme` block in
   `src/app/globals.css` — all components reference the named tokens
   (`text-plum`, `bg-blush`, etc.), not raw hex values.
2. **Content gaps**: ship every page/schema now with clearly marked
   placeholders rather than omitting unverified sections, *except* trainers
   (real: Dr. Keshari only) and course/workshop content (original copy,
   informed by reviewing the reference academy's site structure).

## Reference site (dermacurve.com) — what was and wasn't used

`/browse` was used to review dermacurve.com's navigation, course/workshop
taxonomy, and homepage structure (hero → stats → "who we are" → course grid
→ contact → FAQ → footer). This informed:

- The **shape** of the site: Courses vs. Workshops vs. (future) Online
  Courses as separate catalog types, each course/workshop having duration,
  format, eligibility, next-batch, and an enquiry CTA.
- The **enquiry-first** conversion pattern (every card and detail page
  pushes toward "enquire", not a self-serve checkout).

What was explicitly **not** used: Dermacurve's actual course names,
descriptions, pricing, trainer identities, testimonials, or statistics.
Kemps' category names (Skin & Acne Aesthetics, Hair & Scalp Care, Body
Contouring & Wellness, Surgical Dermatology) were derived instead from Dr.
Keshari's own verified specialty list, and all course/workshop copy in
`src/lib/content/programmes.ts` is original writing for this project — see
the file's header comment and CONTENT_CHECKLIST.md for what still needs
academy sign-off.

One category Dermacurve offers heavy injectable-procedure training in
(Botox/filler/thread workshops) was deliberately **not** mirrored, since
nothing in the verified trainer bio supports Kemps teaching those
specifically — inventing that category would have been exactly the kind of
unverified claim the brief prohibits.

## Why `(site)` is a route group

`/studio` (embedded Sanity Studio) must render as its own full-page app,
not nested inside the marketing site's Header/Footer. Next.js's App Router
only has one root layout per path, so every public page was moved into an
`(site)` route group with its own layout carrying Header/Footer, while the
root layout (`src/app/layout.tsx`) stays minimal (just `<html>`/`<body>`/
fonts) and `/studio` sits outside the group. This was a mid-build fix after
first discovering `/studio` was inheriting the site chrome — see build/QA
history if you're looking at git blame on this restructure.

## Tablet breakpoint fix

QA with `/browse` at 768px (iPad portrait) caught the header overflowing:
the full desktop nav (6 links + dropdown + Ask Kemps + search + Admissions
CTA) was activating at Tailwind's default `md:` (768px) with not enough
horizontal room. Fixed by moving the desktop-nav breakpoint from `md:` to
`lg:` (1024px) throughout `Header.tsx`, so tablet widths get the compact
header (logo + search + hamburger) instead. Since that meant tablet users
would lose the dedicated "Ask Kemps" entry point, it was added to
`MobileNav.tsx` (which now also serves the 768–1023px range) via an
`onAskKemps` callback prop from `Header.tsx`.

## Known minor items not chased further (time-boxed)

- A `link rel=preload` console warning for one programme image on the
  homepage (Next.js prefetching a hovered course link's hero image ahead of
  navigation) — cosmetic, not a user-facing bug.
- Analytics event wiring (course views, finder usage, brochure downloads,
  WhatsApp/call clicks, batch enquiries, AI search usage) is specified in
  the brief but not implemented — no analytics provider was chosen. The
  conversion points are all in place (enquiry form, Ask Kemps, CTAs); wiring
  events is a matter of picking a provider and adding calls at those
  existing points.
