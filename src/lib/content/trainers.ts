import type { Trainer } from "@/lib/types";

// VERIFIED — transcribed from the brand reference image supplied for this
// project. Do not add further trainers, awards, or affiliations without a
// similarly verified source. See PROJECT_NOTES.md.
export const trainers: Trainer[] = [
  {
    _id: "trainer-manju-keshari",
    slug: "dr-manju-keshari",
    name: "Dr. Manju Keshari",
    credentials: "MBBS, MD Dermatology & Venereology",
    specialtyLabel: "Dermatology",
    portrait: {
      url: "/images/indian/dr-manju-keshari.png",
      alt: "Dr. Manju Keshari, dermatologist at Kemps Clinic",
    },
    experienceSummary: "Practicing dermatologist since 2001, with over two decades of experience in skin, hair, and cosmetic treatments.",
    practicingSince: 2001,
    teachingAreas: [
      "Acne, acne scars & pigmentation",
      "Advanced hair care & scalp health",
      "Body rejuvenation & contouring",
      "Surgical dermatology procedures",
      "Aesthetic gynaecology",
    ],
    biography: [
      "Dr. Manju Keshari (MBBS, MD Dermatology & Venereology) is a dermatologist with over two decades of clinical experience, practicing since 2001. She specialises in skin, hair, and cosmetic treatments.",
      "Through advanced training in lasers, skin rejuvenation, and cosmetic procedures, she offers care spanning skin, hair, body, and aesthetic gynaecology.",
    ],
    programmeSlugs: [
      "advanced-clinical-dermatology-fellowship",
      "acne-scar-management-workshop",
      "chemical-peels-pigmentation-workshop",
      "hair-scalp-specialist-course",
      "prp-hair-restoration-workshop",
      "body-contouring-aesthetic-wellness-course",
      "surgical-dermatology-procedures-workshop",
    ],
    verified: true,
  },
];
