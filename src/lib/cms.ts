import 'server-only';
import { cache } from 'react';
import { createClient, defineQuery } from 'next-sanity';
import { categories, programmes, faqs, siteSettings, trainers, batches, articles, testimonials, galleryItems } from './content';
import type { Programme, ProgrammeCategory, FaqItem, SiteSettings, ImageAsset, Trainer, Batch, Article, Testimonial, GalleryItem } from './types';
import { projectId, dataset, apiVersion, isSanityConfigured } from '@/sanity/env';

export interface HomepageContent { heroHeadline: string; heroSupportingCopy: string; heroImage: ImageAsset; sectionOrder?: string[]; whyHeading: string; whyItems: {title:string;text:string}[]; learningHeading: string; learningIntro: string; learningSteps: {title:string;text:string}[] }
export interface CmsContent { programmes: Programme[]; categories: ProgrammeCategory[]; faqs: FaqItem[]; siteSettings: SiteSettings; homepage: HomepageContent; navigation: {primaryLinks: {label:string;path:string}[]}; trainers: Trainer[]; batches: Batch[]; articles: Article[]; testimonials: Testimonial[]; galleryItems: GalleryItem[] }
const fallback: CmsContent = { programmes, categories, faqs, siteSettings, trainers, batches, articles, testimonials, galleryItems, navigation: {primaryLinks:[{label:'Workshops',path:'/workshops'},{label:'Learn online',path:'/courses?mode=Online'},{label:'Our faculty',path:'/trainers'},{label:'About Kemps',path:'/about'},{label:'Learning resources',path:'/insights'},{label:'Gallery',path:'/gallery'},{label:'FAQs',path:'/faqs'},{label:'Upcoming batches',path:'/batches'},{label:'Contact us',path:'/contact'}]}, homepage: { heroHeadline: 'The art of aesthetics.', heroSupportingCopy: 'Build your next chapter in aesthetics and cosmetology. Explore structured courses, focused workshops and practical clinical learning.', heroImage: { url: '/images/indian/indian-clinical-training.jpg', alt: 'Clinical training demonstration at Kemps Academy', credit: '' }, whyHeading:'Training with a practical purpose', whyItems:[{title:'Practical focus',text:'Connect what you learn with demonstrations, case discussions and guided practice.'},{title:'Study your way',text:'Choose from online, hybrid and in-person programmes to fit your schedule.'},{title:'Find the right fit',text:'Get help comparing eligibility, course content and learning formats before you enrol.'}], learningHeading:'From the classroom to practice', learningIntro:'A straightforward approach to building knowledge and confidence.', learningSteps:[{title:'Learn the foundations',text:'Understand skin science, anatomy and the principles behind each treatment.'},{title:'Watch the technique',text:'Connect the theory to clinical practice through demonstrations.'},{title:'Build your skills',text:'Develop your technique through guided learning suited to your qualification.'},{title:'Plan what comes next',text:'Review your progress and discuss your professional goals with the team.'}] } };
const published = '!(_id in path("drafts.**"))';
const query = defineQuery(`{
  "programmes": *[_type in ["course", "workshop"] && ${published}] | order(title asc) {
    _id, "type": _type, "slug": slug.current, title, summary,
    "categorySlug": category->slug.current,
    "image": image {"url": asset->url, alt, "credit": asset->creditLine},
    eligibility, duration, format, location, learningObjectives, curriculum,
    practicalTraining, assessment, certification, included, excluded, feesVisible, feeInfo,
    "trainerSlugs": coalesce(trainers[]->slug.current, []),
    "faqSlugs": coalesce(faqs[]._ref, []), featured, seo, sourceUrl
  },
  "categories": *[_type == "programmeCategory" && ${published}] | order(title asc) {_id, "slug": slug.current, title, description},
  "faqs": *[_type == "faq" && ${published}] | order(question asc) {_id, question, answer, tags},
  "siteSettings": *[_id == "siteSettings" && ${published}][0] {academyName, legalName, "logo": logo {"url": asset->url, alt, "credit": asset->creditLine}, address, phone, whatsapp, email, socialLinks, admissionsCtaLabel},
  "homepage": *[_id == "homepage" && ${published}][0] {heroHeadline, heroSupportingCopy, sectionOrder, whyHeading, whyItems[]{title,text}, learningHeading, learningIntro, learningSteps[]{title,text}, "heroImage": heroImage {"url": asset->url, alt, "credit": asset->creditLine}}
  ,"navigation": *[_id == "navigation" && ${published}][0] {primaryLinks[]{label,path}}
  ,"trainers": *[_type == "trainer" && verified == true && ${published}] | order(name asc) {_id, "slug": slug.current, name, credentials, specialtyLabel, "portrait": portrait {"url": asset->url, alt, "credit": asset->creditLine}, experienceSummary, practicingSince, teachingAreas, "biography": biography[].children[].text, "programmeSlugs": coalesce(*[_type in ["course", "workshop"] && references(^._id) && ${published}].slug.current, []), "approvedLinks": approvedLinks[]{label,url}, verified}
  ,"batches": *[_type == "batch" && ${published}] | order(startDate asc) {_id, "programmeSlug": programme->slug.current, "programmeTitle": programme->title, "programmeType": programme->_type, "trainerName": trainers[0]->name, startDate, endDate, schedule, location, "mode": coalesce(programme->format, "In-person"), "trainerSlugs": coalesce(trainers[]->slug.current, []), applicationDeadline, status}
  ,"articles": *[_type == "article" && ${published}] | order(publishedAt desc) {_id, "slug": slug.current, title, summary, "coverImage": coverImage {"url": asset->url, alt}, author, publishedAt, updatedAt, "body": body[].children[].text, tags}
  ,"testimonials": *[_type == "testimonial" && approved == true && ${published}] | order(_createdAt desc) {_id, studentName, "programmeSlug": programme->slug.current, batchLabel, quote, approved}
  ,"galleryItems": *[_type == "galleryItem" && ${published}] {_id, "image": image {"url": asset->url, alt}, caption, category}
}`);
export const getCmsContent = cache(async (): Promise<CmsContent> => {
  if (!isSanityConfigured) return fallback;
  try {
    // Public website content is published-only and does not need a write token.
    const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' });
    const result = await client.fetch(query, {}, { next: { revalidate: 30 } });
    return {
      programmes: (result.programmes ?? []).map((p: Programme) => ({ ...p, eligibility: p.eligibility ?? [], learningObjectives: p.learningObjectives ?? [], curriculum: p.curriculum ?? [], included: p.included ?? [], trainerSlugs: p.trainerSlugs ?? [], faqSlugs: p.faqSlugs ?? [], image: p.image?.url ? p.image : fallback.homepage.heroImage })),
      categories: result.categories ?? [],
      faqs: result.faqs ?? [],
      siteSettings: result.siteSettings ? {...siteSettings, ...result.siteSettings, logo: result.siteSettings.logo?.url ? result.siteSettings.logo : siteSettings.logo} : siteSettings,
      homepage: result.homepage ? {
        ...fallback.homepage,
        ...result.homepage,
        heroHeadline: result.homepage.heroHeadline ?? fallback.homepage.heroHeadline,
        heroSupportingCopy: result.homepage.heroSupportingCopy ?? fallback.homepage.heroSupportingCopy,
        heroImage: result.homepage.heroImage?.url ? result.homepage.heroImage : fallback.homepage.heroImage,
        whyHeading: result.homepage.whyHeading ?? fallback.homepage.whyHeading,
        whyItems: result.homepage.whyItems ?? fallback.homepage.whyItems,
        learningHeading: result.homepage.learningHeading ?? fallback.homepage.learningHeading,
        learningIntro: result.homepage.learningIntro ?? fallback.homepage.learningIntro,
        learningSteps: result.homepage.learningSteps ?? fallback.homepage.learningSteps,
      } : fallback.homepage,
      navigation: result.navigation ?? fallback.navigation,
      trainers: result.trainers ?? [],
      batches: result.batches ?? [],
      articles: result.articles ?? [],
      testimonials: result.testimonials ?? [],
      galleryItems: result.galleryItems ?? [],
    };
  } catch (error) {
    console.error('Sanity content unavailable; serving local catalogue.', error instanceof Error ? error.message : 'Fetch error');
    return fallback;
  }
});
