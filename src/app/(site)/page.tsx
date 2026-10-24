import {MeetTrainers} from '@/components/home/MeetTrainers';
import {Hero} from '@/components/home/Hero';
import {CategoryShowcase} from '@/components/home/CategoryShowcase';
import {LearningExperience} from '@/components/home/LearningExperience';
import {FacilitiesTeaser} from '@/components/home/FacilitiesTeaser';
import {FaqSection} from '@/components/home/FaqSection';
import {AdmissionsEnquirySection} from '@/components/home/AdmissionsEnquirySection';
import {SampleReviews} from '@/components/home/SampleReviews';
import {getCmsContent} from '@/lib/cms';
import {buildMetadata} from '@/lib/seo';
import {UpcomingBatchesSection} from '@/components/home/UpcomingBatchesSection';
import {InsightsPreview} from '@/components/home/InsightsPreview';
import type {ReactNode} from 'react';
export const metadata=buildMetadata({title:'Kemps Academy — Aesthetics & Cosmetology Courses',description:'Explore professional aesthetics and cosmetology courses, clinical workshops and online learning at Kemps Academy.',path:'/'});
export default async function Home(){
 const c=await getCmsContent();
 const sections: Record<string, ReactNode> = {
  hero: <Hero content={c.homepage} count={c.programmes.length}/>,
  findYourCourse: <CategoryShowcase programmes={c.programmes}/>,
  featuredCourses: <CategoryShowcase programmes={c.programmes}/>,
  whyLearn: <FacilitiesTeaser content={c.homepage}/>,
  meetTrainers: <MeetTrainers/>,
  learningExperience: <LearningExperience content={c.homepage}/>,
  upcomingBatches: <UpcomingBatchesSection/>,
  facilitiesGallery: <FacilitiesTeaser content={c.homepage}/>,
  studentStories: <SampleReviews/>,
  faqs: <FaqSection/>,
  insights: <InsightsPreview/>,
  admissionsEnquiry: <AdmissionsEnquirySection/>,
 };
 const order=c.homepage.sectionOrder?.length ? c.homepage.sectionOrder : ['hero','findYourCourse','facilitiesGallery','learningExperience','meetTrainers','studentStories','faqs','admissionsEnquiry'];
 return <>{order.map((section,index)=>sections[section] ? <div key={`${section}-${index}`}>{sections[section]}</div> : null)}</>;
}
