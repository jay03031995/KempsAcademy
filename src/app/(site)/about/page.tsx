import Link from 'next/link';
import {PageHero} from '@/components/ui/PageHero';
import {LearningExperience} from '@/components/home/LearningExperience';
import {MeetTrainers} from '@/components/home/MeetTrainers';
import {buildMetadata} from '@/lib/seo';
export const metadata=buildMetadata({title:'About Kemps',description:'Discover our approach to practical aesthetics and cosmetology learning.',path:'/about'});
export default function Page(){return <><PageHero eyebrow="ABOUT KEMPS" title="Knowledge for your next chapter." description="Professional learning in skincare, cosmetology and aesthetic medicine, built around a clear connection between theory and practice." crumbs={[{name:'About us',path:'/about'}]} image="/images/indian/indian-skin-training.png"/><section className="content-container inner-section about-intro"><h2>A practical approach to aesthetics education</h2><div><p>Choosing a course is a professional decision. At Kemps Academy, you can explore learning paths across skin therapy, clinical cosmetology, aesthetic medicine and specialist workshops.</p><p>Our programme collection includes online, hybrid and in-person formats. Entry requirements and clinical activities vary by course and your existing qualifications.</p><Link className="gold-button" href="/courses">Explore the programmes</Link></div></section><LearningExperience/><MeetTrainers/></>}
