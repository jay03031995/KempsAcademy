// Shared content types. These mirror the Sanity schema shapes 1:1 so the
// mock data in lib/content/* can be swapped for live GROQ query results
// without touching component code.

export type LearningMode = "In-person" | "Online" | "Hybrid";

export type ProgrammeStatus = "open" | "filling-fast" | "waitlist" | "closed";

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageAsset;
  noIndex?: boolean;
}

export interface ImageAsset {
  credit?: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProgrammeCategory {
  _id: string;
  slug: string;
  title: string;
  description: string;
}

export interface Trainer {
  _id: string;
  slug: string;
  name: string;
  credentials: string;
  /** Short credential label for compact UI, e.g. "Dermatology". Must be verified, not inferred. */
  specialtyLabel: string;
  portrait: ImageAsset;
  experienceSummary: string;
  /** Verified year practice began — used to compute "years practising" without parsing prose. */
  practicingSince?: number;
  teachingAreas: string[];
  biography: string[];
  programmeSlugs: string[];
  approvedLinks?: { label: string; url: string }[];
  verified: true;
}

export interface CurriculumModule {
  title: string;
  summary: string;
  topics: string[];
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  tags?: string[];
}

export interface Batch {
  _id: string;
  programmeSlug: string;
  programmeTitle: string;
  programmeType?: "course" | "workshop";
  trainerName?: string;
  startDate: string; // ISO date
  endDate?: string;
  schedule: string;
  location: string;
  mode: LearningMode;
  trainerSlugs: string[];
  applicationDeadline?: string;
  status: ProgrammeStatus;
}

export interface Programme {
  sourceUrl?: string;
  _id: string;
  type: "course" | "workshop";
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  image: ImageAsset;
  eligibility: string[];
  duration: string;
  format: LearningMode;
  location: string;
  learningObjectives: string[];
  curriculum: CurriculumModule[];
  practicalTraining: string;
  assessment: string;
  certification?: string;
  included: string[];
  excluded?: string[];
  feesVisible: boolean;
  feeInfo?: string;
  trainerSlugs: string[];
  faqSlugs: string[];
  brochureUrl?: string;
  featured: boolean;
  seo?: SeoFields;
}

export interface GalleryItem {
  _id: string;
  image: ImageAsset;
  caption: string;
  category: string;
}

export interface Testimonial {
  _id: string;
  studentName: string;
  programmeSlug?: string;
  batchLabel?: string;
  quote: string;
  approved: true;
}

export interface Article {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  coverImage: ImageAsset;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
}

export interface SiteSettings {
  academyName: string;
  legalName?: string;
  logo: ImageAsset;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  socialLinks: { platform: string; url: string }[];
  admissionsCtaLabel: string;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  courseInterest?: string;
  qualification?: string;
  preferredContact: "phone" | "whatsapp" | "email";
  consent: boolean;
  source?: string;
}
