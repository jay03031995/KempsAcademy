import {Suspense} from 'react';
import {getCmsContent} from '@/lib/cms';
import {PageHero} from '@/components/ui/PageHero';
import {ProgrammeFinder} from '@/components/programme/ProgrammeFinder';
import {buildMetadata} from '@/lib/seo';
export const metadata=buildMetadata({title:'Workshops',description:'Build your technique with focused workshops in skin, injectables, lasers and more. Find a workshop that fits your professional goals.',path:'/workshops'});
export default async function Page(){const {programmes}=await getCmsContent();return <><PageHero eyebrow="HANDS-ON WORKSHOPS" title="Focused training. Practical skills." description="Build your technique with focused workshops in skin, injectables, lasers and more. Find a workshop that fits your professional goals." crumbs={[{name:'Workshops',path:'/workshops'}]} image="/images/indian/indian-clinical-training.jpg"/><section className="catalogue-section content-container"><Suspense fallback={<p>Loading programmes…</p>}><ProgrammeFinder programmes={programmes.filter(p=>p.type==='workshop')}/></Suspense></section></>}
