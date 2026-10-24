import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { curriculumModule } from "./objects/curriculumModule";

import { siteSettings } from "./siteSettings";
import { navigation } from "./navigation";
import { homepage } from "./homepage";
import { page } from "./page";
import { course } from "./course";
import { workshop } from "./workshop";
import { programmeCategory } from "./programmeCategory";
import { trainer } from "./trainer";
import { batch } from "./batch";
import { testimonial } from "./testimonial";
import { galleryItem } from "./galleryItem";
import { article } from "./article";
import { faq } from "./faq";
import { brochure } from "./brochure";
import { redirect } from "./redirect";
import { enquiry } from "./enquiry";
import { appointment } from "./appointment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Reusable objects
    seo,
    curriculumModule,
    // Singletons
    siteSettings,
    navigation,
    homepage,
    // Content
    page,
    course,
    workshop,
    programmeCategory,
    trainer,
    batch,
    testimonial,
    galleryItem,
    article,
    faq,
    brochure,
    redirect,
    enquiry,
    appointment,
  ],
};
