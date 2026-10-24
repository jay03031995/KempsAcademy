# Content checklist — what's real vs. placeholder

Everything below is marked in the code with a comment or `[CONFIG: ...]` /
"placeholder" string so it's easy to grep for (`grep -rn "CONFIG:\|PLACEHOLDER\|placeholder" src`).

## Verified (safe to ship as-is)

- [x] Trainer **Dr. Manju Keshari** — name, credentials (MBBS, MD
      Dermatology & Venereology), experience summary, specialty areas.
      Transcribed from the brand reference image. *(`src/lib/content/trainers.ts`)*
- [x] Kemps brand name reference ("Kemps Clinic" on the real logo) —
      see PROJECT_NOTES.md for how the academy name was derived from it.

## Needs real content before launch

### Brand
- [ ] Real logo file (currently an SVG placeholder at
      `public/images/kemps-logo-placeholder.svg`)
- [ ] Decision: is "Kemps Aesthetics & Cosmetology Training Academy" the
      correct public-facing brand name relative to "Kemps Clinic"? Currently
      set in `src/lib/content/site-settings.ts`.
- [ ] Confirm whether to keep the provisional plum/gold palette or rework it
      toward the real logo's pink/magenta — brief currently says keep
      provisional (see PROJECT_NOTES.md).

### Contact & location
- [ ] Academy address, phone, WhatsApp number, email
      (`src/lib/content/site-settings.ts` — all four are `[CONFIG: ...]`
      placeholders, shown verbatim on /contact and the footer so it's obvious
      nothing's been invented)
- [ ] Social links (currently empty array)

### Trainers
- [ ] Any trainers beyond Dr. Manju Keshari
- [ ] Trainer portrait photo (currently a generated placeholder image)
- [ ] Full biography copy beyond what's verified from the reference image

### Courses & workshops
- [ ] All 7 programmes in `src/lib/content/programmes.ts` are **original
      placeholder content** — category names were inferred from Dr.
      Keshari's verified specialties, but exact curricula, module
      breakdowns, durations, eligibility wording, and inclusions need
      academy sign-off before publishing
- [ ] Fees — `feesVisible: false` on every programme by design; provide
      real figures and decide per-programme whether to publish them
      or keep "Request Fee Details"
- [ ] Certification name and any accrediting body (currently
      "confirm exact certificate name... before publishing" placeholder text
      on every programme)
- [ ] Real programme photography (currently generated placeholder SVGs)
- [ ] Brochures (brochure download is currently hidden on every programme —
      `brochureUrl` is unset)

### Batches
- [ ] All dates in `src/lib/content/batches.ts` are illustrative — confirm
      real upcoming batch schedule, or start empty and let admissions add
      batches via Sanity once connected

### Gallery
- [ ] No real facility/training photography supplied — page currently shows
      an honest empty state rather than stock/generated images standing in
      for real facilities (per brief's explicit instruction)

### Student Stories
- [ ] No approved testimonials exist — section is coded to stay hidden
      (`src/lib/content/testimonials.ts` is empty) until real, approved
      quotes are provided

### Legal pages
- [ ] Privacy Policy — draft boilerplate, needs legal review
      (`src/app/(site)/privacy-policy/page.tsx`)
- [ ] Terms & Conditions — draft boilerplate, needs legal review
- [ ] Refund & Cancellation Policy — mostly `[CONFIG: ...]` placeholders;
      do not publish until the academy provides actual terms (cutoff
      windows, refund percentages, rescheduling fees)

### About page
- [ ] Real academy history/mission copy — current page is a short
      structural placeholder, explicitly labeled as such on the page

### Integrations
- [ ] Sanity project (see SANITY_SETUP.md)
- [ ] `ANTHROPIC_API_KEY` for Ask Kemps (works without it — falls back to
      keyword search honestly, no fake AI chat)
- [ ] Real CRM/lead store for enquiries (currently a local gitignored file)
- [ ] Analytics provider ID
