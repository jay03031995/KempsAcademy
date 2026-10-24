import {Suspense} from 'react';
import {getCmsContent} from '@/lib/cms';
import {PageHero} from '@/components/ui/PageHero';
import {ProgrammeFinder} from '@/components/programme/ProgrammeFinder';
import {buildMetadata} from '@/lib/seo';
export const metadata=buildMetadata({title:'Courses',description:'Build your knowledge in skincare, cosmetology and aesthetic medicine. Compare programmes by interest, qualification and learning format.',path:'/courses'});
export default async function Page({searchParams}:{searchParams:Promise<{q?:string}>}){const {q}=await searchParams;const searching=Boolean(q?.trim());const {programmes}=await getCmsContent();return <><PageHero eyebrow="EXPLORE OUR COURSES" title={searching?"Find your next programme":"Professional aesthetics courses"} description="Build your knowledge in skincare, cosmetology and aesthetic medicine. Compare programmes by interest, qualification and learning format." crumbs={[{name:'Courses',path:'/courses'}]} image="/images/indian/indian-skin-training.png"/><section className="catalogue-section content-container"><Suspense fallback={<p>Loading programmes…</p>}><ProgrammeFinder programmes={searching?programmes:programmes.filter(p=>p.type==='course')}/></Suspense></section></>}
